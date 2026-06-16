import type {
  CountryArtName,
  ImpactArtKey,
} from "../../lib/gm-visual-library";

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
