"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { servicesData } from "@/config/services";
import {
  Menu,
  X,
  ChevronDown,
  Cpu,
  Bot,
  Globe,
  Smartphone,
  GraduationCap,
  Briefcase,
  BarChart3,
  TrendingUp,
  ArrowRight,
  User,
  Calculator,
} from "lucide-react";

const getServiceIcon = (name: string) => {
  switch (name) {
    case "Cpu":
      return <Cpu className="w-4 h-4 text-[#300C41] group-hover:text-[#DEE948] transition-colors" />;
    case "Bot":
      return <Bot className="w-4 h-4 text-[#300C41] group-hover:text-[#DEE948] transition-colors" />;
    case "Globe":
      return <Globe className="w-4 h-4 text-[#300C41] group-hover:text-[#DEE948] transition-colors" />;
    case "Smartphone":
      return <Smartphone className="w-4 h-4 text-[#300C41] group-hover:text-[#DEE948] transition-colors" />;
    case "GraduationCap":
      return <GraduationCap className="w-4 h-4 text-[#300C41] group-hover:text-[#DEE948] transition-colors" />;
    case "Briefcase":
      return <Briefcase className="w-4 h-4 text-[#300C41] group-hover:text-[#DEE948] transition-colors" />;
    case "BarChart3":
      return <BarChart3 className="w-4 h-4 text-[#300C41] group-hover:text-[#DEE948] transition-colors" />;
    case "TrendingUp":
      return <TrendingUp className="w-4 h-4 text-[#300C41] group-hover:text-[#DEE948] transition-colors" />;
    default:
      return <Cpu className="w-4 h-4 text-[#300C41] group-hover:text-[#DEE948] transition-colors" />;
  }
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-2 sm:top-3 left-0 right-0 z-50 px-3 sm:px-6 transition-all duration-200">
      <div className="mx-auto max-w-7xl rounded-2xl border border-[#300C41]/10 bg-white/95 shadow-[0_10px_28px_rgba(48,12,65,0.06)] backdrop-blur-xl px-4 py-2.5 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#300C41] border border-[#DEE948]/30 shadow-md p-2 transition-transform group-hover:scale-105">
            <svg viewBox="0 0 80 90" className="w-full h-full" fill="none" aria-label="NIYAN logo">
              {/* 3D N — depth layer */}
              <path
                d="M10 76 L10 16 L22 16 L46 50 L46 16 L58 16 L58 76 L46 76 L22 40 L22 76 Z"
                fill="#DEE948"
                transform="translate(3,3)"
                opacity="0.5"
              />
              {/* 3D N — front face */}
              <path
                d="M10 76 L10 16 L22 16 L46 50 L46 16 L58 16 L58 76 L46 76 L22 40 L22 76 Z"
                fill="#FFFFFF"
              />
              {/* Lime top highlights */}
              <rect x="10" y="16" width="12" height="3.5" fill="#DEE948" opacity="0.9" />
              <rect x="46" y="16" width="12" height="3.5" fill="#DEE948" opacity="0.9" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-extrabold text-base sm:text-lg tracking-tight text-[#300C41] group-hover:text-[#300C41] transition-colors flex items-center gap-1.5">
              {siteConfig.name}
              <span className="w-2 h-2 rounded-full bg-[#DEE948] ring-2 ring-[#DEE948]/40 animate-pulse"></span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#300C41]/60 font-semibold">
              AI & Digital Solutions
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
          <Link
            href="/about"
            className={`rounded-lg px-3 py-2 font-sans text-[13px] font-semibold transition-colors ${
              pathname === "/about"
                ? "bg-[#300C41] text-white"
                : "text-[#300C41]/80 hover:bg-[#300C41]/5 hover:text-[#300C41]"
            }`}
          >
            About Us
          </Link>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <Link
              href="/services"
              className={`flex items-center gap-1 rounded-lg px-3 py-2 font-sans text-[13px] font-semibold transition-colors ${
                pathname?.startsWith("/services")
                  ? "bg-[#300C41] text-white"
                  : "text-[#300C41]/80 hover:bg-[#300C41]/5 hover:text-[#300C41]"
              }`}
            >
              Services
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  servicesDropdownOpen ? "rotate-180 text-[#300C41]" : "text-[#300C41]/50"
                }`}
              />
            </Link>

            {servicesDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-80 rounded-2xl border border-[#300C41]/10 bg-white p-2.5 shadow-xl shadow-[#300C41]/10 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 border-b border-[#300C41]/10 mb-1 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#300C41]/60 font-bold">
                    8 Core Services
                  </span>
                  <Link
                    href="/services"
                    className="text-[11px] font-bold text-[#300C41] hover:underline flex items-center gap-0.5"
                  >
                    View All →
                  </Link>
                </div>
                <div className="space-y-0.5">
                  {servicesData.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.slug}`}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#300C41] transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#300C41]/5 border border-[#300C41]/10 flex items-center justify-center shrink-0 group-hover:bg-[#300C41] group-hover:border-[#DEE948]/30">
                        {getServiceIcon(service.iconName)}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-sans text-xs font-semibold text-[#300C41] group-hover:text-white truncate">
                          {service.orderNumber}. {service.title}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/portfolio"
            className={`rounded-lg px-3 py-2 font-sans text-[13px] font-semibold transition-colors ${
              pathname?.startsWith("/portfolio")
                ? "bg-[#300C41] text-white"
                : "text-[#300C41]/80 hover:bg-[#300C41]/5 hover:text-[#300C41]"
            }`}
          >
            Our Work
          </Link>

          <Link
            href="/pricing"
            className={`rounded-lg px-3 py-2 font-sans text-[13px] font-semibold transition-colors ${
              pathname === "/pricing"
                ? "bg-[#300C41] text-white"
                : "text-[#300C41]/80 hover:bg-[#300C41]/5 hover:text-[#300C41]"
            }`}
          >
            How We Work
          </Link>

          <a
            href="/#process"
            className="rounded-lg px-3 py-2 font-sans text-[13px] font-semibold text-[#300C41]/80 hover:bg-[#300C41]/5 hover:text-[#300C41] transition-colors"
          >
            Process
          </a>

          <Link
            href="/enquire"
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 font-sans text-[13px] font-semibold transition-colors ${
              pathname === "/enquire"
                ? "bg-[#300C41] text-[#DEE948]"
                : "text-[#300C41]/80 hover:bg-[#300C41]/5 hover:text-[#300C41]"
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-[#300C41]" />
            Scope Estimator
          </Link>

          <Link
            href="/contact"
            className={`rounded-lg px-3 py-2 font-sans text-[13px] font-semibold transition-colors ${
              pathname === "/contact"
                ? "bg-[#300C41] text-white"
                : "text-[#300C41]/80 hover:bg-[#300C41]/5 hover:text-[#300C41]"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 px-3 py-2 font-sans text-xs font-semibold text-[#300C41]/80 hover:text-[#300C41] hover:bg-[#300C41]/5 rounded-lg transition-colors"
            title="Client Portal"
          >
            <User className="w-3.5 h-3.5 text-[#300C41]" />
            <span>Portal</span>
          </Link>

          <Link
            href="/enquire"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#300C41] hover:bg-[#230830] px-4 sm:px-5 py-2.5 font-sans text-xs sm:text-sm font-semibold text-white hover:text-[#DEE948] shadow-xs hover:shadow-violet transition-all group"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 text-[#DEE948]" />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-[#300C41] hover:bg-[#300C41]/5 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mx-auto max-w-7xl mt-2 rounded-2xl border border-[#300C41]/10 bg-white p-4 shadow-xl shadow-[#300C41]/10 space-y-3">
          <div className="flex flex-col space-y-1">
            <Link
              href="/about"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-[#300C41] hover:bg-[#300C41]/5"
            >
              About Us
            </Link>
            <Link
              href="/services"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-[#300C41] hover:bg-[#300C41]/5"
            >
              All Services (8)
            </Link>
            <Link
              href="/portfolio"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-[#300C41] hover:bg-[#300C41]/5"
            >
              Our Work
            </Link>
            <Link
              href="/pricing"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-[#300C41] hover:bg-[#300C41]/5"
            >
              How We Work
            </Link>
            <a
              href="/#process"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-[#300C41] hover:bg-[#300C41]/5"
            >
              Process
            </a>
            <Link
              href="/enquire"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-[#300C41] bg-[#300C41]/5 flex items-center justify-between"
            >
              <span>Scope Estimator</span>
              <span className="w-2 h-2 rounded-full bg-[#DEE948]"></span>
            </Link>
            <Link
              href="/contact"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-[#300C41] hover:bg-[#300C41]/5"
            >
              Contact
            </Link>
            <Link
              href="/dashboard"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-[#300C41] hover:bg-[#300C41]/5"
            >
              Client Dashboard
            </Link>
            <Link
              href="/admin"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-[#300C41] hover:bg-[#300C41]/5"
            >
              Admin Portal
            </Link>
          </div>

          <div className="pt-2 border-t border-[#300C41]/10">
            <Link
              href="/enquire"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#300C41] text-white hover:text-[#DEE948] text-sm font-semibold shadow-sm"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 text-[#DEE948]" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
