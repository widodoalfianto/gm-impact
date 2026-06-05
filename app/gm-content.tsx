"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const FONT_LINKS = [
  { id: "wh-font", href: "https://use.typekit.net/xia1xiy.css" },
] as const;

if (typeof document !== "undefined") {
  FONT_LINKS.forEach(({ id, href }) => {
    let l = document.getElementById(id) as HTMLLinkElement | null;
    if (!l) {
      l = document.createElement("link");
      l.id = id;
      l.rel = "stylesheet";
      document.head.appendChild(l);
    }
    if (l.href !== href) {
      l.href = href;
    }
  });
}

const DISPLAY = "'superior-title', Georgia, serif";
const SANS = "'mundial', 'neue-haas-grotesk-text', system-ui, sans-serif";
const SERIF = SANS;

const MAIN_SITE_URL = "https://www.ifgfglobalmissions.org";
const GIVE_URL = "https://worldharvest.givecloud.co/IFGF%20Global%20Mission";
const SHARE_URL = "https://gm-impact.vercel.app";
const SHARE_LABEL = "gm-impact.vercel.app";
const YOUTUBE_URL = "https://www.youtube.com/channel/UC7sxtfPpYSN_Fj1sCBImDvg";
const INSTAGRAM_URL = "https://www.instagram.com/ifgfglobalmissions/";

const THEME = {
  bg: "#F8F6F0", bgAlt: "#F8F6F0", bgCard: "#FDFDFD",
  nav: "#F8F6F0", navText: "#404040",
  text: "#404040", textSub: "#404040", textMuted: "#647970",
  accent: "#E59A66", accentLight: "#F3E7DC",
  gold: "#D17E34", divider: "#DED8CE",
  heroBg: "#F8F6F0", heroAccent: "#E59A66", stat: "#D17E34",
  badge: "#F8F6F0", badgeText: "#647970",
  inputBg: "#FDFDFD",
};

const NAV_ITEMS = [
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
];

const NEWSLETTER_ITEMS = [
  { label: "2026 Update", href: "/newsletters/2026" },
];

type StatArtKind = "nations" | "believers" | "baptisms" | "bibles" | "medical" | "leaders";

const STATS: { num: string; label: string; art: StatArtKind }[] = [
  { num: "5", label: "Nations Reached", art: "nations" },
  { num: "193+", label: "New Believers", art: "believers" },
  { num: "44", label: "Baptisms", art: "baptisms" },
  { num: "1,000", label: "Bibles Given", art: "bibles" },
  { num: "675", label: "Medically Served", art: "medical" },
  { num: "163+", label: "Leaders Trained", art: "leaders" },
];

const STAT_TARGETS = STATS.map(({ num }) => {
  const match = num.match(/^([\d,]+)(.*)$/);
  return {
    target: Number((match?.[1] ?? "0").replace(/,/g, "")),
    suffix: match?.[2] ?? "",
  };
});

const formatStatNumber = (value: number, suffix: string) =>
  `${Math.round(value).toLocaleString("en-US")}${suffix}`;

const STAT_ART_STROKE = "#647970";
const STAT_ART_WASH = "#F8F6F0";

function StatIllustration({ kind, label }: { kind: StatArtKind; label: string }) {
  const line = {
    fill: "none",
    stroke: STAT_ART_STROKE,
    strokeWidth: 3.1,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const fine = { ...line, strokeWidth: 2.3 };

  return (
    <svg
      viewBox="0 0 184 112"
      role="img"
      aria-label={`${label} illustration`}
      className="gm-stat-art"
    >
      <path
        d="M24.5 72.6 C13.6 54.8 27.1 30.6 51.7 20.6 C75.5 10.9 93.3 21.7 112.8 30.1 C137.1 40.5 165.8 47.8 163.5 72.2 C161.2 96.2 126.8 101.5 94.2 101.2 C60.8 100.9 35.2 90 24.5 72.6 Z"
        fill={STAT_ART_WASH}
        opacity={0.76}
      />

      <g>
        {kind === "nations" && (
          <>
            <circle cx="92" cy="60" r="29" {...line} />
            <path d="M66 60 H118" {...fine} />
            <path d="M92 31 C83 45 83 75 92 89 C101 75 101 45 92 31 Z" {...fine} />
            <path d="M72 45 C84 51 100 51 112 45" {...fine} />
            <path d="M72 75 C84 69 100 69 112 75" {...fine} />
          </>
        )}

        {kind === "believers" && (
          <>
            <circle cx="92" cy="43" r="9" {...line} />
            <circle cx="70" cy="50" r="7" {...fine} />
            <circle cx="114" cy="50" r="7" {...fine} />
            <path d="M76 86 V68 C76 59 83 55 92 55 C101 55 108 59 108 68 V86" {...line} />
            <path d="M61 84 V70 C61 64 66 61 72 62" {...fine} />
            <path d="M123 84 V70 C123 64 118 61 112 62" {...fine} />
          </>
        )}

        {kind === "baptisms" && (
          <>
            <path d="M92 25 C92 25 75 48 75 61 C75 71 82 78 92 78 C102 78 109 71 109 61 C109 48 92 25 92 25 Z" {...line} />
            <path d="M46 86 C61 78 75 92 92 86 C109 80 123 92 139 86" {...line} />
            <path d="M85 61 C88 65 95 66 99 62" {...fine} />
          </>
        )}

        {kind === "bibles" && (
          <>
            <path d="M91 37 C78 30 62 31 50 38 V86 C62 80 78 81 91 89 Z" {...line} />
            <path d="M93 37 C106 30 122 31 134 38 V86 C122 80 106 81 93 89 Z" {...line} />
            <path d="M92 39 V89" {...fine} />
            <path d="M64 51 H78" {...fine} />
            <path d="M106 51 H120" {...fine} />
            <path d="M116 63 V78" {...fine} />
            <path d="M109 70.5 H123" {...fine} />
          </>
        )}

        {kind === "medical" && (
          <>
            <rect x="51" y="46" width="82" height="42" rx="8" {...line} />
            <path d="M78 46 V38 C78 33 82 30 87 30 H97 C102 30 106 33 106 38 V46" {...line} />
            <path d="M92 58 V76" {...line} />
            <path d="M83 67 H101" {...line} />
          </>
        )}

        {kind === "leaders" && (
          <>
            <rect x="54" y="36" width="76" height="42" rx="5" {...line} />
            <path d="M68 50 H96" {...fine} />
            <path d="M68 62 H88" {...fine} />
            <path d="M104 63 L118 50" {...line} />
            <circle cx="82" cy="92" r="7" {...fine} />
            <circle cx="110" cy="92" r="7" {...fine} />
            <path d="M70 104 C75 98 89 98 94 104" {...fine} />
            <path d="M98 104 C103 98 117 98 122 104" {...fine} />
          </>
        )}
      </g>
    </svg>
  );
}

const COUNTRY_MAP_VIEWBOX = "0 0 180 98";

const COUNTRY_MAP_OUTLINES: Record<string, string[]> = {
  Nepal: [
    "M170.9 59.8 L169.3 68.6 L172 81.4 L169.7 89.5 L152.8 89.8 L128.4 85.1 L112.7 83.2 L101 72.8 L73.2 70.2 L46.8 58.8 L27.6 48.9 L8 41.2 L15.9 22.2 L28.7 13 L37.2 8.2 L53.4 14.4 L73.9 27.6 L85.3 30.5 L92.1 40.3 L107.8 44.3 L124.3 53.2 L147.3 57.8 L170.9 59.8 Z",
  ],
  Algeria: [
    "M43 52.1 L43.1 51.3 L43.1 51 L43.1 45.6 L50.4 42.2 L55 41.5 L58.7 40.3 L60.4 38 L65.7 36.2 L65.9 32.9 L68.5 32.5 L70.6 30.8 L76.5 30 L77.4 28.3 L76.2 27.3 L74.6 22.5 L74.3 19.8 L72.6 16.9 L77 14.4 L81.9 13.6 L84.8 11.7 L89.1 10.3 L96.8 9.5 L104.3 9.2 L106.6 9.8 L110.9 8 L115.8 8 L117.6 9.1 L120.7 8.8 L119.8 11.1 L120.5 15.4 L119.4 19.2 L116.6 21.7 L117 25.1 L120.8 27.8 L120.8 28.9 L123.6 30.8 L125.5 38.9 L127 42.9 L127.2 45 L126.4 48.7 L126.8 50.8 L126.2 53.3 L126.6 56.2 L124.8 58.1 L127.5 61.4 L127.6 63.3 L129.3 65.8 L131.4 65 L135 67.1 L137 70 L121.4 78.6 L108.3 87.5 L101.8 89.6 L96.8 90 L96.8 87.1 L94.7 86.4 L91.8 85.1 L90.8 82.9 L75.4 73 L60.1 63.1 L43 52.1 Z",
  ],
  Indonesia: [
    "M171.9 49.6 L171.9 61.3 L172 72.9 L168.8 70 L165.2 69.3 L164.3 70.3 L159.7 70.4 L161.3 67.5 L163.5 66.5 L162.6 62.6 L160.9 59.6 L153.9 56.6 L151 56.3 L145.6 52.9 L144.5 54.7 L143.1 55 L142.3 53.7 L142.3 52.1 L139.6 50.4 L143.4 49.1 L146 49.1 L145.7 48.2 L140.4 48.2 L139 46 L135.8 45.4 L134.3 43.6 L139.1 42.7 L141 41.6 L146.7 43 L147.3 44.4 L148.3 50.2 L152 52.3 L155 48.5 L159.1 46.4 L162.3 46.4 L165.4 47.6 L168 48.9 L171.9 49.6 Z",
    "M114.4 72.1 L114.8 72.8 L114.8 73.9 L112.5 76.6 L109.4 77.4 L109 77 L109.3 75.7 L110.9 73.6 L114.4 72.1 Z",
    "M147.5 65 L147.2 62.3 L147.8 61 L148.6 59.8 L149.4 60.8 L149.4 62.5 L147.5 65 Z",
    "M89 25.4 L87 28.7 L89.6 32 L89 33.7 L93 37 L88.7 37.4 L87.5 39.9 L87.7 43.1 L84.3 45.6 L84.2 49.2 L82.8 54.6 L82.2 53.4 L78.2 55 L76.8 52.8 L74.2 52.6 L72.4 51.4 L68.1 52.7 L66.8 51 L64.5 51.2 L61.5 50.8 L61 46 L59.2 45 L57.5 41.9 L57 38.8 L57.4 35.4 L59.5 33.1 L60.1 35.5 L62.6 37.5 L64.9 36.8 L67.2 37 L69.3 35.2 L71 34.9 L74.4 35.9 L77.3 35.1 L79.1 30.1 L80.5 28.9 L81.8 24.8 L85.9 24.8 L89 25.4 Z",
    "M130.2 50.3 L134.1 51.3 L135.4 54.1 L132.4 52.6 L129.4 52.3 L127.4 52.5 L124.9 52.4 L125.8 50.4 L130.2 50.3 Z",
    "M121.2 53.8 L118.8 53.2 L118.1 51.6 L121.7 51.5 L122.6 52.7 L121.2 53.8 Z",
    "M125 32.5 L125.3 34.4 L127.4 34.7 L127.7 36.2 L127.5 39.3 L125.7 39 L125.2 41.2 L126.6 43 L125.6 43.5 L124.2 41.2 L123.1 36.6 L123.8 33.8 L125 32.5 Z",
    "M107.1 37.1 L111.2 37 L114.7 34.4 L115.4 35.2 L112.5 38.7 L109.8 39.4 L106.3 38.7 L100.4 38.9 L97.2 39.4 L96.7 42.1 L99.9 45.3 L101.9 43.7 L108.6 42.5 L108.3 44.1 L106.7 43.6 L105.1 45.7 L102 47.1 L105.4 51.7 L104.7 52.9 L108 57 L107.9 59.4 L106 60.5 L104.6 59.2 L106.3 56.3 L102.8 57.6 L101.9 56.7 L102.4 55.3 L99.8 53.2 L100.1 49.7 L97.7 50.8 L98 54.9 L98.1 60.1 L95.9 60.6 L94.3 59.5 L95.3 56.2 L94.8 52.8 L93.3 52.8 L92.2 50.3 L93.6 47.9 L94.2 45.1 L96 39.7 L96.7 38.2 L99.8 35.6 L102.6 36.6 L107.1 37.1 Z",
    "M97.6 77 L92.9 74.5 L96.2 73.8 L98.1 74.9 L99.4 76 L99.2 77 L97.6 77 Z",
    "M101.4 70.9 L103.8 70.6 L107 69.3 L106.5 71.3 L101.1 72.3 L96.3 71.8 L96.3 70.5 L99.1 69.8 L101.4 70.9 Z",
    "M90.3 70.2 L92.6 69.9 L93.5 71.5 L89.3 72.2 L86.8 72.7 L84.9 72.6 L86.1 70.6 L88.1 70.5 L89.1 69.3 L90.3 70.2 Z",
    "M55.3 63.3 L55.8 64.6 L62.7 64.9 L63.5 63.4 L70.1 65.2 L71.4 67.5 L76.8 68.1 L81.2 70.3 L77.1 71.6 L73.2 70.2 L69.9 70.3 L66.2 70 L62.8 69.4 L58.7 68 L56 67.6 L54.6 68.1 L48 66.6 L47.4 65.1 L44.1 64.8 L46.6 61.4 L50.9 61.6 L53.8 63 L55.3 63.3 Z",
    "M40.5 44.1 L41.2 46.6 L42.4 48.6 L45 49 L46.8 51.2 L45.9 55.7 L45.7 61.2 L41.8 61.3 L38.7 58.3 L34.1 55.4 L32.6 53.2 L29.9 50.3 L28.1 47.6 L25.4 42.6 L22.2 39.6 L21.2 36.5 L19.9 33.7 L16.6 31.5 L14.8 28.4 L12.1 26.4 L8.3 22.4 L8 20.6 L10.3 20.7 L15.9 21.4 L19 24.9 L21.8 27.4 L23.8 28.9 L27.2 32.7 L30.8 32.8 L33.8 35.2 L35.9 38.2 L38.6 39.9 L37.2 42.8 L39.3 44 L40.5 44.1 Z",
  ],
  Afghanistan: [
    "M78.2 18 L83.1 18.1 L89.9 20 L92.6 21.1 L99.1 18.2 L102.1 19.9 L105 15.8 L110.3 16 L111.7 14.7 L112.7 11.1 L116.5 8 L121.3 10 L120.4 12.8 L123.1 13.2 L122.2 20.7 L125.8 23.6 L128.9 21.8 L132.9 20.9 L138.5 16.9 L144.6 17.5 L153.8 17.5 L155.4 20.1 L150.2 21.1 L145.7 22.8 L135.4 23.8 L125.8 25.7 L120.6 29.6 L122.7 33.4 L123.7 37.8 L119.3 41.6 L119.6 45 L117.2 48.2 L108.7 47.9 L112.2 53.9 L106.5 56.1 L102.7 61.5 L103.2 66.9 L99.7 69.4 L96.4 68.6 L89.5 69.7 L88.6 72.2 L81.9 72.2 L76.9 77.3 L76.6 84.9 L65 88.6 L58.8 87.8 L56.9 89.8 L51.6 88.7 L42.7 90 L27.7 85.4 L35.8 77.3 L35 71.6 L28.3 70.1 L27.6 64.4 L24.6 57.2 L28.5 52.3 L24.6 51 L27 44.5 L30.7 33.4 L39.8 36.8 L46.5 35.6 L48.4 31.5 L55.5 30.2 L60.5 27.4 L62.3 20.3 L69.8 18.6 L71.2 15.4 L75.5 17.8 L78.2 18 Z",
  ],
  Somalia: [
    "M63.2 90 L59.7 85.1 L59.6 63.3 L64.9 56.5 L66.5 54.6 L70.3 54.5 L75.7 50.3 L83.5 50 L100.4 32.1 L104.5 27.1 L107.2 23.4 L107.2 20.3 L107.2 14.2 L107.3 11.8 L107.3 11.7 L107.3 11.7 L109.2 11.6 L112 10.7 L115.1 10.1 L118 8 L120.2 8 L120.4 9.7 L119.8 13.1 L119.8 16.3 L118.6 18.4 L116.9 24.9 L114 31.6 L110.3 39.2 L105.2 48 L100.1 54.7 L93 62.9 L87 67.7 L78.1 73.6 L72.5 78.2 L66 85.4 L64.6 88.6 L63.2 90 Z",
  ],
};

function CountryMap({ name, color }: { name: string; color: string }) {
  const paths = COUNTRY_MAP_OUTLINES[name] ?? [];

  return (
    <svg viewBox={COUNTRY_MAP_VIEWBOX} role="img" aria-label={`${name} map outline`} style={{ width: "100%", maxWidth: 190, height: 96, display: "block" }}>
      {paths.map((d, index) => (
        <path
          key={index}
          d={d}
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.1}
          opacity={0.42}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

function CountryFlag({ name }: { name: string }) {
  const flagStyle: React.CSSProperties = {
    width: 34,
    height: 22,
    display: "block",
    flexShrink: 0,
    borderRadius: 3,
    overflow: "hidden",
    boxShadow: "0 0 0 1px rgba(64,64,64,0.12)",
  };

  if (name === "Nepal") {
    return (
      <svg viewBox="0 0 36 24" role="img" aria-label="Nepal flag" style={{ ...flagStyle, boxShadow: "none" }}>
        <path d="M7 2 L28 8 L13 12 L30 22 L7 22 Z" fill="#003893" />
        <path d="M9 4.4 L23.2 8.5 L12 11.8 L24.5 19.8 L9 19.8 Z" fill="#DC143C" />
        <circle cx={13} cy={16.5} r={2.1} fill="#fff" />
        <circle cx={14.2} cy={8.5} r={1.6} fill="#fff" />
      </svg>
    );
  }

  if (name === "Algeria") {
    return (
      <svg viewBox="0 0 36 24" role="img" aria-label="Algeria flag" style={flagStyle}>
        <rect width={18} height={24} fill="#006233" />
        <rect x={18} width={18} height={24} fill="#fff" />
        <circle cx={20} cy={12} r={5} fill="#D21034" />
        <circle cx={21.7} cy={12} r={4.2} fill="#fff" />
        <path d="M24.7 7.8 L25.7 10.5 L28.5 10.5 L26.2 12.2 L27 15 L24.7 13.3 L22.4 15 L23.2 12.2 L20.9 10.5 L23.7 10.5 Z" fill="#D21034" />
      </svg>
    );
  }

  if (name === "Indonesia") {
    return (
      <svg viewBox="0 0 36 24" role="img" aria-label="Indonesia flag" style={flagStyle}>
        <rect width={36} height={12} fill="#CE1126" />
        <rect y={12} width={36} height={12} fill="#fff" />
      </svg>
    );
  }

  if (name === "Afghanistan") {
    return (
      <svg viewBox="0 0 36 24" role="img" aria-label="Afghanistan flag, simplified" style={flagStyle}>
        <rect width={12} height={24} fill="#111" />
        <rect x={12} width={12} height={24} fill="#D32011" />
        <rect x={24} width={12} height={24} fill="#007A36" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 36 24" role="img" aria-label="Somalia flag" style={flagStyle}>
      <rect width={36} height={24} fill="#4189DD" />
      <path d="M18 6.2 L19.4 10.2 L23.7 10.3 L20.3 12.8 L21.5 16.9 L18 14.5 L14.5 16.9 L15.7 12.8 L12.3 10.3 L16.6 10.2 Z" fill="#fff" />
    </svg>
  );
}

const REGIONS = [
  {
    name: "Nepal", sub: "Leadership & Medical Outreach", mediaHref: "#socials",
    stats: [{ n: "46", l: "Pastors Equipped" }, { n: "675", l: "Medically Served" }, { n: "42", l: "Salvations" }],
    bullets: ["46 pastors equipped", "675 people medically served", "42 salvations", "1,000 Bibles distributed", "16 baptisms conducted", "200 backpacks for children", "4 motorcycles for remote pastors"],
  },
  {
    name: "Algeria", sub: "Underground Church Strengthening", mediaHref: "#socials",
    stats: [{ n: "107", l: "Leaders Trained" }, { n: "5", l: "House Churches" }],
    bullets: ["107 leaders trained", "5 house churches strengthened", "Three regions served: Kabylia, Bejaia, and Oran", "Ministry continues under sensitive conditions"],
  },
  {
    name: "Indonesia", sub: "Aceh & Malay Unreached Peoples", mediaHref: "#socials",
    stats: [{ n: "24", l: "Professions of Faith" }, { n: "11", l: "Baptisms" }],
    bullets: ["24 professions of faith", "11 baptisms", "Active in multiple unreached villages", "Households of Peace established", "Medical outreach, solar panels, and children's programs supported"],
  },
  {
    name: "Afghanistan", sub: "Household-Based Discipleship", mediaHref: "#socials",
    stats: [{ n: "127", l: "Believers Discipled" }, { n: "27", l: "Households" }, { n: "6", l: "Baptisms" }],
    bullets: ["127 believers discipled", "27 households reached through discipleship", "6 baptisms conducted in Kabul"],
  },
  {
    name: "Somalia", sub: "House Church Network Growth", mediaHref: "#socials",
    stats: [{ n: "116", l: "House Churches" }, { n: "11", l: "Baptisms" }, { n: "10", l: "Pastors Training" }],
    bullets: ["116 house churches supported", "11 baptisms", "10 pastors in training", "Decentralized discipleship network", "Growing leadership pipeline"],
  },
];

const NEWSLETTER_COUNTRIES = ["Nepal", "Algeria", "Indonesia", "Afghanistan", "Somalia"];

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      style={{ width: 16, height: 16, display: "block" }}
    >
      <rect x="5" y="5" width="14" height="14" rx="4" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="16.4" cy="7.7" r="1" fill="currentColor" />
    </svg>
  );
}

const SOCIALS = [
  { name: "YouTube", icon: "▶", url: YOUTUBE_URL },
  { name: "Instagram", icon: <InstagramIcon />, url: INSTAGRAM_URL },
];

export function GlobalMissionsImpactPage({
  variant = "update",
}: {
  variant?: "update" | "newsletter";
} = {}) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const statsRef = useRef<HTMLElement | null>(null);
  const [statsStarted, setStatsStarted] = useState(false);
  const [animatedStats, setAnimatedStats] = useState<number[]>(() => STATS.map(() => 0));
  const T = THEME;
  const isNewsletterLanding = variant === "newsletter";

  useEffect(() => {
    const section = statsRef.current;
    if (!section || statsStarted) return;

    if (typeof IntersectionObserver === "undefined") {
      const fallbackFrame = requestAnimationFrame(() => setStatsStarted(true));
      return () => cancelAnimationFrame(fallbackFrame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [statsStarted]);

  useEffect(() => {
    if (!statsStarted) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      const reducedMotionFrame = requestAnimationFrame(() => {
        setAnimatedStats(STAT_TARGETS.map(({ target }) => target));
      });
      return () => cancelAnimationFrame(reducedMotionFrame);
    }

    const duration = 1200;
    const startedAt = performance.now();
    let animationFrame = 0;

    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setAnimatedStats(STAT_TARGETS.map(({ target }) => Math.round(target * eased)));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [statsStarted]);

  const titleTight: React.CSSProperties = {
    letterSpacing: 0,
    fontKerning: "normal",
    fontFeatureSettings: "\"kern\" 1",
  };

  const heroLightTitle: React.CSSProperties = {
    ...titleTight,
    fontFamily: DISPLAY,
    fontStyle: "italic",
    fontWeight: 400,
  };

  const titleAccent: React.CSSProperties = {
    color: T.heroAccent,
    fontFamily: DISPLAY,
    fontStyle: "italic",
    fontWeight: 400,
    textDecoration: "underline",
    textUnderlineOffset: "0.08em",
  };

  const overline: React.CSSProperties = {
    fontFamily: SANS, fontSize: 13, letterSpacing: "0.2em",
    textTransform: "uppercase", fontWeight: 600,
    color: T.accent, marginBottom: 18, display: "block",
    textAlign: "center",
  };

  const h2Style: React.CSSProperties = {
    fontFamily: SERIF,
    fontSize: "clamp(44px, 7.5vw, 86px)",
    fontWeight: 400, lineHeight: 0.92, margin: "0 auto 22px",
    color: T.text,
    textAlign: "center",
    ...titleTight,
  };

  const bodyStyle: React.CSSProperties = {
    fontSize: 18, lineHeight: 1.55,
    color: T.textSub, margin: "0 auto 42px",
    maxWidth: 760, textAlign: "center",
  };

  return (
    <div style={{ fontFamily: SANS, background: T.bg, color: T.text, minHeight: "100vh" }}>
      <style>{`
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 24px;
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
        }

        .gm-nav-link {
          align-items: center;
          color: ${T.navText};
          display: inline-flex;
          min-height: 32px;
          text-decoration: none;
          transition: color 180ms ease, transform 180ms ease;
        }

        .gm-brand-link {
          flex-shrink: 0;
          white-space: nowrap;
        }

        .gm-nav-link:hover,
        .gm-nav-link:focus-visible {
          color: ${T.heroAccent};
          transform: translateY(-1px);
        }

        .gm-nav-item {
          display: inline-flex;
          position: relative;
        }

        .gm-nav-caret {
          font-size: 11px;
          line-height: 1;
          margin-left: 4px;
          transition: transform 180ms ease;
        }

        .gm-nav-item:hover .gm-nav-caret,
        .gm-nav-item:focus-within .gm-nav-caret {
          transform: rotate(180deg);
        }

        .gm-nav-dropdown {
          background: #fff;
          border: 1px solid ${T.divider};
          border-radius: 8px;
          box-shadow: 0 16px 36px rgba(64, 64, 64, 0.1);
          display: grid;
          gap: 2px;
          left: 50%;
          min-width: 190px;
          opacity: 0;
          padding: 8px;
          pointer-events: none;
          position: absolute;
          top: calc(100% + 10px);
          transform: translate(-50%, -4px);
          transition: opacity 180ms ease, transform 180ms ease, visibility 180ms ease;
          visibility: hidden;
          z-index: 20;
        }

        .gm-nav-dropdown-right {
          left: auto;
          right: 0;
          transform: translateY(-4px);
        }

        .gm-nav-item:hover .gm-nav-dropdown,
        .gm-nav-item:focus-within .gm-nav-dropdown {
          opacity: 1;
          pointer-events: auto;
          transform: translate(-50%, 0);
          visibility: visible;
        }

        .gm-nav-item:hover .gm-nav-dropdown-right,
        .gm-nav-item:focus-within .gm-nav-dropdown-right {
          transform: translateY(0);
        }

        .gm-nav-dropdown-link {
          border-radius: 6px;
          color: ${T.navText};
          display: block;
          padding: 9px 10px;
          text-decoration: none;
          transition: background-color 180ms ease, color 180ms ease, transform 180ms ease;
          white-space: nowrap;
        }

        .gm-nav-dropdown-link:hover,
        .gm-nav-dropdown-link:focus-visible {
          background: ${T.accentLight};
          color: ${T.heroAccent};
          transform: translateX(2px);
        }

        .gm-site-nav {
          align-items: center;
          display: flex;
          flex: 1;
          gap: 18px;
          justify-content: center;
          min-width: 0;
        }

        .gm-newsletter-nav {
          display: flex;
          justify-content: flex-end;
          margin-left: auto;
        }

        .gm-compact-main-nav {
          display: none;
        }

        .gm-menu-toggle {
          align-items: center;
          background: transparent;
          border: 1px solid ${T.divider};
          border-radius: 8px;
          color: ${T.navText};
          cursor: pointer;
          display: none;
          font-family: ${SANS};
          font-size: 14px;
          font-weight: 600;
          gap: 8px;
          min-height: 40px;
          padding: 8px 13px;
          transition: background-color 180ms ease, border-color 180ms ease, color 180ms ease, transform 180ms ease;
        }

        .gm-menu-toggle:hover,
        .gm-menu-toggle:focus-visible {
          background: #fff;
          border-color: ${T.heroAccent};
          color: ${T.heroAccent};
          transform: translateY(-1px);
        }

        .gm-menu-lines {
          display: grid;
          gap: 3px;
          width: 14px;
        }

        .gm-menu-lines span {
          background: currentColor;
          display: block;
          height: 1.5px;
          width: 100%;
        }

        .gm-mobile-panel {
          background: #fff;
          border: 1px solid ${T.divider};
          border-radius: 8px;
          box-shadow: 0 16px 36px rgba(64, 64, 64, 0.1);
          display: none;
          flex-basis: 100%;
          gap: 18px;
          margin-top: 6px;
          padding: 16px;
          width: 100%;
        }

        .gm-mobile-section-title {
          color: ${T.heroAccent};
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .gm-mobile-links {
          display: grid;
          gap: 4px;
        }

        .gm-mobile-link,
        .gm-mobile-sublink {
          border-radius: 6px;
          color: ${T.navText};
          display: block;
          text-decoration: none;
          transition: background-color 180ms ease, color 180ms ease, transform 180ms ease;
        }

        .gm-mobile-link {
          font-size: 15px;
          font-weight: 600;
          padding: 9px 10px;
        }

        .gm-mobile-sublink {
          color: ${T.textMuted};
          font-size: 14px;
          font-weight: 500;
          padding: 7px 10px 7px 24px;
        }

        .gm-mobile-link:hover,
        .gm-mobile-link:focus-visible,
        .gm-mobile-sublink:hover,
        .gm-mobile-sublink:focus-visible {
          background: ${T.accentLight};
          color: ${T.heroAccent};
          transform: translateX(2px);
        }

        .gm-newsletter-card {
          background: #fff;
          border: 1.5px solid ${T.divider};
          border-radius: 8px;
          color: ${T.text};
          display: grid;
          grid-template-columns: minmax(280px, 0.92fr) minmax(0, 1.08fr);
          margin: 0 auto;
          max-width: 1080px;
          min-height: 360px;
          overflow: hidden;
          text-align: left;
          text-decoration: none;
          transition: border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
        }

        .gm-newsletter-card:hover,
        .gm-newsletter-card:focus-visible {
          border-color: ${T.heroAccent};
          box-shadow: 0 18px 42px rgba(64, 64, 64, 0.1);
          transform: translateY(-2px);
        }

        .gm-newsletter-image {
          background: ${T.accentLight};
          min-height: 300px;
          position: relative;
        }

        .gm-newsletter-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(28px, 5vw, 56px);
        }

        .gm-country-flags {
          align-items: center;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .gm-newsletter-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 24px 0 30px;
        }

        .gm-newsletter-chip {
          border: 1px solid ${T.divider};
          border-radius: 8px;
          color: ${T.textMuted};
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.04em;
          padding: 7px 10px;
          text-transform: uppercase;
        }

        .gm-nav-give {
          background: ${T.accent};
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 8px 20px;
          font-size: 14px;
          font-weight: 700;
          font-family: ${SANS};
          cursor: pointer;
          display: inline-block;
          text-decoration: none;
          transition: background-color 180ms ease, color 180ms ease, transform 180ms ease;
        }

        .gm-nav-give:hover,
        .gm-nav-give:focus-visible {
          background-color: ${T.gold};
          color: #fff;
          transform: translateY(-1px);
        }

        .gm-hero-action {
          border-radius: 8px;
          padding: 13px 28px;
          font-size: 17px;
          font-weight: 700;
          font-family: ${SANS};
          cursor: pointer;
          display: inline-block;
          text-decoration: none;
          transition: background-color 180ms ease, border-color 180ms ease, color 180ms ease, transform 180ms ease;
        }

        .gm-hero-primary {
          background: ${T.accent};
          border: none;
          color: ${T.text};
        }

        .gm-hero-primary:hover,
        .gm-hero-primary:focus-visible {
          background: ${T.gold};
          color: #fff;
          transform: translateY(-1px);
        }

        .gm-hero-secondary {
          background: transparent;
          border: 1.5px solid ${T.divider};
          color: ${T.text};
          font-weight: 500;
        }

        .gm-hero-secondary:hover,
        .gm-hero-secondary:focus-visible {
          border-color: ${T.heroAccent};
          color: ${T.heroAccent};
          transform: translateY(-1px);
        }

        .gm-primary-button {
          background: ${T.accent};
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 13px 28px;
          font-size: 17px;
          font-weight: 700;
          font-family: ${SANS};
          cursor: pointer;
          display: inline-block;
          text-align: center;
          text-decoration: none;
          transition: background-color 180ms ease, color 180ms ease, transform 180ms ease, box-shadow 180ms ease;
        }

        .gm-primary-button:hover,
        .gm-primary-button:focus-visible {
          background: ${T.gold};
          color: #fff;
          transform: translateY(-1px);
          box-shadow: 0 10px 24px rgba(209, 126, 52, 0.18);
        }

        .gm-primary-button.gm-full-button {
          width: 100%;
          padding: 16px 0;
        }

        .gm-cta-grid {
          display: grid;
          gap: 20px;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          margin: 0 auto;
          max-width: 1000px;
        }

        .gm-cta-panel {
          background: #fff;
          border: 1.5px solid ${T.divider};
          border-radius: 8px;
          padding: clamp(28px, 4vw, 44px);
          text-align: center;
        }

        .gm-text-link {
          color: ${T.heroAccent};
          display: inline-flex;
          font-family: ${SANS};
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 4px;
          transition: color 180ms ease, transform 180ms ease;
        }

        .gm-text-link:hover,
        .gm-text-link:focus-visible {
          color: ${T.gold};
          transform: translateY(-1px);
        }

        .gm-region-card {
          background: ${T.bgCard};
          border: 1.5px solid transparent;
          border-radius: 8px;
          box-sizing: border-box;
          box-shadow: none;
          cursor: pointer;
          flex: 1 1 280px;
          max-width: 326px;
          min-width: min(100%, 270px);
          padding: 28px;
          text-align: left;
          transition: background-color 180ms ease, border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
        }

        .gm-regions-grid {
          align-items: stretch;
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }

        .gm-region-card:hover,
        .gm-region-card:focus-visible {
          background: #fff;
          border-color: ${T.heroAccent};
          box-shadow: 0 12px 28px rgba(64, 64, 64, 0.08);
          transform: translateY(-2px);
        }

        .gm-region-card.is-open {
          border-color: ${T.accent};
          box-shadow: 0 0 0 4px ${T.accentLight};
        }

        .gm-region-card:hover .gm-region-toggle,
        .gm-region-card:focus-visible .gm-region-toggle {
          color: ${T.gold};
          transform: translateX(2px);
        }

        .gm-region-media-link {
          font-size: 14px;
          margin-top: 16px;
        }

        .gm-region-toggle {
          color: ${T.accent};
          font-size: 14px;
          font-weight: 600;
          margin-top: 18px;
          text-decoration: underline;
          text-underline-offset: 4px;
          transition: color 180ms ease, transform 180ms ease;
        }

        .gm-pill-link {
          align-items: center;
          background: ${T.bgCard};
          border: 1px solid ${T.divider};
          border-radius: 8px;
          color: ${T.text};
          display: inline-flex;
          gap: 6px;
          font-size: 14px;
          font-weight: 600;
          padding: 8px 14px;
          text-decoration: none;
          transition: background-color 180ms ease, border-color 180ms ease, color 180ms ease, transform 180ms ease;
        }

        .gm-pill-link:hover,
        .gm-pill-link:focus-visible {
          background: #fff;
          border-color: ${T.heroAccent};
          color: ${T.heroAccent};
          transform: translateY(-1px);
        }

        .gm-icon-link {
          align-items: center;
          border: 1px solid ${T.divider};
          border-radius: 8px;
          color: ${T.navText};
          display: flex;
          font-size: 14px;
          height: 40px;
          justify-content: center;
          text-decoration: none;
          transition: background-color 180ms ease, border-color 180ms ease, color 180ms ease, transform 180ms ease;
          width: 40px;
        }

        .gm-icon-link:hover,
        .gm-icon-link:focus-visible {
          background: #fff;
          border-color: ${T.heroAccent};
          color: ${T.heroAccent};
          transform: translateY(-1px);
        }

        .gm-stats-grid {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 56px 18px;
          max-width: 1320px;
          margin: 0 auto;
          text-align: center;
        }

        .gm-stat-card {
          align-items: center;
          display: flex;
          flex-direction: column;
          min-width: 0;
          padding: 0 8px;
        }

        .gm-stat-art {
          aspect-ratio: 184 / 112;
          display: block;
          height: auto;
          margin: 0 auto 18px;
          max-width: 152px;
          overflow: visible;
          width: min(100%, 152px);
        }

        @media (max-width: 1100px) {
          .gm-site-nav {
            display: none;
          }

          .gm-compact-main-nav {
            display: flex;
            margin-left: auto;
          }

          .gm-newsletter-nav {
            margin-left: 0;
          }
        }

        @media (max-width: 980px) {
          .gm-site-nav {
            gap: 12px 16px;
          }

          .gm-newsletter-card {
            grid-template-columns: 1fr;
          }

          .gm-newsletter-image {
            min-height: 280px;
          }

          .gm-cta-grid {
            grid-template-columns: 1fr;
          }

          .gm-stats-grid {
            grid-template-columns: repeat(3, minmax(160px, 1fr));
            max-width: 760px;
          }

          .gm-stat-art {
            max-width: 148px;
            width: min(100%, 148px);
          }
        }

        @media (max-width: 720px) {
          .gm-compact-main-nav,
          .gm-newsletter-nav {
            display: none;
          }

          .gm-menu-toggle {
            display: inline-flex;
            margin-left: auto;
          }

          .gm-mobile-panel {
            display: grid;
          }

          .gm-nav-dropdown-right {
            left: 50%;
            right: auto;
            transform: translate(-50%, -4px);
          }

          .gm-nav-item:hover .gm-nav-dropdown-right,
          .gm-nav-item:focus-within .gm-nav-dropdown-right {
            transform: translate(-50%, 0);
          }

          .gm-newsletter-image {
            min-height: 220px;
          }

          .gm-stats-grid {
            grid-template-columns: repeat(2, minmax(140px, 1fr));
            gap: 48px 20px;
          }

          .gm-stat-art {
            max-width: 140px;
            width: min(100%, 140px);
          }
        }

        @media (max-width: 420px) {
          .gm-stats-grid {
            grid-template-columns: 1fr;
          }
        }

        .gm-nav-link:focus-visible,
        .gm-nav-give:focus-visible,
        .gm-hero-action:focus-visible,
        .gm-menu-toggle:focus-visible,
        .gm-primary-button:focus-visible,
        .gm-newsletter-card:focus-visible,
        .gm-nav-dropdown-link:focus-visible,
        .gm-mobile-link:focus-visible,
        .gm-mobile-sublink:focus-visible,
        .gm-text-link:focus-visible,
        .gm-region-card:focus-visible,
        .gm-pill-link:focus-visible,
        .gm-icon-link:focus-visible {
          outline: 2px solid ${T.heroAccent};
          outline-offset: 4px;
        }
      `}</style>
      {/* ── NAV ── */}
      <nav aria-label="Primary navigation" style={{
        background: T.nav, color: T.navText,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: "12px 28px",
        padding: "16px 28px", minHeight: 78, fontFamily: SANS,
      }}>
        <Link href="/" className="gm-nav-link gm-brand-link" style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <span style={{ fontFamily: SANS, fontSize: 22, fontWeight: 500, lineHeight: 1, ...titleTight }}>Global Missions</span>
          <span style={{
            fontFamily: SANS,
            fontSize: 18,
            color: T.heroAccent,
            fontWeight: 600,
            lineHeight: 1,
          }}>Newsletter</span>
        </Link>

        <div className="gm-site-nav" style={{ fontSize: 14, fontWeight: 500 }}>
          {NAV_ITEMS.map(item => (
            <div key={item.label} className="gm-nav-item">
              <a href={item.href} className="gm-nav-link">
                {item.label}
                {"children" in item && item.children ? <span className="gm-nav-caret">⌄</span> : null}
              </a>
              {"children" in item && item.children ? (
                <div className="gm-nav-dropdown" role="menu" aria-label={`${item.label} links`}>
                  {item.children.map(child => (
                    <a key={child.label} href={child.href} className="gm-nav-dropdown-link" role="menuitem">
                      {child.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="gm-compact-main-nav" style={{ fontSize: 14, fontWeight: 600 }}>
          <div className="gm-nav-item">
            <a href={MAIN_SITE_URL} className="gm-nav-link">
              Main Site
              <span className="gm-nav-caret">⌄</span>
            </a>
            <div className="gm-nav-dropdown" role="menu" aria-label="Main site links">
              {NAV_ITEMS.map(item => (
                <React.Fragment key={item.label}>
                  <a href={item.href} className="gm-nav-dropdown-link" role="menuitem">
                    {item.label}
                  </a>
                  {"children" in item && item.children
                    ? item.children.map(child => (
                      <a key={child.label} href={child.href} className="gm-nav-dropdown-link" role="menuitem" style={{ paddingLeft: 22 }}>
                        {child.label}
                      </a>
                    ))
                    : null}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="gm-newsletter-nav" style={{ fontSize: 14, fontWeight: 600 }}>
          <div className="gm-nav-item">
            <Link href="/newsletters" className="gm-nav-link">
              Newsletters
              <span className="gm-nav-caret">⌄</span>
            </Link>
            <div className="gm-nav-dropdown gm-nav-dropdown-right" role="menu" aria-label="Newsletter links">
              {NEWSLETTER_ITEMS.map(item => (
                <Link key={item.label} href={item.href} className="gm-nav-dropdown-link" role="menuitem">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          className="gm-menu-toggle"
          aria-controls="gm-mobile-menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(open => !open)}
        >
          <span className="gm-menu-lines" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          Menu
        </button>

        {mobileMenuOpen ? (
          <div id="gm-mobile-menu" className="gm-mobile-panel">
            <div>
              <div className="gm-mobile-section-title">Newsletters</div>
              <div className="gm-mobile-links">
                <Link href="/newsletters" className="gm-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                  All Newsletters
                </Link>
                {NEWSLETTER_ITEMS.map(item => (
                  <Link key={item.label} href={item.href} className="gm-mobile-sublink" onClick={() => setMobileMenuOpen(false)}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="gm-mobile-section-title">IFGF Global Missions</div>
              <div className="gm-mobile-links">
                {NAV_ITEMS.map(item => (
                  <React.Fragment key={item.label}>
                    <a href={item.href} className="gm-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                      {item.label}
                    </a>
                    {"children" in item && item.children
                      ? item.children.map(child => (
                        <a key={child.label} href={child.href} className="gm-mobile-sublink" onClick={() => setMobileMenuOpen(false)}>
                          {child.label}
                        </a>
                      ))
                      : null}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </nav>

      {isNewsletterLanding ? (
      <>
      {/* ── NEWSLETTER INDEX ── */}
      <section id="newsletter" style={{
        background: T.bg,
        color: T.text,
        padding: "86px 28px 96px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <span style={overline}>Newsletters</span>
          <h1 style={{
            fontFamily: SERIF,
            fontSize: "clamp(54px, 9vw, 112px)",
            fontWeight: 400,
            lineHeight: 0.92,
            margin: "0 auto 22px",
            maxWidth: 940,
            color: T.text,
            ...titleTight,
          }}>
            Global Missions Updates
          </h1>
          <p style={{ ...bodyStyle, marginBottom: 48 }}>
            Read the latest stories of sending, discipleship, care, and church planting among unreached communities.
          </p>
          <Link href="/newsletters/2026" className="gm-newsletter-card">
            <div className="gm-newsletter-image">
              <Image
                src="/images/newsletter-2026.avif"
                alt="People gathered during a Global Missions outreach"
                fill
                sizes="(max-width: 980px) 100vw, 44vw"
                style={{ objectFit: "cover", filter: "grayscale(100%)" }}
                priority
              />
            </div>
            <div className="gm-newsletter-content">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18, marginBottom: 22 }}>
                <span style={{
                  color: T.heroAccent,
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}>2026 Newsletter</span>
                <div className="gm-country-flags" aria-label="Countries reached">
                  {NEWSLETTER_COUNTRIES.map((country) => (
                    <CountryFlag key={country} name={country} />
                  ))}
                </div>
              </div>
              <h2 style={{
                fontFamily: SERIF,
                fontSize: "clamp(34px, 5vw, 58px)",
                fontWeight: 400,
                lineHeight: 0.98,
                margin: "0 0 18px",
                color: T.text,
                ...titleTight,
              }}>
                Five nations reached in the first half of 2026.
              </h2>
              <p style={{ color: T.textSub, fontSize: 18, lineHeight: 1.55, margin: 0 }}>
                New believers baptized, Bibles placed in hands, pastors equipped, and medical care extended across Nepal, Algeria, Indonesia, Afghanistan, and Somalia.
              </p>
              <div className="gm-newsletter-meta">
                <span className="gm-newsletter-chip">5 Nations</span>
                <span className="gm-newsletter-chip">193+ New Believers</span>
                <span className="gm-newsletter-chip">1,000 Bibles Given</span>
              </div>
              <span className="gm-text-link" style={{ fontSize: 16 }}>Read the 2026 Newsletter →</span>
            </div>
          </Link>
        </div>
      </section>
      </>
      ) : (
      <>

      {/* ── HERO ── */}
      <section id="newsletter-2026" style={{
        background: T.heroBg, color: T.navText,
        padding: "94px 28px 88px",
        textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "none",
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative" }}>
          <h1 style={{
            fontFamily: SANS,
            fontSize: "clamp(58px, 11vw, 132px)",
            fontWeight: 500, lineHeight: 0.92,
            margin: "0 auto 34px", maxWidth: 1120,
            color: T.navText,
            ...titleTight,
          }}>
            <span style={heroLightTitle}>Reaching the Unreached,</span><br />
            <em style={{ color: T.heroAccent, fontFamily: DISPLAY, fontStyle: "italic", fontWeight: 400, ...titleTight }}>Across Five Nations</em>
          </h1>
          <p style={{
            fontSize: "clamp(20px, 2.6vw, 28px)", fontWeight: 300, lineHeight: 1.2,
            color: T.navText,
            maxWidth: 760, margin: "0 auto 52px",
          }}>
            God is moving in Nepal, Algeria, Indonesia, Afghanistan, and Somalia. Here is what your partnership made possible in the first half of 2026.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#impact" className="gm-hero-action gm-hero-primary">See Our Impact ↓</a>
            <a href="#planters-giving" className="gm-hero-action gm-hero-secondary">Partner With Us</a>
          </div>
        </div>
      </section>

      <div aria-hidden="true" style={{
        height: "clamp(96px, 12vw, 170px)",
        background: T.heroBg,
        overflow: "hidden",
        marginTop: -1,
      }}>
        <svg viewBox="0 0 1440 180" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "100%" }}>
          <path
            d="M0 180 L0 148 C270 148 440 122 650 76 C900 22 1135 8 1440 0 L1440 180 Z"
            fill={T.accentLight}
          />
        </svg>
      </div>

      {/* ── GLOBAL STATS ── */}
      <section id="impact" ref={statsRef} style={{
        background: T.accentLight, padding: "56px 28px 48px",
        }}>
        <p style={{
          textAlign: "center", fontFamily: SANS,
          fontSize: 13, letterSpacing: "0.22em", textTransform: "uppercase",
          fontWeight: 600, color: T.textMuted, marginBottom: 52,
        }}>Global Impact · First Half of 2026</p>
        <div className="gm-stats-grid">
          {STATS.map(({ num, label, art }, index) => (
            <div key={label} className="gm-stat-card">
              <StatIllustration kind={art} label={label} />
              <div style={{
                fontFamily: DISPLAY,
                fontSize: "clamp(42px, 4.8vw, 64px)",
                fontWeight: 400, color: T.stat,
                lineHeight: 1, marginBottom: 10,
                fontKerning: "normal",
                fontFeatureSettings: "\"kern\" 1",
                fontVariantNumeric: "tabular-nums",
                letterSpacing: 0,
                whiteSpace: "nowrap",
                width: "100%",
              }}>
                <span style={{ display: "inline-block", minWidth: `${Math.max(num.length, 4)}ch`, textAlign: "center" }}>
                  {formatStatNumber(animatedStats[index] ?? 0, STAT_TARGETS[index].suffix)}
                </span>
              </div>
              <div style={{ fontSize: 15, fontWeight: 400, color: T.textMuted, letterSpacing: "0.04em" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── REGIONS ── */}
      <section id="regions" style={{ padding: "48px 28px 92px", background: T.accentLight }}>
        <div style={{ maxWidth: 1020, margin: "0 auto" }}>
          <div style={{ marginBottom: 60, textAlign: "center" }}>
            <span style={overline}>Where We Work</span>
            <h2 style={h2Style}>
              Five Nations.<br />
              <em style={titleAccent}>One Mission.</em>
            </h2>
          </div>
          <div className="gm-regions-grid">
            {REGIONS.map((r, i) => {
              const open = expanded === i;
              return (
                <div key={r.name}
                  className={`gm-region-card${open ? " is-open" : ""}`}
                  onClick={() => setExpanded(open ? null : i)}
                  onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
                    if (event.target !== event.currentTarget) return;
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setExpanded(open ? null : i);
                    }
                  }}
                  role="button"
                  tabIndex={0}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 18 }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 400, color: T.text, lineHeight: 0.95, ...titleTight }}>{r.name}</div>
                      <div style={{ fontSize: 13, color: T.textMuted, fontWeight: 400, marginTop: 8 }}>{r.sub}</div>
                    </div>
                    <CountryFlag name={r.name} />
                  </div>
                  <div style={{ height: 104, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                    <CountryMap name={r.name} color={T.heroAccent} />
                  </div>
                  {!open && (
                    <div style={{
                      display: "flex", gap: 10, justifyContent: "space-around",
                    }}>
                      {r.stats.map(({ n, l }) => (
                        <div key={l} style={{ textAlign: "center", flex: 1 }}>
                          <div style={{ fontFamily: SERIF, fontSize: 34, fontWeight: 400, color: T.stat, lineHeight: 1, marginBottom: 5, ...titleTight }}>{n}</div>
                          <div style={{ fontSize: 12, color: T.textMuted, fontWeight: 400, lineHeight: 1.35 }}>{l}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {open && (
                    <>
                      <ul style={{ margin: "0 auto", padding: "0 0 0 18px", fontSize: 16, lineHeight: 1.75, color: T.textSub, textAlign: "left", maxWidth: 280 }}>
                        {r.bullets.map(b => <li key={b}>{b}</li>)}
                      </ul>
                      <a
                        href={r.mediaHref}
                        className="gm-text-link gm-region-media-link"
                        onClick={(event: React.MouseEvent<HTMLAnchorElement>) => event.stopPropagation()}
                      >
                        Placeholder for videos →
                      </a>
                    </>
                  )}
                  <div className="gm-region-toggle">
                    {open ? "↑ Show Less" : "See Details →"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div aria-hidden="true" style={{
        height: "clamp(86px, 11vw, 150px)",
        background: T.accentLight,
        overflow: "hidden",
        marginTop: -1,
      }}>
        <svg viewBox="0 0 1440 180" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "100%" }}>
          <path
            d="M0 180 L0 58 C190 106 388 138 625 90 C830 48 1012 38 1216 78 C1304 95 1378 112 1440 118 L1440 180 Z"
            fill={T.bg}
          />
        </svg>
      </div>

      {/* ── PLANTERS & GIVING ── */}
      <section id="planters-giving" style={{ padding: "72px 28px 96px", background: T.bg }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <span style={overline}>Partner With Us</span>
          <h2 style={h2Style}>Join the mission beyond the newsletter.</h2>
          <p style={{ ...bodyStyle, marginBottom: 48 }}>
            Help sustain prayer, sending, discipleship, care, and church planting among unreached communities.
          </p>
          <div className="gm-cta-grid">
            <div className="gm-cta-panel">
              <h3 style={{
                fontFamily: SERIF,
                fontSize: "clamp(32px, 4.5vw, 52px)",
                fontWeight: 400,
                lineHeight: 1,
                margin: "0 0 16px",
                color: T.text,
                ...titleTight,
              }}>Planters Program</h3>
              <p style={{ color: T.textSub, fontSize: 18, lineHeight: 1.55, margin: "0 auto 28px", maxWidth: 400 }}>
                Join a community of partners helping plant churches, care for pastors, and support long-term discipleship in unreached places.
              </p>
              <a href={GIVE_URL} className="gm-primary-button">
                Join the Planter Program →
              </a>
            </div>
            <div className="gm-cta-panel">
              <h3 style={{
                fontFamily: SERIF,
                fontSize: "clamp(32px, 4.5vw, 52px)",
                fontWeight: 400,
                lineHeight: 1,
                margin: "0 0 16px",
                color: T.text,
                ...titleTight,
              }}>Giving</h3>
              <p style={{ color: T.textSub, fontSize: 18, lineHeight: 1.55, margin: "0 auto 28px", maxWidth: 400 }}>
                Your generosity reaches the unreached by funding Bibles, medical care, discipleship, and church planting across five nations.
              </p>
              <a href={GIVE_URL} className="gm-primary-button">
                Give to Global Missions →
              </a>
            </div>
          </div>
        </div>
      </section>
      </>
      )}

      {/* ── FOOTER ── */}
      <footer id="socials" style={{ background: T.nav, color: T.navText, padding: "72px 28px 42px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr",
            gap: 40, marginBottom: 48, alignItems: "center",
            justifyItems: "center", textAlign: "center",
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                <span style={{ fontFamily: SANS, fontSize: 24, fontWeight: 500, lineHeight: 1, ...titleTight }}>Global Missions</span>
              </div>
              <p style={{ fontSize: 17, color: T.navText, lineHeight: 1.5, maxWidth: 460, margin: "0 auto 28px" }}>
                Funding prayer, sending, discipleship, care, and church planting among unreached people.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                {SOCIALS.map(s => (
                  <a key={s.name} href={s.url} className="gm-icon-link" title={s.name}>{s.icon}</a>
                ))}
              </div>
            </div>
          </div>

          <div style={{
            paddingTop: 22, display: "flex",
            justifyContent: "center", alignItems: "center",
            fontSize: 13, color: T.textMuted,
            flexWrap: "wrap", gap: 8,
          }}>
            <span>© 2026 Global Missions. All rights reserved.</span>
            <a href={SHARE_URL} className="gm-text-link" style={{ fontSize: 13 }}>{SHARE_LABEL}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function NewsletterLandingPage() {
  return <GlobalMissionsImpactPage variant="newsletter" />;
}

export default GlobalMissionsImpactPage;
