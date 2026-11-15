import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { comparePasswordAsync, hashPassword } from "@/lib/auth";
import { sendEnquiryNotification } from "@/lib/mailer";
import { rateLimit, getClientIp } from "@/lib/rateLimit";


export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);
    const rl = rateLimit(`client-auth:${clientIp}`, { limit: 10, windowMs: 60000 });
    if (!rl.success) {
      return NextResponse.json(
        { success: false, error: "Too many authentication requests. Please wait before trying again." },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
      );
    }

    const body = await req.json();
    const { action, email, password, name, company, phone } = body;

    if (action === "login") {
      if (!email || !password) {
        return NextResponse.json(
          { success: false, error: "Email and password are required." },
          { status: 400 }
        );
      }

      const user = db.findUserByEmail(email);
      if (!user) {
        return NextResponse.json(
          { success: false, error: "Invalid credentials." },
          { status: 401 }
        );
      }

      // Explicit separation: Prevent admin authentication through public client login route
      if (user.role === "admin") {
        return NextResponse.json(
          {
            success: false,
            error: "Administrator accounts must authenticate via the restricted Admin Console.",
          },
          { status: 403 }
        );
      }

      // Non-blocking password comparison
      const isValid = await comparePasswordAsync(password, user.passwordHash);
      if (!isValid) {
        return NextResponse.json(
          { success: false, error: "Invalid credentials." },
          { status: 401 }
        );
      }

      const { passwordHash: _, ...safeUser } = user;
      return NextResponse.json({
        success: true,
        user: safeUser,
        message: "Logged in successfully",
      });
    }

    if (action === "register") {
      if (!email || !password || !name) {
        return NextResponse.json(
          { success: false, error: "Name, email, and password are required." },
          { status: 400 }
        );
      }

      const existing = db.findUserByEmail(email);
      if (existing) {
        return NextResponse.json(
          { success: false, error: "An account with this email already exists." },
          { status: 400 }
        );
      }

      // Hash client password securely
      const hashedPassword = hashPassword(password);

      const newUser = db.createUser({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        passwordHash: hashedPassword,
        role: "client",
        company: company ? company.trim() : "Independent",
        phone: phone ? phone.trim() : "",
      });

      // Notify mohamedyasir2005@gmail.com asynchronously without blocking HTTP response
      sendEnquiryNotification({
        id: newUser.id,
        formName: "Client Portal User Registration",
        fullName: name.trim(),
        email: email.trim().toLowerCase(),
        company: company ? company.trim() : "Independent",
        phone: phone ? phone.trim() : "Not provided",
        description: `Client registered account on NIYAN portal for ${company || "Individual/Independent"}.`,
        services: ["Portal Onboarding"],
      }).catch((err) => {
        console.error("[REGISTRATION NOTIFICATION ERROR]", err);
      });

      const { passwordHash: _, ...safeUser } = newUser;
      return NextResponse.json({
        success: true,
        user: safeUser,
        message: "Account created successfully",
      });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
