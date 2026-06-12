export const DISPLAY = "'superior-title', Georgia, serif";
export const SANS = "'mundial', 'neue-haas-grotesk-text', system-ui, sans-serif";
export const SERIF = SANS;

export const MAIN_SITE_URL = "https://www.ifgfglobalmissions.org";
export const GIVE_URL = "https://worldharvest.givecloud.co/IFGF%20Global%20Mission";
export const SHARE_URL = "https://gm-impact.vercel.app";
export const SHARE_LABEL = "gm-impact.vercel.app";
export const YOUTUBE_URL = "https://www.youtube.com/channel/UC7sxtfPpYSN_Fj1sCBImDvg";
export const INSTAGRAM_URL = "https://www.instagram.com/ifgfglobalmissions/";

export const THEME = {
  bg: "#F8F6F0",
  bgCard: "#FDFDFD",
  nav: "#F8F6F0",
  navText: "#404040",
  text: "#404040",
  textSub: "#404040",
  textMuted: "#647970",
  accent: "#E59A66",
  accentLight: "#F3E7DC",
  gold: "#D17E34",
  divider: "#DED8CE",
  heroBg: "#F8F6F0",
  heroAccent: "#E59A66",
  stat: "#D17E34",
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: readonly NavItem[];
};

export const NAV_ITEMS = [
  { label: "Home", href: `${MAIN_SITE_URL}/` },
  {
    label: "Who We Are",
    href: `${MAIN_SITE_URL}/who-we-are`,
    children: [
      { label: "History", href: `${MAIN_SITE_URL}/about-us` },
      { label: "News", href: `${MAIN_SITE_URL}/news` },
    ],
  },
  {
    label: "Planters",
    href: `${MAIN_SITE_URL}/planters`,
    children: [
      { label: "Generals", href: `${MAIN_SITE_URL}/generals` },
      { label: "IFGF College", href: `${MAIN_SITE_URL}/ifgf-college` },
      { label: "Missions", href: `${MAIN_SITE_URL}/missions` },
      { label: "Pray For Us", href: `${MAIN_SITE_URL}/pray` },
      { label: "Infrastructures", href: `${MAIN_SITE_URL}/buildings` },
    ],
  },
  {
    label: "Mission Trips",
    href: `${MAIN_SITE_URL}/mission-trips`,
    children: [
      { label: "Previous Trips", href: `${MAIN_SITE_URL}/copy-of-missions` },
      { label: "Current Trips", href: `${MAIN_SITE_URL}/current-trips` },
    ],
  },
  { label: "Videos", href: `${MAIN_SITE_URL}/videos` },
  { label: "Donations", href: `${MAIN_SITE_URL}/donations` },
  { label: "Registration", href: `${MAIN_SITE_URL}/registration` },
  { label: "Contact", href: `${MAIN_SITE_URL}/contact` },
] satisfies readonly NavItem[];

export type StatArtKind = ImpactArtKey;

export const STATS: readonly { num: string; label: string; art: StatArtKind }[] = [
  { num: "5", label: "Nations Reached", art: "nations" },
  { num: "193+", label: "New Believers", art: "believers" },
  { num: "44", label: "Baptisms", art: "baptisms" },
  { num: "1,000", label: "Bibles Given", art: "bibles" },
  { num: "675", label: "Medically Served", art: "medical" },
  { num: "163+", label: "Leaders Trained", art: "leaders" },
];

export const STAT_TARGETS = STATS.map(({ num }) => {
  const match = num.match(/^([\d,]+)(.*)$/);
  return {
    target: Number((match?.[1] ?? "0").replace(/,/g, "")),
    suffix: match?.[2] ?? "",
  };
});

export const formatStatNumber = (value: number, suffix: string) =>
  `${Math.round(value).toLocaleString("en-US")}${suffix}`;

export type CountryName = CountryArtName;
export type FlagName = CountryName | "Pakistan";

export type Region = {
  name: CountryName;
  sub: string;
  mediaHref: string;
  stats: readonly { n: string; l: string }[];
  bullets: readonly string[];
};

export const REGIONS: readonly Region[] = [
  {
    name: "Nepal",
    sub: "Leadership & Medical Outreach",
    mediaHref: "#socials",
    stats: [
      { n: "46", l: "Pastors Equipped" },
      { n: "675", l: "Medically Served" },
      { n: "42", l: "Salvations" },
    ],
    bullets: [
      "46 pastors equipped",
      "675 people medically served",
      "42 salvations",
      "1,000 Bibles distributed",
      "16 baptisms conducted",
      "200 backpacks for children",
      "4 motorcycles for remote pastors",
    ],
  },
  {
    name: "Algeria",
    sub: "Underground Church Strengthening",
    mediaHref: "#socials",
    stats: [
      { n: "107", l: "Leaders Trained" },
      { n: "5", l: "House Churches" },
    ],
    bullets: [
      "107 leaders trained",
      "5 house churches strengthened",
      "Three regions served: Kabylia, Bejaia, and Oran",
      "Ministry continues under sensitive conditions",
    ],
  },
  {
    name: "Indonesia",
    sub: "Aceh & Malay Unreached Peoples",
    mediaHref: "#socials",
    stats: [
      { n: "24", l: "Professions of Faith" },
      { n: "11", l: "Baptisms" },
    ],
    bullets: [
      "24 professions of faith",
      "11 baptisms",
      "Active in multiple unreached villages",
      "Households of Peace established",
      "Medical outreach, solar panels, and children's programs supported",
    ],
  },
  {
    name: "Afghanistan",
    sub: "Household-Based Discipleship",
    mediaHref: "#socials",
    stats: [
      { n: "127", l: "Believers Discipled" },
      { n: "27", l: "Households" },
      { n: "6", l: "Baptisms" },
    ],
    bullets: [
      "127 believers discipled",
      "27 households reached through discipleship",
      "6 baptisms conducted in Kabul",
    ],
  },
  {
    name: "Somalia",
    sub: "House Church Network Growth",
    mediaHref: "#socials",
    stats: [
      { n: "116", l: "House Churches" },
      { n: "11", l: "Baptisms" },
      { n: "10", l: "Pastors Training" },
    ],
    bullets: [
      "116 house churches supported",
      "11 baptisms",
      "10 pastors in training",
      "Decentralized discipleship network",
      "Growing leadership pipeline",
    ],
  },
];

export type NewsletterSummary = {
  year: string;
  date?: string;
  label: string;
  href: string;
  title: string;
  snippet: string;
  chips: readonly string[];
  countries: readonly FlagName[];
  image?: {
    src: string;
    alt: string;
  };
};

export type ArchiveNewsletterStory = {
  eyebrow: string;
  title: string;
  body: readonly string[];
  stats: readonly { value: string; label: string }[];
  source?: {
    label: string;
    href: string;
  };
};

export type ArchiveNewsletter = {
  year: "2024" | "2025";
  overline: string;
  title: string;
  accent: string;
  intro: string;
  stats: readonly { value: string; label: string; art: StatArtKind }[];
  stories: readonly ArchiveNewsletterStory[];
};

export const NEWSLETTER_COUNTRIES: readonly FlagName[] = [
  "Nepal",
  "Algeria",
  "Indonesia",
  "Afghanistan",
  "Somalia",
];

export const NEWSLETTERS: readonly NewsletterSummary[] = [
  {
    year: "2026",
    label: "2026 Newsletter",
    href: "/newsletters/2026",
    title: "Five nations reached in the first half of 2026.",
    snippet:
      "New believers baptized, Bibles placed in hands, pastors equipped, and medical care extended across Nepal, Algeria, Indonesia, Afghanistan, and Somalia.",
    chips: ["5 Nations", "193+ New Believers", "1,000 Bibles Given"],
    countries: NEWSLETTER_COUNTRIES,
    image: {
      src: "/images/newsletter-2026.avif",
      alt: "People gathered during a Global Missions outreach",
    },
  },
  {
    year: "2025",
    label: "2025 Newsletter",
    href: "/newsletters/2025",
    title: "A placeholder year for upcoming mission stories.",
    snippet:
      "Mock content for layout review: this card reserves space for 2025 stories, impact numbers, locations, photos, and giving updates.",
    chips: ["Mock Content", "Photos TBD", "Metrics TBD"],
    countries: ["Nepal", "Indonesia", "Somalia"],
  },
  {
    year: "2024",
    label: "2024 Newsletter",
    href: "/newsletters/2024",
    title: "Youth revival, church strengthening, and mission momentum.",
    snippet:
      "A 2024 archive draft shaped from IFGF Global reports in Southwest Papua and Pakistan, highlighting youth outreach, church visits, leadership gatherings, and discipleship growth.",
    chips: ["2 Reports", "Indonesia + Pakistan", "Archive Draft"],
    countries: ["Indonesia", "Pakistan"],
  },
] as const;

export const ARCHIVE_NEWSLETTERS: Record<"2024" | "2025", ArchiveNewsletter> = {
  "2024": {
    year: "2024",
    overline: "2024 Archive Draft",
    title: "Mission momentum across",
    accent: "Indonesia and Pakistan",
    intro:
      "This mock newsletter turns two IFGF Global mission reports into a compact archive page, using the same centered rhythm, impact cards, and partner section as the 2026 update.",
    stats: [
      { value: "21", label: "Manado Team Members", art: "leaders" },
      { value: "125", label: "Children Served in Kokoda", art: "believers" },
      { value: "18", label: "Pakistan Churches Visited", art: "nations" },
      { value: "2,000", label: "People Impacted in Pakistan", art: "medical" },
    ],
    stories: [
      {
        eyebrow: "Southwest Papua · June 27-July 2",
        title: "Youth revival and children reached from Sorong to Raja Ampat.",
        body: [
          "A 21-person IFGF Manado TYC team traveled through Southwest Papua, serving youth gatherings in Sorong, Doom, and Waisai while encouraging local churches and leaders.",
          "The team hosted a children-focused outreach in Kokoda Kilo 8 with about 125 children, then continued ministry in Sago Village through learning activities, care conversations, prayer, and gift distribution.",
          "The trip closed with worship nights, Sunday ministry, home visits, and renewed connection with churches across Sorong and Raja Ampat.",
        ],
        stats: [
          { value: "21", label: "Team Members" },
          { value: "125", label: "Children Gathered" },
          { value: "5+", label: "Ministry Stops" },
        ],
        source: {
          label: "IFGF Manado TYC Mission Trip",
          href: "https://ifgf.global/ifgf-manado-tyc-mission-trip/",
        },
      },
      {
        eyebrow: "Pakistan · January 15-22",
        title: "Church visits, leadership strengthening, and discipleship encouragement.",
        body: [
          "The Pakistan report highlights a January mission journey led by Ps. Evan Tjandra with regional leaders, visiting 18 IFGF churches across multiple cities and border regions.",
          "The team encouraged pastors and congregations, visited areas facing security and community challenges, and celebrated continuing growth across the Pakistan region.",
          "A pastors and leaders gathering in Islamabad drew about 110 attendees, while the broader mission report notes nearly 2,000 people impacted through prayer, healing, encouragement, and discipleship next steps.",
        ],
        stats: [
          { value: "114", label: "IFGF Churches" },
          { value: "18", label: "Churches Visited" },
          { value: "110", label: "Leaders Gathered" },
        ],
        source: {
          label: "IFGF Pakistan 2024 Mission Report",
          href: "https://ifgf.global/ifgf-paksitan-2024-mission-report/",
        },
      },
    ],
  },
  "2025": {
    year: "2025",
    overline: "2025 Mock Newsletter",
    title: "Placeholder stories for",
    accent: "future mission updates",
    intro:
      "This mock page keeps the 2026 newsletter style in place while reserving content areas for future 2025 reports, photos, metrics, and source links.",
    stats: [
      { value: "TBD", label: "Nations Reached", art: "nations" },
      { value: "TBD", label: "New Believers", art: "believers" },
      { value: "TBD", label: "Leaders Trained", art: "leaders" },
      { value: "TBD", label: "Care Encounters", art: "medical" },
    ],
    stories: [
      {
        eyebrow: "Placeholder Story",
        title: "Mission field report headline will go here.",
        body: [
          "Use this space for a short, punchy summary of what happened, where the mission went, and why the update matters.",
          "Future content can include concrete numbers, ministry locations, partner highlights, and a clear next step for prayer or giving.",
        ],
        stats: [
          { value: "TBD", label: "People Served" },
          { value: "TBD", label: "Leaders Equipped" },
          { value: "TBD", label: "Media Assets" },
        ],
      },
      {
        eyebrow: "Placeholder Story",
        title: "Second 2025 story block for another mission update.",
        body: [
          "This card is intentionally generic for now so the page can be reviewed visually before real 2025 reporting is ready.",
          "Once the report is available, this section can be swapped with a real mission summary, country flags, source links, and photos.",
        ],
        stats: [
          { value: "TBD", label: "Locations" },
          { value: "TBD", label: "Follow-ups" },
          { value: "TBD", label: "Prayer Needs" },
        ],
      },
    ],
  },
};
import type {
  CountryArtName,
  ImpactArtKey,
} from "../../lib/gm-visual-library";
