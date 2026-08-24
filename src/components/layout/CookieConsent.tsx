"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export const COOKIE_CONSENT_KEY = "dippa_cookie_consent";
export const COOKIE_SETTINGS_EVENT = "dippa:cookie-settings";

export type CookieChoice = "all" | "essential";

type StoredConsent = {
  v: 1;
  choice: CookieChoice;
  at: string;
};

export function readCookieConsent(): StoredConsent | null {
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed?.v === 1 && (parsed.choice === "all" || parsed.choice === "essential")) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

function writeCookieConsent(choice: CookieChoice) {
  const payload: StoredConsent = { v: 1, choice, at: new Date().toISOString() };
  window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(payload));
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!readCookieConsent());

    const reopen = () => setVisible(true);
    window.addEventListener(COOKIE_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  function choose(choice: CookieChoice) {
    writeCookieConsent(choice);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-labelledby="cookie-banner-title" aria-describedby="cookie-banner-copy">
      <div className="cookie-banner-inner">
        <div className="cookie-banner-copy">
          <p id="cookie-banner-title" className="cookie-banner-title">
            Cookies
          </p>
          <p id="cookie-banner-copy" className="cookie-banner-text">
            We use essential cookies to operate this website. With your
            permission, we also use analytics cookies to understand how the
            site is used. See our{" "}
            <Link href="/privacy">Privacy Policy</Link> for details.
          </p>
        </div>
        <div className="cookie-banner-actions">
          <button type="button" className="cookie-banner-btn cookie-banner-btn-secondary" onClick={() => choose("essential")}>
            Essential only
          </button>
          <button type="button" className="cookie-banner-btn cookie-banner-btn-primary" onClick={() => choose("all")}>
            Accept cookies
          </button>
        </div>
      </div>
    </div>
  );
}
