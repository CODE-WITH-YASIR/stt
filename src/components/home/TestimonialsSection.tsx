"use client";

import React, { useState, useEffect } from "react";
import { Review } from "@/lib/db";
import { Star, ShieldCheck, MessageSquarePlus, X, CheckCircle2 } from "lucide-react";

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [organization, setOrganization] = useState("");
  const [serviceUsed, setServiceUsed] = useState("AI & Machine Learning");
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.reviews) {
          setReviews(data.reviews);
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          designation,
          organization,
          serviceUsed,
          rating,
          content,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        if (data.review) {
          setReviews([data.review, ...reviews]);
        }
        setTimeout(() => {
          setModalOpen(false);
          setSubmitted(false);
          setName("");
          setDesignation("");
          setOrganization("");
          setContent("");
        }, 2000);
      }
    } catch {
      // error handling
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-white border-b border-[#300C41]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#300C41]/5 border border-[#300C41]/10 px-3 py-1 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#DEE948]" />
              <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#300C41]">
                CLIENT TESTIMONIALS
              </p>
            </div>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#300C41] tracking-tight leading-[1.15]">
              What Our Partners <span className="underline decoration-[#DEE948] decoration-4 underline-offset-8">Say About Us</span>
            </h2>
            <p className="font-sans text-base text-[#300C41]/75 max-w-xl mt-3 leading-relaxed">
              Real feedback from university scholars, startup founders, and
              enterprise operators who have partnered with our engineering team.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:text-[#DEE948] bg-[#300C41] hover:bg-[#230830] rounded-xl transition-all shadow-violet self-start md:self-auto cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#DEE948]" />
            <span>Submit a Review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-[#300C41]/10 hover:border-[#300C41] hover:shadow-violet transition-all p-7 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Rating & Service */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#DEE948] text-[#300C41]" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#300C41]/5 text-[#300C41] border border-[#300C41]/10 font-bold uppercase tracking-wider">
                    {rev.serviceUsed}
                  </span>
                </div>

                {/* Content */}
                <p className="font-sans text-xs sm:text-sm text-[#300C41]/80 leading-relaxed italic">
                  &ldquo;{rev.content}&rdquo;
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-4 border-t border-[#300C41]/10 flex items-center justify-between mt-6">
                <div>
                  <h4 className="font-sans text-sm font-bold text-[#300C41]">
                    {rev.name}
                  </h4>
                  <p className="font-sans text-xs text-[#300C41]/60">
                    {rev.designation} • {rev.organization}
                  </p>
                </div>
                {rev.isVerified && (
                  <span
                    className="flex items-center gap-1 text-[10px] text-[#300C41] font-bold"
                    title="Verified Customer Review"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#300C41]" />
                    <span>Verified</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#300C41]/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-[#300C41]/20 shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#300C41]/10">
              <div>
                <h3 className="text-xl font-bold text-[#300C41]">
                  Submit Verified Feedback
                </h3>
                <p className="text-xs text-[#300C41]/60 mt-0.5">
                  Your review will be verified by our quality assurance team.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-[#300C41]/60 hover:text-[#300C41] hover:bg-[#300C41]/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#300C41] mx-auto" />
                <h4 className="text-lg font-bold text-[#300C41]">
                  Thank You for Your Feedback!
                </h4>
                <p className="text-xs text-[#300C41]/70">
                  Your review has been recorded and submitted for verification.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#300C41] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Ramesh Kumar"
                    className="w-full px-3.5 py-2 text-xs text-[#300C41] bg-white border border-[#300C41]/20 rounded-lg focus:outline-none focus:border-[#300C41]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#300C41] mb-1">
                      Role / Designation *
                    </label>
                    <input
                      required
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      placeholder="e.g. Lead Researcher"
                      className="w-full px-3.5 py-2 text-xs text-[#300C41] bg-white border border-[#300C41]/20 rounded-lg focus:outline-none focus:border-[#300C41]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#300C41] mb-1">
                      Organization *
                    </label>
                    <input
                      required
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="e.g. Anna University"
                      className="w-full px-3.5 py-2 text-xs text-[#300C41] bg-white border border-[#300C41]/20 rounded-lg focus:outline-none focus:border-[#300C41]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#300C41] mb-1">
                    Service Engaged *
                  </label>
                  <select
                    value={serviceUsed}
                    onChange={(e) => setServiceUsed(e.target.value)}
                    className="w-full px-3 py-2 text-xs text-[#300C41] bg-white border border-[#300C41]/20 rounded-lg focus:outline-none focus:border-[#300C41]"
                  >
                    <option>AI & Machine Learning</option>
                    <option>AI Chatbot Development</option>
                    <option>Web Development</option>
                    <option>App Development</option>
                    <option>Final Year Project Solutions</option>
                    <option>Portfolio Development</option>
                    <option>Data Science & Analytics</option>
                    <option>Digital Marketing & SEO</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#300C41] mb-1">
                    Rating *
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setRating(num)}
                        className={`p-2 rounded-lg border text-xs font-mono font-bold flex items-center gap-1 ${
                          rating >= num
                            ? "bg-[#DEE948] border-[#DEE948] text-[#300C41]"
                            : "border-[#300C41]/20 text-[#300C41]/50"
                        }`}
                      >
                        <Star className="w-3.5 h-3.5 fill-[#300C41] text-[#300C41]" />
                        <span>{num}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#300C41] mb-1">
                    Review Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Describe your collaboration, communication quality, technical depth, and final deliverables..."
                    className="w-full px-3.5 py-2 text-xs text-[#300C41] bg-white border border-[#300C41]/20 rounded-lg focus:outline-none focus:border-[#300C41]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-[#300C41]/70 hover:bg-[#300C41]/5 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 text-xs font-bold rounded-lg bg-[#300C41] hover:bg-[#230830] text-white hover:text-[#DEE948] disabled:opacity-50"
                  >
                    {submitting ? "Submitting..." : "Submit Review"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
