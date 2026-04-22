# Lessons Learned — SRCP Data Viz Demo

Operational findings from the initial build and deploy cycle.

## 1. Vite base path must match deploy subdirectory exactly

Set `base` in `vite.config.ts` to match the server subdirectory (e.g., `/srcp/`). A mismatch causes all JS/CSS asset paths to resolve to the wrong URL — the app loads a blank page with 404s in the network tab and no obvious error in the build output.

## 2. ModSecurity blocks non-browser user-agents

InMotion Hosting's ModSecurity rules return HTTP 406 for requests from `curl` and other non-browser agents. This looks like a content-negotiation error but is actually a WAF block. Fix: disable ModSecurity for the affected vhost(s) via cPanel's `uapi`:

```bash
uapi ModSecurity disable_domains domain=demo.nickringle.com
```

Important: the block fires on both the subdomain **and** the parent addon-domain vhost (`nickringle.com.askbillringle.com`). Both must be disabled or the 406 persists on some request paths.

## 3. CI/CD SSH keys must be passphrase-free

SSH keys with passphrases — even when cached in macOS Keychain for interactive use — fail silently in GitHub Actions because there is no agent or passphrase prompt available. Maintain two separate keys:

- `srcp_deploy_ci` — passphrase-free ed25519, used only by GitHub Actions
- `id_rsa_nrdemo` — passphrase-protected, used for interactive SSH sessions

Store the private key as a GitHub Actions secret; add the public key to `~/.ssh/authorized_keys` on the server.

## 4. GitHub Actions env vars vs. secrets for non-sensitive config

Putting non-sensitive values (host, port, username, deploy path) into GitHub Actions **Secrets** causes empty string interpolation when those values are used in steps like `ssh-keyscan`. Secrets are redacted from all output, including command arguments. Use the workflow `env:` block for config values that are not credentials:

```yaml
env:
  DEPLOY_HOST: demo.nickringle.com
  DEPLOY_PORT: 2222
  DEPLOY_USER: abr
  DEPLOY_PATH: /home/abr/demo.nickringle.com/srcp
```

Reserve `secrets:` for actual credentials (private keys, API tokens).

## 5. PHP `getenv()` on cPanel needs explicit file read

cPanel's `uapi EnvVars set_envvar` sets shell environment variables for the cPanel session, but these are **not** visible to PHP via `getenv()` or `$_ENV` at request time. Instead, store the API key in `/home/abr/.env` (chmod 600, outside document root) and read it in the PHP proxy at request time:

```php
$env = parse_ini_file('/home/abr/.env');
$api_key = $env['ANTHROPIC_API_KEY'] ?? '';
```

## 6. First rsync deploy can pollute document root

If the rsync destination path is wrong on the first deploy (e.g., targeting the domain root instead of the `/srcp/` subdirectory), built files including `.htaccess` land in the wrong location. A stale `.htaccess` in the document root can intercept all subsequent requests — including requests to the correct subdirectory — producing confusing redirects or 404s.

Always verify the full destination path before the first deploy and use `--dry-run` to confirm file placement:

```bash
rsync -avz --delete --dry-run -e "ssh -p 2222" dist/ nickringle-demo:/home/abr/demo.nickringle.com/srcp/
```
