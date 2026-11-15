import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

export const PRIMARY_ADMIN_EMAIL = "mohamedyasir2005j@gmail.com";
const JWT_SECRET =
  process.env.ADMIN_JWT_SECRET || "niyan_enterprise_admin_jwt_secret_2026_secured";

export interface AdminTokenPayload {
  id: string;
  email: string;
  role: "admin";
}

export function hashPassword(plainText: string): string {
  return bcrypt.hashSync(plainText, 10);
}

export function comparePassword(plainText: string, hash: string): boolean {
  try {
    if (!hash.startsWith("$2a$") && !hash.startsWith("$2b$")) {
      // Fallback in case of raw password during migration
      return plainText === hash;
    }
    return bcrypt.compareSync(plainText, hash);
  } catch {
    return false;
  }
}

/**
 * Non-blocking asynchronous password verification using libuv threadpool.
 * Prevents event-loop starvation under high concurrency / brute-force load.
 */
export async function comparePasswordAsync(plainText: string, hash: string): Promise<boolean> {
  try {
    if (!hash.startsWith("$2a$") && !hash.startsWith("$2b$")) {
      return plainText === hash;
    }
    return await bcrypt.compare(plainText, hash);
  } catch {
    return false;
  }
}

export function generateAdminToken(payload: AdminTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
}

export function verifyAdminToken(req: NextRequest): AdminTokenPayload | null {
  try {
    // Check Authorization Header
    const authHeader = req.headers.get("authorization");
    let token = "";

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    } else {
      // Check cookies
      const cookie = req.cookies.get("niyan_admin_token");
      if (cookie) {
        token = cookie.value;
      }
    }

    if (!token) return null;

    const decoded = jwt.verify(token, JWT_SECRET) as AdminTokenPayload;

    // Strict validation: must have role admin AND matching authorized email
    if (
      decoded &&
      decoded.role === "admin" &&
      decoded.email.toLowerCase() === PRIMARY_ADMIN_EMAIL.toLowerCase()
    ) {
      return decoded;
    }

    return null;
  } catch {
    return null;
  }
}

