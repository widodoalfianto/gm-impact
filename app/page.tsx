"use client";
import React, { useState } from "react";

const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap";

if (typeof document !== "undefined" && !document.getElementById("wh-font")) {
  const l = document.createElement("link");
  l.id = "wh-font";
  l.rel = "stylesheet";
  l.href = FONT_URL;
  document.head.appendChild(l);
}

const SERIF = "'Playfair Display', Georgia, serif";
const SANS = "'Plus Jakarta Sans', system-ui, sans-serif";

const THEMES = {
  "Harvest Warm": {
    bg: "#FBF8F4", bgAlt: "#F0E8DC", bgCard: "#E8DDD0",
    nav: "#1C1B1A", navText: "#F8F4EE",
    text: "#1C1B1A", textSub: "#5A4F46", textMuted: "#9A9188",
    accent: "#C4714A", accentLight: "#F5DDD0",
    gold: "#C89B50", divider: "#DDD5C9",
    heroBg: "#1C1B1A", heroAccent: "#C89B50", stat: "#C4714A",
    badge: "#F0E8DC", badgeText: "#7A5A3A",
    inputBg: "#FBF8F4",
  },
  "Midnight Mission": {
    bg: "#181614", bgAlt: "#211E1B", bgCard: "#2A2622",
    nav: "#0F0D0B", navText: "#F4EFE8",
    text: "#F4EFE8", textSub: "#C4BCB3", textMuted: "#7A7268",
    accent: "#D4A96A", accentLight: "#3A2D1F",
    gold: "#D4A96A", divider: "#3A3630",
    heroBg: "#0F0D0B", heroAccent: "#D4A96A", stat: "#D4A96A",
    badge: "#2A2622", badgeText: "#C4A060",
    inputBg: "#181614",
  },
  "Sage & Stone": {
    bg: "#F5F7F2", bgAlt: "#E8EDE3", bgCard: "#DCE5D6",
    nav: "#1D2419", navText: "#F5F7F2",
    text: "#1D2419", textSub: "#3A5034", textMuted: "#7A8E72",
    accent: "#5B7B4E", accentLight: "#D5E6CF",
    gold: "#8BA65A", divider: "#CDD8C5",
    heroBg: "#1D2419", heroAccent: "#A3C88A", stat: "#5B7B4E",
    badge: "#DCE5D6", badgeText: "#3A5A2A",
    inputBg: "#F5F7F2",
  },
};

type ThemeName = keyof typeof THEMES;

const STATS = [
  { num: "5", label: "Nations Reached" },
  { num: "193+", label: "New Believers" },
  { num: "44", label: "Baptisms" },
  { num: "1,000", label: "Bibles Given" },
  { num: "675", label: "Medically Served" },
  { num: "163+", label: "Leaders Trained" },
];

const REGIONS = [
  {
    flag: "🇳🇵", name: "Nepal", sub: "Leadership & Medical Outreach",
    stats: [{ n: "46", l: "Pastors Equipped" }, { n: "675", l: "Medically Served" }, { n: "42", l: "Salvations" }],
    bullets: ["1,000 Bibles distributed", "16 baptisms conducted", "200 backpacks for children", "4 motorcycles for remote pastors"],
  },
  {
    flag: "🇩🇿", name: "Algeria", sub: "Underground Church Strengthening",
    stats: [{ n: "107", l: "Leaders Trained" }, { n: "5", l: "House Churches" }],
    bullets: ["Three regions: Kabylia, Bejaia, and Oran", "Ministry continues under sensitive conditions"],
  },
  {
    flag: "🇮🇩", name: "Indonesia", sub: "Aceh & Malay Unreached Peoples",
    stats: [{ n: "24", l: "Professions of Faith" }, { n: "11", l: "Baptisms" }],
    bullets: ["Active in multiple unreached villages", "Households of Peace established", "Medical, solar panel & children's programs"],
  },
  {
    flag: "🇦🇫", name: "Afghanistan", sub: "Household-Based Discipleship",
    stats: [{ n: "127", l: "Believers Discipled" }, { n: "27", l: "Households" }, { n: "6", l: "Baptisms" }],
    bullets: ["Discipleship across 27 households", "6 baptisms conducted in Kabul"],
  },
  {
    flag: "🇸🇴", name: "Somalia", sub: "House Church Network Growth",
    stats: [{ n: "116", l: "House Churches" }, { n: "11", l: "Baptisms" }, { n: "10", l: "Pastors Training" }],
    bullets: ["Decentralized discipleship network", "Growing leadership pipeline"],
  },
];

const SOCIALS = [
  { name: "Facebook", icon: "f", url: "https://www.facebook.com/worldharvestindonesia" },
  { name: "Instagram", icon: "◎", url: "https://www.instagram.com/worldharvestind" },
  { name: "YouTube", icon: "▶", url: "https://www.youtube.com/channel/UCA9-atJcDfmDUbM-p98xcRA" },
  { name: "Twitter/X", icon: "𝕏", url: "https://www.twitter.com/WorldHarvestInd" },
];

export default function WHMockup() {
  const [tn, setTn] = useState<ThemeName>("Harvest Warm");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [giveAmt, setGiveAmt] = useState<number | null>(50);
  const [customAmt, setCustomAmt] = useState<string>("");
  const T = THEMES[tn];

  const tagStyle: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 7,
    background: `${T.heroAccent}1E`,
    border: `1px solid ${T.heroAccent}44`,
    borderRadius: 20, padding: "5px 16px",
    fontSize: 11, fontWeight: 700,
    letterSpacing: "0.16em", textTransform: "uppercase",
    color: T.heroAccent, fontFamily: SANS,
  };

  const overline: React.CSSProperties = {
    fontFamily: SANS, fontSize: 11, letterSpacing: "0.2em",
    textTransform: "uppercase", fontWeight: 700,
    color: T.accent, marginBottom: 14, display: "block",
  };

  const h2Style: React.CSSProperties = {
    fontFamily: SERIF,
    fontSize: "clamp(27px, 3.8vw, 42px)",
    fontWeight: 700, lineHeight: 1.18, margin: "0 0 14px",
    color: T.text,
  };

  const bodyStyle: React.CSSProperties = {
    fontSize: 15, lineHeight: 1.8,
    color: T.textSub, marginBottom: 36,
  };

  const inp: React.CSSProperties = {
    width: "100%", padding: "12px 16px",
    borderRadius: 8, border: `1.5px solid ${T.divider}`,
    background: T.inputBg, color: T.text,
    fontSize: 15, fontFamily: SANS,
    outline: "none", boxSizing: "border-box",
    display: "block",
  };

  const btnPrimary: React.CSSProperties = {
    background: T.accent, color: "#fff",
    border: "none", borderRadius: 8,
    padding: "13px 28px", fontSize: 15,
    fontWeight: 700, fontFamily: SANS,
    cursor: "pointer", display: "inline-block",
  };

  const btnGhost: React.CSSProperties = {
    background: "transparent", color: T.navText,
    border: `1.5px solid rgba(255,255,255,0.25)`,
    borderRadius: 8, padding: "13px 28px",
    fontSize: 15, fontWeight: 500,
    fontFamily: SANS, cursor: "pointer",
  };

  return (
    <div style={{ fontFamily: SANS, background: T.bg, color: T.text, minHeight: "100vh" }}>

      {/* ── THEME SWITCHER ── */}
      <div style={{
        position: "sticky", top: 0, zIndex: 999,
        background: "#0A0908", display: "flex",
        alignItems: "center", padding: "8px 16px",
        gap: 8, flexWrap: "wrap",
      }}>
        <span style={{ color: "#666", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", marginRight: 4, fontFamily: SANS }}>Color Theme</span>
        {Object.keys(THEMES).map(name => (
          <button key={name} onClick={() => setTn(name as ThemeName)} style={{
            background: tn === name ? "#fff" : "transparent",
            color: tn === name ? "#000" : "#888",
            border: `1px solid ${tn === name ? "#fff" : "#555"}`,
            borderRadius: 16, padding: "3px 14px",
            fontSize: 11, cursor: "pointer",
            fontFamily: SANS, fontWeight: tn === name ? 700 : 400,
            transition: "all 0.15s",
          }}>{name}</button>
        ))}
        <span style={{ marginLeft: "auto", color: "#666", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: SANS }}>Click region cards to expand ↓</span>
      </div>

      {/* ── NAV ── */}
      <nav style={{
        background: T.nav, color: T.navText,
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px", height: 62, fontFamily: SANS,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: T.accent, display: "flex",
            alignItems: "center", justifyContent: "center",
            fontFamily: SERIF, fontSize: 14, color: "#fff", fontWeight: 700,
          }}>W</div>
          <span style={{ fontFamily: SERIF, fontSize: 17, fontWeight: 700 }}>World Harvest</span>
          <span style={{
            fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase",
            color: T.heroAccent, fontWeight: 700, marginLeft: 4, opacity: 0.9,
          }}>Impact 2026</span>
        </div>
        <div style={{ display: "flex", gap: 26, fontSize: 13, fontWeight: 500, opacity: 0.72 }}>
          {["Impact", "Regions", "Next Steps"].map(i => (
            <span key={i} style={{ cursor: "pointer" }}>{i}</span>
          ))}
        </div>
        <button style={{ ...btnPrimary, padding: "8px 20px", fontSize: 13 }}>Give →</button>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        background: T.heroBg, color: T.navText,
        padding: "108px 28px 96px",
        textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse 80% 50% at 50% -5%, ${T.heroAccent}28, transparent)`,
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative" }}>
          <div style={{ ...tagStyle, marginBottom: 36 }}>
            ✦ Mid-Year Report · January - June 2026
          </div>
          <h1 style={{
            fontFamily: SERIF,
            fontSize: "clamp(36px, 6.5vw, 76px)",
            fontWeight: 700, lineHeight: 1.08,
            margin: "0 auto 28px", maxWidth: 800,
            color: T.navText,
          }}>
            Reaching the Unreached,<br />
            <em style={{ color: T.heroAccent, fontStyle: "italic" }}>Across Five Nations</em>
          </h1>
          <p style={{
            fontSize: 17, fontWeight: 300, lineHeight: 1.78,
            color: T.navText, opacity: 0.65,
            maxWidth: 500, margin: "0 auto 52px",
          }}>
            God is moving in Nepal, Algeria, Indonesia, Afghanistan, and Somalia. Here is what your partnership made possible in the first half of 2026.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button style={btnPrimary}>See Our Impact ↓</button>
            <button style={btnGhost}>Share This Page</button>
          </div>
        </div>
      </section>

      {/* ── GLOBAL STATS ── */}
      <section style={{
        background: T.bgAlt, padding: "64px 28px",
        borderTop: `1px solid ${T.divider}`,
        borderBottom: `1px solid ${T.divider}`,
      }}>
        <p style={{
          textAlign: "center", fontFamily: SANS,
          fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase",
          fontWeight: 700, color: T.textMuted, marginBottom: 48,
        }}>Global Impact · First Half of 2026</p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
          gap: "36px 12px", maxWidth: 900, margin: "0 auto", textAlign: "center",
        }}>
          {STATS.map(({ num, label }) => (
            <div key={label}>
              <div style={{
                fontFamily: SERIF,
                fontSize: "clamp(34px, 4.5vw, 52px)",
                fontWeight: 700, color: T.stat,
                lineHeight: 1, marginBottom: 10,
              }}>{num}</div>
              <div style={{ fontSize: 12, fontWeight: 500, color: T.textMuted, letterSpacing: "0.04em" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── REGIONS ── */}
      <section style={{ padding: "80px 28px", background: T.bg }}>
        <div style={{ maxWidth: 1020, margin: "0 auto" }}>
          <div style={{ marginBottom: 52 }}>
            <span style={overline}>Where We Work</span>
            <h2 style={h2Style}>Five Nations.<br />One Mission.</h2>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
            gap: 20,
          }}>
            {REGIONS.map((r, i) => {
              const open = expanded === i;
              return (
                <div key={r.name}
                  onClick={() => setExpanded(open ? null : i)}
                  style={{
                    background: T.bgCard, borderRadius: 14, padding: 24,
                    cursor: "pointer",
                    border: `1.5px solid ${open ? T.accent : "transparent"}`,
                    boxShadow: open ? `0 0 0 4px ${T.accentLight}` : "none",
                    transition: "border-color 0.18s, box-shadow 0.18s",
                  }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                    <span style={{ fontSize: 28 }}>{r.flag}</span>
                    <div>
                      <div style={{ fontFamily: SERIF, fontSize: 19, fontWeight: 700, color: T.text }}>{r.name}</div>
                      <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 600, marginTop: 2 }}>{r.sub}</div>
                    </div>
                  </div>
                  <div style={{
                    display: "flex", gap: 10, justifyContent: "space-around",
                    paddingBottom: open ? 18 : 0, marginBottom: open ? 18 : 0,
                    borderBottom: open ? `1px solid ${T.divider}` : "none",
                  }}>
                    {r.stats.map(({ n, l }) => (
                      <div key={l} style={{ textAlign: "center", flex: 1 }}>
                        <div style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 700, color: T.stat, lineHeight: 1, marginBottom: 5 }}>{n}</div>
                        <div style={{ fontSize: 10, color: T.textMuted, fontWeight: 600, lineHeight: 1.35 }}>{l}</div>
                      </div>
                    ))}
                  </div>
                  {open && (
                    <ul style={{ margin: 0, padding: "0 0 0 14px", fontSize: 13, lineHeight: 1.9, color: T.textSub }}>
                      {r.bullets.map(b => <li key={b}>{b}</li>)}
                    </ul>
                  )}
                  <div style={{ fontSize: 12, color: T.accent, fontWeight: 600, marginTop: 16 }}>
                    {open ? "↑ Show Less" : "See Details →"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MISSION QUOTE ── */}
      <section style={{
        background: T.nav, color: T.navText,
        padding: "96px 28px", textAlign: "center",
      }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <span style={{ ...overline, color: T.heroAccent, opacity: 0.9 }}>Our Heartbeat</span>
          <blockquote style={{
            fontFamily: SERIF,
            fontSize: "clamp(20px, 3vw, 31px)",
            fontWeight: 400, fontStyle: "italic",
            lineHeight: 1.58, margin: "0 0 28px",
            color: T.navText,
          }}>
            &quot;The harvest is plentiful, but the laborers are few. Pray earnestly to the Lord of the harvest to send out laborers.&quot;
          </blockquote>
          <p style={{ fontSize: 12, color: T.navText, opacity: 0.38, letterSpacing: "0.1em", marginBottom: 40 }}>
            Matthew 9:37-38
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: T.navText, opacity: 0.58, maxWidth: 460, margin: "0 auto 40px" }}>
            World Harvest is called to reach those where faith carries real risk - in regions where access is limited and hope is desperately needed.
          </p>
          <a href="https://www.worldharvest.id" target="_blank" rel="noreferrer" style={{
            color: T.heroAccent, fontFamily: SANS, fontWeight: 600,
            fontSize: 14, textDecoration: "none",
            borderBottom: `1px solid ${T.heroAccent}55`, paddingBottom: 2,
          }}>
            Learn more at worldharvest.id →
          </a>
        </div>
      </section>

      {/* ── SHARE HUB ── */}
      <section style={{ padding: "72px 28px", background: T.bgAlt, textAlign: "center" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <span style={overline}>Spread the Word</span>
          <h2 style={{ ...h2Style, textAlign: "center" }}>Share This Story</h2>
          <p style={{ ...bodyStyle, textAlign: "center", marginBottom: 40 }}>
            Use the QR code or link below - perfect for bulletins, projector screens, and social posts.
          </p>
          <div style={{ display: "flex", gap: 32, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: 116, height: 116, borderRadius: 12,
                background: "#fff", padding: 8, margin: "0 auto 10px",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 0 0 2px ${T.divider}`,
              }}>
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://worldharvest.id/impact&bgcolor=ffffff&color=1C1B1A&qzone=1"
                  alt="QR code for worldharvest.id/impact"
                  style={{ width: 100, height: 100, display: "block", borderRadius: 4 }}
                />
              </div>
              <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Scan to Share</div>
            </div>
            <div style={{ flex: 1, minWidth: 220, textAlign: "left" }}>
              <div style={{
                background: T.bg, borderRadius: 10, padding: "12px 16px",
                border: `1.5px solid ${T.divider}`, marginBottom: 14,
                fontSize: 13, fontWeight: 700, color: T.accent,
                letterSpacing: "0.02em",
              }}>
                🔗 worldharvest.id/impact
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {SOCIALS.map(s => (
                  <a key={s.name} href={s.url} target="_blank" rel="noreferrer" style={{
                    background: T.bgCard, color: T.text,
                    textDecoration: "none", borderRadius: 8,
                    padding: "8px 14px", fontSize: 12, fontWeight: 600,
                    border: `1px solid ${T.divider}`,
                    display: "inline-flex", alignItems: "center", gap: 6,
                  }}>
                    <span>{s.icon}</span>
                    <span style={{ opacity: 0.75 }}>{s.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT STEPS ── */}
      <section style={{ padding: "80px 28px", background: T.bg }}>
        <div style={{ maxWidth: 540, margin: "0 auto" }}>
          <span style={overline}>Get Involved</span>
          <h2 style={h2Style}>Your Next Step</h2>
          <p style={bodyStyle}>
            Whether through prayer, partnership, or giving - there&apos;s a place for you in this mission.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { label: "Full Name", placeholder: "Your name", type: "text" },
              { label: "Email Address", placeholder: "you@email.com", type: "email" },
              { label: "Phone (optional)", placeholder: "+1 (555) 000-0000", type: "tel" },
            ].map(f => (
              <div key={f.label}>
                <label style={{
                  display: "block", fontSize: 13, fontWeight: 600,
                  color: T.textSub, marginBottom: 8,
                }}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} style={inp} />
              </div>
            ))}
            <div>
              <label style={{
                display: "block", fontSize: 13, fontWeight: 600,
                color: T.textSub, marginBottom: 8,
              }}>How would you like to contribute?</label>
              <textarea
                placeholder="Share how you'd like to be involved - prayer, volunteering, giving, partnership..."
                rows={4}
                style={{ ...inp, resize: "vertical", lineHeight: 1.65 }}
              />
            </div>
            <button style={{ ...btnPrimary, fontSize: 16, padding: "15px 32px", marginTop: 4 }}>
              Submit My Next Step →
            </button>
          </div>
        </div>
      </section>

      {/* ── GIVE ── */}
      <section style={{ padding: "80px 28px", background: T.bgAlt }}>
        <div style={{ maxWidth: 540, margin: "0 auto" }}>
          <span style={overline}>Partner With Us</span>
          <h2 style={h2Style}>Give to the Harvest</h2>
          <p style={bodyStyle}>
            Your generosity reaches the unreached - funding Bibles, medical care, discipleship, and church planting across five nations.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 14 }}>
            {[25, 50, 100, 250].map(amt => {
              const active = giveAmt === amt && !customAmt;
              return (
                <button key={amt} onClick={() => { setGiveAmt(amt); setCustomAmt(""); }} style={{
                  background: active ? T.accent : T.bgCard,
                  color: active ? "#fff" : T.text,
                  border: `1.5px solid ${active ? T.accent : T.divider}`,
                  borderRadius: 8, padding: "12px 0",
                  fontSize: 16, fontWeight: 700,
                  fontFamily: SANS, cursor: "pointer",
                  transition: "all 0.14s",
                }}>${amt}</button>
              );
            })}
          </div>

          <input
            type="number"
            placeholder="Or enter a custom amount..."
            value={customAmt}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setCustomAmt(e.target.value); setGiveAmt(null); }}
            style={{ ...inp, marginBottom: 20, borderColor: customAmt ? T.accent : T.divider }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
            <input placeholder="Full Name" style={inp} />
            <input type="email" placeholder="Email Address" style={inp} />
          </div>

          <button style={{ ...btnPrimary, width: "100%", fontSize: 16, padding: "16px 0", textAlign: "center" }}>
            Give ${customAmt || giveAmt || 50} to World Harvest →
          </button>
          <p style={{ textAlign: "center", fontSize: 12, color: T.textMuted, marginTop: 14 }}>
            🔒 Secure &amp; encrypted · All contributions support the mission
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: T.nav, color: T.navText, padding: "56px 28px 36px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr auto",
            gap: 40, marginBottom: 48, alignItems: "start",
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%", background: T.accent,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: SERIF, fontSize: 14, color: "#fff", fontWeight: 700,
                }}>W</div>
                <span style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 700 }}>World Harvest</span>
              </div>
              <p style={{ fontSize: 13, color: T.navText, opacity: 0.48, lineHeight: 1.78, maxWidth: 300, marginBottom: 24 }}>
                Impacting the world through creative community, education, and media services. Jakarta, Indonesia.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                {SOCIALS.map(s => (
                  <a key={s.name} href={s.url} target="_blank" rel="noreferrer" style={{
                    width: 36, height: 36, borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: T.navText, textDecoration: "none",
                    fontSize: 13, opacity: 0.65,
                  }} title={s.name}>{s.icon}</a>
                ))}
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: 96, height: 96, borderRadius: 10,
                overflow: "hidden", background: "#fff",
                padding: 6, margin: "0 auto 10px",
              }}>
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=84x84&data=https://worldharvest.id/impact&bgcolor=ffffff&color=1C1B1A&qzone=0"
                  alt="Share QR"
                  style={{ width: 84, height: 84, display: "block" }}
                />
              </div>
              <div style={{ fontSize: 9, color: T.navText, opacity: 0.32, letterSpacing: "0.1em", textTransform: "uppercase" }}>Scan to Share</div>
            </div>
          </div>

          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 22, display: "flex",
            justifyContent: "space-between", alignItems: "center",
            fontSize: 12, color: T.navText, opacity: 0.32,
            flexWrap: "wrap", gap: 8,
          }}>
            <span>© 2026 World Harvest. All rights reserved.</span>
            <span>worldharvest.id</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
