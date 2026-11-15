"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, MessageSquare } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Who retains intellectual property (IP) and source code ownership?",
      answer:
        "You retain 100% full, exclusive intellectual property ownership of all custom source code, trained neural model weights, database schemas, and documentation produced during the engagement. Upon final milestone sign-off, full repository admin access and deployment credentials are fully transferred to you.",
    },
    {
      question: "How does your academic and final year project mentoring work?",
      answer:
        "Our academic mentoring is strictly ethical and educational. We do not sell pre-packaged black-box projects. Senior engineers mentor you through topic selection, algorithmic mathematical formulation, architecture diagrams (UML, DFD), and step-by-step code execution. We ensure you understand every line of code so you excel in your viva defense and gain genuine skills.",
    },
    {
      question: "What is your typical project timeline from kickoff to live deployment?",
      answer:
        "Timelines vary depending on scope: modern business websites and portfolios take 1 to 2 weeks; production RAG chatbots and deep learning models typically span 3 to 6 weeks; full-scale SaaS platforms or cross-platform mobile apps generally require 4 to 8 weeks with weekly milestone sprint deliveries.",
    },
    {
      question: "Can we start with a small proof-of-concept (PoC) before committing to a larger build?",
      answer:
        "Yes! Many of our enterprise and startup clients begin with a scoped 2-week Technical Discovery or Proof of Concept to validate feasibility, benchmark model accuracy, or verify UX workflows before committing to full production rollout.",
    },
    {
      question: "What happens after our software or AI solution is launched?",
      answer:
        "Every project includes a complimentary 30-day post-launch warranty covering bug fixes and operational stabilization. Beyond that, we provide flexible Monthly Maintenance Retainers covering cloud infrastructure monitoring, database backups, dependency upgrades, and periodic model retraining.",
    },
    {
      question: "How do you handle data privacy and confidentiality for proprietary models?",
      answer:
        "We sign mutual Non-Disclosure Agreements (NDAs) before examining your data. In addition, all AI models and database pipelines can be trained and containerized within your private cloud perimeter (AWS VPC, GCP, or on-premise hardware) so sensitive data never leaves your infrastructure.",
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-[#300C41]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#300C41]/5 border border-[#300C41]/10 px-3 py-1 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#DEE948]" />
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#300C41]">
              GOT QUESTIONS?
            </p>
          </div>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#300C41] tracking-tight leading-[1.15] mb-4">
            Frequently Asked <span className="underline decoration-[#DEE948] decoration-4 underline-offset-8">Questions</span>
          </h2>
          <p className="font-sans text-base text-[#300C41]/75 max-w-2xl mx-auto leading-relaxed">
            Clear, straightforward answers about how we collaborate, manage
            intellectual property, support academic scholars, and ensure
            engineering quality.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#300C41]/10 shadow-2xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-sans text-sm sm:text-base font-bold text-[#300C41] transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#300C41]/60 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#300C41]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#300C41]/75 leading-relaxed border-t border-[#300C41]/10">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-[#300C41]/10 shadow-violet flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#300C41]/5 text-[#300C41] flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-sans text-sm font-bold text-[#300C41]">
                Have a unique requirement or question?
              </h4>
              <p className="text-xs text-[#300C41]/60">
                Talk directly with our technical leadership team.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="px-5 py-2.5 text-xs font-bold rounded-lg bg-[#300C41] text-white hover:text-[#DEE948] hover:bg-[#230830] transition-colors shrink-0"
          >
            Contact Team
          </Link>
        </div>
      </div>
    </section>
  );
}
