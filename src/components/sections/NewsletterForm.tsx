"use client";

import { useEffect, useState, type FormEvent } from "react";
import { submitNewsletter } from "@/lib/api";

const STORAGE_KEY = "dippa_newsletter_subscribed";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Status = "idle" | "submitting" | "success" | "already" | "error";

function readStoredEmail() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function storeEmail(email: string) {
  try {
    window.localStorage.setItem(STORAGE_KEY, email);
  } catch {
    /* ignore quota / private mode */
  }
}

export default function NewsletterForm({
  variant,
  source,
}: {
  variant: "homepage" | "footer";
  source: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (readStoredEmail()) setStatus("success");
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const nextEmail = email.trim().toLowerCase();
    if (!EMAIL_RE.test(nextEmail)) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const result = await submitNewsletter({ email: nextEmail, source });
      storeEmail(nextEmail);
      setEmail("");
      setStatus(result.alreadySubscribed ? "already" : "success");
    } catch {
      setStatus("error");
    }
  }

  const confirmed = status === "success" || status === "already";
  const title =
    status === "already"
      ? "This address is already subscribed."
      : "Subscription confirmed.";
  const body =
    status === "already"
      ? "We will continue to send occasional briefing notes to this address. You can unsubscribe from any message."
      : "Thank you. You will receive occasional notes from Dippa on software delivery, applied AI, and client operating practice. We do not send promotional mail. You may unsubscribe at any time.";

  if (variant === "footer") {
    if (confirmed) {
      return (
        <p className="footer-newsletter-success" role="status">
          {status === "already"
            ? "This address is already on our briefing list."
            : "Thank you. You are subscribed to Dippa briefings."}
        </p>
      );
    }

    return (
      <div className="footer-newsletter-fields">
        <form className="footer-newsletter-form" onSubmit={handleSubmit} noValidate>
          <label className="sr-only" htmlFor="footer-newsletter-email">
            Work email
          </label>
          <input
            id="footer-newsletter-email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder="Work email"
            className="footer-newsletter-input"
            autoComplete="email"
            required
            disabled={status === "submitting"}
          />
          <button
            type="submit"
            className="footer-newsletter-btn-sm"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Sending" : "Subscribe"}
          </button>
        </form>
        {status === "error" && (
          <p className="footer-newsletter-error" role="alert">
            Please enter a valid email, or try again shortly.
          </p>
        )}
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="newsletter-success" role="status">
        <div className="newsletter-success-copy">
          <p className="newsletter-success-title">{title}</p>
          <p className="newsletter-success-text">{body}</p>
        </div>
      </div>
    );
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
      <div className="newsletter-input-wrap">
        <label className="sr-only" htmlFor="newsletter-email">
          Work email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="Work email address"
          className="newsletter-input"
          autoComplete="email"
          required
          disabled={status === "submitting"}
        />
        <button
          type="submit"
          className="newsletter-submit button-primary"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Submitting" : "Subscribe"}
        </button>
      </div>
      {status === "error" && (
        <p className="newsletter-error" role="alert">
          Please enter a valid email address. If the problem continues, write to{" "}
          <a href="mailto:info@thedippa.com">info@thedippa.com</a>.
        </p>
      )}
    </form>
  );
}
