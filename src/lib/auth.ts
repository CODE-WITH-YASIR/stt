import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

export const PRIMARY_ADMIN_EMAIL = "niyantechh@gmail.com";
export const ALLOWED_ADMIN_EMAILS = [
  "niyantechh@gmail.com",
  "mohamedyasir2005j@gmail.com",
];
const JWT_SECRET =
  process.env.ADMIN_JWT_SECRET || "niyan_enterprise_admin_jwt_secret_2026_secured";

export interface AdminTokenPayload {
  id: string;
  email: string;
  role: "admin";
  exp?: number;
}

export function hashPassword(plainText: string): string {
  return bcrypt.hashSync(plainText, 10);
}

export function comparePassword(plainText: string, hash: string): boolean {
  try {
    if (!hash.startsWith("$2a$") && !hash.startsWith("$2b$")) {
      return plainText === hash;
    }
    return bcrypt.compareSync(plainText, hash);
  } catch {
    return false;
  }
}

/**
 * Non-blocking asynchronous password verification.
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

function base64UrlEncode(data: string | Uint8Array): string {
  let base64 = "";
  if (typeof data === "string") {
    if (typeof Buffer !== "undefined") {
      base64 = Buffer.from(data, "utf8").toString("base64");
    } else {
      base64 = btoa(unescape(encodeURIComponent(data)));
    }
  } else {
    if (typeof Buffer !== "undefined") {
      base64 = Buffer.from(data).toString("base64");
    } else {
      let binary = "";
      for (let i = 0; i < data.byteLength; i++) {
        binary += String.fromCharCode(data[i]);
      }
      base64 = btoa(binary);
    }
  }
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) base64 += "=";
  if (typeof Buffer !== "undefined") {
    return Buffer.from(base64, "base64").toString("utf8");
  }
  return decodeURIComponent(escape(atob(base64)));
}

async function getHmacKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

/**
 * RFC 7519 compliant JWT generator using native Web Crypto API.
 * 100% compatible with Node.js, Next.js Edge Runtime, and Cloudflare Workers.
 */
export async function generateAdminToken(payload: AdminTokenPayload): Promise<string> {
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const exp = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 24 hours
  const body = base64UrlEncode(JSON.stringify({ ...payload, exp }));
  const data = `${header}.${body}`;
  const key = await getHmacKey(JWT_SECRET);
  const enc = new TextEncoder();
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  const sigEncoded = base64UrlEncode(new Uint8Array(signature));
  return `${data}.${sigEncoded}`;
}

/**
 * RFC 7519 compliant JWT verifier using native Web Crypto API.
 */
export async function verifyAdminToken(req: NextRequest): Promise<AdminTokenPayload | null> {
  try {
    const authHeader = req.headers.get("authorization");
    let token = "";

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    } else {
      const cookie = req.cookies.get("niyan_admin_token");
      if (cookie) {
        token = cookie.value;
      }
    }

    if (!token) return null;

    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [headerB64, bodyB64, sigB64] = parts;
    const data = `${headerB64}.${bodyB64}`;
    const key = await getHmacKey(JWT_SECRET);
    const enc = new TextEncoder();

    let base64 = sigB64.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) base64 += "=";
    const binary = atob(base64);
    const sigBytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      sigBytes[i] = binary.charCodeAt(i);
    }

    const isValid = await crypto.subtle.verify("HMAC", key, sigBytes, enc.encode(data));
    if (!isValid) return null;

    const payload = JSON.parse(base64UrlDecode(bodyB64)) as AdminTokenPayload;

    if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) {
      return null;
    }

    if (
      payload &&
      payload.role === "admin" &&
      ALLOWED_ADMIN_EMAILS.some(
        (e) => e.toLowerCase() === payload.email.toLowerCase()
      )
    ) {
      return payload;
    }

    return null;
  } catch {
    return null;
  }
}
