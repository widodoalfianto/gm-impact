import type { ReactNode } from "react";
import { INSTAGRAM_URL, SHARE_LABEL, SHARE_URL, SANS, THEME, YOUTUBE_URL } from "./data";
import { titleTight } from "./typography";

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

const SOCIALS: readonly { name: string; icon: ReactNode; url: string }[] = [
  { name: "YouTube", icon: "▶", url: YOUTUBE_URL },
  { name: "Instagram", icon: <InstagramIcon />, url: INSTAGRAM_URL },
];

export function SiteFooter() {
  const T = THEME;

  return (
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
  );
}
