"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  FolderGit2,
  Receipt,
  LifeBuoy,
  LogOut,
  PlusCircle,
  CheckCircle2,
  Download,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Building2,
  Phone,
  Mail,
  Key,
} from "lucide-react";
import { Project, Invoice, Ticket } from "@/lib/db";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function CustomerDashboardPage() {
  // Auth state
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    role: string;
    company?: string;
    phone?: string;
  } | null>(null);

  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [loginEmail, setLoginEmail] = useState("client@example.com");
  const [loginPassword, setLoginPassword] = useState("client123");
  const [registerName, setRegisterName] = useState("");
  const [registerCompany, setRegisterCompany] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Dashboard active tab
  const [activeTab, setActiveTab] = useState<"projects" | "invoices" | "tickets" | "new_request" | "profile">("projects");

  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  // New ticket state
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketPriority, setTicketPriority] = useState<"Low" | "Medium" | "High">("Medium");
  const [ticketMessage, setTicketMessage] = useState("");
  const [ticketReplyText, setTicketReplyText] = useState<{ [id: string]: string }>({});

  // Payment processing state
  const [payingInvoiceId, setPayingInvoiceId] = useState<string | null>(null);

  // Profile update state
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Check existing session
  useEffect(() => {
    const saved = localStorage.getItem("niyan_client_session");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed);
      } catch {
        localStorage.removeItem("niyan_client_session");
      }
    }
  }, []);

  // Fetch client data when user logs in
  useEffect(() => {
    if (user) {
      setDataLoading(true);
      Promise.all([
        fetch(`/api/projects?clientId=${user.id}`).then((r) => r.json()),
        fetch(`/api/invoices?clientId=${user.id}`).then((r) => r.json()),
        fetch(`/api/tickets?clientId=${user.id}`).then((r) => r.json()),
      ])
        .then(([projData, invData, tckData]) => {
          if (projData.success) setProjects(projData.projects);
          if (invData.success) setInvoices(invData.invoices);
          if (tckData.success) setTickets(tckData.tickets);
        })
        .finally(() => setDataLoading(false));
    }
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "login",
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Login failed.");
      }

      setUser(data.user);
      localStorage.setItem("niyan_client_session", JSON.stringify(data.user));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid credentials";
      setAuthError(msg);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "register",
          name: registerName,
          email: loginEmail,
          password: loginPassword,
          company: registerCompany,
          phone: registerPhone,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Registration failed.");
      }

      setUser(data.user);
      localStorage.setItem("niyan_client_session", JSON.stringify(data.user));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registration failed";
      setAuthError(msg);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("niyan_client_session");
  };

  const handlePayInvoice = async (invoiceId: string) => {
    setPayingInvoiceId(invoiceId);
    try {
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "pay", id: invoiceId }),
      });
      const data = await res.json();
      if (data.success && data.invoice) {
        setInvoices(invoices.map((inv) => (inv.id === invoiceId ? data.invoice : inv)));
      }
    } catch {
      // error
    } finally {
      setPayingInvoiceId(null);
    }
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: user.id,
          clientName: user.name,
          subject: ticketSubject,
          priority: ticketPriority,
          message: ticketMessage,
        }),
      });
      const data = await res.json();
      if (data.success && data.ticket) {
        setTickets([data.ticket, ...tickets]);
        setTicketSubject("");
        setTicketMessage("");
        setActiveTab("tickets");
      }
    } catch {
      // handle error
    }
  };

  const handleReplyTicket = async (ticketId: string) => {
    const text = ticketReplyText[ticketId];
    if (!text || !user) return;

    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reply",
          ticketId,
          clientName: user.name,
          message: text,
          isStaff: false,
        }),
      });
      const data = await res.json();
      if (data.success && data.ticket) {
        setTickets(tickets.map((t) => (t.id === ticketId ? data.ticket : t)));
        setTicketReplyText({ ...ticketReplyText, [ticketId]: "" });
      }
    } catch {
      // handle error
    }
  };

  // If not logged in, render authentication screen
  if (!user) {
    return (
      <div className="pt-28 pb-24 bg-[#FFFFFF] min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 text-[#300C41]">
        <div className="max-w-md w-full bg-[#FFFFFF] rounded-3xl p-8 border-2 border-[#300C41]/15 shadow-2xl relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#300C41] text-[#DEE948] flex items-center justify-center mx-auto shadow-md">
              <User className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#300C41] tracking-tight">
              Client Portal Access
            </h1>
            <p className="text-xs sm:text-sm text-[#300C41]/70 leading-relaxed">
              Access project deliverables, track milestones, review invoices, and contact support.
            </p>
          </div>

          {/* Quick Demo Login Pill */}
          <div className="p-3.5 rounded-2xl bg-[#300C41]/5 border border-[#300C41]/15 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-[#300C41] block">Pre-Configured Demo Account</span>
              <span className="text-[#300C41]/70 font-mono text-[11px]">client@example.com / client123</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setLoginEmail("client@example.com");
                setLoginPassword("client123");
              }}
              className="px-3 py-1.5 text-[11px] font-bold text-[#DEE948] bg-[#300C41] hover:bg-[#300C41]/90 rounded-xl transition-all shadow-sm"
            >
              Autofill
            </button>
          </div>

          {/* Mode Switcher */}
          <div className="flex border-b-2 border-[#300C41]/10 text-xs">
            <button
              type="button"
              onClick={() => setAuthMode("login")}
              className={`flex-1 pb-3 text-center font-bold transition-colors border-b-2 -mb-[2px] ${
                authMode === "login"
                  ? "border-[#300C41] text-[#300C41]"
                  : "border-transparent text-[#300C41]/50 hover:text-[#300C41]"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setAuthMode("register")}
              className={`flex-1 pb-3 text-center font-bold transition-colors border-b-2 -mb-[2px] ${
                authMode === "register"
                  ? "border-[#300C41] text-[#300C41]"
                  : "border-transparent text-[#300C41]/50 hover:text-[#300C41]"
              }`}
            >
              Register Account
            </button>
          </div>

          <form onSubmit={authMode === "login" ? handleLogin : handleRegister} className="space-y-4 text-xs">
            {authMode === "register" && (
              <>
                <div>
                  <label className="block text-[#300C41] font-bold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border-2 border-[#300C41]/20 text-[#300C41] focus:outline-none focus:border-[#300C41] focus:ring-2 focus:ring-[#DEE948]/50 placeholder-[#300C41]/40 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[#300C41] font-bold mb-1">Company / University</label>
                  <input
                    type="text"
                    value={registerCompany}
                    onChange={(e) => setRegisterCompany(e.target.value)}
                    placeholder="e.g. Vertex Biotech"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border-2 border-[#300C41]/20 text-[#300C41] focus:outline-none focus:border-[#300C41] focus:ring-2 focus:ring-[#DEE948]/50 placeholder-[#300C41]/40 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[#300C41] font-bold mb-1">Contact Number</label>
                  <input
                    type="tel"
                    value={registerPhone}
                    onChange={(e) => setRegisterPhone(e.target.value)}
                    placeholder="e.g. 7812345412"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border-2 border-[#300C41]/20 text-[#300C41] focus:outline-none focus:border-[#300C41] focus:ring-2 focus:ring-[#DEE948]/50 placeholder-[#300C41]/40 transition-all"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-[#300C41] font-bold mb-1">Email Address</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="client@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border-2 border-[#300C41]/20 text-[#300C41] focus:outline-none focus:border-[#300C41] focus:ring-2 focus:ring-[#DEE948]/50 placeholder-[#300C41]/40 transition-all"
              />
            </div>

            <div>
              <label className="block text-[#300C41] font-bold mb-1">Password</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border-2 border-[#300C41]/20 text-[#300C41] focus:outline-none focus:border-[#300C41] focus:ring-2 focus:ring-[#DEE948]/50 placeholder-[#300C41]/40 transition-all"
              />
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 px-4 font-bold uppercase tracking-wider text-[#DEE948] bg-[#300C41] hover:bg-[#300C41]/90 rounded-xl transition-all disabled:opacity-50 shadow-md"
            >
              {authLoading ? "Authenticating..." : authMode === "login" ? "Enter Client Portal" : "Create Account"}
            </button>
          </form>

          <div className="pt-2 text-center text-[11px] text-[#300C41]/60">
            Protected by role-based session authentication &bull; SSL Encrypted
          </div>
        </div>
      </div>
    );
  }

  // Logged-in Customer Dashboard
  return (
    <div className="pt-28 pb-24 bg-[#FFFFFF] min-h-screen text-[#300C41]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header Bar */}
        <div className="rounded-3xl p-6 sm:p-8 border-2 border-[#300C41]/15 bg-[#FFFFFF] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#300C41] text-[#DEE948] flex items-center justify-center text-xl font-extrabold font-mono shadow-md">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-[#300C41] tracking-tight">{user.name}</h1>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#DEE948] text-[#300C41] border border-[#300C41]/20 uppercase">
                  {user.role}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#300C41]/70 mt-0.5">
                {user.company || "Independent Client"} &bull; {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/enquire"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-[#DEE948] bg-[#300C41] hover:bg-[#300C41]/90 rounded-xl transition-all shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Request New Service</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold text-[#300C41] hover:bg-[#300C41]/5 bg-[#FFFFFF] border-2 border-[#300C41]/20 rounded-xl transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b-2 border-[#300C41]/10 pb-3">
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${
              activeTab === "projects"
                ? "bg-[#300C41] text-[#DEE948] shadow-md"
                : "bg-[#FFFFFF] text-[#300C41]/70 hover:text-[#300C41] border border-[#300C41]/20 hover:border-[#300C41]"
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Active Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("invoices")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${
              activeTab === "invoices"
                ? "bg-[#300C41] text-[#DEE948] shadow-md"
                : "bg-[#FFFFFF] text-[#300C41]/70 hover:text-[#300C41] border border-[#300C41]/20 hover:border-[#300C41]"
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span>Invoices & Billing ({invoices.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("tickets")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${
              activeTab === "tickets"
                ? "bg-[#300C41] text-[#DEE948] shadow-md"
                : "bg-[#FFFFFF] text-[#300C41]/70 hover:text-[#300C41] border border-[#300C41]/20 hover:border-[#300C41]"
            }`}
          >
            <LifeBuoy className="w-4 h-4" />
            <span>Support & Tickets ({tickets.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("new_request")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${
              activeTab === "new_request"
                ? "bg-[#300C41] text-[#DEE948] shadow-md"
                : "bg-[#FFFFFF] text-[#300C41]/70 hover:text-[#300C41] border border-[#300C41]/20 hover:border-[#300C41]"
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit Ticket / Request</span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${
              activeTab === "profile"
                ? "bg-[#300C41] text-[#DEE948] shadow-md"
                : "bg-[#FFFFFF] text-[#300C41]/70 hover:text-[#300C41] border border-[#300C41]/20 hover:border-[#300C41]"
            }`}
          >
            <User className="w-4 h-4" />
            <span>My Profile</span>
          </button>
        </div>

        {/* Tab 1: Active Projects */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            {projects.length === 0 ? (
              <div className="rounded-3xl p-12 text-center space-y-3 bg-[#FFFFFF] border-2 border-[#300C41]/15 shadow-sm">
                <FolderGit2 className="w-12 h-12 text-[#300C41]/40 mx-auto" />
                <h3 className="text-base font-bold text-[#300C41]">No active projects yet</h3>
                <p className="text-xs text-[#300C41]/70 max-w-sm mx-auto">
                  When you initiate a project with our engineering team, your milestones and files will appear here.
                </p>
                <Link
                  href="/enquire"
                  className="inline-block mt-2 px-5 py-2.5 text-xs font-bold text-[#DEE948] bg-[#300C41] rounded-xl hover:bg-[#300C41]/90 shadow-sm"
                >
                  Start a Project Planner
                </Link>
              </div>
            ) : (
              projects.map((proj) => (
                <div
                  key={proj.id}
                  className="rounded-3xl p-6 sm:p-8 border-2 border-[#300C41]/15 bg-[#FFFFFF] shadow-sm space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#300C41] font-bold">{proj.id}</span>
                        <span className="text-[#300C41]/40">&bull;</span>
                        <span className="text-xs font-mono text-[#300C41]/70">{proj.serviceType}</span>
                      </div>
                      <h2 className="text-xl font-bold text-[#300C41] mt-1">{proj.title}</h2>
                      <p className="text-xs text-[#300C41]/80 mt-1 max-w-2xl">{proj.description}</p>
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold ${
                          proj.status === "Completed"
                            ? "bg-[#DEE948] text-[#300C41] border border-[#300C41]/20"
                            : "bg-[#300C41] text-white border border-[#300C41]"
                        }`}
                      >
                        {proj.status}
                      </span>
                      <div className="text-xs text-[#300C41]/60 font-mono mt-1">
                        Target Date: {proj.targetDate}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#300C41]/70">Delivery Velocity</span>
                      <span className="text-[#300C41] font-bold">{proj.progress}% Complete</span>
                    </div>
                    <div className="w-full bg-[#300C41]/10 rounded-full h-2.5 overflow-hidden border border-[#300C41]/15">
                      <div
                        className="bg-[#300C41] h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${proj.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Milestones Checklist */}
                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-bold text-[#300C41] uppercase tracking-wider block">
                      Sprint Milestones
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {proj.milestones.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs ${
                            m.completed
                              ? "bg-[#DEE948]/15 border-[#DEE948] text-[#300C41] font-medium"
                              : "bg-[#300C41]/5 border-[#300C41]/15 text-[#300C41]/70"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <CheckCircle2
                              className={`w-4 h-4 shrink-0 ${
                                m.completed ? "text-[#300C41]" : "text-[#300C41]/30"
                              }`}
                            />
                            <span className={m.completed ? "line-through text-[#300C41]/50" : ""}>
                              {m.title}
                            </span>
                          </div>
                          <span className="font-mono text-[11px] text-[#300C41]/60 shrink-0">
                            {m.dueDate}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables Download Section */}
                  {proj.deliverables.length > 0 && (
                    <div className="pt-4 border-t border-[#300C41]/10 space-y-2">
                      <span className="text-xs font-bold text-[#300C41] uppercase tracking-wider block">
                        Handover Artifacts & Model Deliverables
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {proj.deliverables.map((del, dIdx) => (
                          <div
                            key={dIdx}
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFFFFF] border-2 border-[#300C41]/15 text-xs text-[#300C41] hover:border-[#300C41] transition-colors"
                          >
                            <Download className="w-3.5 h-3.5 text-[#300C41]" />
                            <span className="font-bold">{del.name}</span>
                            <span className="font-mono text-[10px] text-[#300C41]/60">({del.size})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Invoices & Billing */}
        {activeTab === "invoices" && (
          <div className="space-y-6">
            <div className="overflow-x-auto rounded-3xl border-2 border-[#300C41]/15 bg-[#FFFFFF] shadow-sm">
              <table className="w-full text-left text-xs text-[#300C41]">
                <thead className="bg-[#300C41] text-white font-mono uppercase tracking-wider border-b border-[#300C41]">
                  <tr>
                    <th className="p-4">Invoice #</th>
                    <th className="p-4">Project</th>
                    <th className="p-4">Due Date</th>
                    <th className="p-4">Total Amount</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#300C41]/10">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-[#300C41]/5 transition-colors">
                      <td className="p-4 font-mono font-bold text-[#300C41]">{inv.id}</td>
                      <td className="p-4">
                        <div className="font-bold text-[#300C41]">{inv.projectTitle}</div>
                        <div className="text-[10px] text-[#300C41]/60">{inv.items[0]?.description}</div>
                      </td>
                      <td className="p-4 font-mono text-[#300C41]/70">{inv.dueDate}</td>
                      <td className="p-4 font-mono font-bold text-[#300C41]">
                        {formatCurrency(inv.total)}
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                            inv.status === "Paid"
                              ? "bg-[#DEE948] text-[#300C41] border border-[#300C41]/20"
                              : "bg-[#300C41] text-white"
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {inv.status === "Pending" ? (
                          <button
                            onClick={() => handlePayInvoice(inv.id)}
                            disabled={payingInvoiceId === inv.id}
                            className="px-3.5 py-1.5 text-xs font-bold text-[#DEE948] bg-[#300C41] hover:bg-[#300C41]/90 rounded-xl transition-all disabled:opacity-50 shadow-sm"
                          >
                            {payingInvoiceId === inv.id ? "Processing..." : "Pay Invoice"}
                          </button>
                        ) : (
                          <span className="text-[11px] font-mono font-bold text-[#300C41]">
                            Paid on {inv.paidDate}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Support Tickets */}
        {activeTab === "tickets" && (
          <div className="space-y-6">
            {tickets.length === 0 ? (
              <div className="rounded-3xl p-12 text-center space-y-3 bg-[#FFFFFF] border-2 border-[#300C41]/15 shadow-sm">
                <LifeBuoy className="w-12 h-12 text-[#300C41]/40 mx-auto" />
                <h3 className="text-base font-bold text-[#300C41]">No active support tickets</h3>
                <p className="text-xs text-[#300C41]/70">
                  Need technical assistance or have a question for the engineering team?
                </p>
                <button
                  onClick={() => setActiveTab("new_request")}
                  className="mt-2 px-5 py-2.5 text-xs font-bold text-[#DEE948] bg-[#300C41] rounded-xl hover:bg-[#300C41]/90 shadow-sm"
                >
                  Open a New Ticket
                </button>
              </div>
            ) : (
              tickets.map((tck) => (
                <div
                  key={tck.id}
                  className="rounded-3xl p-6 border-2 border-[#300C41]/15 bg-[#FFFFFF] shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-[#300C41]/10 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#300C41] font-bold">{tck.id}</span>
                        <span className="text-[#300C41]/40">&bull;</span>
                        <span className="text-xs font-mono text-[#300C41]/70">Priority: {tck.priority}</span>
                      </div>
                      <h3 className="text-base font-bold text-[#300C41] mt-0.5">{tck.subject}</h3>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        tck.status === "Answered"
                          ? "bg-[#DEE948] text-[#300C41] border border-[#300C41]/20"
                          : "bg-[#300C41] text-white"
                      }`}
                    >
                      {tck.status}
                    </span>
                  </div>

                  {/* Messages Thread */}
                  <div className="space-y-3 pt-1">
                    {tck.messages.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className={`p-4 rounded-2xl text-xs space-y-1 ${
                          m.isStaff
                            ? "bg-[#300C41] text-white"
                            : "bg-[#300C41]/5 border border-[#300C41]/15 text-[#300C41]"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className={m.isStaff ? "text-[#DEE948] font-bold" : "text-[#300C41] font-bold"}>
                            {m.sender} {m.isStaff && "(Staff Lead)"}
                          </span>
                          <span className={m.isStaff ? "text-white/60" : "text-[#300C41]/60"}>
                            {formatDate(m.timestamp)}
                          </span>
                        </div>
                        <p className="leading-relaxed">{m.content}</p>
                      </div>
                    ))}
                  </div>

                  {/* Reply Form */}
                  <div className="pt-2 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Type a reply to our engineering team..."
                      value={ticketReplyText[tck.id] || ""}
                      onChange={(e) =>
                        setTicketReplyText({ ...ticketReplyText, [tck.id]: e.target.value })
                      }
                      className="flex-1 px-3.5 py-2.5 text-xs rounded-xl bg-[#FFFFFF] border-2 border-[#300C41]/20 text-[#300C41] placeholder-[#300C41]/40 focus:outline-none focus:border-[#300C41]"
                    />
                    <button
                      type="button"
                      onClick={() => handleReplyTicket(tck.id)}
                      className="px-5 py-2.5 text-xs font-bold text-[#DEE948] bg-[#300C41] hover:bg-[#300C41]/90 rounded-xl transition-all shadow-sm"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 4: Submit New Support Ticket */}
        {activeTab === "new_request" && (
          <div className="rounded-3xl p-6 sm:p-8 border-2 border-[#300C41]/15 bg-[#FFFFFF] shadow-sm max-w-2xl space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-[#300C41]">Open a Technical Support Ticket</h2>
              <p className="text-xs text-[#300C41]/70 mt-1">
                Directly communicate with your lead engineer regarding code questions, architecture, or bug reports.
              </p>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#300C41] font-bold mb-1">Subject *</label>
                <input
                  type="text"
                  required
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="e.g. Question regarding deployment or latency"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border-2 border-[#300C41]/20 text-[#300C41] placeholder-[#300C41]/40 focus:outline-none focus:border-[#300C41]"
                />
              </div>

              <div>
                <label className="block text-[#300C41] font-bold mb-1">Priority Level</label>
                <select
                  value={ticketPriority}
                  onChange={(e) => setTicketPriority(e.target.value as "Low" | "Medium" | "High")}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border-2 border-[#300C41]/20 text-[#300C41] focus:outline-none focus:border-[#300C41]"
                >
                  <option value="Low">Low - General Question</option>
                  <option value="Medium">Medium - Milestone Clarification</option>
                  <option value="High">High - Production / Sprint Blocker</option>
                </select>
              </div>

              <div>
                <label className="block text-[#300C41] font-bold mb-1">Detailed Message *</label>
                <textarea
                  required
                  rows={5}
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  placeholder="Provide exact error logs, reproduction steps, or question details..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border-2 border-[#300C41]/20 text-[#300C41] placeholder-[#300C41]/40 focus:outline-none focus:border-[#300C41] leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 font-bold uppercase tracking-wider text-[#DEE948] bg-[#300C41] hover:bg-[#300C41]/90 rounded-xl transition-all shadow-md"
              >
                Submit Support Request
              </button>
            </form>
          </div>
        )}

        {/* Tab 5: Profile Management */}
        {activeTab === "profile" && (
          <div className="rounded-3xl p-6 sm:p-8 border-2 border-[#300C41]/15 bg-[#FFFFFF] shadow-sm max-w-xl space-y-6">
            <h2 className="text-xl font-extrabold text-[#300C41]">Profile & Account Settings</h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[#300C41]/70 font-mono mb-1 font-bold">Account Name</label>
                <input
                  type="text"
                  disabled
                  value={user.name}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#300C41]/5 border border-[#300C41]/15 text-[#300C41] font-medium"
                />
              </div>

              <div>
                <label className="block text-[#300C41]/70 font-mono mb-1 font-bold">Email Address</label>
                <input
                  type="email"
                  disabled
                  value={user.email}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#300C41]/5 border border-[#300C41]/15 text-[#300C41] font-medium"
                />
              </div>

              <div>
                <label className="block text-[#300C41]/70 font-mono mb-1 font-bold">Organization / Institution</label>
                <input
                  type="text"
                  disabled
                  value={user.company || "Independent"}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#300C41]/5 border border-[#300C41]/15 text-[#300C41] font-medium"
                />
              </div>

              <div>
                <label className="block text-[#300C41]/70 font-mono mb-1 font-bold">Phone Number</label>
                <input
                  type="text"
                  disabled
                  value={user.phone || "Not configured"}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#300C41]/5 border border-[#300C41]/15 text-[#300C41] font-medium"
                />
              </div>

              <div className="pt-2 text-[11px] text-[#300C41]/60">
                To update your verified legal name or company organization, contact your dedicated account lead.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
