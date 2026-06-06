import { GIVE_URL } from "./data";

export const PLANTERS_GIVE_URL = "https://worldharvest.givecloud.co/planters";

export const MAIN_SITE_NAV = [
  { label: "Who We Are", href: "#who-we-are" },
  { label: "Where We Work", href: "#where-we-work" },
  { label: "Projects", href: "#projects" },
  { label: "Reports", href: "#reports" },
  { label: "Videos", href: "#videos" },
  { label: "Give", href: "#give" },
] as const;

export const MAIN_HERO_STATS = [
  { value: "114", label: "IFGF churches in Pakistan network" },
  { value: "5", label: "nations highlighted in 2026" },
  { value: "3", label: "clear ways to partner today" },
] as const;

export const TAKEOVER_ACTIONS = [
  {
    title: "Give",
    body: "Fund Bibles, care, discipleship, church planting, and long-term field support.",
    href: GIVE_URL,
    cta: "Give to Global Missions",
  },
  {
    title: "Join Planters",
    body: "Support pastors and church planting work among communities that need sustained presence.",
    href: PLANTERS_GIVE_URL,
    cta: "Join the Planters Program",
  },
  {
    title: "Current Trips",
    body: "Review active mission opportunities and prepare teams for the next sending window.",
    href: "#current-trips",
    cta: "See Current Trips",
  },
] as const;

export const ACTIVE_FIELDS = [
  "Nepal",
  "Algeria",
  "Indonesia",
  "Afghanistan",
  "Somalia",
  "Bulgaria / Varna",
  "North Macedonia",
  "Kosovo / Albania",
  "India",
] as const;

export const PROJECT_AREAS = [
  {
    title: "Planters Program",
    body: "A monthly partnership path for sending, supporting, and caring for pastors and church planters.",
  },
  {
    title: "Mission Trips",
    body: "Short-term teams connected to long-term field relationships, training, and reporting.",
  },
  {
    title: "Training & College",
    body: "Equipping leaders through IFGF College, generals, ministry training, and discipleship resources.",
  },
  {
    title: "Infrastructure",
    body: "Practical support for buildings, transportation, medical access, and field needs.",
  },
] as const;

export const CURRENT_TRIPS = [
  {
    location: "Varna, Bulgaria",
    status: "Coming Soon",
    summary: "A future field opportunity for outreach, partnership, and local church strengthening.",
  },
  {
    location: "North Macedonia",
    status: "Coming Soon",
    summary: "A developing mission trip pathway connected to regional outreach and discipleship.",
  },
  {
    location: "Kosovo / Albania",
    status: "Coming Soon",
    summary: "A Balkan field pathway for future team preparation and ministry partnership.",
  },
  {
    location: "India",
    status: "Coming Soon",
    summary: "A future trip card reserved for final dates, requirements, and registration details.",
  },
] as const;
