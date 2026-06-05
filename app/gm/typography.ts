import type { CSSProperties } from "react";
import { DISPLAY, SANS, SERIF, THEME } from "./data";

export const titleTight: CSSProperties = {
  fontFeatureSettings: "\"kern\" 1",
  fontKerning: "normal",
  letterSpacing: 0,
};

export const heroLightTitle: CSSProperties = {
  ...titleTight,
  fontFamily: DISPLAY,
  fontStyle: "italic",
  fontWeight: 400,
};

export const titleAccent: CSSProperties = {
  color: THEME.heroAccent,
  fontFamily: DISPLAY,
  fontStyle: "italic",
  fontWeight: 400,
  textDecoration: "underline",
  textUnderlineOffset: "0.08em",
};

export const overline: CSSProperties = {
  color: THEME.accent,
  display: "block",
  fontFamily: SANS,
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: "0.2em",
  marginBottom: 18,
  textAlign: "center",
  textTransform: "uppercase",
};

export const h2Style: CSSProperties = {
  ...titleTight,
  color: THEME.text,
  fontFamily: SERIF,
  fontSize: "clamp(44px, 7.5vw, 86px)",
  fontWeight: 400,
  lineHeight: 0.92,
  margin: "0 auto 22px",
  textAlign: "center",
};

export const bodyStyle: CSSProperties = {
  color: THEME.textSub,
  fontSize: 18,
  lineHeight: 1.55,
  margin: "0 auto 42px",
  maxWidth: 760,
  textAlign: "center",
};
