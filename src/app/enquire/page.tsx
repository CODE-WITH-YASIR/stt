"use client";

import React, { useState } from "react";
import { servicesData } from "@/config/services";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import {
  CheckCircle2,
  Check,
  Send,
  ArrowRight,
  Shield,
  Clock,
  Wallet,
  RotateCcw,
} from "lucide-react";

export default function EnquirePage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("To be discussed during scoping (Recommended)");
  const [timeline, setTimeline] = useState("Standard (2-4 Weeks)");
  const [preferredContact, setPreferredContact] = useState("Email");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedData, setSubmittedData] = useState<{
    id: string;
    fullName: string;
    services: string[];
  } | null>(null);

  const budgetOptions = [
    "To be discussed during scoping (Recommended)",
    "Academic & Capstone Mentorship Tier",
    "Startup MVP / Proof-of-Concept Tier",
    "Growth & Custom Feature Expansion Tier",
    "Enterprise Infrastructure / VPC Deployment Tier",
    "Flexible / Milestone-Driven Scope",
  ];

  const timelineOptions = [
    "Urgent (1-2 Weeks)",
    "Standard (2-4 Weeks)",
    "1-2 Months",
    "2-3 Months",
    "Flexible Timeline",
  ];

  const contactOptions = [
    { label: "Email", icon: <Send className="w-4 h-4" /> },
    { label: "Client Portal", icon: <CheckCircle2 className="w-4 h-4" /> },
  ];

  const toggleService = (title: string) => {
    if (selectedServices.includes(title)) {
      setSelectedServices(selectedServices.filter((s) => s !== title));
    } else {
      setSelectedServices([...selectedServices, title]);
    }
  };

  const selectAllServices = () => {
    setSelectedServices(servicesData.map((s) => s.title));
  };

  const clearAllServices = () => {
    setSelectedServices([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!selectedServices.length) {
      setErrorMessage("Please select at least one service.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formName: "Interactive Scope Estimator Page",
          fullName,
          email,
          phone,
          company,
          services: selectedServices,
          description,
          message: description,
          budget: budget || "To be discussed during scoping",
          timeline,
          preferredContact,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit enquiry.");
      }

      setSubmittedData({
        id: data.enquiry.id,
        fullName: data.enquiry.fullName,
        services: data.enquiry.services,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-24 bg-white min-h-screen relative overflow-hidden text-[#300C41]">
      {/* Blueprint grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#300C41 1px, transparent 1px), linear-gradient(90deg, #300C41 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#300C41]/5 border border-[#300C41]/10 px-3 py-1 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#DEE948]" />
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#300C41]">
              INTERACTIVE SCOPE PLANNER
            </p>
          </div>

          <h1 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#300C41] tracking-tight leading-[1.15]">
            Plan Your Next <span className="underline decoration-[#DEE948] decoration-4 underline-offset-8">Breakthrough</span>
          </h1>

          <p className="font-sans text-base text-[#300C41]/75 leading-relaxed">
            Select your required disciplines and timeline expectations below. Our
            solutions architect will review your technical specifications and
            respond with a personalized proposal within 4 business hours.
          </p>
        </div>

        {/* Confirmation Screen */}
        {submittedData ? (
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#300C41]/15 shadow-violet text-center space-y-6 max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#DEE948] text-[#300C41] flex items-center justify-center mx-auto shadow-lime font-bold">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#300C41] font-bold">
                Enquiry Registered Successfully
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#300C41]">
                Thank You, {submittedData.fullName}!
              </h2>
              <div className="inline-block px-4 py-1.5 rounded-lg bg-[#300C41]/5 border border-[#300C41]/10 font-mono text-sm text-[#300C41] mt-2">
                Reference ID: <span className="font-bold">{submittedData.id}</span>
              </div>
            </div>

            <p className="text-sm text-[#300C41]/75 leading-relaxed max-w-md mx-auto">
              Our engineering team has received your project parameters. A dedicated solutions architect
              will review your requirements and follow up via your preferred contact channel within 2-4 hours.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#300C41] bg-[#DEE948] hover:bg-[#DEE948]/90 rounded-xl shadow-lime transition-all"
              >
                <span>Track in Client Portal</span>
              </Link>

              <button
                type="button"
                onClick={() => setSubmittedData(null)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold text-[#300C41] bg-white hover:bg-[#300C41]/5 border border-[#300C41]/20 rounded-xl transition-all"
              >
                <span>Submit Another Request</span>
              </button>
            </div>
          </div>
        ) : (
          /* Interactive Planner Form */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-6 sm:p-10 border border-[#300C41]/10 shadow-violet space-y-10"
          >
            {/* Step 1: Select Services (All 8 Services) */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#300C41]/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[#300C41] text-[#DEE948] flex items-center justify-center font-mono text-xs font-bold">
                    1
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-[#300C41]">
                    Select Required Services *
                  </h2>
                </div>

                {/* Select All / Clear All buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={selectAllServices}
                    className="px-3 py-1 text-xs font-bold text-[#300C41] hover:bg-[#DEE948] border border-[#300C41]/20 rounded-lg transition-colors cursor-pointer"
                  >
                    Select All (8)
                  </button>
                  <button
                    type="button"
                    onClick={clearAllServices}
                    className="px-3 py-1 text-xs font-bold text-[#300C41]/70 hover:text-[#300C41] bg-[#300C41]/5 border border-[#300C41]/10 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" /> Clear
                  </button>
                </div>
              </div>

              {/* 8 Services Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {servicesData.map((svc) => {
                  const isSelected = selectedServices.includes(svc.title);
                  return (
                    <div
                      key={svc.id}
                      onClick={() => toggleService(svc.title)}
                      className={`cursor-pointer p-4 rounded-xl border transition-all text-left flex flex-col justify-between ${
                        isSelected
                          ? "bg-[#300C41] border-[#300C41] shadow-violet text-white"
                          : "bg-white border-[#300C41]/15 hover:border-[#300C41] text-[#300C41]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className={`font-mono text-xs font-bold ${isSelected ? "text-[#DEE948]" : "text-[#300C41]/50"}`}>
                          {svc.orderNumber}
                        </span>
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isSelected
                              ? "bg-[#DEE948] border-[#DEE948] text-[#300C41]"
                              : "border-[#300C41]/30 bg-white"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                      <div>
                        <div className={`text-xs font-bold ${isSelected ? "text-white" : "text-[#300C41]"}`}>
                          {svc.title}
                        </div>
                        <div className={`text-[10px] truncate mt-0.5 ${isSelected ? "text-white/70" : "text-[#300C41]/60"}`}>
                          {svc.badge}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {selectedServices.length > 0 && (
                <div className="text-xs text-[#300C41] font-mono font-bold flex items-center gap-1.5 pt-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>{selectedServices.length} service(s) selected</span>
                </div>
              )}
            </div>

            {/* Step 2: Parameters (Budget Scope & Timeline) */}
            <div className="space-y-6 border-t border-[#300C41]/10 pt-8">
              <div className="flex items-center gap-2 border-b border-[#300C41]/10 pb-3">
                <div className="w-6 h-6 rounded-md bg-[#300C41] text-[#DEE948] flex items-center justify-center font-mono text-xs font-bold">
                  2
                </div>
                <h2 className="text-base sm:text-lg font-bold text-[#300C41]">
                  Scope Tier & Timeline (Personalized)
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Budget Selection (Optional) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#300C41] flex items-center gap-1.5">
                      <Wallet className="w-3.5 h-3.5 text-[#300C41]" />
                      Scope Tier (Optional)
                    </label>
                    <span className="text-[10px] text-[#300C41]/60 font-mono">Personalized</span>
                  </div>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#300C41]/20 text-[#300C41] text-xs focus:outline-none focus:border-[#300C41]"
                  >
                    {budgetOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Timeline */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#300C41] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#300C41]" />
                    Target Project Timeline
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#300C41]/20 text-[#300C41] text-xs focus:outline-none focus:border-[#300C41]"
                  >
                    {timelineOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Project Description */}
            <div className="space-y-4 border-t border-[#300C41]/10 pt-8">
              <div className="flex items-center gap-2 border-b border-[#300C41]/10 pb-3">
                <div className="w-6 h-6 rounded-md bg-[#300C41] text-[#DEE948] flex items-center justify-center font-mono text-xs font-bold">
                  3
                </div>
                <h2 className="text-base sm:text-lg font-bold text-[#300C41]">
                  Project Description & Specifications *
                </h2>
              </div>

              <div>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your functional goals, target platforms, system expectations, or capstone requirements..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#300C41]/20 text-[#300C41] text-xs focus:outline-none focus:border-[#300C41] leading-relaxed"
                />
              </div>
            </div>

            {/* Step 4: Contact & Organization Details */}
            <div className="space-y-6 border-t border-[#300C41]/10 pt-8">
              <div className="flex items-center gap-2 border-b border-[#300C41]/10 pb-3">
                <div className="w-6 h-6 rounded-md bg-[#300C41] text-[#DEE948] flex items-center justify-center font-mono text-xs font-bold">
                  4
                </div>
                <h2 className="text-base sm:text-lg font-bold text-[#300C41]">
                  Contact & Organization Details
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#300C41] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#300C41]/20 text-[#300C41] text-xs focus:outline-none focus:border-[#300C41]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#300C41] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. alex@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#300C41]/20 text-[#300C41] text-xs focus:outline-none focus:border-[#300C41]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#300C41] mb-1.5">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 7812345412"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#300C41]/20 text-[#300C41] text-xs focus:outline-none focus:border-[#300C41]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#300C41] mb-1.5">
                    Company / University / Institution
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Stanford University / Acme Corp / Independent"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#300C41]/20 text-[#300C41] text-xs focus:outline-none focus:border-[#300C41]"
                  />
                </div>
              </div>

              {/* Preferred Contact Method */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#300C41]">
                  Preferred Contact Method
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {contactOptions.map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setPreferredContact(opt.label)}
                      className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                        preferredContact === opt.label
                          ? "bg-[#300C41] border-[#300C41] text-[#DEE948] shadow-violet"
                          : "bg-white border-[#300C41]/20 text-[#300C41] hover:bg-[#300C41]/5"
                      }`}
                    >
                      {opt.icon}
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="p-4 rounded-xl bg-[#300C41]/10 border border-[#300C41] text-[#300C41] text-xs font-bold">
                {errorMessage}
              </div>
            )}

            {/* Submit & Secondary Options */}
            <div className="pt-4 border-t border-[#300C41]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#300C41]/70">
                <Shield className="w-4 h-4 text-[#300C41]" />
                <span>NDA Protected &bull; 100% Confidential</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-bold tracking-wider uppercase text-white bg-[#300C41] hover:bg-[#230830] hover:text-[#DEE948] rounded-xl shadow-violet transition-all disabled:opacity-50 cursor-pointer"
              >
                <span>{loading ? "Registering Enquiry..." : "Submit Project Specifications"}</span>
                <ArrowRight className="w-4 h-4 text-[#DEE948]" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
