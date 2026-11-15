import fs from "fs";
import path from "path";

export interface Enquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  services: string[];
  description: string;
  budget: string;
  timeline: string;
  preferredContact: string;
  status: "New" | "Contacted" | "In Progress" | "Closed";
  adminNotes?: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "admin" | "client";
  company?: string;
  phone?: string;
  createdAt: string;
}

export interface ProjectMilestone {
  title: string;
  completed: boolean;
  dueDate: string;
}

export interface ProjectDeliverable {
  name: string;
  size: string;
  uploadedAt: string;
}

export interface Project {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  title: string;
  serviceType: string;
  status: "Planning" | "In Progress" | "In Review" | "Completed";
  progress: number;
  startDate: string;
  targetDate: string;
  budget: string;
  description: string;
  milestones: ProjectMilestone[];
  deliverables: ProjectDeliverable[];
}

export interface InvoiceItem {
  description: string;
  rate: number;
  qty: number;
  amount: number;
}

export interface Invoice {
  id: string;
  clientId: string;
  projectId: string;
  projectTitle: string;
  amount: number;
  tax: number;
  total: number;
  status: "Paid" | "Pending" | "Overdue";
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  items: InvoiceItem[];
}

export interface TicketMessage {
  sender: string;
  isStaff: boolean;
  content: string;
  timestamp: string;
}

export interface Ticket {
  id: string;
  clientId: string;
  clientName: string;
  subject: string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "Answered" | "Resolved";
  createdAt: string;
  messages: TicketMessage[];
}

export interface Review {
  id: string;
  name: string;
  designation: string;
  organization: string;
  serviceUsed: string;
  rating: number;
  content: string;
  isVerified: boolean;
  isFeatured: boolean;
  date: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  readTime: string;
  publishedAt: string;
  content: string;
}

export interface DatabaseSchema {
  enquiries: Enquiry[];
  users: User[];
  projects: Project[];
  invoices: Invoice[];
  tickets: Ticket[];
  reviews: Review[];
  blogPosts: BlogPost[];
}

const DB_FILE = path.join(process.cwd(), "src", "data", "db.json");

// High-performance in-memory cache for high-concurrency read scaling
let cachedDb: DatabaseSchema | null = null;
let isWriting = false;
let pendingWriteData: DatabaseSchema | null = null;

function readDb(): DatabaseSchema {
  if (cachedDb) {
    return cachedDb;
  }
  try {
    if (!fs.existsSync(DB_FILE)) {
      throw new Error("db.json not found");
    }
    const data = fs.readFileSync(DB_FILE, "utf-8");
    cachedDb = JSON.parse(data);
    return cachedDb!;
  } catch (err) {
    console.error("Error reading db.json, returning empty fallback:", err);
    cachedDb = {
      enquiries: [],
      users: [],
      projects: [],
      invoices: [],
      tickets: [],
      reviews: [],
      blogPosts: [],
    };
    return cachedDb;
  }
}

async function flushToDisk(data: DatabaseSchema): Promise<void> {
  if (isWriting) {
    pendingWriteData = data;
    return;
  }
  isWriting = true;
  try {
    const json = JSON.stringify(data, null, 2);
    // Write atomically to prevent partial-write file corruption during high concurrency
    const tmpFile = `${DB_FILE}.${Date.now()}-${Math.random().toString(36).substring(2, 7)}.tmp`;
    await fs.promises.writeFile(tmpFile, json, "utf-8");
    await fs.promises.rename(tmpFile, DB_FILE);
  } catch (err) {
    console.error("Error writing db.json asynchronously:", err);
  } finally {
    isWriting = false;
    if (pendingWriteData) {
      const nextData = pendingWriteData;
      pendingWriteData = null;
      flushToDisk(nextData);
    }
  }
}

function writeDb(data: DatabaseSchema): boolean {
  cachedDb = data;
  flushToDisk(data).catch((err) => console.error("Async flush error:", err));
  return true;
}

export const db = {
  // Enquiries
  getEnquiries(): Enquiry[] {
    return readDb().enquiries;
  },
  addEnquiry(enquiry: Omit<Enquiry, "id" | "status" | "createdAt">): Enquiry {
    const data = readDb();
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: `ENQ-${Math.floor(1000 + Math.random() * 9000)}`,
      status: "New",
      createdAt: new Date().toISOString(),
    };
    data.enquiries.unshift(newEnquiry);
    writeDb(data);
    return newEnquiry;
  },
  updateEnquiryStatus(id: string, status: Enquiry["status"], adminNotes?: string): Enquiry | null {
    const data = readDb();
    const idx = data.enquiries.findIndex((e) => e.id === id);
    if (idx === -1) return null;
    data.enquiries[idx].status = status;
    if (adminNotes !== undefined) {
      data.enquiries[idx].adminNotes = adminNotes;
    }
    writeDb(data);
    return data.enquiries[idx];
  },
  deleteEnquiry(id: string): boolean {
    const data = readDb();
    const initialLen = data.enquiries.length;
    data.enquiries = data.enquiries.filter((e) => e.id !== id);
    if (data.enquiries.length !== initialLen) {
      writeDb(data);
      return true;
    }
    return false;
  },

  // Users
  getUsers(): User[] {
    return readDb().users;
  },
  findUserByEmail(email: string): User | undefined {
    return readDb().users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  },
  createUser(user: Omit<User, "id" | "createdAt">): User {
    const data = readDb();
    const newUser: User = {
      ...user,
      id: `usr-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    data.users.push(newUser);
    writeDb(data);
    return newUser;
  },
  updateUser(id: string, update: Partial<User>): User | null {
    const data = readDb();
    const idx = data.users.findIndex((u) => u.id === id);
    if (idx === -1) return null;
    data.users[idx] = { ...data.users[idx], ...update };
    writeDb(data);
    return data.users[idx];
  },

  // Projects
  getProjects(clientId?: string): Project[] {
    const projects = readDb().projects;
    if (clientId) {
      return projects.filter((p) => p.clientId === clientId);
    }
    return projects;
  },
  getProjectById(id: string): Project | undefined {
    return readDb().projects.find((p) => p.id === id);
  },
  createProject(project: Omit<Project, "id">): Project {
    const data = readDb();
    const newProject: Project = {
      ...project,
      id: `PRJ-${Math.floor(100 + Math.random() * 900)}`,
    };
    data.projects.unshift(newProject);
    writeDb(data);
    return newProject;
  },
  updateProjectProgress(id: string, progress: number, status?: Project["status"]): Project | null {
    const data = readDb();
    const idx = data.projects.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    data.projects[idx].progress = progress;
    if (status) data.projects[idx].status = status;
    writeDb(data);
    return data.projects[idx];
  },
  addProjectDeliverable(id: string, deliverable: ProjectDeliverable): Project | null {
    const data = readDb();
    const idx = data.projects.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    data.projects[idx].deliverables.push(deliverable);
    writeDb(data);
    return data.projects[idx];
  },

  // Invoices
  getInvoices(clientId?: string): Invoice[] {
    const invoices = readDb().invoices;
    if (clientId) {
      return invoices.filter((i) => i.clientId === clientId);
    }
    return invoices;
  },
  createInvoice(invoice: Omit<Invoice, "id">): Invoice {
    const data = readDb();
    const newInvoice: Invoice = {
      ...invoice,
      id: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
    };
    data.invoices.unshift(newInvoice);
    writeDb(data);
    return newInvoice;
  },
  markInvoicePaid(id: string): Invoice | null {
    const data = readDb();
    const idx = data.invoices.findIndex((i) => i.id === id);
    if (idx === -1) return null;
    data.invoices[idx].status = "Paid";
    data.invoices[idx].paidDate = new Date().toISOString().split("T")[0];
    writeDb(data);
    return data.invoices[idx];
  },

  // Support Tickets
  getTickets(clientId?: string): Ticket[] {
    const tickets = readDb().tickets;
    if (clientId) {
      return tickets.filter((t) => t.clientId === clientId);
    }
    return tickets;
  },
  createTicket(ticket: Omit<Ticket, "id" | "createdAt" | "status">): Ticket {
    const data = readDb();
    const newTicket: Ticket = {
      ...ticket,
      id: `TCK-${Math.floor(100 + Math.random() * 900)}`,
      status: "Open",
      createdAt: new Date().toISOString(),
    };
    data.tickets.unshift(newTicket);
    writeDb(data);
    return newTicket;
  },
  replyTicket(id: string, message: TicketMessage, status?: Ticket["status"]): Ticket | null {
    const data = readDb();
    const idx = data.tickets.findIndex((t) => t.id === id);
    if (idx === -1) return null;
    data.tickets[idx].messages.push(message);
    if (status) data.tickets[idx].status = status;
    writeDb(data);
    return data.tickets[idx];
  },

  // Reviews
  getReviews(): Review[] {
    return readDb().reviews;
  },
  addReview(review: Omit<Review, "id" | "date" | "isVerified">): Review {
    const data = readDb();
    const newReview: Review = {
      ...review,
      id: `REV-${Math.floor(10 + Math.random() * 90)}`,
      date: new Date().toISOString().split("T")[0],
      isVerified: true,
    };
    data.reviews.unshift(newReview);
    writeDb(data);
    return newReview;
  },
  toggleReviewFeatured(id: string): Review | null {
    const data = readDb();
    const idx = data.reviews.findIndex((r) => r.id === id);
    if (idx === -1) return null;
    data.reviews[idx].isFeatured = !data.reviews[idx].isFeatured;
    writeDb(data);
    return data.reviews[idx];
  },

  // Blog Posts
  getBlogPosts(): BlogPost[] {
    return readDb().blogPosts;
  },
  getBlogPostBySlug(slug: string): BlogPost | undefined {
    return readDb().blogPosts.find((p) => p.slug === slug);
  },
  createBlogPost(post: Omit<BlogPost, "id">): BlogPost {
    const data = readDb();
    const newPost: BlogPost = {
      ...post,
      id: `post-${Date.now()}`,
    };
    data.blogPosts.unshift(newPost);
    writeDb(data);
    return newPost;
  },
  deleteBlogPost(id: string): boolean {
    const data = readDb();
    const initialLen = data.blogPosts.length;
    data.blogPosts = data.blogPosts.filter((p) => p.id !== id);
    if (data.blogPosts.length !== initialLen) {
      writeDb(data);
      return true;
    }
    return false;
  },
};

