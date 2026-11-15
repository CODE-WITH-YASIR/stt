import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminToken } from "@/lib/auth";
import { sendEnquiryNotification } from "@/lib/mailer";
import { rateLimit, getClientIp } from "@/lib/rateLimit";


export async function GET() {
  try {
    const reviews = db.getReviews();
    return NextResponse.json(
      { success: true, reviews },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);
    const rl = rateLimit(`review-post:${clientIp}`, { limit: 5, windowMs: 60000 });
    if (!rl.success) {
      return NextResponse.json(
        { success: false, error: "Too many submissions. Please wait before submitting another review." },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
      );
    }

    const body = await req.json();
    const { name, designation, organization, serviceUsed, rating, content } = body;

    if (!name || !content || !serviceUsed) {
      return NextResponse.json(
        { success: false, error: "Name, service used, and feedback content are required." },
        { status: 400 }
      );
    }

    const newReview = db.addReview({
      name: name.trim(),
      designation: designation ? designation.trim() : "Client",
      organization: organization ? organization.trim() : "Independent",
      serviceUsed: serviceUsed.trim(),
      rating: Number(rating) || 5,
      content: content.trim(),
      isFeatured: false,
    });

    // Notify mohamedyasir2005@gmail.com asynchronously without blocking HTTP response
    sendEnquiryNotification({
      id: newReview.id,
      formName: "Client Testimonial & Review Submission",
      fullName: name.trim(),
      email: "verified.review@client.niyan.ai",
      company: organization || "Independent",
      services: [serviceUsed.trim()],
      description: `[Rating: ${rating}/5 Stars] [Role: ${designation || "Client"}]\n\nFeedback:\n${content.trim()}`,
    }).catch((e) => {
      console.error("[REVIEW NOTIFICATION ERROR]", e);
    });

    return NextResponse.json({ success: true, review: newReview, message: "Review submitted for verification" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const admin = await verifyAdminToken(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Administrative privileges required." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Review ID required" }, { status: 400 });
    }

    const updated = db.toggleReviewFeatured(id);
    return NextResponse.json({ success: true, review: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
