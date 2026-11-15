import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { PRIMARY_ADMIN_EMAIL, comparePasswordAsync, generateAdminToken } from "@/lib/auth";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);
    // Strict rate limiting: 5 admin login attempts per minute per IP to prevent brute-force attacks
    const rl = rateLimit(`admin-auth:${clientIp}`, { limit: 5, windowMs: 60000 });
    if (!rl.success) {
      return NextResponse.json(
        { success: false, error: "Too many login attempts. Administrative endpoint throttled for security." },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
      );
    }

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    // Strict validation: email must match the authorized admin email
    if (email.trim().toLowerCase() !== PRIMARY_ADMIN_EMAIL.toLowerCase()) {
      return NextResponse.json(
        { success: false, error: "Access denied. Unauthorized administrative identity." },
        { status: 403 }
      );
    }

    const adminUser = db.findUserByEmail(PRIMARY_ADMIN_EMAIL);
    if (!adminUser || adminUser.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Administrator identity not registered in system." },
        { status: 404 }
      );
    }

    const isValidPassword = await comparePasswordAsync(password, adminUser.passwordHash);
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: "Invalid administrative credentials." },
        { status: 401 }
      );
    }

    // Generate cryptographically signed JWT token
    const token = generateAdminToken({
      id: adminUser.id,
      email: adminUser.email,
      role: "admin",
    });

    const response = NextResponse.json({
      success: true,
      message: "Administrator session established",
      token,
      user: {
        id: adminUser.id,
        name: adminUser.name,
        email: adminUser.email,
        role: "admin",
      },
    });

    // Set secure HTTP-only cookie
    response.cookies.set("niyan_admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 hours
      path: "/",
    });

    return response;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

