"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  LayoutDashboard,
  MessageSquare,
  FolderGit2,
  Receipt,
  Star,
  BookOpen,
  Layers,
  Trash2,
  LogOut,
  DollarSign,
  Lock,
} from "lucide-react";
import { Enquiry, Project, Invoice, User as DbUser, Review, BlogPost } from "@/lib/db";
import { servicesData } from "@/config/services";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [adminUser, setAdminUser] = useState<{
    id: string;
    name: string;
    email: string;
    role: string;
  } | null>(null);

  const [token, setToken] = useState<string>("");

  // Login form - authorized administrator identity
  const [adminEmail, setAdminEmail] = useState("mohamedyasir2005j@gmail.com");
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Admin section navigation
  const [section, setSection] = useState<
    "overview" | "enquiries" | "projects" | "invoices" | "reviews" | "blog" | "services"
  >("overview");

  // Data states
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Forms / action states
  const [enquiryFilter, setEnquiryFilter] = useState("all");
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesText, setNotesText] = useState("");

  // Create Project modal / form
  const [newProjClientEmail, setNewProjClientEmail] = useState("client@example.com");
  const [newProjClientName, setNewProjClientName] = useState("Sarah Jenkins");
  const [newProjTitle, setNewProjTitle] = useState("");
  const [newProjService, setNewProjService] = useState("AI & Machine Learning");
  const [newProjBudget, setNewProjBudget] = useState("Custom Proposal");

  // Create Blog form
  const [blogTitle, setBlogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState("Artificial Intelligence");
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogContent, setBlogContent] = useState("");

  // Check admin session on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("niyan_admin_token");
    const savedUser = localStorage.getItem("niyan_admin_session");

    if (savedToken && savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed.role === "admin" && parsed.email.toLowerCase() === "mohamedyasir2005j@gmail.com") {
          setAdminUser(parsed);
          setToken(savedToken);
        }
      } catch {
        localStorage.removeItem("niyan_admin_session");
        localStorage.removeItem("niyan_admin_token");
      }
    }
  }, []);

  const getAuthHeaders = (t?: string) => {
    const activeToken = t || token;
    return {
      "Content-Type": "application/json",
      ...(activeToken ? { Authorization: `Bearer ${activeToken}` } : {}),
    };
  };

  const fetchAllData = (activeToken?: string) => {
    const headers = getAuthHeaders(activeToken);
    setLoadingData(true);

    Promise.all([
      fetch("/api/enquiries", { headers }).then((r) => r.json()),
      fetch("/api/projects", { headers }).then((r) => r.json()),
      fetch("/api/invoices", { headers }).then((r) => r.json()),
      fetch("/api/reviews", { headers }).then((r) => r.json()),
      fetch("/api/blog", { headers }).then((r) => r.json()),
    ])
      .then(([enqRes, prjRes, invRes, revRes, blgRes]) => {
        if (enqRes.success) setEnquiries(enqRes.enquiries);
        if (prjRes.success) setProjects(prjRes.projects);
        if (invRes.success) setInvoices(invRes.invoices);
        if (revRes.success) setReviews(revRes.reviews);
        if (blgRes.success) setBlogPosts(blgRes.blogPosts);
      })
      .catch((err) => console.error("Error fetching data:", err))
      .finally(() => setLoadingData(false));
  };

  useEffect(() => {
    if (adminUser && token) {
      fetchAllData(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminUser, token]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/auth/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: adminEmail.trim(), password: adminPassword }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Administrative authentication failed");
      }

      setAdminUser(data.user);
      setToken(data.token);
      localStorage.setItem("niyan_admin_session", JSON.stringify(data.user));
      localStorage.setItem("niyan_admin_token", data.token);

      // Fetch admin data with active token
      fetchAllData(data.token);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed";
      setLoginError(msg);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleAdminLogout = () => {
    setAdminUser(null);
    setToken("");
    localStorage.removeItem("niyan_admin_session");
    localStorage.removeItem("niyan_admin_token");
  };

  // Enquiry status change
  const handleUpdateEnquiryStatus = async (id: string, status: Enquiry["status"]) => {
    try {
      const res = await fetch("/api/enquiries", {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (data.success && data.enquiry) {
        setEnquiries(enquiries.map((e) => (e.id === id ? data.enquiry : e)));
      }
    } catch {}
  };

  // Enquiry note save
  const handleSaveEnquiryNote = async (id: string) => {
    try {
      const res = await fetch("/api/enquiries", {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ id, status: "In Progress", adminNotes: notesText }),
      });
      const data = await res.json();
      if (data.success && data.enquiry) {
        setEnquiries(enquiries.map((e) => (e.id === id ? data.enquiry : e)));
        setEditingNotesId(null);
      }
    } catch {}
  };

  // Delete Enquiry
  const handleDeleteEnquiry = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this enquiry?")) return;
    try {
      const res = await fetch(`/api/enquiries?id=${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries(enquiries.filter((e) => e.id !== id));
      }
    } catch {}
  };

  // Update project progress
  const handleUpdateProjectProgress = async (id: string, progress: number, status?: Project["status"]) => {
    try {
      const res = await fetch("/api/projects", {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ id, progress, status }),
      });
      const data = await res.json();
      if (data.success && data.project) {
        setProjects(projects.map((p) => (p.id === id ? data.project : p)));
      }
    } catch {}
  };

  // Create Project
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          clientEmail: newProjClientEmail,
          clientName: newProjClientName,
          title: newProjTitle,
          serviceType: newProjService,
          budget: newProjBudget,
        }),
      });
      const data = await res.json();
      if (data.success && data.project) {
        setProjects([data.project, ...projects]);
        setNewProjTitle("");
        alert("Project created and assigned to client!");
      }
    } catch {}
  };

  // Publish Blog
  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          title: blogTitle,
          category: blogCategory,
          excerpt: blogExcerpt,
          content: blogContent,
        }),
      });
      const data = await res.json();
      if (data.success && data.post) {
        setBlogPosts([data.post, ...blogPosts]);
        setBlogTitle("");
        setBlogExcerpt("");
        setBlogContent("");
        alert("Article published successfully!");
      }
    } catch {}
  };

  // Delete Blog
  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    try {
      const res = await fetch(`/api/blog?id=${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (data.success) {
        setBlogPosts(blogPosts.filter((b) => b.id !== id));
      }
    } catch {}
  };

  // Toggle review featured
  const handleToggleReviewFeatured = async (id: string) => {
    try {
      const res = await fetch("/api/reviews", {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success && data.review) {
        setReviews(reviews.map((r) => (r.id === id ? data.review : r)));
      }
    } catch {}
  };

  // If not authenticated as admin, show login gate
  if (!adminUser) {
    return (
      <div className="pt-28 pb-24 bg-[#FFFFFF] min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 text-[#300C41]">
        <div className="max-w-md w-full bg-[#FFFFFF] rounded-3xl p-8 border-2 border-[#300C41]/20 shadow-2xl relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#300C41] text-[#DEE948] flex items-center justify-center mx-auto shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#300C41] tracking-tight">Staff & Admin Console</h1>
            <p className="text-xs sm:text-sm text-[#300C41]/70">
              Authorized administrative access for <span className="font-bold text-[#300C41]">{`mohamedyasir2005j@gmail.com`}</span>.
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-[#300C41] font-bold mb-1">Authorized Admin Email</label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border-2 border-[#300C41]/20 text-[#300C41] focus:outline-none focus:border-[#300C41] focus:ring-2 focus:ring-[#DEE948]/50 font-mono transition-all"
              />
            </div>

            <div>
              <label className="block text-[#300C41] font-bold mb-1">Password</label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter authorized administrator password"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border-2 border-[#300C41]/20 text-[#300C41] focus:outline-none focus:border-[#300C41] focus:ring-2 focus:ring-[#DEE948]/50 placeholder-[#300C41]/40 transition-all"
              />
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 px-4 font-bold uppercase tracking-wider text-[#DEE948] bg-[#300C41] hover:bg-[#300C41]/90 rounded-xl transition-all disabled:opacity-50 shadow-md"
            >
              {loginLoading ? "Verifying Credentials..." : "Authenticate as Admin"}
            </button>
          </form>

          <div className="pt-2 text-center text-[11px] text-[#300C41]/60 flex items-center justify-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#300C41]" />
            <span>Server-Enforced JWT Authentication &bull; Bcrypt Protected</span>
          </div>
        </div>
      </div>
    );
  }

  // Calculate Metrics
  const totalEnquiries = enquiries.length;
  const newEnquiries = enquiries.filter((e) => e.status === "New").length;
  const activeProjects = projects.filter((p) => p.status === "In Progress").length;
  const totalRevenue = invoices.reduce((acc, i) => acc + (i.status === "Paid" ? i.total : 0), 0);
  const pendingRevenue = invoices.reduce((acc, i) => acc + (i.status === "Pending" ? i.total : 0), 0);

  return (
    <div className="pt-28 pb-24 bg-[#FFFFFF] min-h-screen text-[#300C41]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Bar */}
        <div className="rounded-3xl p-6 sm:p-8 border-2 border-[#300C41]/15 bg-[#FFFFFF] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#300C41] text-[#DEE948] flex items-center justify-center shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-[#300C41] tracking-tight">Administration Control Center</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#DEE948] text-[#300C41] border border-[#300C41]/20">
                  ROOT
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#300C41]/70 mt-0.5">
                Authorized Identity: <span className="text-[#300C41] font-mono font-bold">{adminUser.email}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchAllData()}
              className="px-4 py-2 text-xs font-bold text-[#300C41] hover:bg-[#300C41]/5 bg-[#FFFFFF] border-2 border-[#300C41]/20 rounded-xl transition-all"
            >
              Refresh Data
            </button>
            <button
              onClick={handleAdminLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#300C41] hover:bg-[#300C41]/90 rounded-xl transition-all shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b-2 border-[#300C41]/10 pb-3">
          <button
            onClick={() => setSection("overview")}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
              section === "overview"
                ? "bg-[#300C41] text-[#DEE948] shadow-md"
                : "bg-[#FFFFFF] text-[#300C41]/70 hover:text-[#300C41] border border-[#300C41]/20 hover:border-[#300C41]"
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Overview & KPIs</span>
          </button>

          <button
            onClick={() => setSection("enquiries")}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
              section === "enquiries"
                ? "bg-[#300C41] text-[#DEE948] shadow-md"
                : "bg-[#FFFFFF] text-[#300C41]/70 hover:text-[#300C41] border border-[#300C41]/20 hover:border-[#300C41]"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Enquiries ({newEnquiries} New)</span>
          </button>

          <button
            onClick={() => setSection("projects")}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
              section === "projects"
                ? "bg-[#300C41] text-[#DEE948] shadow-md"
                : "bg-[#FFFFFF] text-[#300C41]/70 hover:text-[#300C41] border border-[#300C41]/20 hover:border-[#300C41]"
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Project Management ({projects.length})</span>
          </button>

          <button
            onClick={() => setSection("invoices")}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
              section === "invoices"
                ? "bg-[#300C41] text-[#DEE948] shadow-md"
                : "bg-[#FFFFFF] text-[#300C41]/70 hover:text-[#300C41] border border-[#300C41]/20 hover:border-[#300C41]"
            }`}
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>Invoices & Billing ({invoices.length})</span>
          </button>

          <button
            onClick={() => setSection("reviews")}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
              section === "reviews"
                ? "bg-[#300C41] text-[#DEE948] shadow-md"
                : "bg-[#FFFFFF] text-[#300C41]/70 hover:text-[#300C41] border border-[#300C41]/20 hover:border-[#300C41]"
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Testimonials ({reviews.length})</span>
          </button>

          <button
            onClick={() => setSection("blog")}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
              section === "blog"
                ? "bg-[#300C41] text-[#DEE948] shadow-md"
                : "bg-[#FFFFFF] text-[#300C41]/70 hover:text-[#300C41] border border-[#300C41]/20 hover:border-[#300C41]"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Blog Management</span>
          </button>

          <button
            onClick={() => setSection("services")}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
              section === "services"
                ? "bg-[#300C41] text-[#DEE948] shadow-md"
                : "bg-[#FFFFFF] text-[#300C41]/70 hover:text-[#300C41] border border-[#300C41]/20 hover:border-[#300C41]"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Services Catalog (8)</span>
          </button>
        </div>

        {/* SECTION 1: OVERVIEW & KPIS */}
        {section === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="rounded-3xl p-6 border-2 border-[#300C41]/15 bg-[#FFFFFF] shadow-sm space-y-2">
                <div className="flex items-center justify-between text-[#300C41]/70 text-xs font-mono font-bold">
                  <span>TOTAL ENQUIRIES</span>
                  <MessageSquare className="w-4 h-4 text-[#300C41]" />
                </div>
                <div className="text-3xl font-extrabold font-mono text-[#300C41]">{totalEnquiries}</div>
                <div className="text-xs text-[#300C41] font-semibold">{newEnquiries} awaiting response</div>
              </div>

              <div className="rounded-3xl p-6 border-2 border-[#300C41]/15 bg-[#FFFFFF] shadow-sm space-y-2">
                <div className="flex items-center justify-between text-[#300C41]/70 text-xs font-mono font-bold">
                  <span>ACTIVE PROJECTS</span>
                  <FolderGit2 className="w-4 h-4 text-[#300C41]" />
                </div>
                <div className="text-3xl font-extrabold font-mono text-[#300C41]">{activeProjects}</div>
                <div className="text-xs text-[#300C41]/70">{projects.length} total historical</div>
              </div>

              <div className="rounded-3xl p-6 border-2 border-[#300C41]/15 bg-[#FFFFFF] shadow-sm space-y-2">
                <div className="flex items-center justify-between text-[#300C41]/70 text-xs font-mono font-bold">
                  <span>REALIZED REVENUE</span>
                  <DollarSign className="w-4 h-4 text-[#300C41]" />
                </div>
                <div className="text-3xl font-extrabold font-mono text-[#300C41]">
                  {formatCurrency(totalRevenue)}
                </div>
                <div className="text-xs text-[#300C41]/70">Settled invoices</div>
              </div>

              <div className="rounded-3xl p-6 border-2 border-[#300C41]/15 bg-[#FFFFFF] shadow-sm space-y-2">
                <div className="flex items-center justify-between text-[#300C41]/70 text-xs font-mono font-bold">
                  <span>PENDING RECEIVABLES</span>
                  <Receipt className="w-4 h-4 text-[#300C41]" />
                </div>
                <div className="text-3xl font-extrabold font-mono text-[#300C41]">
                  {formatCurrency(pendingRevenue)}
                </div>
                <div className="text-xs text-[#300C41]/70">Under milestone escrow</div>
              </div>
            </div>

            {/* Service Demand Breakdown */}
            <div className="rounded-3xl p-6 border-2 border-[#300C41]/15 bg-[#FFFFFF] shadow-sm space-y-4">
              <h2 className="text-base font-bold text-[#300C41]">Active Service Demand & Pipeline Distribution</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {servicesData.map((svc) => {
                  const count = enquiries.filter((e) =>
                    e.services.some((s) => s.toLowerCase() === svc.title.toLowerCase())
                  ).length;
                  return (
                    <div key={svc.id} className="p-3.5 rounded-2xl bg-[#300C41]/5 border border-[#300C41]/15 space-y-1">
                      <div className="text-xs font-bold text-[#300C41] truncate">{svc.title}</div>
                      <div className="text-xl font-extrabold font-mono text-[#300C41]">{count}</div>
                      <div className="text-[10px] text-[#300C41]/60">Pipeline Inquiries</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: ENQUIRY MANAGEMENT */}
        {section === "enquiries" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-xl font-extrabold text-[#300C41]">Incoming Project Planner Submissions</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#300C41]/70 font-mono font-bold">Filter Status:</span>
                <select
                  value={enquiryFilter}
                  onChange={(e) => setEnquiryFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-[#FFFFFF] border-2 border-[#300C41]/20 text-xs text-[#300C41] font-bold"
                >
                  <option value="all">All Enquiries ({enquiries.length})</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {enquiries
                .filter((e) => enquiryFilter === "all" || e.status === enquiryFilter)
                .map((enq) => (
                  <div
                    key={enq.id}
                    className="rounded-3xl p-6 border-2 border-[#300C41]/15 bg-[#FFFFFF] shadow-sm space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#300C41]/10 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#300C41]">{enq.id}</span>
                          <span className="text-[#300C41]/40">&bull;</span>
                          <span className="text-sm font-bold text-[#300C41]">{enq.fullName}</span>
                          <span className="text-xs text-[#300C41]/70">({enq.company})</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-[#300C41]/70 mt-1 font-mono">
                          <span>{enq.email}</span>
                          <span>&bull;</span>
                          <span>{enq.phone}</span>
                          <span>&bull;</span>
                          <span>Contact via: {enq.preferredContact}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={enq.status}
                          onChange={(e) =>
                            handleUpdateEnquiryStatus(enq.id, e.target.value as Enquiry["status"])
                          }
                          className="px-3 py-1 text-xs rounded-xl bg-[#FFFFFF] border-2 border-[#300C41]/20 text-[#300C41] font-bold"
                        >
                          <option value="New">Status: New</option>
                          <option value="Contacted">Status: Contacted</option>
                          <option value="In Progress">Status: In Progress</option>
                          <option value="Closed">Status: Closed</option>
                        </select>

                        <button
                          onClick={() => handleDeleteEnquiry(enq.id)}
                          className="p-1.5 text-rose-600 hover:text-rose-700 rounded-lg hover:bg-rose-50"
                          title="Delete enquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Services Requested */}
                    <div className="flex flex-wrap gap-1.5">
                      {enq.services.map((svc, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-0.5 text-[11px] font-mono font-bold rounded-full bg-[#DEE948] text-[#300C41] border border-[#300C41]/20"
                        >
                          {svc}
                        </span>
                      ))}
                    </div>

                    {/* Project Description */}
                    <p className="text-xs sm:text-sm text-[#300C41] leading-relaxed bg-[#300C41]/5 p-4 rounded-2xl border border-[#300C41]/10">
                      {enq.description}
                    </p>

                    {/* Metadata bar */}
                    <div className="flex flex-wrap items-center justify-between text-xs text-[#300C41]/70 pt-1">
                      <div>
                        Scope Preference: <span className="text-[#300C41] font-mono font-bold">{enq.budget}</span> &bull; Timeline: <span className="text-[#300C41] font-mono font-bold">{enq.timeline}</span>
                      </div>
                      <div className="font-mono text-[11px] text-[#300C41]/60">
                        Received: {formatDate(enq.createdAt)}
                      </div>
                    </div>

                    {/* Staff Notes */}
                    <div className="pt-2 border-t border-[#300C41]/10">
                      {editingNotesId === enq.id ? (
                        <div className="space-y-2">
                          <textarea
                            rows={2}
                            value={notesText}
                            onChange={(e) => setNotesText(e.target.value)}
                            placeholder="Add internal staff notes on proposal status..."
                            className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border-2 border-[#300C41]/20 rounded-xl text-[#300C41] focus:outline-none focus:border-[#300C41]"
                          />
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleSaveEnquiryNote(enq.id)}
                              className="px-3.5 py-1.5 text-xs font-bold bg-[#300C41] text-[#DEE948] rounded-xl hover:bg-[#300C41]/90 shadow-sm"
                            >
                              Save Notes
                            </button>
                            <button
                              onClick={() => setEditingNotesId(null)}
                              className="px-3 py-1.5 text-xs font-bold text-[#300C41]/60 hover:text-[#300C41]"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#300C41]/70 italic">
                            {enq.adminNotes ? `Staff Notes: "${enq.adminNotes}"` : "No internal notes yet."}
                          </span>
                          <button
                            onClick={() => {
                              setEditingNotesId(enq.id);
                              setNotesText(enq.adminNotes || "");
                            }}
                            className="text-[#300C41] font-bold underline hover:text-[#300C41]/80"
                          >
                            Edit Notes
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* SECTION 3: PROJECT MANAGEMENT */}
        {section === "projects" && (
          <div className="space-y-8">
            {/* Create Project Card */}
            <div className="rounded-3xl p-6 sm:p-8 border-2 border-[#300C41]/15 bg-[#FFFFFF] shadow-sm space-y-4">
              <h2 className="text-base font-bold text-[#300C41]">Create & Assign New Client Project</h2>
              <form onSubmit={handleCreateProject} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-[#300C41] font-bold mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={newProjTitle}
                    onChange={(e) => setNewProjTitle(e.target.value)}
                    placeholder="e.g. BioScan AI Vision System"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border-2 border-[#300C41]/20 text-[#300C41] focus:outline-none focus:border-[#300C41]"
                  />
                </div>
                <div>
                  <label className="block text-[#300C41] font-bold mb-1">Client Email</label>
                  <input
                    type="email"
                    required
                    value={newProjClientEmail}
                    onChange={(e) => setNewProjClientEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border-2 border-[#300C41]/20 text-[#300C41] focus:outline-none focus:border-[#300C41]"
                  />
                </div>
                <div>
                  <label className="block text-[#300C41] font-bold mb-1">Service Type</label>
                  <select
                    value={newProjService}
                    onChange={(e) => setNewProjService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border-2 border-[#300C41]/20 text-[#300C41] focus:outline-none focus:border-[#300C41]"
                  >
                    {servicesData.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-3">
                  <button
                    type="submit"
                    className="px-5 py-2.5 font-bold text-[#DEE948] bg-[#300C41] hover:bg-[#300C41]/90 rounded-xl text-xs transition-all shadow-sm"
                  >
                    Initialize Project
                  </button>
                </div>
              </form>
            </div>

            {/* Existing Projects List */}
            <div className="space-y-4">
              <h2 className="text-base font-bold text-[#300C41]">Active Projects in Delivery ({projects.length})</h2>
              {projects.map((proj) => (
                <div key={proj.id} className="rounded-3xl p-6 border-2 border-[#300C41]/15 bg-[#FFFFFF] shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#300C41]/10 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#300C41]">{proj.id}</span>
                        <h3 className="text-base font-bold text-[#300C41]">{proj.title}</h3>
                      </div>
                      <div className="text-xs text-[#300C41]/70 mt-0.5">
                        Client: {proj.clientName} ({proj.clientEmail}) &bull; {proj.serviceType}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <select
                        value={proj.status}
                        onChange={(e) =>
                          handleUpdateProjectProgress(proj.id, proj.progress, e.target.value as Project["status"])
                        }
                        className="px-3 py-1 text-xs rounded-xl bg-[#FFFFFF] border-2 border-[#300C41]/20 text-[#300C41] font-bold"
                      >
                        <option value="Planning">Planning</option>
                        <option value="In Progress">In Progress</option>
                        <option value="In Review">In Review</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  {/* Progress slider */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#300C41]/70 font-bold">Update Sprint Progress:</span>
                      <span className="text-[#300C41] font-bold">{proj.progress}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={proj.progress}
                      onChange={(e) => handleUpdateProjectProgress(proj.id, Number(e.target.value))}
                      className="w-full accent-[#300C41]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: INVOICES & BILLING */}
        {section === "invoices" && (
          <div className="space-y-6">
            <h2 className="text-xl font-extrabold text-[#300C41]">Commercial Invoices & Private Client Billing</h2>
            <div className="overflow-x-auto rounded-3xl border-2 border-[#300C41]/15 bg-[#FFFFFF] shadow-sm">
              <table className="w-full text-left text-xs text-[#300C41]">
                <thead className="bg-[#300C41] text-white font-mono uppercase tracking-wider border-b border-[#300C41]">
                  <tr>
                    <th className="p-4">Invoice ID</th>
                    <th className="p-4">Client ID</th>
                    <th className="p-4">Project</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Due Date</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#300C41]/10">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-[#300C41]/5 transition-colors">
                      <td className="p-4 font-mono font-bold text-[#300C41]">{inv.id}</td>
                      <td className="p-4 font-mono text-[#300C41]/70">{inv.clientId}</td>
                      <td className="p-4 text-[#300C41] font-bold">{inv.projectTitle}</td>
                      <td className="p-4 font-mono font-bold text-[#300C41]">{formatCurrency(inv.total)}</td>
                      <td className="p-4 font-mono text-[#300C41]/70">{inv.dueDate}</td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                            inv.status === "Paid"
                              ? "bg-[#DEE948] text-[#300C41] border border-[#300C41]/20"
                              : "bg-[#300C41] text-white"
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION 5: TESTIMONIALS */}
        {section === "reviews" && (
          <div className="space-y-6">
            <h2 className="text-xl font-extrabold text-[#300C41]">Verified Customer Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="rounded-3xl p-6 border-2 border-[#300C41]/15 bg-[#FFFFFF] shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#300C41]">{rev.name}</h4>
                      <p className="text-[11px] text-[#300C41]/70">
                        {rev.designation} &bull; {rev.organization}
                      </p>
                    </div>
                    <button
                      onClick={() => handleToggleReviewFeatured(rev.id)}
                      className={`px-3 py-1 text-[10px] font-bold rounded-xl transition-all ${
                        rev.isFeatured ? "bg-[#DEE948] text-[#300C41]" : "bg-[#300C41]/10 text-[#300C41]"
                      }`}
                    >
                      {rev.isFeatured ? "Featured on Home" : "Not Featured"}
                    </button>
                  </div>
                  <p className="text-xs text-[#300C41] italic">&ldquo;{rev.content}&rdquo;</p>
                  <div className="text-[10px] font-mono text-[#300C41]/70 font-bold">
                    Service: {rev.serviceUsed}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 6: BLOG MANAGEMENT */}
        {section === "blog" && (
          <div className="space-y-8">
            <div className="rounded-3xl p-6 sm:p-8 border-2 border-[#300C41]/15 bg-[#FFFFFF] shadow-sm space-y-4">
              <h2 className="text-base font-bold text-[#300C41]">Publish New Engineering Article</h2>
              <form onSubmit={handleCreateBlog} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#300C41] font-bold mb-1">Article Title</label>
                    <input
                      type="text"
                      required
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      placeholder="e.g. Benchmarking Transformer Attention for Multi-Lingual NLP"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border-2 border-[#300C41]/20 text-[#300C41] focus:outline-none focus:border-[#300C41]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#300C41] font-bold mb-1">Category</label>
                    <input
                      type="text"
                      value={blogCategory}
                      onChange={(e) => setBlogCategory(e.target.value)}
                      placeholder="e.g. Artificial Intelligence"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border-2 border-[#300C41]/20 text-[#300C41] focus:outline-none focus:border-[#300C41]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#300C41] font-bold mb-1">Summary / Excerpt</label>
                  <input
                    type="text"
                    value={blogExcerpt}
                    onChange={(e) => setBlogExcerpt(e.target.value)}
                    placeholder="Brief 1-2 sentence overview for the cards..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border-2 border-[#300C41]/20 text-[#300C41] focus:outline-none focus:border-[#300C41]"
                  />
                </div>

                <div>
                  <label className="block text-[#300C41] font-bold mb-1">Content (Markdown)</label>
                  <textarea
                    required
                    rows={6}
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    placeholder="Write article in markdown format..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border-2 border-[#300C41]/20 text-[#300C41] focus:outline-none focus:border-[#300C41] leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 font-bold text-[#DEE948] bg-[#300C41] hover:bg-[#300C41]/90 rounded-xl text-xs transition-all shadow-sm"
                >
                  Publish Article
                </button>
              </form>
            </div>

            <div className="space-y-3">
              <h2 className="text-base font-bold text-[#300C41]">Live Published Articles ({blogPosts.length})</h2>
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 rounded-2xl bg-[#FFFFFF] border-2 border-[#300C41]/15 flex items-center justify-between shadow-sm"
                >
                  <div>
                    <div className="text-sm font-bold text-[#300C41]">{post.title}</div>
                    <div className="text-[11px] text-[#300C41]/70 font-mono">
                      Slug: /{post.slug} &bull; Category: {post.category}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteBlog(post.id)}
                    className="p-2 text-rose-600 hover:text-rose-700"
                    title="Delete article"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 7: SERVICES DIRECTORY */}
        {section === "services" && (
          <div className="space-y-6">
            <h2 className="text-xl font-extrabold text-[#300C41]">Configured Core Disciplines (All 8)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {servicesData.map((svc) => (
                <div key={svc.id} className="p-6 rounded-3xl bg-[#FFFFFF] border-2 border-[#300C41]/15 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#300C41] font-bold">
                      {svc.orderNumber} &bull; {svc.badge}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#300C41] bg-[#DEE948] px-2.5 py-0.5 rounded-full border border-[#300C41]/20">
                      ACTIVE
                    </span>
                  </div>
                  <div className="text-base font-bold text-[#300C41]">{svc.title}</div>
                  <p className="text-xs text-[#300C41]/70 line-clamp-2 leading-relaxed">{svc.shortDescription}</p>
                  <div className="pt-2 flex items-center gap-2">
                    <Link
                      href={`/services/${svc.slug}`}
                      className="text-xs font-bold text-[#300C41] underline hover:text-[#300C41]/80"
                    >
                      View Live Service Page &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
