export interface SkillEntry {
  reference_number: number;
  prior_reference_number: string | number;
  skill_category: string;
  description_context: string;
  current_rating: number;
  rating_support_comments: string;
  previous_rating_1: number | null;
  previous_rating_2: number | null;
  previous_rating_3: number | null;
}

export interface RoleSummary {
  role_title: string;
  available_points: number;
  current_points: number;
  percentage: number;
  promotion_threshold_required: number;
  promotion_points_required: number;
  promotion_eligible: boolean;
}

export interface ScoringTable {
  total_current_role_points: number;
  available_current_role_points: number;
  current_role_percentage: number;
  total_next_role_points: number;
  available_next_role_points: number;
  next_role_percentage: number;
  promotion_eligible: boolean;
  promotion_gap_current_role: string;
  promotion_gap_next_role: string;
}

export interface SrcpMetadata {
  employee_name: string;
  current_role: string;
  manager_name: string;
  date_completed: string;
  cycle: string;
}

export interface SrcpReport {
  metadata: SrcpMetadata;
  current_role_summary: RoleSummary;
  next_role_summary: RoleSummary;
  promotion_status_note: string;
  skills: SkillEntry[];
  scoring_summary: ScoringTable;
}

// ─── IC 1: Alex Rivera (source: docs/eng/srcp_associate analyst_pass_submission.json) ───

const alexRivera: SrcpReport = {
  metadata: {
    employee_name: "Alex Rivera",
    current_role: "Associate Analyst",
    manager_name: "Sarah Chen",
    date_completed: "2026-04-21",
    cycle: "2025-2026",
  },
  current_role_summary: {
    role_title: "Associate Analyst",
    available_points: 72,
    current_points: 32,
    percentage: 0.4444,
    promotion_threshold_required: 0.75,
    promotion_points_required: 54,
    promotion_eligible: false,
  },
  next_role_summary: {
    role_title: "Analyst",
    available_points: 78,
    current_points: 0,
    percentage: 0.0,
    promotion_threshold_required: 0.50,
    promotion_points_required: 39,
    promotion_eligible: false,
  },
  promotion_status_note:
    "As of this entry cycle, Alex has earned 32 of 72 available Current Role points (44.4%). Promotion eligibility requires 75% of Current Role (54 pts) and 50% of Next Role (39 pts). Alex is on a solid developmental trajectory for a first-cycle report and should focus on advancing ratings across Data Extraction, Site Analytics, DOMO, and SQL skills in the next evaluation period.",
  skills: [
    { reference_number: 1, prior_reference_number: 1, skill_category: "Digital Advertising Knowledge", description_context: "Advertising concepts, strategies, and terminology", current_rating: 2, previous_rating_1: null, previous_rating_2: null, previous_rating_3: null, rating_support_comments: "Alex has demonstrated a solid grasp of digital advertising terminology and key activities in data analytics. During weekly 1:1 check-ins, Alex confidently explained core digital advertising concepts including programmatic display, paid search, social advertising, and site analytics without prompting. Completed the Overview of Data Analytics training and can articulate the purpose and function of various digital advertising platforms, tools, and strategies." },
    { reference_number: 2, prior_reference_number: 2, skill_category: "Data Extraction", description_context: "Ad Verification / DoubleVerify / Tahoe Media Lake", current_rating: 1, previous_rating_1: null, previous_rating_2: null, previous_rating_3: null, rating_support_comments: "Alex completed the 'Data Sources: Double Verify' training and demonstrated basic knowledge of ad verification calculations and methodology. Can explain how DoubleVerify is used to authenticate the quality of digital media and articulate the importance of viewability, fraud prevention, and brand safety. Is beginning to familiarize with the DoubleVerify interface and Tahoe Media Lake under mentor guidance." },
    { reference_number: 3, prior_reference_number: 3, skill_category: "Data Extraction", description_context: "Campaign Manager 360 / Search Ads 360 / Tahoe Media Lake", current_rating: 1, previous_rating_1: null, previous_rating_2: null, previous_rating_3: null, rating_support_comments: "Alex completed the required Paid Media training and shows basic knowledge of Campaign Manager 360 and Search Ads 360 data structures. Understands where relevant metrics such as impressions, clicks, and conversions can be located within each platform. Currently observing the extract refresh process in the Media Lake sandbox alongside a mentor and is beginning to build familiarity with the available data." },
    { reference_number: 4, prior_reference_number: 4, skill_category: "Digital Advertising Knowledge", description_context: "Digital Advertising Metrics and Calculations", current_rating: 2, previous_rating_1: null, previous_rating_2: null, previous_rating_3: null, rating_support_comments: "Alex completed all Data Sources training and successfully submitted all associated homework assignments. During a recent review session, Alex accurately explained digital advertising metrics including impressions, clicks, CTR, CPM, CPC, CPV, reach, and frequency and articulated how each metric is used to measure campaign performance. Has a strong foundation for applying these metrics across live reporting tasks." },
    { reference_number: 5, prior_reference_number: "5 & 8", skill_category: "Empower OS", description_context: "Target List QA and Upload / Appending Variables and Records", current_rating: 2, previous_rating_1: null, previous_rating_2: null, previous_rating_3: null, rating_support_comments: "Alex completed the 'Back End HCP Database Empower Training' in Continu, successfully uploaded the training target list, and appended test variables and records without errors. Has since completed one live client target list upload with light assistance from a mentor. The file was delivered on schedule and required only minor corrections, reflecting growing accuracy in the QA and upload process." },
    { reference_number: 6, prior_reference_number: "6 & 17", skill_category: "Empower OS", description_context: "Outsourced List Matching and Buy File Export", current_rating: 1, previous_rating_1: null, previous_rating_2: null, previous_rating_3: null, rating_support_comments: "Alex reviewed both the outsourced list matching and buy file processes during the 'Back End HCP Database Empower Training' and the relevant SOPs. Can accurately explain the purpose, scope, inputs, and outputs of each process and identify where each step begins and ends. Has observed a mentor complete an outsourced list match export and is beginning to participate in pull requests under supervision." },
    { reference_number: 7, prior_reference_number: 7, skill_category: "Empower OS", description_context: "Troubleshooting Empower Issues and Target List QA", current_rating: 1, previous_rating_1: null, previous_rating_2: null, previous_rating_3: null, rating_support_comments: "Alex has demonstrated the ability to identify target list issues during QA and escalate them clearly and in a timely manner to a mentor or manager. Over the course of this cycle, Alex flagged two instances of file format errors and one field mapping discrepancy, providing a clear description of each issue and what the correct expected output should be." },
    { reference_number: 8, prior_reference_number: 9, skill_category: "MS Office", description_context: "Microsoft Office Suite Proficiency", current_rating: 2, previous_rating_1: null, previous_rating_2: null, previous_rating_3: null, rating_support_comments: "Alex demonstrates consistent and appropriate use of Microsoft Office tools across all daily work activities. Regularly uses Outlook for professional email correspondence, Teams for internal communication and meeting management, Excel for data organization and reporting tasks, and OneDrive for file sharing and storage. Has independently set up recurring team meetings, created and distributed meeting notes in OneNote, and used Word for documentation tasks." },
    { reference_number: 9, prior_reference_number: "11 & 12", skill_category: "Microsoft Excel", description_context: "Pivot Tables, Calculated Fields, and LOOKUP Formulas", current_rating: 2, previous_rating_1: null, previous_rating_2: null, previous_rating_3: null, rating_support_comments: "Alex completed the 'Excel for Analytics and Reporting' training and successfully finished all assigned homework. Independently creates pivot tables with filters, calculated fields, and sorts to organize and summarize reporting data for assigned accounts. Has begun applying VLOOKUP to combine data from multiple tables in monthly reporting tasks and is developing proficiency with XLookup." },
    { reference_number: 10, prior_reference_number: 13, skill_category: "Microsoft Excel", description_context: "Charts, Graphs, Tables, Sorting, and Filtering", current_rating: 2, previous_rating_1: null, previous_rating_2: null, previous_rating_3: null, rating_support_comments: "Alex demonstrates solid working knowledge of Excel's analytical capabilities. Creates basic charts, tables, and graphs to support ad hoc reporting requests and uses filtering and sorting to isolate relevant data with oversight from a mentor. Has taken ownership of maintaining a client-level Excel reporting tracker, updating it on a consistent schedule and ensuring correct data entry and formatting." },
    { reference_number: 11, prior_reference_number: 14, skill_category: "Site Analytics Reporting", description_context: "Basic Site Metrics Pull and Monthly Reporting", current_rating: 1, previous_rating_1: null, previous_rating_2: null, previous_rating_3: null, rating_support_comments: "Alex pulled basic site metrics including site visits, time on site, unique visits, and page views from Google Analytics during training sessions and as part of an initial report update assignment. Shows a foundational understanding of what each metric represents and how it is used in monthly performance reporting. Currently developing the consistency and independence needed to manage and update data extracts across assigned reports without guidance." },
    { reference_number: 12, prior_reference_number: 16, skill_category: "Digital Advertising Knowledge", description_context: "Major Media Program Knowledge", current_rating: 1, previous_rating_1: null, previous_rating_2: null, previous_rating_3: null, rating_support_comments: "Alex has attended three Supplier Partner Education Sessions, covering Email programs, Programmatic Display, and Paid Search, and followed up each session with a discussion of key learnings with the manager. Is actively building a working understanding of how different media programs deliver messages to target audiences and which metrics are associated with each channel type." },
    { reference_number: 13, prior_reference_number: 18, skill_category: "Empower OS", description_context: "PII Confidentiality and Security Protocols", current_rating: 2, previous_rating_1: null, previous_rating_2: null, previous_rating_3: null, rating_support_comments: "Alex can accurately explain CMI/Compas security and confidentiality protocols surrounding PII, including the proper handling of target lists and data feeds. During this cycle, Alex correctly identified a potential confidentiality adherence misstep during a file handoff and escalated it promptly to a mentor for resolution. Continues to follow all confidentiality protocols accurately in day-to-day tasks with minimal oversight." },
    { reference_number: 14, prior_reference_number: 23, skill_category: "Empower OS", description_context: "Target List Overlap Analysis", current_rating: 1, previous_rating_1: null, previous_rating_2: null, previous_rating_3: null, rating_support_comments: "Alex accurately described all steps required to execute a target list overlap analysis during a review session with the manager, including the process for comparing two or more target lists to identify unique results and how those findings are communicated to the planning team. Has observed a mentor complete a live overlap analysis request and understands the business purpose and expected output." },
    { reference_number: 15, prior_reference_number: 21, skill_category: "DOMO", description_context: "Foundational Understanding and Data Integration", current_rating: 1, previous_rating_1: null, previous_rating_2: null, previous_rating_3: null, rating_support_comments: "Alex completed the 'Intro to DOMO' training and has been consistently attending bi-weekly 'DOMO Downloads' sessions to build and reinforce foundational knowledge. Demonstrates a basic understanding of key DOMO concepts including datasets, cards, beast modes, and dashboard navigation. Currently working with a mentor to make minor updates to an existing visualization." },
    { reference_number: 16, prior_reference_number: 22, skill_category: "Site Analytics Reporting", description_context: "Advanced Site Analytics Metrics", current_rating: 1, previous_rating_1: null, previous_rating_2: null, previous_rating_3: null, rating_support_comments: "Alex completed both the 'Data Sources: Intro to Google Analytics' and 'Data Sources: Intro to Adobe' training sessions. Has gained a foundational understanding of both advanced site analytics platforms and can identify key metrics available within each tool, including events, downloads, registrations, video views, and conversions, and articulate their relevance to business reporting." },
    { reference_number: 17, prior_reference_number: 24, skill_category: "Data Quality Assurance", description_context: "Data Accuracy, Integrity, and QA Processes", current_rating: 1, previous_rating_1: null, previous_rating_2: null, previous_rating_3: null, rating_support_comments: "Alex demonstrates a basic understanding of data tables in Tahoe/Snowflake and the role of DOMO connectors in the reporting workflow. During this cycle, Alex assisted in investigating a data discrepancy identified in an assigned dashboard, working with a mentor to trace the issue back to the source table and verify the expected refresh schedule." },
    { reference_number: 18, prior_reference_number: 25, skill_category: "Reporting", description_context: "Understanding and Interpreting Data Sources", current_rating: 1, previous_rating_1: null, previous_rating_2: null, previous_rating_3: null, rating_support_comments: "Alex accurately identifies the data pulled from key sources including Campaign Manager 360, DoubleVerify, and site analytics tools and has communicated basic findings from these sources to the manager during weekly review sessions. Is developing a clearer understanding of the differences between each data source and how they individually inform analytics performance." },
    { reference_number: 19, prior_reference_number: 26, skill_category: "Programmatic Display Media", description_context: "Programmatic Media Knowledge and Reporting", current_rating: 1, previous_rating_1: null, previous_rating_2: null, previous_rating_3: null, rating_support_comments: "Alex completed the Programmatic Foundations course and demonstrated a basic understanding of programmatic display media, including the purpose and mechanics of demand-side platforms, ad exchanges, and audience-based targeting. Can explain key programmatic concepts such as real-time bidding and ad format types at a foundational level." },
    { reference_number: 20, prior_reference_number: 27, skill_category: "SQL / Python / R", description_context: "Basic SQL Querying and Data Retrieval", current_rating: 1, previous_rating_1: null, previous_rating_2: null, previous_rating_3: null, rating_support_comments: "Alex completed SQL 101 training and successfully submitted all assigned homework, demonstrating a foundational understanding of query structure, SELECT statements, and basic data filtering. Has begun running pre-made SQL scripts for monthly reporting tasks with guidance from a mentor, successfully executing queries on assigned datasets without errors." },
    { reference_number: 21, prior_reference_number: 28, skill_category: "Measurement", description_context: "CIA Benchmark Dashboards and Campaign Benchmarking", current_rating: 1, previous_rating_1: null, previous_rating_2: null, previous_rating_3: null, rating_support_comments: "Alex reviewed the 'Benchmark Dashboard Training' video and successfully connected to the Display, Email, Microsite, Direct Mail, and Alerts Benchmark DOMO Dashboards. Is beginning to familiarize with the available benchmarks for each media channel and how they are used to evaluate campaign performance against historical norms." },
    { reference_number: 22, prior_reference_number: "NEW", skill_category: "MS Office", description_context: "Professional Email Etiquette", current_rating: 2, previous_rating_1: null, previous_rating_2: null, previous_rating_3: null, rating_support_comments: "Alex writes professional emails with appropriate tone, structure, and grammar consistently across all internal and external communications. Within the first 90 days, received positive written feedback from the manager on more than five reviewed emails. Demonstrates the ability to customize email tone and structure to suit different recipients and scenarios, including follow-up outreach to publisher contacts." },
    { reference_number: 23, prior_reference_number: "NEW", skill_category: "DOMO", description_context: "App Studio Interface", current_rating: 1, previous_rating_1: null, previous_rating_2: null, previous_rating_3: null, rating_support_comments: "Alex completed the foundational training on DOMO App Studio and has gained a basic understanding of the platform's functionality and interface. Can navigate to the App Studio environment within DOMO and identify the key structural components of an existing app. Is beginning to explore how App Studio is used from both a CMI and client-specific perspective." },
    { reference_number: 24, prior_reference_number: "NEW", skill_category: "Python / R Basics", description_context: "Programming Environment Setup and Foundational Concepts", current_rating: 1, previous_rating_1: null, previous_rating_2: null, previous_rating_3: null, rating_support_comments: "Alex successfully set up all required programming environments, including R Studio for R querying and both Anaconda and Visual Studio Code for Python, with all necessary packages and add-ons installed and verified as functional. Has begun attending both the Python 101 and R 101 training sessions and is working through the initial course modules." },
  ],
  scoring_summary: {
    total_current_role_points: 32,
    available_current_role_points: 72,
    current_role_percentage: 0.4444,
    total_next_role_points: 0,
    available_next_role_points: 78,
    next_role_percentage: 0.0,
    promotion_eligible: false,
    promotion_gap_current_role: "22 additional points needed (currently 32/54 required)",
    promotion_gap_next_role: "39 additional points needed (currently 0/39 required)",
  },
};

// ─── IC 2: Jordan Mills — Analyst (2 prior cycles) ───

const jordanMills: SrcpReport = {
  metadata: {
    employee_name: "Jordan Mills",
    current_role: "Analyst",
    manager_name: "Sarah Chen",
    date_completed: "2026-04-21",
    cycle: "2025-2026",
  },
  current_role_summary: {
    role_title: "Analyst",
    available_points: 78,
    current_points: 47,
    percentage: 0.603,
    promotion_threshold_required: 0.75,
    promotion_points_required: 59,
    promotion_eligible: false,
  },
  next_role_summary: {
    role_title: "Senior Analyst",
    available_points: 84,
    current_points: 14,
    percentage: 0.167,
    promotion_threshold_required: 0.50,
    promotion_points_required: 42,
    promotion_eligible: false,
  },
  promotion_status_note:
    "Jordan has earned 47 of 78 Analyst points (60.3%) in the third evaluation cycle, reflecting consistent growth across all skill areas. The primary development focus for the next cycle is SQL querying independence and advanced DOMO card creation. Jordan is on track to reach the 75% promotion threshold within 1–2 evaluation cycles.",
  skills: [
    { reference_number: 1, prior_reference_number: 1, skill_category: "Digital Advertising Knowledge", description_context: "Advertising concepts, strategies, and terminology", current_rating: 3, previous_rating_1: 3, previous_rating_2: 2, previous_rating_3: null, rating_support_comments: "Jordan demonstrates solid and consistent knowledge of digital advertising platforms, channels, and strategies. Can accurately explain channel-specific differences across programmatic display, paid search, email, and site analytics and applies this knowledge when interpreting campaign performance data. Regularly uses industry terminology correctly in written reporting and client-facing communications without prompting." },
    { reference_number: 2, prior_reference_number: 2, skill_category: "Data Extraction", description_context: "Campaign Manager 360 and Search Ads 360 pulls", current_rating: 3, previous_rating_1: 2, previous_rating_2: 2, previous_rating_3: null, rating_support_comments: "Jordan independently executes CM360 and SA360 extract refreshes on assigned accounts on the scheduled timeline, with minimal errors. Has developed a reliable QA checklist and uses it consistently before delivering extracts to the reporting team. Is beginning to troubleshoot discrepancies between expected and actual data without mentor involvement." },
    { reference_number: 3, prior_reference_number: 3, skill_category: "Microsoft Excel", description_context: "Pivot tables, calculated fields, and advanced LOOKUP formulas", current_rating: 4, previous_rating_1: 4, previous_rating_2: 3, previous_rating_3: null, rating_support_comments: "Jordan applies advanced pivot table techniques independently, including custom calculated fields, conditional formatting, and multi-level grouping. Uses VLOOKUP, HLOOKUP, and XLookup confidently across reporting tasks and has begun mentoring junior team members on LOOKUP function usage. Excel skills are a consistent strength across all assigned reporting work." },
    { reference_number: 4, prior_reference_number: 4, skill_category: "Microsoft Excel", description_context: "Charts, graphs, data manipulation, and filtering", current_rating: 4, previous_rating_1: 3, previous_rating_2: 3, previous_rating_3: null, rating_support_comments: "Jordan produces polished Excel charts and data tables for client-facing deliverables with minimal review needed. Demonstrates strong visual presentation judgment, including appropriate chart type selection, color consistency, and axis labeling. Has independently redesigned two client reporting trackers to improve clarity and reduce manual steps for the team." },
    { reference_number: 5, prior_reference_number: 5, skill_category: "MS Office", description_context: "Microsoft Office Suite Proficiency", current_rating: 3, previous_rating_1: 3, previous_rating_2: 3, previous_rating_3: null, rating_support_comments: "Jordan uses the full Office suite effectively and independently for all daily work activities. Manages shared team files in SharePoint, builds presentation decks in PowerPoint for internal and client-ready use, and uses Teams channels and meeting functions proficiently. Demonstrates good judgment about which tool to use for each task type." },
    { reference_number: 6, prior_reference_number: 6, skill_category: "Site Analytics Reporting", description_context: "Basic and advanced site metrics pulls", current_rating: 3, previous_rating_1: 2, previous_rating_2: 2, previous_rating_3: null, rating_support_comments: "Jordan independently pulls and formats site analytics data from Google Analytics and Adobe Analytics for assigned monthly reports. Can identify anomalies in traffic data and escalate with a clear description of the expected vs. observed values. Is developing the ability to interpret advanced metrics such as session events and conversion funnels without manager input." },
    { reference_number: 7, prior_reference_number: 7, skill_category: "DOMO", description_context: "Foundational understanding, dashboard navigation, and card creation", current_rating: 3, previous_rating_1: 2, previous_rating_2: 2, previous_rating_3: null, rating_support_comments: "Jordan navigates DOMO dashboards independently and has begun creating new visualization cards from existing datasets. Is developing competency with beast mode calculations and understands how DOMO datasets connect to underlying data tables. Continuing to build toward full independence in card creation and scheduled report management." },
    { reference_number: 8, prior_reference_number: 8, skill_category: "Reporting", description_context: "Understanding and interpreting data sources for client reporting", current_rating: 3, previous_rating_1: 3, previous_rating_2: 2, previous_rating_3: null, rating_support_comments: "Jordan accurately attributes performance metrics to the correct source platforms in client reports and can explain the significance of data discrepancies between sources. Has completed two full monthly reporting cycles independently and produced deliverables requiring only minor manager revisions. Is developing the ability to narrate performance trends in written report summaries." },
    { reference_number: 9, prior_reference_number: 9, skill_category: "SQL / Python / R", description_context: "Basic SQL querying and data retrieval", current_rating: 2, previous_rating_1: 2, previous_rating_2: 1, previous_rating_3: null, rating_support_comments: "Jordan runs pre-written SQL scripts for assigned reporting tasks independently and can modify WHERE clause filters to adjust query scope with guidance. Is developing a solid understanding of JOIN logic and has begun writing simple multi-table SELECT statements. Will focus on writing scripts from scratch in the next cycle." },
    { reference_number: 10, prior_reference_number: 10, skill_category: "Data Quality Assurance", description_context: "Data accuracy, integrity checks, and QA processes", current_rating: 2, previous_rating_1: 2, previous_rating_2: 1, previous_rating_3: null, rating_support_comments: "Jordan identifies data anomalies in assigned dashboards and report outputs and escalates them with a clear and timely description. Has built a personal QA checklist that is applied consistently before delivering reporting artifacts. Is developing the ability to trace discrepancies back to the source system without mentor support." },
    { reference_number: 11, prior_reference_number: 11, skill_category: "Measurement", description_context: "CIA Benchmark Dashboards and campaign benchmarking", current_rating: 2, previous_rating_1: 1, previous_rating_2: 1, previous_rating_3: null, rating_support_comments: "Jordan connects to and navigates all relevant CIA Benchmark dashboards and understands how benchmarks are used to contextualize campaign performance. Has begun incorporating benchmark data into assigned measurement plans with manager guidance and is building toward independent benchmark analysis. Will aim for full independence in benchmark reporting in the next cycle." },
    { reference_number: 12, prior_reference_number: 12, skill_category: "Empower OS", description_context: "Target list QA, file uploads, and PII compliance", current_rating: 3, previous_rating_1: 3, previous_rating_2: 2, previous_rating_3: null, rating_support_comments: "Jordan independently executes target list QA and upload tasks for assigned accounts, consistently delivering files on schedule with high accuracy. Has taken on mentoring responsibilities for a newer team member in the file upload workflow. Maintains strong adherence to all PII confidentiality protocols and has not required a compliance reminder in two consecutive evaluation cycles." },
  ],
  scoring_summary: {
    total_current_role_points: 47,
    available_current_role_points: 78,
    current_role_percentage: 0.603,
    total_next_role_points: 14,
    available_next_role_points: 84,
    next_role_percentage: 0.167,
    promotion_eligible: false,
    promotion_gap_current_role: "12 additional points needed (currently 47/59 required)",
    promotion_gap_next_role: "28 additional points needed (currently 14/42 required)",
  },
};

// ─── IC 3: Taylor Wong — Senior Analyst (3 prior cycles, promotion-eligible on current role) ───

const taylorWong: SrcpReport = {
  metadata: {
    employee_name: "Taylor Wong",
    current_role: "Senior Analyst",
    manager_name: "Sarah Chen",
    date_completed: "2026-04-21",
    cycle: "2025-2026",
  },
  current_role_summary: {
    role_title: "Senior Analyst",
    available_points: 84,
    current_points: 68,
    percentage: 0.81,
    promotion_threshold_required: 0.75,
    promotion_points_required: 63,
    promotion_eligible: true,
  },
  next_role_summary: {
    role_title: "Lead Analyst",
    available_points: 90,
    current_points: 20,
    percentage: 0.222,
    promotion_threshold_required: 0.50,
    promotion_points_required: 45,
    promotion_eligible: false,
  },
  promotion_status_note:
    "Taylor has exceeded the 75% Current Role threshold (81.0%, 68/84 pts) and is formally eligible for promotion consideration on the Analyst dimension. The remaining gap is the Next Role requirement — Taylor must reach 50% of Lead Analyst points (currently 20/45 required). The recommended focus areas are advanced data storytelling, cross-functional stakeholder communication, and independent measurement plan design.",
  skills: [
    { reference_number: 1, prior_reference_number: 1, skill_category: "Digital Advertising Knowledge", description_context: "Advertising concepts, strategies, and terminology", current_rating: 5, previous_rating_1: 4, previous_rating_2: 4, previous_rating_3: 3, rating_support_comments: "Taylor demonstrates expert-level knowledge of digital advertising strategies, channels, and measurement frameworks. Regularly serves as the internal resource for channel-specific questions from junior team members and client partners. Has independently authored three internal knowledge base articles on programmatic targeting and attribution methodology that are now used in onboarding." },
    { reference_number: 2, prior_reference_number: 2, skill_category: "Data Extraction", description_context: "DoubleVerify, CM360, SA360, and Tahoe Media Lake", current_rating: 4, previous_rating_1: 4, previous_rating_2: 3, previous_rating_3: 3, rating_support_comments: "Taylor independently manages all data extraction workflows for a portfolio of four active clients, including scheduled refreshes, ad-hoc pulls, and source validation. Has documented the team's extract workflow in a shared SOP and trained two analysts on the process. Occasional QA review is still needed for highly complex multi-source pulls." },
    { reference_number: 3, prior_reference_number: 3, skill_category: "Microsoft Excel", description_context: "Pivot tables, calculated fields, LOOKUP, and Power Query", current_rating: 5, previous_rating_1: 5, previous_rating_2: 4, previous_rating_3: 4, rating_support_comments: "Taylor is the team's Excel subject matter expert. Has independently developed two reusable Excel reporting templates used across six client accounts, incorporating Power Query automations that reduced monthly reporting preparation time by approximately 40%. Mentors junior analysts on advanced Excel techniques and conducts quarterly 'Excel Tips' sessions for the broader team." },
    { reference_number: 4, prior_reference_number: 4, skill_category: "MS Office", description_context: "Microsoft Office Suite Proficiency", current_rating: 4, previous_rating_1: 4, previous_rating_2: 4, previous_rating_3: 3, rating_support_comments: "Taylor uses all Office suite applications fluently for strategic work tasks including SharePoint site management, advanced PowerPoint deck design for C-suite presentations, and Teams meeting facilitation. Has taken ownership of the team's shared OneDrive folder structure and has improved file organization practices across the department." },
    { reference_number: 5, prior_reference_number: 5, skill_category: "Empower OS", description_context: "Full file load lifecycle including QA, upload, overlap, and PII", current_rating: 5, previous_rating_1: 5, previous_rating_2: 4, previous_rating_3: 4, rating_support_comments: "Taylor executes all Empower OS file load tasks independently and without errors across a full client portfolio. Has identified and resolved two systemic QA issues in the team's upload process that were causing recurring file rejections. Serves as the primary escalation point for junior analysts encountering Empower OS issues and has mentored three team members to independent execution." },
    { reference_number: 6, prior_reference_number: 6, skill_category: "Site Analytics Reporting", description_context: "Advanced site analytics and custom event reporting", current_rating: 4, previous_rating_1: 4, previous_rating_2: 3, previous_rating_3: 3, rating_support_comments: "Taylor independently designs and maintains site analytics reporting frameworks for two complex client accounts, incorporating custom events, goal completions, and multi-session attribution. Can identify data quality issues in Google Analytics and Adobe Analytics setups and escalate them with clear recommendations. Is developing expertise in advanced attribution modeling." },
    { reference_number: 7, prior_reference_number: 7, skill_category: "DOMO", description_context: "Advanced card creation, App Studio, and dataset management", current_rating: 4, previous_rating_1: 3, previous_rating_2: 3, previous_rating_3: 2, rating_support_comments: "Taylor creates complex DOMO visualizations independently including multi-dataset cards using beast mode calculations. Has designed two client-facing App Studio dashboards with dynamic filtering and is developing expertise in DOMO DataFlow for automated dataset transformations. Continuing to build App Studio proficiency for more complex use cases." },
    { reference_number: 8, prior_reference_number: 8, skill_category: "Reporting", description_context: "Client reporting, narrative development, and data storytelling", current_rating: 4, previous_rating_1: 4, previous_rating_2: 3, previous_rating_3: 3, rating_support_comments: "Taylor produces client-ready reporting deliverables with minimal review required, including written performance narratives that contextualize data within broader campaign objectives. Has developed a consistent reporting voice that aligns with brand communication standards. Is developing the ability to proactively recommend optimization actions based on reported data trends." },
    { reference_number: 9, prior_reference_number: 9, skill_category: "SQL / Python / R", description_context: "Intermediate SQL querying and Python scripting", current_rating: 3, previous_rating_1: 3, previous_rating_2: 2, previous_rating_3: 2, rating_support_comments: "Taylor writes intermediate SQL queries independently, including JOINs across multiple tables and GROUP BY aggregations for custom reporting pulls. Has begun applying Python scripting for data transformation tasks, including a Pandas-based automation for a recurring report reconciliation workflow. Is developing confidence with more complex query structures and Python functions." },
    { reference_number: 10, prior_reference_number: 10, skill_category: "Data Quality Assurance", description_context: "Independent QA, anomaly investigation, and source validation", current_rating: 4, previous_rating_1: 4, previous_rating_2: 3, previous_rating_3: 3, rating_support_comments: "Taylor proactively identifies data anomalies across all assigned dashboards and reporting artifacts and independently traces discrepancies to their source. Has developed a team QA checklist that is now required for all report deliverables and has significantly reduced the number of client-facing data errors. Serves as the first point of escalation for junior analyst QA questions." },
    { reference_number: 11, prior_reference_number: 11, skill_category: "Measurement", description_context: "Independent measurement plan design and benchmarking", current_rating: 4, previous_rating_1: 3, previous_rating_2: 3, previous_rating_3: 2, rating_support_comments: "Taylor independently designs measurement plans for new campaign launches, incorporating appropriate KPIs, benchmark comparisons, and data source alignment. Has authored measurement frameworks for two new client engagements that were approved with no revisions. Is developing expertise in custom attribution modeling for multi-touch campaign measurement." },
    { reference_number: 12, prior_reference_number: 12, skill_category: "Programmatic Display Media", description_context: "Advanced programmatic strategy and optimization reporting", current_rating: 3, previous_rating_1: 3, previous_rating_2: 3, previous_rating_3: 2, rating_support_comments: "Taylor manages and interprets programmatic performance data across multiple DSP platforms and can identify optimization opportunities from impression, viewability, and conversion data. Is developing the ability to provide strategic recommendations to client media plans based on programmatic performance analysis. Will aim for deeper DSP-level expertise in the next cycle." },
  ],
  scoring_summary: {
    total_current_role_points: 68,
    available_current_role_points: 84,
    current_role_percentage: 0.81,
    total_next_role_points: 20,
    available_next_role_points: 90,
    next_role_percentage: 0.222,
    promotion_eligible: false,
    promotion_gap_current_role: "Current role threshold MET (68/63 required) ✓",
    promotion_gap_next_role: "25 additional points needed (currently 20/45 required)",
  },
};

export const srcpDataset: SrcpReport[] = [alexRivera, jordanMills, taylorWong];
