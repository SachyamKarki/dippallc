"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { Mail, MessageCircle, ChevronDown, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type FormState = "idle" | "submitting" | "success" | "error";
type ContactMethod = "email" | "whatsapp";

const countryCodes = [
  { code: "+977", flag: "🇳🇵" },
  { code: "+91",  flag: "🇮🇳" },
  { code: "+1",   flag: "🇺🇸" },
  { code: "+44",  flag: "🇬🇧" },
  { code: "+61",  flag: "🇦🇺" },
  { code: "+971", flag: "🇦🇪" },
];

const categories = [
  "Web Development",
  "Mobile App Development",
  "AI & Automation",
  "Product Engineering",
  "Advisory & Consulting",
  "Other Inquiry",
];

interface ContactFormProps {
  simple?: boolean;
}

export default function ContactForm({ simple = false }: ContactFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const [contactMethod, setContactMethod] = useState<ContactMethod>("email");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+977");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [message, setMessage] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCategoryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isValid = useMemo(() => {
    if (!name.trim()) return false;
    if (contactMethod === "email" && !email.trim()) return false;
    if (contactMethod === "whatsapp" && !phone.trim()) return false;
    if (message.trim().length < 5) return false;
    return true;
  }, [name, email, phone, message, contactMethod]);

  function openWhatsApp() {
    const num = `${countryCode}${phone.replace(/[^0-9]/g, "")}`;
    const text = encodeURIComponent(
      [
        `*NEW PROJECT INQUIRY — DIPPA IT Solutions*`,
        `━━━━━━━━━━━━━━━━━━━━`,
        `*Name:* ${name.trim()}`,
        company.trim() ? `*Company:* ${company.trim()}` : null,
        `*Contact:* ${num}`,
        category ? `*Category:* ${category}` : null,
        ``,
        `*Message:*`,
        message.trim(),
        `━━━━━━━━━━━━━━━━━━━━`,
        `Sent via thedippa.com`,
      ]
        .filter((l) => l !== null)
        .join("\n")
    );
    window.open(`https://wa.me/9779800000000?text=${text}`, "_blank");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    setState("submitting");

    if (contactMethod === "whatsapp") {
      openWhatsApp();
      toast.success("Opening WhatsApp…");
      setState("success");
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      const res = await fetch(`${apiUrl}/api/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, email, category, message }),
      });
      if (res.ok) {
        setState("success");
      } else {
        throw new Error("server error");
      }
    } catch (err) {
      console.error(err);
      toast.error("Could not send message. Please try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className={cn("cf-card cf-success-state", simple && "cf-card--simple")}>
        <div className="cf-success-icon">
          <Check size={22} strokeWidth={2.5} />
        </div>
        <h3 className="cf-success-title">Message received.</h3>
        <p className="cf-success-body">
          We&apos;ll review your inquiry and respond within one business day.
          Looking forward to the conversation.
        </p>
        <button className="cf-reset-btn" onClick={() => setState("idle")}>
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("cf-card", simple && "cf-card--simple")}>
        <div className="cf-header">
          {simple && <p className="cf-kicker">Consultation</p>}
          <h2 className="cf-title">{simple ? "Request a Consultation" : "Send an inquiry"}</h2>
          {simple ? (
            <p className="cf-subtitle cf-subtitle--simple">
              Share the essentials — we&apos;ll reply with next steps within one business day.
            </p>
          ) : (
            <p className="cf-subtitle">
              Share the essentials — we&apos;ll reply with next steps within 24 hours.
            </p>
          )}
        </div>

        <div className={cn(simple && "cf-form-body")}>
        {/* Contact method */}
        <div className="cf-method-group">
          <span className="cf-label">Preferred contact method</span>
          <div className="cf-method-toggle">
            <div
              className={cn(
                "cf-method-pill",
                contactMethod === "whatsapp" && "cf-method-pill--right"
              )}
              aria-hidden="true"
            />
            <button
              type="button"
              onClick={() => setContactMethod("email")}
              className={cn(
                "cf-method-btn",
                contactMethod === "email" && "cf-method-btn--active"
              )}
            >
              <Mail size={13} />
              Email
            </button>
            <button
              type="button"
              onClick={() => setContactMethod("whatsapp")}
              className={cn(
                "cf-method-btn",
                contactMethod === "whatsapp" && "cf-method-btn--active cf-method-btn--wa"
              )}
            >
              <MessageCircle size={13} />
              WhatsApp
            </button>
          </div>
        </div>

        {/* Name + contact */}
        <div className="cf-row">
          <div className="cf-field">
            <label className="cf-label">Full name</label>
            <input
              className="cf-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>

          {contactMethod === "email" ? (
            <div className="cf-field">
              <label className="cf-label">Email address</label>
              <input
                className="cf-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
              />
            </div>
          ) : (
            <div className="cf-field">
              <label className="cf-label">Phone number</label>
              <div className="cf-phone-row">
                <select
                  className="cf-select cf-phone-code"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  {countryCodes.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>
                <input
                  className="cf-input cf-phone-num"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98XXXXXXXX"
                  required
                />
              </div>
            </div>
          )}
        </div>

        {/* Category + message — side by side on consultation page */}
        {simple ? (
          <>
            <div className="cf-row">
              <div className="cf-field">
                <label className="cf-label">Project category</label>
                <div className="cf-dropdown" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setCategoryOpen(!isCategoryOpen)}
                    className={cn("cf-input cf-dropdown-btn", isCategoryOpen && "cf-dropdown-btn--open")}
                  >
                    <span className={category ? "cf-dropdown-value" : "cf-dropdown-placeholder"}>
                      {category || "Select a category…"}
                    </span>
                    <ChevronDown
                      size={14}
                      className={cn("cf-dropdown-chevron", isCategoryOpen && "cf-dropdown-chevron--open")}
                    />
                  </button>
                  {isCategoryOpen && (
                    <div className="cf-dropdown-menu">
                      {categories.map((c, i) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => { setCategory(c); setCategoryOpen(false); }}
                          className={cn(
                            "cf-dropdown-item",
                            i > 0 && "cf-dropdown-item--border",
                            category === c && "cf-dropdown-item--selected"
                          )}
                        >
                          {c}
                          {category === c && <Check size={12} className="cf-dropdown-check" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="cf-field">
                <label className="cf-label">Company name</label>
                <input
                  className="cf-input"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Your company"
                />
              </div>
            </div>
            <div className="cf-field cf-field--message">
              <label className="cf-label">Message</label>
              <textarea
                className="cf-input cf-textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help?"
                rows={5}
                required
              />
            </div>
          </>
        ) : (
          <>
            <div className="cf-field">
              <label className="cf-label">Project category</label>
              <div className="cf-dropdown" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setCategoryOpen(!isCategoryOpen)}
                  className={cn("cf-input cf-dropdown-btn", isCategoryOpen && "cf-dropdown-btn--open")}
                >
                  <span className={category ? "cf-dropdown-value" : "cf-dropdown-placeholder"}>
                    {category || "Select a category…"}
                  </span>
                  <ChevronDown
                    size={16}
                    className={cn("cf-dropdown-chevron", isCategoryOpen && "cf-dropdown-chevron--open")}
                  />
                </button>
                {isCategoryOpen && (
                  <div className="cf-dropdown-menu">
                    {categories.map((c, i) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => { setCategory(c); setCategoryOpen(false); }}
                        className={cn(
                          "cf-dropdown-item",
                          i > 0 && "cf-dropdown-item--border",
                          category === c && "cf-dropdown-item--selected"
                        )}
                      >
                        {c}
                        {category === c && <Check size={13} className="cf-dropdown-check" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="cf-field">
              <label className="cf-label">
                Message
                <span className="cf-label-hint">Describe your project and timeline</span>
              </label>
              <textarea
                className="cf-input cf-textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your project objectives, technical landscape, and what success looks like..."
                required
              />
            </div>
          </>
        )}
        </div>

        {/* Submit */}
        <div className={cn("cf-footer", simple && "cf-footer--simple")}>
          {!simple && (
            <p className="cf-disclaimer">
              We respond within 1 business day. Your information is never shared.
            </p>
          )}
          <button
            type="submit"
            disabled={state === "submitting" || !isValid}
            className={cn(
              simple
                ? cn(
                    "cf-submit-btn--simple",
                    contactMethod === "whatsapp"
                      ? "cf-submit-btn cf-submit-btn--wa"
                      : "button-primary"
                  )
                : "cf-submit-btn",
              !simple && (contactMethod === "whatsapp" ? "cf-submit-btn--wa" : "cf-submit-btn--email"),
              (!isValid || state === "submitting") && "cf-submit-btn--disabled"
            )}
          >
            {contactMethod === "whatsapp" ? <MessageCircle size={16} /> : <Mail size={16} />}
            {state === "submitting"
              ? "Sending…"
              : contactMethod === "whatsapp"
              ? "Send via WhatsApp"
              : "Send inquiry"}
          </button>
        </div>
      </form>
  );
}
