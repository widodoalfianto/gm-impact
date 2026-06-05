"use client";

import Link from "next/link";
import React, { useState } from "react";
import type { CSSProperties } from "react";
import { MAIN_SITE_URL, NAV_ITEMS, NEWSLETTER_ITEMS, SANS, THEME, type NavItem } from "./data";
import { titleTight } from "./typography";

function hasChildren(item: NavItem): item is NavItem & { children: readonly NavItem[] } {
  return Array.isArray(item.children) && item.children.length > 0;
}

function MainSiteDropdownLinks({
  nestedStyle,
}: {
  nestedStyle?: CSSProperties;
}) {
  return (
    <>
      {NAV_ITEMS.map(item => (
        <React.Fragment key={item.label}>
          <a href={item.href} className="gm-nav-dropdown-link" role="menuitem">
            {item.label}
          </a>
          {hasChildren(item)
            ? item.children.map(child => (
              <a key={child.label} href={child.href} className="gm-nav-dropdown-link" role="menuitem" style={nestedStyle}>
                {child.label}
              </a>
            ))
            : null}
        </React.Fragment>
      ))}
    </>
  );
}

function NewsletterDropdownLinks() {
  return (
    <>
      {NEWSLETTER_ITEMS.map(item => (
        <Link key={item.label} href={item.href} className="gm-nav-dropdown-link" role="menuitem">
          {item.label}
        </Link>
      ))}
    </>
  );
}

function MobileMainSiteLinks({ closeMenu }: { closeMenu: () => void }) {
  return (
    <>
      {NAV_ITEMS.map(item => (
        <React.Fragment key={item.label}>
          <a href={item.href} className="gm-mobile-link" onClick={closeMenu}>
            {item.label}
          </a>
          {hasChildren(item)
            ? item.children.map(child => (
              <a key={child.label} href={child.href} className="gm-mobile-sublink" onClick={closeMenu}>
                {child.label}
              </a>
            ))
            : null}
        </React.Fragment>
      ))}
    </>
  );
}

function MobileNewsletterLinks({ closeMenu }: { closeMenu: () => void }) {
  return (
    <>
      <Link href="/newsletters" className="gm-mobile-link" onClick={closeMenu}>
        All Newsletters
      </Link>
      {NEWSLETTER_ITEMS.map(item => (
        <Link key={item.label} href={item.href} className="gm-mobile-sublink" onClick={closeMenu}>
          {item.label}
        </Link>
      ))}
    </>
  );
}

export function ResponsiveNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setMobileMenuOpen(false);
  const T = THEME;

  return (
    <nav aria-label="Primary navigation" style={{
      background: T.nav,
      color: T.navText,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "12px 28px",
      padding: "16px 28px",
      minHeight: 78,
      fontFamily: SANS,
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
              {hasChildren(item) ? <span className="gm-nav-caret">⌄</span> : null}
            </a>
            {hasChildren(item) ? (
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
            <MainSiteDropdownLinks nestedStyle={{ paddingLeft: 22 }} />
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
            <NewsletterDropdownLinks />
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
              <MobileNewsletterLinks closeMenu={closeMobileMenu} />
            </div>
          </div>
          <div>
            <div className="gm-mobile-section-title">IFGF Global Missions</div>
            <div className="gm-mobile-links">
              <MobileMainSiteLinks closeMenu={closeMobileMenu} />
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
