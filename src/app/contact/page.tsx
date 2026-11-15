"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { servicesData } from "@/config/services";
import {
  Clock,
  Send,
  CheckCircle2,
  Lock,
  ShieldCheck,
} from "lucide-react";

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [selectedService, setSelectedService] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const whatsappUrl =
    siteConfig.contact.whatsappUrl ||
    `https://wa.me/917010886321?text=${encodeURIComponent("Hi NIYAN Team, I am interested in NIYAN Technologies services. I would like to discuss a project.")}`;

  const handleGmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const recipient = "niyantechh@gmail.com";
    const isMobile =
      typeof window !== "undefined" &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    const gmailWeb = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}`;
    const mailto = `mailto:${recipient}`;

    if (isMobile) {
      window.location.href = mailto;
    } else {
      const win = window.open(gmailWeb, "_blank", "noopener,noreferrer");
      if (!win || win.closed || typeof win.closed === "undefined") {
        window.location.href = mailto;
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formName: "Contact Page – Direct Consultation Desk",
          fullName,
          email,
          phone: phone || "Not provided",
          company: company || "Independent",
          services: [selectedService],
          description: message,
          message: message,
          budget: "Personalized Scoping (To be discussed)",
          timeline: "Standard",
          preferredContact: "Email",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send message.");
      }

      setSuccess(true);
      setFullName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setMessage("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to send message.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-24 bg-white min-h-screen text-[#300C41]">
      {/* Blueprint grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#300C41 1px, transparent 1px), linear-gradient(90deg, #300C41 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#300C41]/5 border border-[#300C41]/10 px-3 py-1 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#DEE948]" />
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#300C41]">
              DIRECT CONSULTATION DESK
            </p>
          </div>

          <h1 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#300C41] tracking-tight leading-[1.15]">
            Start Your <span className="underline decoration-[#DEE948] decoration-4 underline-offset-8">Digital Transformation</span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-[#300C41]/75 leading-relaxed">
            Provide your initiative specifications below. Our technical partner
            team will review your requirements, prepare an architectural
            assessment, and contact you within 4 business hours.
          </p>
        </div>

        {/* Dual Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-8 bg-white border border-[#300C41]/10 rounded-2xl p-6 sm:p-9 shadow-violet">
            {success ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#DEE948] text-[#300C41] font-bold flex items-center justify-center mx-auto shadow-lime">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#300C41]">
                  Consultation Request Submitted
                </h3>
                <p className="text-sm text-[#300C41]/85 max-w-md mx-auto leading-relaxed font-medium">
                  Thank you! Your consultation request has been submitted successfully. Our team will contact you soon.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-5 py-2.5 text-xs font-bold rounded-lg bg-[#300C41] text-white hover:text-[#DEE948] hover:bg-[#230830] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#300C41] mb-1.5">
                      Full Name <span className="text-[#300C41]">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Elena Rostova"
                      className="w-full px-3.5 py-2.5 text-xs text-[#300C41] bg-white border border-[#300C41]/20 rounded-lg focus:outline-none focus:border-[#300C41]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#300C41] mb-1.5">
                      Business Email <span className="text-[#300C41]">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="elena@company.com"
                      className="w-full px-3.5 py-2.5 text-xs text-[#300C41] bg-white border border-[#300C41]/20 rounded-lg focus:outline-none focus:border-[#300C41]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#300C41] mb-1.5">
                      Contact Number <span className="text-[#300C41]">*</span>
                    </label>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 7812345412"
                      className="w-full px-3.5 py-2.5 text-xs text-[#300C41] bg-white border border-[#300C41]/20 rounded-lg focus:outline-none focus:border-[#300C41]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#300C41] mb-1.5">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Company or Institution"
                      className="w-full px-3.5 py-2.5 text-xs text-[#300C41] bg-white border border-[#300C41]/20 rounded-lg focus:outline-none focus:border-[#300C41]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#300C41] mb-1.5">
                    Service Required
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs text-[#300C41] bg-white border border-[#300C41]/20 rounded-lg focus:outline-none focus:border-[#300C41]"
                  >
                    <option value="General Inquiry">General Project Inquiry</option>
                    {servicesData.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.orderNumber}. {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#300C41] mb-1.5">
                    Project Brief & Technical Requirements *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide an overview of the platform, scope requirements, existing stack or research goals..."
                    className="w-full px-3.5 py-2.5 text-xs text-[#300C41] bg-white border border-[#300C41]/20 rounded-lg focus:outline-none focus:border-[#300C41]"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-[#300C41]/10 border border-[#300C41] text-xs text-[#300C41] font-bold rounded-lg">
                    {error}
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-[#300C41]/70">
                    <Lock className="w-3.5 h-3.5 text-[#300C41] shrink-0" />
                    <span>Strict mutual NDA & confidentiality standard applied automatically.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-white bg-[#300C41] hover:bg-[#230830] hover:text-[#DEE948] rounded-lg shadow-violet transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[#DEE948]" />
                    <span>{loading ? "Transmitting..." : "Submit Consultation Brief"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Direct Contact Desk */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-[#300C41]/10 rounded-2xl p-6 shadow-violet">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#300C41] mb-4">
                Direct Contact Desk
              </h3>

              {/* WhatsApp & Gmail: The Only Two Contact Options */}
              <div className="grid grid-cols-2 gap-3 my-4">
                {/* WhatsApp Tile */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366] text-[#300C41] hover:text-white border border-[#25D366]/30 transition-all duration-200 group shadow-xs cursor-pointer text-center"
                  title="Direct WhatsApp Chat"
                  aria-label="Direct WhatsApp Chat"
                >
                  <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-110 transition-transform">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <span className="font-sans text-xs font-bold">WhatsApp</span>
                  <span className="text-[10px] opacity-75 mt-0.5">Direct Chat</span>
                </a>

                {/* Gmail Tile */}
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=niyantechh@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleGmailClick}
                  className="flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-xl bg-[#DEE948]/20 hover:bg-[#300C41] text-[#300C41] hover:text-[#DEE948] border border-[#DEE948]/60 transition-all duration-200 group shadow-xs cursor-pointer text-center"
                  title="Direct Gmail Message"
                  aria-label="Direct Gmail Message"
                >
                  <div className="w-10 h-10 rounded-full bg-[#300C41] text-[#DEE948] flex items-center justify-center mb-2 shadow-xs group-hover:scale-110 transition-transform">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                    </svg>
                  </div>
                  <span className="font-sans text-xs font-bold">Gmail</span>
                  <span className="text-[10px] opacity-75 mt-0.5">Compose Email</span>
                </a>
              </div>

              <div className="my-3 space-y-2">
                <div className="p-3.5 rounded-xl bg-[#DEE948]/20 border border-[#DEE948]/50 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#300C41]">
                    <ShieldCheck className="w-4 h-4 text-[#300C41]" />
                    <span>Confidentiality & IP</span>
                  </div>
                  <p className="text-[11px] text-[#300C41]/80 leading-relaxed">
                    100% intellectual property ownership handover and mutual NDA protections standard on every engagement.
                  </p>
                </div>
              </div>

              {/* Response Commitment Box */}
              <div className="p-3.5 bg-[#300C41]/5 border border-[#300C41]/10 rounded-xl text-xs mt-4">
                <div className="flex items-center gap-2 text-[#300C41] font-bold mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#300C41]" />
                  <span>Response Commitment</span>
                </div>
                <p className="text-[#300C41]/70 text-[11px] leading-relaxed">
                  We maintain a fast first-response time within business hours for all inquiries and technical briefs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
