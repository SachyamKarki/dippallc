"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { Mail, MessageCircle, ChevronDown } from "lucide-react";
import { toast, Toaster } from "sonner";
import { cn } from "@/lib/utils";

type FormState = "idle" | "submitting" | "success" | "error";
type ContactMethod = "email" | "whatsapp";

const countryCodes = [
  { code: "+977", country: "Nepal", flag: "🇳🇵" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+1", country: "USA/Canada", flag: "🇺🇸/🇨🇦" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
];

const categories = [
  { title: "Product Engineering", slug: "product-engineering" },
  { title: "AI Agent Systems", slug: "ai-agent-systems" },
  { title: "Advisory + Delivery", slug: "advisory-delivery" },
  { title: "Other Inquiry", slug: "other" },
];

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [contactMethod, setContactMethod] = useState<ContactMethod>("email");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+977");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCategoryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [message, setMessage] = useState("");

  const isValid = useMemo(() => {
    if (!name.trim()) return false;
    if (contactMethod === "email" && !email.trim()) return false;
    if (contactMethod === "whatsapp" && !phone.trim()) return false;
    if (message.trim().length < 5) return false;
    return true;
  }, [name, email, phone, message, contactMethod]);

  function openWhatsApp() {
    const senderNumber = `${countryCode}${phone.replace(/[^0-9]/g, "")}`;
    const lines = [
      `*NEW PROJECT INQUIRY*`,
      `━━━━━━━━━━━━━━━━━━━━`,
      ``,
      `*Name:* ${name.trim()}`,
      `*Contact:* ${senderNumber}`,
      category ? `*Category:* ${category}` : null,
      `*Message:*`,
      `${message.trim()}`,
      ``,
      `━━━━━━━━━━━━━━━━━━━━`,
      `Sent via dippa.group`,
    ].filter(line => line !== null);

    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/9779800000000?text=${text}`, "_blank");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!isValid) return;

    setState("submitting");

    if (contactMethod === "whatsapp") {
      openWhatsApp();
      toast.success("Opening WhatsApp...");
      setState("success");
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      const res = await fetch(`${apiUrl}/api/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          category,
          message,
        }),
      });

      if (res.ok) {
        toast.success("Message sent! We'll get back to you soon.");
        setState("success");
      } else {
        throw new Error("Failed to send message");
      }
    } catch (err) {
      console.error("Contact form submit failed", err);
      toast.error("Could not send message. Please try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="w-full rounded-2xl border border-zinc-200 bg-white p-10 md:p-12 shadow-sm text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 mx-auto">
          <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-zinc-900 mb-2">Thank you!</h3>
        <p className="text-zinc-500 mb-8 max-w-sm mx-auto text-sm">
          We&apos;ve received your inquiry and will respond within 24 hours. Looking forward to talking.
        </p>
        <button
          onClick={() => setState("idle")}
          className="inline-flex h-10 items-center justify-center rounded-full border border-zinc-200 px-6 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      <form
        onSubmit={onSubmit}
        className="w-full rounded-2xl border border-zinc-200 bg-white p-8 md:p-12 shadow-sm"
      >
        <div className="mb-8">
          <h3 className="text-xl font-bold text-zinc-900 mb-2">Send an inquiry</h3>
          <p className="text-sm text-zinc-600">Share the essentials and we&apos;ll reply with next steps.</p>
        </div>

        {/* Contact Method — Segmented Control */}
        <div className="mb-10">
          <span className="mb-3 block text-sm font-medium text-zinc-800">
            How would you like to reach us?
          </span>
          <div className="relative inline-grid grid-cols-2 w-full sm:w-64 rounded-full border border-zinc-200 bg-zinc-100 p-1">
            <div
              className={cn(
                "absolute top-1 bottom-1 rounded-full shadow-sm transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]",
                contactMethod === "email"
                  ? "left-1 right-[calc(50%+2px)] bg-zinc-900"
                  : "left-[calc(50%+2px)] right-1 bg-emerald-600"
              )}
            />
            <button
              type="button"
              onClick={() => setContactMethod("email")}
              className={cn(
                "relative z-10 flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-medium transition-colors",
                contactMethod === "email" ? "text-white" : "text-zinc-500 hover:text-zinc-700"
              )}
            >
              <Mail className="h-4 w-4" />
              Email
            </button>
            <button
              type="button"
              onClick={() => setContactMethod("whatsapp")}
              className={cn(
                "relative z-10 flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-medium transition-colors",
                contactMethod === "whatsapp" ? "text-white" : "text-zinc-500 hover:text-zinc-700"
              )}
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <div className="flex flex-col gap-2 text-sm">
            <label className="font-medium text-zinc-800">Name</label>
            <input
              className="h-11 rounded-xl border border-zinc-200 bg-white px-4 outline-none transition focus:border-zinc-300 focus:ring-0"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>

          {contactMethod === "email" ? (
            <div className="flex flex-col gap-2 text-sm">
              <label className="font-medium text-zinc-800">Email</label>
              <input
                className="h-11 rounded-xl border border-zinc-200 bg-white px-4 outline-none transition focus:border-zinc-300 focus:ring-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
          ) : (
            <div className="flex flex-col gap-2 text-sm">
              <label className="font-medium text-zinc-800">Phone Number</label>
              <div className="flex gap-2">
                <select
                  className="h-11 rounded-xl border border-zinc-200 bg-white px-2 outline-none transition focus:border-zinc-300 focus:ring-0 text-sm"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  {countryCodes.map((c) => (
                    <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                  ))}
                </select>
                <input
                  className="h-11 flex-1 rounded-xl border border-zinc-200 bg-white px-4 outline-none transition focus:border-zinc-300 focus:ring-0"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98XXXXXXXX"
                  type="tel"
                  required
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 text-sm mb-6">
          <label className="font-medium text-zinc-800">Project Category</label>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setCategoryOpen(!isCategoryOpen)}
              className="flex h-11 w-full items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none transition focus:border-zinc-300 focus:ring-0"
            >
              <span className={category ? "text-zinc-900" : "text-zinc-500"}>
                {category || "Select a category…"}
              </span>
              <ChevronDown className={cn("h-4 w-4 text-zinc-400 transition-transform", isCategoryOpen && "rotate-180")} />
            </button>
            {isCategoryOpen && (
              <div className="absolute top-full left-0 mt-2 w-full rounded-xl border border-zinc-100 bg-white shadow-2xl z-50 overflow-hidden text-sm">
                {categories.map((c, i) => (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => { setCategory(c.title); setCategoryOpen(false); }}
                    className={cn(
                      "w-full text-left px-4 py-3 hover:bg-zinc-50 text-zinc-900 transition-colors",
                      i > 0 && "border-t border-zinc-50"
                    )}
                  >
                    {c.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm mb-10">
          <label className="font-medium text-zinc-800">Message</label>
          <textarea
            className="min-h-[140px] rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-zinc-300 focus:ring-0 resize-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about the project objectives and timeline..."
            required
          />
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6">
          <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">
            Typically responds within 24 hours.
          </p>
          <button
            type="submit"
            disabled={state === "submitting"}
            className={cn(
              "inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full px-10 text-sm font-bold transition-all",
              contactMethod === "whatsapp" 
                ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-100" 
                : "bg-zinc-900 hover:bg-zinc-800 text-white shadow-lg shadow-zinc-100"
            )}
          >
            {contactMethod === "whatsapp" ? <MessageCircle className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
            {state === "submitting" ? "Sending..." : contactMethod === "whatsapp" ? "Send via WhatsApp" : "Send inquiry"}
          </button>
        </div>
      </form>
    </>
  );
}
