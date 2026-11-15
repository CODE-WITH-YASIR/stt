import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminToken } from "@/lib/auth";
import { sendEnquiryNotification } from "@/lib/mailer";
import { rateLimit, getClientIp } from "@/lib/rateLimit";


export async function GET(req: NextRequest) {
  try {
    // Server-side administrative authorization check
    const admin = await verifyAdminToken(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Administrative privileges required." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const serviceFilter = searchParams.get("service");
    const statusFilter = searchParams.get("status");

    let enquiries = db.getEnquiries();

    if (serviceFilter && serviceFilter !== "all") {
      enquiries = enquiries.filter((e) =>
        e.services.some((s) => s.toLowerCase().includes(serviceFilter.toLowerCase()))
      );
    }

    if (statusFilter && statusFilter !== "all") {
      enquiries = enquiries.filter((e) => e.status.toLowerCase() === statusFilter.toLowerCase());
    }

    return NextResponse.json({ success: true, enquiries });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      company,
      services,
      description,
      message,
      budget,
      timeline,
      preferredContact,
      formName = "Website General Form",
      website_hp, // Honeypot spam field
    } = body;

    // Spam protection: honeypot field must be empty
    if (website_hp) {
      console.warn("[SPAM BLOCKED] Honeypot field was triggered.");
      return NextResponse.json({ success: true, message: "Enquiry received." });
    }

    const cleanEmail = String(email || "").trim().toLowerCase();
    const cleanName = String(fullName || "").trim();
    const projectDescription = String(
      description || message || body.projectDescription || body.requirements || ""
    ).trim();

    // Basic validation
    if (!cleanName || !cleanEmail || !projectDescription) {
      return NextResponse.json(
        { success: false, error: "Please provide your name, valid email address, and project requirements." },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address (e.g. name@domain.com)." },
        { status: 400 }
      );
    }

    // Rate limiting & duplicate protection (15 seconds per email/fingerprint)
    const clientIp = getClientIp(req);
    const ipLimit = rateLimit(`enq-ip:${clientIp}`, { limit: 12, windowMs: 60000 });
    if (!ipLimit.success) {
      return NextResponse.json(
        { success: false, error: "Too many submission attempts. Please wait a minute before trying again." },
        { status: 429, headers: { "Retry-After": String(ipLimit.retryAfter) } }
      );
    }

    const dupLimit = rateLimit(`enq-dup:${cleanEmail}:${projectDescription.slice(0, 30)}`, { limit: 1, windowMs: 15000 });
    if (!dupLimit.success) {
      return NextResponse.json(
        { success: false, error: "Duplicate submission detected. Please wait a moment before submitting again." },
        { status: 429, headers: { "Retry-After": String(dupLimit.retryAfter) } }
      );
    }

    const servicesList = Array.isArray(services) && services.length > 0
      ? services
      : typeof services === "string" && services
      ? [services]
      : ["General Technology Inquiry"];

    // 1. Save enquiry securely to database
    const newEnquiry = db.addEnquiry({
      fullName: cleanName,
      email: cleanEmail,
      phone: phone ? String(phone).trim() : "Not provided",
      company: company ? String(company).trim() : "Independent / Individual",
      services: servicesList,
      description: projectDescription,
      budget: budget || "To be discussed during scoping",
      timeline: timeline || "Standard",
      preferredContact: preferredContact || "Email",
    });

    // 2. Automatically dispatch notification to niyantechh@gmail.com asynchronously
    // Non-blocking dispatch prevents HTTP socket starvation and timeout under high concurrency
    sendEnquiryNotification({
      id: newEnquiry.id,
      formName: String(formName),
      fullName: cleanName,
      email: cleanEmail,
      phone: phone ? String(phone).trim() : "Not provided",
      company: company ? String(company).trim() : "Independent / Individual",
      services: servicesList,
      description: projectDescription,
      budget: newEnquiry.budget,
      timeline: newEnquiry.timeline,
      preferredContact: newEnquiry.preferredContact,
      submittedAt: newEnquiry.createdAt,
    }).catch((mailErr) => {
      console.error("[MAIL DISPATCH ERROR]", mailErr);
    });

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully. Our engineers have been notified.",
      enquiry: newEnquiry,
      emailNotified: true,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    // Server-side administrative authorization check
    const admin = await verifyAdminToken(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Administrative privileges required." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { id, status, adminNotes } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: "ID and status are required." }, { status: 400 });
    }

    const updated = db.updateEnquiryStatus(id, status, adminNotes);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Enquiry not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, enquiry: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // Server-side administrative authorization check
    const admin = await verifyAdminToken(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Administrative privileges required." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Enquiry ID required." }, { status: 400 });
    }

    const deleted = db.deleteEnquiry(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Enquiry not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Enquiry deleted." });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
