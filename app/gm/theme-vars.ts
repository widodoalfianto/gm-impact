import type { CSSProperties } from "react";
import { SANS, THEME } from "./data";

type GmPageStyle = CSSProperties & Record<`--gm-${string}`, string>;

export const pageStyle: GmPageStyle = {
  "--gm-accent": THEME.accent,
  "--gm-accent-light": THEME.accentLight,
  "--gm-bg": THEME.bg,
  "--gm-bg-card": THEME.bgCard,
  "--gm-divider": THEME.divider,
  "--gm-gold": THEME.gold,
  "--gm-hero-accent": THEME.heroAccent,
  "--gm-nav-text": THEME.navText,
  "--gm-sans": SANS,
  "--gm-text": THEME.text,
  "--gm-text-muted": THEME.textMuted,
};
