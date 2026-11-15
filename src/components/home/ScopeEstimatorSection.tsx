"use client";

import React, { useState } from "react";
import { servicesData } from "@/config/services";
import {
  Check,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Send,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function ScopeEstimatorSection() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedStage, setSelectedStage] = useState<string>("Prototype / MVP");
  const [selectedTimeline, setSelectedTimeline] = useState<string>("Standard Delivery (4-8 Weeks)");

  // Form states for final step
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const stages = [
    {
      title: "Concept & Scoping",
      desc: "Ideation stage, requiring architecture discovery and technical feasibility analysis.",
    },
    {
      title: "Prototype / MVP",
      desc: "Need a functional release to validate with customers, investors, or academic evaluators.",
    },
    {
      title: "Production Scaling",
      desc: "Existing product requiring robust refactoring, new AI features, or cloud DevOps.",
    },
    {
      title: "Enterprise Modernization",
      desc: "Complex institutional or corporate systems with strict security and custom integrations.",
    },
  ];

  const timelines = [
    {
      title: "Standard Delivery (4-8 Weeks)",
      desc: "Balanced sprints with iterative weekly demos and thorough QA cycles.",
    },
    {
      title: "Accelerated Sprint (2-4 Weeks)",
      desc: "High-velocity dedicated pod for urgent launch deadlines or submissions.",
    },
    {
      title: "Critical Deployment (<2 Weeks)",
      desc: "Emergency turnaround pod for urgent production fixes or capstone deadlines.",
    },
  ];

  const toggleService = (slug: string) => {
    setSelectedServices((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const selectAllServices = () => {
    if (selectedServices.length === servicesData.length) {
      setSelectedServices([]);
    } else {
      setSelectedServices(servicesData.map((s) => s.slug));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setError("Please provide your name, business email, and contact number.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formName: "Homepage – Scope Estimator Section",
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          company: company.trim() || "Independent / Startup",
          services: selectedServices.length > 0 ? selectedServices : ["General Technology Consultation"],
          description: `[Project Stage]: ${selectedStage} | [Timeline]: ${selectedTimeline} | [Notes]: ${notes.trim() || "No additional notes"}`,
          message: `[Project Stage]: ${selectedStage} | [Timeline]: ${selectedTimeline} | [Notes]: ${notes.trim() || "No additional notes"}`,
          budget: "Personalized Scoping (No public prices)",
          preferredContact: "Email",
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        setError(data?.error || "Failed to submit consultation request. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Network error. Please verify your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Dynamic recommendations
  const recommendedPod =
    selectedServices.length > 3
      ? "Full-Stack Senior Engineering Squad (4+ Engineers)"
      : selectedServices.length > 0
      ? "Dedicated Technology Pod (Lead Architect + Full-Stack Engineer)"
      : "Standard Squad (Pending Selection)";

  const targetTimeline =
    selectedTimeline.includes("<2 Weeks")
      ? "1-2 Weeks (Urgent Priority)"
      : selectedTimeline.includes("2-4 Weeks")
      ? "2-4 Weeks (Accelerated)"
      : "4-8 Weeks (Standard Sprints)";

  return (
    <section
      id="estimator"
      className="py-16 lg:py-24 bg-[#300C41] text-white border-b border-white/10 relative overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#DEE948 1px, transparent 1px), linear-gradient(90deg, #DEE948 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#DEE948]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#DEE948]" />
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#DEE948]">
              INTERACTIVE SCOPE PLANNER
            </p>
          </div>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15]">
            Plan Your Next <span className="text-[#DEE948]">Digital Project</span>
          </h2>
          <p className="font-sans font-normal text-base sm:text-lg text-white/80 mt-3 leading-relaxed max-w-2xl mx-auto">
            Tell us what you&apos;re building. We&apos;ll help define the right
            scope, timeline, and team.
          </p>
        </div>

        {/* Step Indicator Tabs */}
        <div className="max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-black/40 rounded-2xl border border-white/10 backdrop-blur-xs">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className={`flex flex-col items-center justify-center text-center py-2.5 px-3 rounded-xl transition-all cursor-pointer ${
                currentStep === 1
                  ? "bg-[#DEE948] shadow-md text-[#300C41] font-bold"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="font-sans text-xs sm:text-sm font-bold leading-tight">
                Capabilities
              </span>
              <span className="font-sans text-[11px] mt-0.5 hidden sm:block opacity-80">
                Select Services
              </span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className={`flex flex-col items-center justify-center text-center py-2.5 px-3 rounded-xl transition-all cursor-pointer ${
                currentStep === 2
                  ? "bg-[#DEE948] shadow-md text-[#300C41] font-bold"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="font-sans text-xs sm:text-sm font-bold leading-tight">
                Project Stage
              </span>
              <span className="font-sans text-[11px] mt-0.5 hidden sm:block opacity-80">
                Maturity Level
              </span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className={`flex flex-col items-center justify-center text-center py-2.5 px-3 rounded-xl transition-all cursor-pointer ${
                currentStep === 3
                  ? "bg-[#DEE948] shadow-md text-[#300C41] font-bold"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="font-sans text-xs sm:text-sm font-bold leading-tight">
                Timeline
              </span>
              <span className="font-sans text-[11px] mt-0.5 hidden sm:block opacity-80">
                Delivery Pace
              </span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className={`flex flex-col items-center justify-center text-center py-2.5 px-3 rounded-xl transition-all cursor-pointer ${
                currentStep === 4
                  ? "bg-[#DEE948] shadow-md text-[#300C41] font-bold"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="font-sans text-xs sm:text-sm font-bold leading-tight">
                Review & Submit
              </span>
              <span className="font-sans text-[11px] mt-0.5 hidden sm:block opacity-80">
                Brief Synthesis
              </span>
            </button>
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Wizard Panes */}
          <div className="lg:col-span-8 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            {/* Step 1: Capabilities */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-sans text-lg sm:text-xl font-bold text-white">
                      What are you looking to build?
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 mt-1">
                      Select one or more services that match your project goals.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={selectAllServices}
                    className="font-mono text-xs font-bold px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#DEE948] hover:text-[#300C41] text-white transition-colors cursor-pointer shrink-0"
                  >
                    {selectedServices.length === servicesData.length
                      ? "Clear All"
                      : "Select All (8)"}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {servicesData.map((s) => {
                    const isSelected = selectedServices.includes(s.slug);
                    return (
                      <div
                        key={s.id}
                        onClick={() => toggleService(s.slug)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                          isSelected
                            ? "bg-white text-[#300C41] border-2 border-[#DEE948] shadow-md"
                            : "bg-white/[0.04] border-white/10 text-white hover:bg-white/[0.08] hover:border-white/20"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                            isSelected
                              ? "bg-[#DEE948] border-[#DEE948] text-[#300C41]"
                              : "border-white/30 bg-transparent"
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <h4
                            className={`font-sans text-sm font-bold leading-tight ${
                              isSelected ? "text-[#300C41]" : "text-white"
                            }`}
                          >
                            {s.title}
                          </h4>
                          <p
                            className={`text-xs mt-1 line-clamp-2 ${
                              isSelected ? "text-[#300C41]/75" : "text-white/60"
                            }`}
                          >
                            {s.shortDescription}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-white/10">
                  <span className="font-mono text-xs text-white/70">
                    {selectedServices.length} of 8 Services Selected
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#DEE948] hover:bg-[#DEE948]/90 text-[#300C41] font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-lime"
                  >
                    <span>Continue to Project Stage</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Project Stage */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-sans text-lg sm:text-xl font-bold text-white">
                    What stage is your initiative currently at?
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 mt-1">
                    This helps us structure the discovery and engineering milestones.
                  </p>
                </div>

                <div className="space-y-3">
                  {stages.map((st, idx) => {
                    const isSelected = selectedStage === st.title;
                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedStage(st.title)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "bg-white text-[#300C41] border-2 border-[#DEE948] shadow-md"
                            : "bg-white/[0.04] border-white/10 text-white hover:bg-white/[0.08]"
                        }`}
                      >
                        <div>
                          <h4
                            className={`font-sans text-sm font-bold ${
                              isSelected ? "text-[#300C41]" : "text-white"
                            }`}
                          >
                            {st.title}
                          </h4>
                          <p
                            className={`text-xs mt-0.5 ${
                              isSelected ? "text-[#300C41]/75" : "text-white/60"
                            }`}
                          >
                            {st.desc}
                          </p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                            isSelected
                              ? "border-[#DEE948] bg-[#DEE948]"
                              : "border-white/30"
                          }`}
                        >
                          {isSelected && <span className="w-2 h-2 rounded-full bg-[#300C41]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="font-sans text-xs text-white/70 hover:text-white"
                  >
                    ← Back to Services
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#DEE948] hover:bg-[#DEE948]/90 text-[#300C41] font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-lime"
                  >
                    <span>Continue to Timeline</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Timeline & Priority */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-sans text-lg sm:text-xl font-bold text-white">
                    What is your target delivery pace?
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 mt-1">
                    Sprint cadence is engineered around your milestone constraints.
                  </p>
                </div>

                <div className="space-y-3">
                  {timelines.map((tl, idx) => {
                    const isSelected = selectedTimeline === tl.title;
                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedTimeline(tl.title)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "bg-white text-[#300C41] border-2 border-[#DEE948] shadow-md"
                            : "bg-white/[0.04] border-white/10 text-white hover:bg-white/[0.08]"
                        }`}
                      >
                        <div>
                          <h4
                            className={`font-sans text-sm font-bold ${
                              isSelected ? "text-[#300C41]" : "text-white"
                            }`}
                          >
                            {tl.title}
                          </h4>
                          <p
                            className={`text-xs mt-0.5 ${
                              isSelected ? "text-[#300C41]/75" : "text-white/60"
                            }`}
                          >
                            {tl.desc}
                          </p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                            isSelected
                              ? "border-[#DEE948] bg-[#DEE948]"
                              : "border-white/30"
                          }`}
                        >
                          {isSelected && <span className="w-2 h-2 rounded-full bg-[#300C41]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="font-sans text-xs text-white/70 hover:text-white"
                  >
                    ← Back to Stage
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#DEE948] hover:bg-[#DEE948]/90 text-[#300C41] font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-lime"
                  >
                    <span>Review & Request Proposal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit Brief */}
            {currentStep === 4 && (
              <div>
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-14 h-14 rounded-full bg-[#DEE948] text-[#300C41] font-bold flex items-center justify-center mx-auto shadow-lime">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      Scope Brief Submitted Successfully!
                    </h3>
                    <p className="text-sm text-white/80 max-w-md mx-auto leading-relaxed">
                      Our lead technical team will review your requirements and
                      send a tailored proposal within 4 business hours.
                    </p>
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setCurrentStep(1);
                        }}
                        className="px-5 py-2.5 text-xs font-bold rounded-lg bg-white/10 hover:bg-[#DEE948] hover:text-[#300C41] text-white transition-colors"
                      >
                        Plan Another Project
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <h3 className="font-sans text-lg sm:text-xl font-bold text-white">
                        Complete Your Project Specification
                      </h3>
                      <p className="text-xs sm:text-sm text-white/70 mt-1">
                        We prepare a deterministic proposal tailored to your specifications.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Alex Morgan"
                          className="w-full px-3.5 py-2.5 text-xs text-[#300C41] bg-white border border-white/20 rounded-lg focus:outline-none focus:border-[#DEE948]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5">
                          Email Address *
                        </label>
                        <input
                          required
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="alex@company.com"
                          className="w-full px-3.5 py-2.5 text-xs text-[#300C41] bg-white border border-white/20 rounded-lg focus:outline-none focus:border-[#DEE948]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5">
                          Contact Number *
                        </label>
                        <input
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. 7812345412"
                          className="w-full px-3.5 py-2.5 text-xs text-[#300C41] bg-white border border-white/20 rounded-lg focus:outline-none focus:border-[#DEE948]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5">
                          Company / College
                        </label>
                        <input
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Company, University or Startup"
                          className="w-full px-3.5 py-2.5 text-xs text-[#300C41] bg-white border border-white/20 rounded-lg focus:outline-none focus:border-[#DEE948]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5">
                        Technical Brief & Goals
                      </label>
                      <textarea
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Describe key features, user flows, dataset requirements or references..."
                        className="w-full px-3.5 py-2.5 text-xs text-[#300C41] bg-white border border-white/20 rounded-lg focus:outline-none focus:border-[#DEE948]"
                      />
                    </div>

                    {error && (
                      <div className="p-3 rounded-lg bg-red-900/60 border border-red-500/50 text-red-200 text-xs font-semibold">
                        {error}
                      </div>
                    )}

                    <div className="pt-2 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="font-sans text-xs text-white/70 hover:text-white"
                      >
                        ← Back to Timeline
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#DEE948] hover:bg-[#DEE948]/90 text-[#300C41] font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-lime disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" />
                        <span>{loading ? "Submitting..." : "Submit Consultation Brief"}</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Real-Time Architecture Summary Rail */}
          <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md space-y-6">
            <div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#DEE948]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The NIYAN Standard</span>
              </div>
              <h4 className="font-sans font-bold text-lg text-white mt-1">
                Enterprise Standards
              </h4>
              <p className="text-xs text-white/70 mt-1 leading-relaxed">
                Why leading startups and established companies partner with NIYAN
                for end-to-end digital execution.
              </p>
            </div>

            {/* Live Scope Diagnostics */}
            <div className="space-y-3 pt-3 border-t border-white/10">
              <div className="p-3 bg-black/40 rounded-xl border border-white/10">
                <span className="block text-[10px] font-mono text-white/60 uppercase tracking-wider">
                  Target Timeline:
                </span>
                <span className="font-sans text-xs font-bold text-[#DEE948]">
                  {selectedServices.length > 0 ? targetTimeline : "Pending Selection"}
                </span>
              </div>

              <div className="p-3 bg-black/40 rounded-xl border border-white/10">
                <span className="block text-[10px] font-mono text-white/60 uppercase tracking-wider">
                  Recommended Pod:
                </span>
                <span className="font-sans text-xs font-bold text-white">
                  {recommendedPod}
                </span>
              </div>

              <div className="p-3 bg-black/40 rounded-xl border border-white/10">
                <span className="block text-[10px] font-mono text-white/60 uppercase tracking-wider">
                  Selected Scope:
                </span>
                <span className="font-sans text-xs font-semibold text-white/80">
                  {selectedServices.length} Capabilities Selected ({selectedStage})
                </span>
              </div>
            </div>

            {/* Enterprise Trust Commitments */}
            <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-white/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#DEE948] shrink-0" />
                <span>Protected by strict mutual NDA & confidentiality</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#DEE948] shrink-0" />
                <span>100% intellectual property & clean codebase handover</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#DEE948] shrink-0" />
                <span>Guaranteed 4-hour response turnaround</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
