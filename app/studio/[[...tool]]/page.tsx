import Link from "next/link";
import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";
import { isSanityConfigured } from "../../../sanity/env";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main
        style={{
          alignItems: "center",
          background: "#F8F6F0",
          color: "#404040",
          display: "flex",
          fontFamily: "system-ui, sans-serif",
          justifyContent: "center",
          minHeight: "100vh",
          padding: 24,
        }}
      >
        <div style={{ maxWidth: 620 }}>
          <p
            style={{
              color: "#D17E34",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Sanity setup
          </p>
          <h1 style={{ fontSize: 48, lineHeight: 1, margin: "0 0 20px" }}>
            Connect the GM Impact Sanity project.
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6 }}>
            Add <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> to{" "}
            <code>.env.local</code>, then restart the development server. The
            production website remains on its current content until its routes
            are deliberately migrated.
          </p>
          <Link href="/" style={{ color: "#D17E34", fontWeight: 700 }}>
            Return to the website
          </Link>
        </div>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
