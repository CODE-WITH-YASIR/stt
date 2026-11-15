import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminToken } from "@/lib/auth";


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const clientId = searchParams.get("clientId");
    const projects = db.getProjects(clientId || undefined);
    return NextResponse.json({ success: true, projects });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await verifyAdminToken(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Administrative privileges required." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { clientId, clientName, clientEmail, title, serviceType, budget, targetDate, description } = body;

    if (!title || !clientEmail) {
      return NextResponse.json({ success: false, error: "Title and client email are required." }, { status: 400 });
    }

    const newProject = db.createProject({
      clientId: clientId || "usr-client-01",
      clientName: clientName || "Valued Client",
      clientEmail: clientEmail.toLowerCase(),
      title,
      serviceType: serviceType || "Custom Digital Solution",
      status: "Planning",
      progress: 10,
      startDate: new Date().toISOString().split("T")[0],
      targetDate: targetDate || "2026-12-30",
      budget: budget || "Tailored Scope",
      description: description || "New project engagement",
      milestones: [
        { title: "Project Initiation & Technical Discovery", completed: true, dueDate: "Week 1" },
        { title: "System Architecture & Prototyping", completed: false, dueDate: "Week 2" },
        { title: "Core Implementation & Integration", completed: false, dueDate: "Week 4" },
        { title: "QA Validation & Client Handover", completed: false, dueDate: "Final Week" },
      ],
      deliverables: [],
    });

    return NextResponse.json({ success: true, project: newProject });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, progress, status, deliverable } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Project ID is required." }, { status: 400 });
    }

    if (deliverable) {
      const updated = db.addProjectDeliverable(id, deliverable);
      return NextResponse.json({ success: true, project: updated });
    }

    // Updating progress and status requires admin token
    const admin = await verifyAdminToken(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Administrative privileges required." },
        { status: 401 }
      );
    }

    const updated = db.updateProjectProgress(id, Number(progress), status);
    return NextResponse.json({ success: true, project: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
