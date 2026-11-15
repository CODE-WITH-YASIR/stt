import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const clientId = searchParams.get("clientId");
    const invoices = db.getInvoices(clientId || undefined);
    return NextResponse.json({ success: true, invoices });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, id, clientId, projectId, projectTitle, amount, description } = body;

    if (action === "pay") {
      if (!id) {
        return NextResponse.json({ success: false, error: "Invoice ID required" }, { status: 400 });
      }
      const updated = db.markInvoicePaid(id);
      return NextResponse.json({ success: true, invoice: updated, message: "Invoice marked as paid" });
    }

    // Create invoice
    const numAmount = Number(amount) || 50000;
    const tax = Math.round(numAmount * 0.18);
    const newInvoice = db.createInvoice({
      clientId: clientId || "usr-client-01",
      projectId: projectId || "PRJ-901",
      projectTitle: projectTitle || "Custom Engineering Engagement",
      amount: numAmount,
      tax,
      total: numAmount + tax,
      status: "Pending",
      issueDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      items: [
        {
          description: description || "Professional Engineering & Delivery Services",
          rate: numAmount,
          qty: 1,
          amount: numAmount,
        },
      ],
    });

    return NextResponse.json({ success: true, invoice: newInvoice });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

