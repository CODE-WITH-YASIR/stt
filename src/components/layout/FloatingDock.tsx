"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowUp } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function FloatingDock() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const recipient = "mohamedyasir2005@gmail.com";
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

  const whatsappUrl =
    siteConfig.contact.whatsappUrl ||
    `https://wa.me/917010886321?text=${encodeURIComponent("Hi NIYAN Team, I am interested in NIYAN Technologies services. I would like to discuss a project.")}`;

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-5 z-40 flex flex-col items-end gap-2">
      {/* Scroll To Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-white hover:bg-[#300C41] border border-[#300C41]/10 flex items-center justify-center text-[#300C41] hover:text-[#DEE948] shadow-lg transition-all animate-in fade-in zoom-in-75 duration-200 cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Floating Action Bar: WhatsApp + Gmail + Scope Estimator */}
      <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/95 backdrop-blur-xl border border-[#300C41]/10 shadow-xl shadow-[#300C41]/10">
        {/* WhatsApp Contact Action (Display ONLY WhatsApp Icon, No phone number displayed) */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-xs hover:scale-105 active:scale-95 transition-all group cursor-pointer"
          title="Chat on WhatsApp"
          aria-label="Chat with NIYAN on WhatsApp"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 fill-current group-hover:scale-110 transition-transform"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>

        {/* Gmail Contact Action (Display ONLY Gmail Icon, No email address displayed) */}
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=mohamedyasir2005@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleGmailClick}
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#DEE948] hover:bg-[#DEE948]/90 text-[#300C41] border border-[#300C41]/15 shadow-xs hover:scale-105 active:scale-95 transition-all group cursor-pointer"
          title="Send Email via Gmail"
          aria-label="Send message via Gmail to NIYAN"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 fill-current group-hover:scale-110 transition-transform"
            aria-hidden="true"
          >
            <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
          </svg>
        </a>

        {/* Scope Estimator trigger */}
        <Link
          href="/enquire"
          className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#300C41] hover:bg-[#230830] text-white hover:text-[#DEE948] text-xs font-semibold transition-all group"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#DEE948]" />
          <span className="hidden sm:inline">Scope Estimator</span>
        </Link>
      </div>
    </div>
  );
}
