"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Search, HelpCircle, ArrowRight } from "lucide-react";

export default function FaqPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = ["All", "General & IP", "AI & Machine Learning", "Academic Mentoring", "Pricing & Sprints"];

  const faqs = [
    {
      category: "General & IP",
      question: "Who owns the source code and trained machine learning models?",
      answer: "You maintain 100% full intellectual property ownership. Once final project deliverables are accepted, our team transfers repository admin ownership, trained model weight files (.pt/.onnx), Docker containers, and database schemas directly to your accounts with zero ongoing royalties or vendor lock-in.",
    },
    {
      category: "General & IP",
      question: "Do you sign Non-Disclosure Agreements (NDAs)?",
      answer: "Yes, absolutely. We routinely execute mutual NDAs prior to reviewing proprietary data, business pitch decks, or intellectual property. Your trade secrets and proprietary data are kept strictly confidential.",
    },
    {
      category: "AI & Machine Learning",
      question: "Can our AI chatbot run on private on-premise infrastructure without external API dependencies?",
      answer: "Yes! We specialize in deploying local open-source LLMs (such as Llama 3, Mistral, and DeepSeek) using vLLM and Ollama on your private cloud (VPC) or local on-premise GPU clusters. This ensures zero data leaves your security boundary.",
    },
    {
      category: "AI & Machine Learning",
      question: "How do you prevent hallucinations in conversational assistants?",
      answer: "We build strict Retrieval-Augmented Generation (RAG) architectures with hybrid dense/sparse vector search, reciprocal rank fusion (RRF), and explicit deterministic rejection boundaries. If source knowledge is absent, the model transparently declines to answer and routes to human support.",
    },
    {
      category: "Academic Mentoring",
      question: "Is your final year project mentoring compliant with academic ethics?",
      answer: "Yes. Our service is grounded in genuine academic tutoring and architectural review. We do not provide shady 'turnkey' projects that students cannot defend. We mentor students through the mathematics, system architectures, IEEE-standard documentation, and debugging so they understand every line of code for their university viva.",
    },
    {
      category: "Academic Mentoring",
      question: "Do you help with IEEE paper formatting and LaTeX documentation?",
      answer: "Yes. We guide you through literature survey synthesis, system block diagrams (UML/DFD), methodology formulation, and statistical error metrics formatted cleanly according to IEEE or Scopus conference templates.",
    },
    {
      category: "Pricing & Sprints",
      question: "What payment milestones do you follow?",
      answer: "Our standard project engagements follow structured milestone payments (e.g. 30% initial deposit upon architecture sign-off, 40% upon staging prototype demonstration, and 30% upon production deployment and final handover).",
    },
    {
      category: "Pricing & Sprints",
      question: "What warranty or bug-fix period is included?",
      answer: "All custom software projects include a standard 30-day post-launch warranty covering bug fixes and system stabilization. For ongoing maintenance, we offer month-to-month retainers.",
    },
  ];

  const filteredFaqs = faqs.filter((f) => {
    const matchesCat = activeCategory === "All" || f.category === activeCategory;
    const matchesSearch =
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="pt-28 pb-24 bg-[#FFFFFF] min-h-screen text-[#300C41]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#300C41] text-[#DEE948] border border-[#DEE948]/30 uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Knowledge Base</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#300C41] tracking-tight leading-tight">
            Frequently Asked <span className="underline decoration-[#DEE948] decoration-4 underline-offset-4">Questions.</span>
          </h1>

          <p className="text-[#300C41]/70 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Find immediate answers regarding our development cycles, academic mentoring ethics,
            source code ownership, and technical SLAs.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#300C41]/50 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions by topic (e.g. source code, IEEE, RAG, pricing)..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[#FFFFFF] border-2 border-[#300C41]/20 text-[#300C41] placeholder-[#300C41]/40 text-xs sm:text-sm focus:outline-none focus:border-[#300C41] focus:ring-2 focus:ring-[#DEE948]/50 transition-all shadow-sm"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                activeCategory === cat
                  ? "bg-[#300C41] text-[#DEE948] shadow-md"
                  : "bg-[#FFFFFF] text-[#300C41]/80 hover:text-[#300C41] border border-[#300C41]/20 hover:border-[#300C41]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 text-[#300C41]/60 text-xs">
              No matching questions found for &ldquo;{search}&rdquo;.
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border-2 border-[#300C41]/10 bg-[#FFFFFF] hover:border-[#300C41]/30 shadow-sm transition-all overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 group"
                    aria-expanded={isOpen}
                  >
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#300C41]/60 block mb-0.5">
                        {faq.category}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-[#300C41] group-hover:text-[#300C41] transition-colors">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-[#300C41] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#300C41]/85 leading-relaxed border-t border-[#300C41]/10">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* CTA */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#300C41] text-white border border-[#300C41] text-center space-y-4 shadow-xl">
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">Have a Unique Technical Scenario?</h3>
          <p className="text-xs sm:text-sm text-white/80 max-w-md mx-auto leading-relaxed">
            Our systems architects can consult with your team to review requirements and provide a feasibility study.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#300C41] bg-[#DEE948] hover:bg-[#DEE948]/90 rounded-xl transition-all shadow-md"
            >
              <span>Ask Our Engineering Team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
