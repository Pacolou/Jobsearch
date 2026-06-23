// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Briefcase,
  CheckCircle2,
  Clock,
  FileText,
  MapPin,
  MonitorCog,
  Network,
  Search,
  ShieldCheck,
  Star,
  TrendingUp,
} from "lucide-react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Card({ children, className = "" }) {
  return <div className={cn("rounded-2xl border bg-white shadow-sm", className)}>{children}</div>;
}

function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

function Button({ children, variant = "default", className = "", onClick, type = "button" }) {
  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:pointer-events-none disabled:opacity-50";
  const styles =
    variant === "outline"
      ? "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
      : "bg-slate-900 text-white hover:bg-slate-800";

  return (
    <button type={type} onClick={onClick} className={cn(base, styles, className)}>
      {children}
    </button>
  );
}

function Badge({ children, variant = "default", className = "" }) {
  const styles =
    variant === "outline"
      ? "border border-slate-300 bg-white text-slate-700"
      : variant === "secondary"
      ? "bg-slate-100 text-slate-700"
      : "bg-slate-900 text-white";

  return (
    <span className={cn("inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold", styles, className)}>
      {children}
    </span>
  );
}

function Input({ className = "", ...props }) {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-slate-400",
        className
      )}
      {...props}
    />
  );
}

function Progress({ value = 0, className = "" }) {
  const safeValue = Math.max(0, Math.min(100, Number(value) || 0));

  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-slate-200", className)}>
      <div className="h-full rounded-full bg-slate-900 transition-all" style={{ width: `${safeValue}%` }} />
    </div>
  );
}



const roles = [
  {
    company: "L42 Solutions",
    title: "Networking Lead",
    applied: "May 12, 2026",
    status: "Active networking lead",
    salary: "TBD",
    fit: 90,
    location: "Kelowna",
    priority: "Tier 1",
    notes:
      "In-person meeting in Kelowna with Thom + Partner. Highest-value active networking lead; keep warm and look for direct role or introduction path.",
    type: "Lead",
  },
  {
    company: "Beem Credit Union",
    title: "Director, Technology Operations",
    applied: "June 4, 2026",
    status: "Open",
    salary: "$151K-$189K CAD + bonus",
    fit: 96,
    location: "British Columbia preferred / Canada",
    priority: "Tier 1",
    notes:
      "Exceptional fit for your background. Direct alignment across end-user technology leadership, service desk operations, workspace management, ITIL-aligned incident/request/problem management, endpoint lifecycle, Intune/SCCM, Microsoft 365/Teams, operational dashboards, service improvement, vendor/budget management, and people leadership. This is one of the strongest role-to-profile matches in the current pipeline.",
  },
  {
    company: "Innovation Federal Credit Union",
    title: "VP IT Operations",
    applied: "June 13, 2026",
    status: "Open",
    salary: "$163K-$203K CAD",
    fit: 91,
    location: "Remote - Canada",
    priority: "Tier 1",
    notes:
      "Strong executive IT operations fit with direct alignment across infrastructure, IT operations, ITSM, Azure, Microsoft 365, vendor management, budgeting, governance, disaster recovery, business continuity, and regulated financial services operations. Biggest stretch is VP-level scope and broader enterprise strategy ownership, but the operational leadership match is strong.",
  },
  {
    company: "Decisive Dividend Corporation",
    title: "IT Managed Services Manager",
    applied: "June 13, 2026",
    status: "Open",
    salary: "$90K-$115K CAD",
    fit: 93,
    location: "Kelowna / Remote",
    priority: "Tier 1",
    notes:
      "Very strong fit for your background. Direct alignment across MSP/vendor governance, service delivery, ITSM, cybersecurity compliance, contract oversight, budget and renewal management, escalation ownership, Microsoft 365, cloud, networking, end-user support, business continuity, risk management, and standardization across multiple operating companies. Salary is lower than some targets, but fit score is based on role alignment only.",
  },
  {
    company: "Jobgether / Partner Company",
    title: "Senior Manager, Corporate Technology",
    applied: "May 26, 2026",
    status: "Open",
    salary: "$172K-$195K USD",
    fit: 83,
    location: "Remote - Canada",
    priority: "Tier 2",
    notes:
      "Strong alignment around enterprise IT operations, endpoint leadership, ITIL-style service delivery, operational readiness, and infrastructure governance. Biggest gaps are modern SaaS operations depth, SLO ownership, Google Workspace administration, Slack ecosystem management, SaaS rationalization, and startup-style internal platform operations. Jobgether AI preliminary assessment scored the application at 75 percent match.",
  },
  {
    company: "UniUni",
    title: "IT Manager",
    applied: "April 29, 2026",
    status: "Open",
    salary: "$110K-$140K CAD",
    fit: 91,
    location: "Remote / Hybrid",
    priority: "Tier 1",
    notes:
      "Very strong fit, but application used older resume positioning. Strong overlap across Entra ID, Intune, Microsoft 365, endpoint and device lifecycle management, IT asset management, onboarding and offboarding workflows, service desk leadership, vendor management, and enterprise governance.",
  },
  {
    company: "TransLink",
    title: "Sr Manager, Tech Ops & Cloud Services",
    applied: "March 6, 2026",
    status: "Open",
    salary: "$140K-$170K CAD",
    fit: 72,
    location: "Vancouver Hybrid",
    priority: "Tier 2",
    notes:
      "Good operational leadership alignment, but weaker direct cloud-platform leadership depth compared to infrastructure, EUC, and service-delivery-focused roles.",
  },
  {
    company: "TransLink",
    title: "Manager, IT Service Asset Management",
    applied: "March 6, 2026",
    status: "Open",
    salary: "$100K-$150K CAD",
    fit: 90,
    location: "Vancouver Hybrid",
    priority: "Tier 1",
    notes:
      "Excellent alignment across ITIL leadership, ITSM and ITAM governance, lifecycle management, service ownership, KPI and SLA management, stakeholder engagement, enterprise operations, and customer-focused service delivery. Biggest drawback is the Vancouver hybrid requirement.",
  },
  {
    company: "AspiringIT",
    title: "Infrastructure Architect / Manager",
    applied: "March 2, 2026",
    status: "Open",
    salary: "$130K-$170K CAD",
    fit: 94,
    location: "Remote",
    priority: "Tier 1",
    notes:
      "One of the strongest pure-fit roles. Direct alignment across Microsoft ecosystem leadership, EUC ownership, infrastructure operations, hybrid cloud and Azure exposure, networking fundamentals, ITIL operations, vendor management, and hands-on technical leadership.",
  },
  {
    company: "Fujitsu",
    title: "Service Delivery Manager - EUC",
    applied: "March 2, 2026",
    status: "Open",
    salary: "$125K-$145K CAD",
    fit: 92,
    location: "Remote / Canada",
    priority: "Tier 1",
    notes:
      "Extremely strong alignment across EUC managed services, workplace and device lifecycle management, service delivery leadership, ITIL governance, KPI and SLA ownership, hybrid/cloud infrastructure operations, vendor management, and large-scale endpoint support.",
  },
  {
    company: "BET99",
    title: "Sr Technical Project Manager",
    applied: "February 10, 2026",
    status: "Open",
    salary: "$115K-$140K CAD",
    fit: 84,
    location: "Remote",
    priority: "Tier 2",
    notes:
      "Strong cross-functional project delivery and operational leadership overlap. Less aligned with deepest infrastructure and EUC strengths. Biggest gap is lack of direct iGaming or software-product delivery background.",
  },
  {
    company: "Leo Berwick",
    title: "IT Manager",
    applied: "February 2, 2026",
    status: "Open",
    salary: "$120K-$150K CAD",
    fit: 86,
    location: "Remote",
    priority: "Tier 1",
    notes:
      "Excellent fit for operational leadership, outsourced vendor management, IT operations, endpoint lifecycle management, onboarding/offboarding, M&A integration support, Microsoft ecosystem administration, and scalable process creation.",
  },
  {
    company: "Onboard",
    title: "IT Manager",
    applied: "May 2, 2026",
    status: "Open",
    salary: "$130K-$145K CAD est.",
    fit: 80,
    location: "Remote",
    priority: "Tier 3",
    notes: "Potentially good consulting or client-side IT leadership opportunity.",
  },
  {
    company: "KF Aerospace",
    title: "Cyber Security Manager",
    applied: "May 25, 2026",
    status: "Open",
    salary: "$107K-$134K CAD",
    fit: 79,
    location: "Kelowna - on-site then hybrid",
    priority: "Tier 2",
    notes:
      "Strong alignment around operational leadership, governance, infrastructure operations, stakeholder management, and cybersecurity program coordination in a regulated environment. Biggest gaps are deep hands-on cybersecurity specialization, CISSP/CISM-level positioning, Zero Trust/cloud-security depth, and aerospace-defense-specific security frameworks.",
  },
  {
    company: "Pythian",
    title: "Service Delivery Manager",
    applied: "May 25, 2026",
    status: "Open",
    salary: "$100K-$115K CAD",
    fit: 88,
    location: "Remote",
    priority: "Tier 1",
    notes:
      "Strong fit for service delivery, infrastructure leadership, operational maturity, and client-facing IT management.",
  },
  {
    company: "AGFA HealthCare",
    title: "Sr. Project Manager",
    applied: "May 26, 2026",
    status: "Open",
    salary: "$100K-$130K CAD",
    fit: 85,
    location: "Remote - Canada",
    priority: "Tier 1",
    notes:
      "Very strong healthcare IT and infrastructure project delivery alignment. Interior Health background, imaging renovation coordination experience, stakeholder management, and enterprise operations leadership map well to PACS or radiology-adjacent deployments.",
  },
  {
    company: "Crossing Hurdles",
    title: "Healthcare Data Project Manager",
    applied: "May 26, 2026",
    status: "Open",
    salary: "$400K-$550K CAD",
    fit: 61,
    location: "Remote",
    priority: "Tier 2",
    notes:
      "Strong healthcare stakeholder-management overlap and enterprise operational leadership background, but significant gaps around AI data pipelines, medical data operations, and startup-style healthcare AI delivery experience.",
  },
  {
    company: "Airbnb",
    title: "Program Manager, Community Support",
    applied: "June 23, 2026",
    status: "Open",
    salary: "$128K-$160K CAD + bonus/equity",
    fit: 78,
    location: "Remote - Canada (BC eligible)",
    priority: "Tier 2",
    notes:
      "Good program management and cross-functional stakeholder fit. Strong overlap around complex project delivery, executive-ready communication, ambiguity, operational alignment, and large-scale support environments. Weaker fit than core IT operations roles because Airbnb is looking for deep customer service/contact center operations and community support program experience rather than enterprise IT service delivery leadership.",
  },
  {
    company: "nesto",
    title: "Service Delivery Manager",
    applied: "June 23, 2026",
    status: "Open",
    salary: "Not Posted",
    fit: 89,
    location: "Remote - Canada",
    priority: "Tier 1",
    notes:
      "Strong service delivery fit with direct alignment across incident management, change management, problem management, SLA reporting, client-facing enterprise support, operational framework design, runbooks, service readiness, and regulated fintech/financial services exposure. Some gap around SRE-style SaaS operations, GCP, Datadog, incident.io, and contractual SLA penalties, but this is a strong build-and-operate service delivery role.",
  },
  {
    company: "NeuraFlash (Accenture)",
    title: "Salesforce Consultant, Change Management",
    applied: "June 22, 2026",
    status: "Open",
    salary: "Not Posted",
    fit: 68,
    location: "Remote - Canada (AB/BC/ON)",
    priority: "Tier 3",
    notes:
      "Moderate fit. Strong enterprise technology leadership, stakeholder management, training, communications, change readiness, and project delivery experience. Significant gaps around Salesforce consulting, Salesforce platform expertise, Salesforce certifications, and formal organizational change management consulting experience.",
  },
  {
    company: "GitLab",
    title: "Senior Manager, End User Services",
    applied: "June 23, 2026",
    status: "Open",
    salary: "Not Posted",
    fit: 95,
    location: "Remote - North America",
    priority: "Tier 1",
    notes:
      "One of the strongest matches in the entire pipeline. Direct alignment with leading end-user services, service desk operations, ITIL-based incident/request/problem/change management, endpoint lifecycle management, onboarding/offboarding, vendor management, SaaS administration, operational metrics, service improvement, and people leadership. Interior Health Desktop Management leadership supporting 15,000+ endpoints maps exceptionally well. Gaps include Google Workspace, Slack, Okta, Jamf, and large-scale SaaS-company experience, but overall alignment is extremely strong.",
  },
  {
    company: "Telecon",
    title: "Manager, Business Applications",
    applied: "May 26, 2026",
    status: "Open",
    salary: "$100K-$122K CAD + bonus",
    fit: 87,
    location: "Remote / Canada",
    priority: "Tier 1",
    notes:
      "Strong fit for business applications leadership, stakeholder management, vendor coordination, enterprise service delivery, and operational governance. Good bridge role between IT leadership and business systems ownership.",
  },
];

const unsuccessfulRoles = [
  {
    company: "Affirm",
    title: "IT Engineering Manager (Endpoint Engineering)",
    applied: "May 1, 2026",
    closed: "June 12, 2026",
    status: "Role filled / position no longer available",
    fit: 90,
    outcomeStrength: "Strong Role Fit",
    type: "Closed",
    takeaway:
      "Affirm confirmed the role was filled and is no longer available. This remains a strong endpoint engineering and EUC leadership archetype for future applications, with solid alignment around endpoint management, operational governance, service delivery, and enterprise support leadership.",
  },

  {
    company: "FortisBC",
    title: "Supervisor, Corporate Cybersecurity",
    applied: "April 27, 2026",
    closed: "June 3, 2026",
    status: "Not selected after video interview",
    fit: 84,
    outcomeStrength: "Strong Rejection",
    type: "Closed",
    takeaway:
      "Reached the video interview stage in a highly competitive process. Strong validation that cybersecurity-adjacent leadership roles are realistic targets. Continue building cybersecurity program leadership examples and certifications.",
  },
  {
    company: "TELUS Agriculture & Consumer Goods",
    title: "Manager, Information Systems - Network, Identity and Infrastructure",
    applied: "January 23, 2026",
    closed: "June 3, 2026",
    status: "Not selected after application review",
    fit: 88,
    outcomeStrength: "Moderate Rejection",
    type: "Closed",
    takeaway:
      "Application was thoroughly reviewed but did not advance. Strong alignment across infrastructure, networking, identity, vendor management, and technical leadership, but competition was exceptionally strong.",
  },
  {
    company: "1Password",
    title: "Manager IT Enterprise Tools",
    applied: "January 23, 2026",
    status: "Not selected",
    fit: 82,
    type: "Closed",
    takeaway:
      "Still a strong archetype for future enterprise tools and EUC leadership applications.",
  },
  {
    company: "Accuro",
    title: "Manager, Platform Services & Integrations",
    applied: "May 8, 2026",
    status: "Not selected after panel interview",
    fit: 78,
    type: "Closed",
    takeaway:
      "Good healthcare/platform-adjacent target. Tighten platform strategy and integration leadership examples.",
  },
  {
    company: "Best Buy",
    title: "Technology Manager",
    applied: "February 2, 2026",
    status: "Not proceeding",
    fit: 73,
    type: "Closed",
    takeaway: "Less aligned with enterprise/public-sector leadership trajectory.",
  },
  {
    company: "City of Kelowna",
    title: "CK53961",
    applied: "January 23, 2026",
    status: "Filled",
    fit: 86,
    type: "Closed",
    takeaway:
      "Very strong local/public-sector alignment. Continue watching municipal postings.",
  },
  {
    company: "Decisive Dividend",
    title: "IT Business Relationship Manager",
    applied: "March 18, 2026",
    status: "Role on hold internally",
    fit: 74,
    type: "Closed",
    takeaway: "May be worth revisiting if the role reopens.",
  },
  {
    company: "FortisBC",
    title: "Manager IS Networking and Systems",
    applied: "February 10, 2026",
    status: "Filled internally",
    fit: 82,
    type: "Closed",
    takeaway:
      "Internal candidate advantage likely. FortisBC remains a good employer target.",
  },
  {
    company: "Kognitiv",
    title: "IT Operations Manager",
    applied: "April 27, 2026",
    status: "Moved forward with other candidates",
    fit: 80,
    type: "Closed",
    takeaway: "Competitive candidate pool despite strong operational fit.",
  },
  {
    company: "MASV",
    title: "IT Manager",
    applied: "March 5, 2026",
    status: "Not selected",
    fit: 79,
    type: "Closed",
    takeaway: "Remote-first IT manager roles remain worth targeting.",
  },
  {
    company: "Samsara",
    title: "Principal Business Systems Analyst",
    applied: "January 26, 2026",
    status: "Filled",
    fit: 70,
    type: "Closed",
    takeaway: "Slightly outside core infrastructure leadership strengths.",
  },
  {
    company: "Skytrac",
    title: "Manager Systems Integration",
    applied: "January 26, 2026",
    status: "Not selected",
    fit: 76,
    type: "Closed",
    takeaway:
      "Good local tech fit, but likely wanted deeper systems integration specialization.",
  },
  {
    company: "WorkSafeBC",
    title: "Manager Messaging Collaboration and DT",
    applied: "January 23, 2026",
    status: "Not selected",
    fit: 81,
    type: "Closed",
    takeaway:
      "Good alignment with M365, collaboration, governance, and service ownership roles.",
  },
];

const positioning = [
  { label: "Endpoint / EUC Leadership", score: 95, icon: MonitorCog },
  { label: "Enterprise IT Operations", score: 92, icon: Briefcase },
  { label: "Service Delivery & ITIL Operations", score: 91, icon: TrendingUp },
  { label: "Infrastructure & Network", score: 88, icon: Network },
  { label: "Public Sector / Healthcare", score: 90, icon: MapPin },
  { label: "Cybersecurity & Governance", score: 84, icon: ShieldCheck },
  { label: "Modern SaaS / Workspace Administration", score: 63, icon: MonitorCog },
];

const actionItems = [
  {
    title:
      "Capture FortisBC interview lessons learned for future cybersecurity leadership applications",
    type: "Career Development",
    urgency: "Medium",
    done: false,
  },
  {
    title: "Keep L42 Solutions relationship warm after May 12 meeting",
    type: "Networking",
    urgency: "High",
    done: false,
  },
  {
    title: "Prepare Director-level Beem examples for service desk, EUC, ITIL, endpoint, and operational leadership",
    type: "Interview",
    urgency: "High",
    done: false,
  },
  {
    title: "Prepare MSP/vendor governance and service review examples for Decisive Dividend",
    type: "Interview",
    urgency: "High",
    done: false,
  },
  {
    title: "Prepare VP-level IT operations examples for Innovation Federal Credit Union",
    type: "Interview",
    urgency: "High",
    done: false,
  },



  {
    title: "Prepare nesto service delivery examples around incident, change, SLA reporting, and enterprise client communication",
    type: "Interview",
    urgency: "High",
    done: false,
  },
  {
    title: "Prepare Airbnb program management examples focused on executive communication, ambiguity, and cross-functional delivery",
    type: "Interview",
    urgency: "Medium",
    done: false,
  },
  {
    title: "Prepare GitLab End User Services examples around EUC leadership, ITIL, SLA metrics, automation, and global support",
    type: "Interview",
    urgency: "High",
    done: false,
  },
  {
    title: "Build 5 cybersecurity leadership STAR stories",
    type: "Interview",
    urgency: "High",
    done: false,
  },
  {
    title:
      "Prepare healthcare operations and stakeholder-management STAR stories for Crossing Hurdles",
    type: "Interview",
    urgency: "High",
    done: false,
  },
  {
    title:
      "Prepare corporate technology / SaaS operations examples for Senior Manager, Corporate Technology",
    type: "Interview",
    urgency: "High",
    done: false,
  },
  {
    title:
      "Strengthen positioning around SaaS operations, SLOs, Google Workspace, and Slack administration",
    type: "Positioning",
    urgency: "High",
    done: false,
  },
  {
    title:
      "Prepare healthcare imaging / PACS-adjacent project delivery examples for AGFA HealthCare",
    type: "Interview",
    urgency: "High",
    done: false,
  },
  {
    title: "Fortinet FCF + FCA certifications added to resume and LinkedIn",
    type: "Resume",
    urgency: "Completed",
    done: true,
  },
  {
    title:
      "Create targeted resume versions: EUC, Infrastructure, Cybersecurity, Service Delivery",
    type: "Resume",
    urgency: "Medium",
    done: false,
  },
  {
    title: "Reuse Affirm endpoint engineering positioning for future EUC/platform leadership roles",
    type: "Pipeline",
    urgency: "Medium",
    done: false,
  },
  {
    title: "Keep NeuraFlash as low-priority unless Salesforce/change consulting interest increases",
    type: "Pipeline",
    urgency: "Low",
    done: false,
  },
  {
    title: "Track closed roles for lessons learned, not active energy",
    type: "Pipeline",
    urgency: "Medium",
    done: true,
  },
];

const resumeAssets = [
  {
    label: "Current resume positioning",
    value: "Enterprise IT Operations & Service Delivery Leader",
  },
  {
    label: "Strongest proof point",
    value:
      "Led EUC for 15K+ endpoints across clinical and administrative environments",
  },
  {
    label: "Core leadership angle",
    value:
      "Team leadership, lifecycle management, ITIL, stakeholder engagement, and operational readiness",
  },
  {
    label: "Cybersecurity positioning",
    value: "Fortinet FCF + FCA certifications added to resume and LinkedIn profile",
  },
  {
    label: "Cover letter note",
    value:
      "Use targeted cover letters per role; Pythian version is strongest current model.",
  },
];

const temperatureOptions = [
  {
    key: "hot",
    display: "Hot",
    description:
      "Active interview process, direct movement, or strong networking momentum.",
  },
  {
    key: "warm",
    display: "Warm",
    description: "Recently applied or still reasonably fresh, generally within 30 days.",
  },
  {
    key: "cold",
    display: "Cold",
    description: "Aging application with no movement, generally 31-90 days old.",
  },
  {
    key: "dormant",
    display: "Dormant",
    description: "Very stale application with no movement, generally 90+ days old.",
  },
];

const statusStyles = {
  Open: "bg-blue-100 text-blue-800 border-blue-200",
  "Active networking lead": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Not selected after video interview":
    "bg-slate-100 text-slate-700 border-slate-200",
  "Not selected after application review":
    "bg-slate-100 text-slate-700 border-slate-200",
  "Not selected after panel interview":
    "bg-slate-100 text-slate-700 border-slate-200",
  "Moved forward with other candidates":
    "bg-slate-100 text-slate-700 border-slate-200",
  "Role on hold internally": "bg-purple-100 text-purple-800 border-purple-200",
  Filled: "bg-slate-100 text-slate-700 border-slate-200",
  "Filled internally": "bg-slate-100 text-slate-700 border-slate-200",
  "Not selected": "bg-slate-100 text-slate-700 border-slate-200",
  "Not proceeding": "bg-slate-100 text-slate-700 border-slate-200",
};

function getDaysOld(dateStr = "") {
  const normalized = dateStr.replace("approx.", "").replace("est.", "").trim();
  const appliedDate = new Date(normalized);

  if (Number.isNaN(appliedDate.getTime())) {
    return 0;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  appliedDate.setHours(0, 0, 0, 0);

  return Math.floor(
    (today.getTime() - appliedDate.getTime()) / (1000 * 60 * 60 * 24)
  );
}

function getPipelineTemperature(role) {
  if (role.type === "Closed") {
    return {
      key: "dormant",
      label: "Closed",
      style: "bg-slate-200 text-slate-700 border-slate-300",
    };
  }

  if (role.type === "Lead") {
    return {
      key: "hot",
      label: "Hot",
      style: "bg-red-100 text-red-800 border-red-200",
    };
  }

  const daysOld = getDaysOld(role.applied);

  if (daysOld <= 30) {
    return {
      key: "warm",
      label: "Warm",
      style: "bg-orange-100 text-orange-800 border-orange-200",
    };
  }

  if (daysOld <= 90) {
    return {
      key: "cold",
      label: "Cold",
      style: "bg-sky-100 text-sky-800 border-sky-200",
    };
  }

  return {
    key: "dormant",
    label: "Dormant",
    style: "bg-slate-200 text-slate-700 border-slate-300",
  };
}

function getPipelineViability(role) {
  if (role.type === "Closed") {
    return {
      score: 0,
      label: "Closed",
      style: "bg-slate-200 text-slate-700 border-slate-300",
    };
  }

  if (role.type === "Lead") {
    return {
      score: 92,
      label: "High",
      style: "bg-emerald-100 text-emerald-800 border-emerald-200",
    };
  }

  const daysOld = getDaysOld(role.applied);
  let penalty = 0;

  if (daysOld > 120) {
    penalty = 25;
  } else if (daysOld > 90) {
    penalty = 15;
  } else if (daysOld > 60) {
    penalty = 10;
  } else if (daysOld > 30) {
    penalty = 5;
  }

  const score = Math.max(20, role.fit - penalty);

  if (score >= 85) {
    return {
      score,
      label: "High",
      style: "bg-emerald-100 text-emerald-800 border-emerald-200",
    };
  }

  if (score >= 70) {
    return {
      score,
      label: "Moderate",
      style: "bg-amber-100 text-amber-800 border-amber-200",
    };
  }

  return {
    score,
    label: "Low",
    style: "bg-slate-200 text-slate-700 border-slate-300",
  };
}

export default function JobSearchDashboard() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState(["Tier 1", "Tier 2", "Tier 3"]);
  const [activeTabs, setActiveTabs] = useState(["active"]);
  const [sortBy, setSortBy] = useState("viability");
  const [temperatureFilters, setTemperatureFilters] = useState([
    "hot",
    "warm",
    "cold",
    "dormant",
  ]);

  const activeRoles = roles.filter((role) => role.type !== "Lead");
  const networkingLeads = roles.filter((role) => role.type === "Lead");

  const filteredRoles = useMemo(() => {
    const source = [
      ...(activeTabs.includes("active") ? activeRoles : []),
      ...(activeTabs.includes("networking") ? networkingLeads : []),
      ...(activeTabs.includes("unsuccessful") ? unsuccessfulRoles : []),
    ];

    const filtered = source.filter((role) => {
      const searchable = [
        role.company,
        role.title,
        role.status,
        role.priority || "",
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = searchable.includes(query.toLowerCase());
      const isClosed = role.type === "Closed";
      const matchesTier =
        isClosed || role.type === "Lead" || filters.includes(role.priority || "");
      const temperature = getPipelineTemperature(role);
      const matchesTemperature =
        isClosed || temperatureFilters.includes(temperature.key);

      return matchesQuery && matchesTier && matchesTemperature;
    });

    const getSalaryMax = (salary = "") => {
      const numbers = salary.match(/[0-9]+/g);

      if (!numbers) {
        return 0;
      }

      return Math.max(...numbers.map(Number));
    };

    const getTierValue = (priority = "") => {
      if (priority === "Tier 1") return 1;
      if (priority === "Tier 2") return 2;
      if (priority === "Tier 3") return 3;
      return 99;
    };

    const getDateValue = (dateStr = "") => {
      const parsed = Date.parse(
        dateStr.replace("approx.", "").replace("est.", "")
      );

      return Number.isNaN(parsed) ? 0 : parsed;
    };

    return [...filtered].sort((a, b) => {
      if (sortBy === "fit") return b.fit - a.fit;
      if (sortBy === "viability") {
        return getPipelineViability(b).score - getPipelineViability(a).score;
      }
      if (sortBy === "applied") {
        return getDateValue(b.applied) - getDateValue(a.applied);
      }
      if (sortBy === "tier") {
        return getTierValue(a.priority) - getTierValue(b.priority);
      }
      if (sortBy === "salary") {
        return getSalaryMax(b.salary) - getSalaryMax(a.salary);
      }

      return 0;
    });
  }, [query, filters, activeTabs, sortBy, temperatureFilters, activeRoles, networkingLeads]);

  const averageFit = Math.round(
    activeRoles.reduce((sum, role) => sum + role.fit, 0) / activeRoles.length
  );

  const visiblePipelineItems = filteredRoles.length;
  const activeInterviewProcesses = activeRoles.filter((role) =>
    role.status.toLowerCase().includes("interview")
  ).length;
  const tierOneTargets = roles.filter((role) => role.priority === "Tier 1").length;
  const totalOpportunities = roles.length + unsuccessfulRoles.length;

  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-700 p-8 text-white shadow-xl"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-slate-300">
                Matthew Loureiro
              </p>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                IT Leadership Job Search Dashboard
              </h1>
              <p className="mt-3 max-w-3xl text-slate-200">
                Active pipeline, networking leads, closed opportunities, fit scores,
                viability, salary ranges, and resume readiness.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge className="rounded-full bg-white/15 px-4 py-2 text-white hover:bg-white/15">
                Kelowna / Remote Focus
              </Badge>
              <Badge className="rounded-full bg-white/15 px-4 py-2 text-white hover:bg-white/15">
                Target: $110K-$140K+
              </Badge>
              <Badge className="rounded-full bg-emerald-500/30 px-4 py-2 text-white hover:bg-emerald-500/30">
                Fortinet Certs Added
              </Badge>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-5">
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8" />
                <div>
                  <p className="text-sm text-slate-500">Average Active Fit</p>
                  <p className="text-3xl font-bold">{averageFit}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <Briefcase className="h-8 w-8" />
                <div>
                  <p className="text-sm text-slate-500">Visible Pipeline Items</p>
                  <p className="text-3xl font-bold">{visiblePipelineItems}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8" />
                <div>
                  <p className="text-sm text-slate-500">Total Apps / Leads</p>
                  <p className="text-3xl font-bold">{totalOpportunities}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <Star className="h-8 w-8" />
                <div>
                  <p className="text-sm text-slate-500">Tier 1 Targets</p>
                  <p className="text-3xl font-bold">{tierOneTargets}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8" />
                <div>
                  <p className="text-sm text-slate-500">Interview Processes</p>
                  <p className="text-3xl font-bold">{activeInterviewProcesses}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="rounded-3xl shadow-sm lg:col-span-2">
            <CardContent className="p-6">
              <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Pipeline</h2>
                  <p className="text-sm text-slate-500">
                    Active applications, networking leads, and closed roles.
                  </p>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    className="w-64 rounded-xl pl-9"
                    placeholder="Search company, role, status"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>
              </div>

              <div className="mb-5 flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: "active", label: "Active / Under Review" },
                    { key: "networking", label: "Networking Leads" },
                    { key: "unsuccessful", label: "Closed / Unsuccessful" },
                  ].map((tab) => {
                    const enabled = activeTabs.includes(tab.key);

                    return (
                      <Button
                        key={tab.key}
                        variant={enabled ? "default" : "outline"}
                        className="rounded-full"
                        onClick={() => {
                          if (enabled) {
                            const updated = activeTabs.filter(
                              (item) => item !== tab.key
                            );
                            setActiveTabs(updated.length ? updated : [tab.key]);
                          } else {
                            setActiveTabs([...activeTabs, tab.key]);
                          }
                        }}
                      >
                        {tab.label}
                      </Button>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-2">
                  {["Tier 1", "Tier 2", "Tier 3"].map((item) => {
                    const enabled = filters.includes(item);

                    return (
                      <Button
                        key={item}
                        variant={enabled ? "default" : "outline"}
                        className="rounded-full"
                        onClick={() => {
                          let updated = [...filters];

                          if (enabled) {
                            updated = updated.filter(
                              (filterItem) => filterItem !== item
                            );
                          } else {
                            updated.push(item);
                          }

                          setFilters(updated.length ? updated : [item]);
                        }}
                      >
                        {item}
                      </Button>
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-slate-500">
                    Sort by:
                  </span>
                  <Button
                    variant={sortBy === "viability" ? "default" : "outline"}
                    className="rounded-full"
                    onClick={() => setSortBy("viability")}
                  >
                    Pipeline Viability
                  </Button>
                  <Button
                    variant={sortBy === "fit" ? "default" : "outline"}
                    className="rounded-full"
                    onClick={() => setSortBy("fit")}
                  >
                    Fit Score
                  </Button>
                  <Button
                    variant={sortBy === "applied" ? "default" : "outline"}
                    className="rounded-full"
                    onClick={() => setSortBy("applied")}
                  >
                    Date Applied
                  </Button>
                  <Button
                    variant={sortBy === "tier" ? "default" : "outline"}
                    className="rounded-full"
                    onClick={() => setSortBy("tier")}
                  >
                    Tier
                  </Button>
                  <Button
                    variant={sortBy === "salary" ? "default" : "outline"}
                    className="rounded-full"
                    onClick={() => setSortBy("salary")}
                  >
                    Salary
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-slate-500">
                    Pipeline temperature:
                  </span>
                  {temperatureOptions.map((option) => {
                    const enabled = temperatureFilters.includes(option.key);

                    return (
                      <div key={option.key} className="group relative inline-block">
                        <Button
                          variant={enabled ? "default" : "outline"}
                          className="rounded-full"
                          onClick={() => {
                            let updated = [...temperatureFilters];

                            if (enabled) {
                              updated = updated.filter(
                                (item) => item !== option.key
                              );
                            } else {
                              updated.push(option.key);
                            }

                            setTemperatureFilters(
                              updated.length ? updated : [option.key]
                            );
                          }}
                        >
                          {option.display}
                        </Button>

                        <div className="pointer-events-none absolute left-0 top-11 z-30 hidden w-72 rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-2xl group-hover:block">
                          <p className="text-sm font-semibold text-slate-900">
                            {option.display}
                          </p>
                          <p className="mt-1 text-sm leading-5 text-slate-600">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                {filteredRoles.map((role, index) => {
                  const temperature = getPipelineTemperature(role);
                  const viability = getPipelineViability(role);

                  return (
                    <motion.div
                      key={`${role.company}-${role.title}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="rounded-2xl border bg-white p-5 shadow-sm"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-semibold">
                              {role.company}
                            </h3>

                            <Badge
                              variant="outline"
                              className={`rounded-full ${
                                statusStyles[role.status] ||
                                "bg-slate-100 text-slate-700 border-slate-200"
                              }`}
                            >
                              {role.status}
                            </Badge>

                            <Badge
                              variant="outline"
                              className={`rounded-full ${temperature.style}`}
                            >
                              {temperature.label}
                            </Badge>

                            {role.priority && (
                              <Badge variant="secondary" className="rounded-full">
                                {role.priority}
                              </Badge>
                            )}

                            {role.outcomeStrength && (
                              <Badge
                                variant="outline"
                                className="rounded-full bg-violet-100 text-violet-800 border-violet-200"
                              >
                                {role.outcomeStrength}
                              </Badge>
                            )}
                          </div>

                          <p className="font-medium text-slate-700">
                            {role.title}
                          </p>

                          <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                            <span>
                              <strong>Applied:</strong> {role.applied || "-"}
                            </span>
                            {role.closed && (
                              <span>
                                <strong>Closed:</strong> {role.closed}
                              </span>
                            )}
                            {role.salary && (
                              <span>
                                <strong>Salary:</strong> {role.salary}
                              </span>
                            )}
                            {role.location && (
                              <span>
                                <strong>Location:</strong> {role.location}
                              </span>
                            )}
                          </div>

                          <p className="max-w-3xl text-sm leading-6 text-slate-600">
                            {role.notes || role.takeaway}
                          </p>
                        </div>

                        <div className="min-w-36 text-right">
                          <p className="text-sm text-slate-500">Fit / Viability</p>

                          <div className="group relative inline-block cursor-help">
                            <p className="text-3xl font-bold underline decoration-dotted underline-offset-4">
                              {role.fit}%
                            </p>

                            <div className="pointer-events-none absolute right-0 top-12 z-20 hidden w-80 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-2xl group-hover:block">
                              <p className="mb-2 text-sm font-semibold text-slate-900">
                                Why this fit score?
                              </p>
                              <p className="text-sm leading-6 text-slate-600">
                                {role.notes || role.takeaway}
                              </p>
                            </div>
                          </div>

                          <Progress value={role.fit} className="mt-2 h-2" />

                          <div className="mt-3">
                            <div className="mb-1 flex items-center justify-between">
                              <p className="text-xs font-medium text-slate-500">
                                Pipeline Viability
                              </p>
                              <span className="text-xs font-bold text-slate-700">
                                {viability.score}%
                              </span>
                            </div>

                            <Progress value={viability.score} className="h-2" />

                            <Badge
                              variant="outline"
                              className={`mt-2 rounded-full ${viability.style}`}
                            >
                              {viability.label}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="rounded-3xl shadow-sm">
              <CardContent className="p-6">
                <h2 className="flex items-center gap-2 text-2xl font-bold">
                  <FileText className="h-6 w-6" />
                  Resume / CL Snapshot
                </h2>
                <p className="mb-5 text-sm text-slate-500">
                  Based on the current resume and cover letter positioning.
                </p>

                <div className="space-y-3">
                  {resumeAssets.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border bg-white p-4"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm text-slate-700">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold">Priority Stack</h2>
                <p className="mb-5 text-sm text-slate-500">
                  Where to spend energy first.
                </p>

                <div className="space-y-4">
                  <div className="rounded-2xl border bg-white p-4">
                    <p className="font-bold">Tier 1</p>
                    <p className="text-sm text-slate-600">
                      L42 Solutions - Beem Credit Union - Innovation FCU - Decisive Dividend - AspiringIT -
                      Fujitsu - UniUni - Leo Berwick - TransLink ITSM/ITAM -
                      Pythian - AGFA HealthCare - GitLab - nesto - Telecon
                    </p>
                  </div>

                  <div className="rounded-2xl border bg-white p-4">
                    <p className="font-bold">Tier 2</p>
                    <p className="text-sm text-slate-600">
                      Senior Manager, Corporate Technology - TransLink Cloud Ops -
                      BET99 - KF Aerospace - Airbnb - Crossing Hurdles
                    </p>
                  </div>

                  <div className="rounded-2xl border bg-white p-4">
                    <p className="font-bold">Tier 3</p>
                    <p className="text-sm text-slate-600">Onboard - NeuraFlash (Accenture)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold">Pipeline Snapshot</h2>
                <p className="mb-5 text-sm text-slate-500">
                  Current dashboard totals.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border bg-white p-4">
                    <p className="text-sm text-slate-500">Active Apps</p>
                    <p className="text-2xl font-bold">{activeRoles.length}</p>
                  </div>

                  <div className="rounded-2xl border bg-white p-4">
                    <p className="text-sm text-slate-500">Networking Leads</p>
                    <p className="text-2xl font-bold">
                      {networkingLeads.length}
                    </p>
                  </div>

                  <div className="rounded-2xl border bg-white p-4">
                    <p className="text-sm text-slate-500">Closed / Inactive</p>
                    <p className="text-2xl font-bold">
                      {unsuccessfulRoles.length}
                    </p>
                  </div>

                  <div className="rounded-2xl border bg-white p-4">
                    <p className="text-sm text-slate-500">Total Apps + Leads</p>
                    <p className="text-2xl font-bold">{totalOpportunities}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold">Positioning Strengths</h2>
                <p className="mb-5 text-sm text-slate-500">
                  Where your profile is strongest today.
                </p>

                <div className="space-y-5">
                  {positioning.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div key={item.label}>
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className="h-5 w-5" />
                            <span className="text-sm font-medium">
                              {item.label}
                            </span>
                          </div>
                          <span className="text-sm font-bold">
                            {item.score}%
                          </span>
                        </div>

                        <Progress value={item.score} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold">Next Actions</h2>
                <p className="mb-5 text-sm text-slate-500">
                  Most useful moves right now.
                </p>

                <div className="space-y-3">
                  {actionItems.map((item) => (
                    <div
                      key={item.title}
                      className="flex gap-3 rounded-2xl border bg-white p-4"
                    >
                      {item.done ? (
                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                      ) : item.urgency === "High" ? (
                        <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-600" />
                      ) : (
                        <Clock className="mt-0.5 h-5 w-5 text-slate-500" />
                      )}

                      <div>
                        <p className="text-sm font-semibold">{item.title}</p>
                        <p className="text-xs text-slate-500">
                          {item.type} - {item.urgency} urgency
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
