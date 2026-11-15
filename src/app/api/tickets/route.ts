import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendEnquiryNotification } from "@/lib/mailer";


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const clientId = searchParams.get("clientId");
    const tickets = db.getTickets(clientId || undefined);
    return NextResponse.json({ success: true, tickets });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, ticketId, clientId, clientName, subject, priority, message, isStaff } = body;

    if (action === "reply") {
      if (!ticketId || !message) {
        return NextResponse.json({ success: false, error: "ticketId and message are required." }, { status: 400 });
      }

      const updated = db.replyTicket(
        ticketId,
        {
          sender: isStaff ? "NIYAN Support" : clientName || "Client",
          isStaff: Boolean(isStaff),
          content: message,
          timestamp: new Date().toISOString(),
        },
        isStaff ? "Answered" : "Open"
      );

      return NextResponse.json({ success: true, ticket: updated });
    }

    // Create ticket
    if (!subject || !message) {
      return NextResponse.json({ success: false, error: "Subject and message are required." }, { status: 400 });
    }

    const newTicket = db.createTicket({
      clientId: clientId || "usr-client-01",
      clientName: clientName || "Valued Client",
      subject,
      priority: priority || "Medium",
      messages: [
        {
          sender: clientName || "Client",
          isStaff: false,
          content: message,
          timestamp: new Date().toISOString(),
        },
      ],
    });

    // Notify niyantechh@gmail.com of support ticket
    try {
      await sendEnquiryNotification({
        id: newTicket.id,
        formName: `Client Portal Support Ticket (${priority} Priority)`,
        fullName: clientName || "Valued Client",
        email: "client@portal.niyan.ai",
        description: `[Subject: ${subject}]\n\n${message}`,
        services: ["Support / Ticket Consultation"],
        budget: "Existing Engagement",
        timeline: priority,
      });
    } catch (e) {
      console.error("[TICKET NOTIFICATION ERROR]", e);
    }

    return NextResponse.json({ success: true, ticket: newTicket });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

