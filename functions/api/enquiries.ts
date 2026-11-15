/**
 * Cloudflare Pages Function: /api/enquiries
 * Handles Consultation Brief and Enquiry submissions on Cloudflare edge runtime.
 * Dispatches automated notifications to niyantechh@gmail.com with client Reply-To.
 */

interface Env {
  RESEND_API_KEY?: string;
  ENQUIRY_NOTIFICATION_EMAIL?: string;
  EMAIL_FROM?: string;
}

const DEFAULT_RECIPIENT = "niyantechh@gmail.com";
const DEFAULT_SENDER = "Niyan Technologies <onboarding@resend.dev>";
const EMAIL_SUBJECT = "New Client Consultation Request — Niyan Technologies";

function sanitize(input: unknown): string {
  if (typeof input !== "string") return "";
  return input.replace(/<[^>]*>/g, "").trim();
}

function corsHeaders(): HeadersInit {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(),
  });
}

export async function onRequestGet(context: { env: Env }): Promise<Response> {
  const isConfigured = Boolean(context.env.RESEND_API_KEY);
  const recipient = context.env.ENQUIRY_NOTIFICATION_EMAIL || DEFAULT_RECIPIENT;
  return new Response(
    JSON.stringify({
      status: "healthy",
      service: "niyan-consultation-api",
      runtime: "cloudflare-pages-function",
      emailConfigured: isConfigured,
      notificationRecipient: recipient,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders() },
    }
  );
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  try {
    const body = (await context.request.json().catch(() => null)) as Record<string, unknown> | null;

    if (!body || typeof body !== "object") {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid request payload. Expected JSON body.",
        }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders() } }
      );
    }

    // 1. Honeypot anti-spam verification
    if (body.website_hp) {
      console.warn("[SPAM BLOCKED] Honeypot field triggered.");
      return new Response(
        JSON.stringify({
          success: true,
          message: "Thank you! Your consultation request has been submitted successfully. Our team will contact you soon.",
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders() } }
      );
    }

    // 2. Extract and sanitize inputs
    const fullName = sanitize(body.fullName);
    const email = sanitize(body.email).toLowerCase();
    const phone = sanitize(body.phone);
    const company = sanitize(body.company) || "Independent / Organization not specified";
    const projectBrief = sanitize(
      body.description || body.message || body.projectBrief || body.requirements
    );
    const budget = sanitize(body.budget) || "To be discussed during scoping (Personalized)";
    const timeline = sanitize(body.timeline) || "Standard (2-4 Weeks)";
    const preferredContact = sanitize(body.preferredContact) || "Email";
    const formName = sanitize(body.formName) || "Consultation Brief";

    // 3. Multi-select services extraction
    let services: string[] = [];
    if (Array.isArray(body.services)) {
      services = body.services
        .map((s) => sanitize(s))
        .filter((s) => s.length > 0);
    } else if (typeof body.services === "string" && body.services.trim()) {
      services = [sanitize(body.services)];
    }
    if (services.length === 0) {
      services = ["General Technology Consultation"];
    }

    // 4. Validate required fields
    if (!fullName) {
      return new Response(
        JSON.stringify({ success: false, error: "Full Name is required." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders() } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "A valid business email address is required (e.g. name@company.com).",
        }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders() } }
      );
    }

    if (!phone || phone.replace(/\D/g, "").length < 7) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "A valid contact number with at least 7 digits is required.",
        }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders() } }
      );
    }

    if (!projectBrief) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Please provide your project brief or technical requirements.",
        }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders() } }
      );
    }

    // 5. Generate Submission Metadata
    const now = new Date();
    const formattedDateIST = now.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });
    const formattedDateUTC = now.toISOString();
    const enquiryId = `NIYAN-ENQ-${Date.now().toString(36).toUpperCase()}-${Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase()}`;

    const recipient = context.env.ENQUIRY_NOTIFICATION_EMAIL || DEFAULT_RECIPIENT;
    const sender = context.env.EMAIL_FROM || DEFAULT_SENDER;

    // 6. Build Professional HTML Email
    const htmlEmail = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${EMAIL_SUBJECT}</title>
  <style>
    body { margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f6f9; color: #1f1f1f; }
    .email-wrapper { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid rgba(48, 12, 65, 0.12); box-shadow: 0 12px 36px rgba(48, 12, 65, 0.08); }
    .email-header { background: #300C41; padding: 32px 28px; border-bottom: 4px solid #DEE948; text-align: left; }
    .email-header-badge { display: inline-block; background: #DEE948; color: #300C41; font-weight: 800; font-size: 11px; padding: 4px 10px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; }
    .email-header h1 { margin: 0 0 6px 0; color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: -0.02em; }
    .email-header p { margin: 0; color: rgba(255, 255, 255, 0.75); font-size: 12px; font-family: monospace; letter-spacing: 0.1em; }
    .email-body { padding: 28px; }
    .section-label { font-size: 11px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.18em; color: #300C41; font-weight: 800; margin: 24px 0 10px 0; border-bottom: 1px solid rgba(48, 12, 65, 0.08); padding-bottom: 6px; }
    .section-label:first-child { margin-top: 0; }
    .data-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
    .data-table td { padding: 9px 10px; border-bottom: 1px solid #f0edf3; font-size: 13px; vertical-align: top; }
    .data-table td.col-label { font-weight: 700; color: #300C41; width: 34%; }
    .data-table td.col-value { color: #222222; }
    .service-chip { display: inline-block; background: #300C41; color: #DEE948; font-size: 11px; font-weight: 700; padding: 5px 10px; border-radius: 6px; margin: 3px 4px 3px 0; }
    .brief-card { background: #faf9fc; border-left: 4px solid #300C41; padding: 16px; border-radius: 8px; margin: 12px 0 20px 0; }
    .brief-card p { margin: 0; font-size: 13px; line-height: 1.65; color: #222222; white-space: pre-wrap; word-break: break-word; }
    .reply-banner { background: #f4fae6; border: 1px solid #d4e89e; border-radius: 10px; padding: 14px 18px; margin: 22px 0; text-align: center; }
    .reply-banner p { margin: 0 0 10px 0; font-size: 12px; color: #300C41; font-weight: 600; }
    .reply-btn { display: inline-block; background: #300C41; color: #ffffff !important; text-decoration: none; font-weight: 700; font-size: 13px; padding: 12px 24px; border-radius: 8px; }
    .nda-notice { display: flex; align-items: center; gap: 8px; background: rgba(48, 12, 65, 0.04); padding: 10px 14px; border-radius: 8px; font-size: 11px; color: #300C41; margin-top: 20px; }
    .email-footer { background: #faf9fc; padding: 20px 28px; border-top: 1px solid #f0edf3; font-size: 11px; color: #666666; text-align: center; }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-header">
      <span class="email-header-badge">Consultation Brief</span>
      <h1>${EMAIL_SUBJECT}</h1>
      <p>REF ID: ${enquiryId} &bull; SOURCE: ${formName}</p>
    </div>

    <div class="email-body">
      <div class="section-label">1. Client Contact Details</div>
      <table class="data-table">
        <tr>
          <td class="col-label">Full Name</td>
          <td class="col-value"><strong>${fullName}</strong></td>
        </tr>
        <tr>
          <td class="col-label">Business Email</td>
          <td class="col-value"><a href="mailto:${email}" style="color: #300C41; font-weight: 700; text-decoration: underline;">${email}</a></td>
        </tr>
        <tr>
          <td class="col-label">Contact Number</td>
          <td class="col-value"><strong><a href="tel:${phone}" style="color: #300C41; text-decoration: none;">${phone}</a></strong></td>
        </tr>
        <tr>
          <td class="col-label">Company / Organization</td>
          <td class="col-value">${company}</td>
        </tr>
      </table>

      <div class="section-label">2. Services Requested (${services.length})</div>
      <div style="margin-bottom: 16px;">
        ${services.map((svc) => `<span class="service-chip">${svc}</span>`).join(" ")}
      </div>

      <div class="section-label">3. Project Scope Parameters</div>
      <table class="data-table">
        <tr>
          <td class="col-label">Scope / Budget Tier</td>
          <td class="col-value">${budget}</td>
        </tr>
        <tr>
          <td class="col-label">Target Timeline</td>
          <td class="col-value">${timeline}</td>
        </tr>
        <tr>
          <td class="col-label">Preferred Contact</td>
          <td class="col-value">${preferredContact}</td>
        </tr>
        <tr>
          <td class="col-label">Submission Timestamp</td>
          <td class="col-value">${formattedDateIST} (IST)<br><span style="font-size: 11px; color: #777;">${formattedDateUTC}</span></td>
        </tr>
      </table>

      <div class="section-label">4. Project Brief & Technical Requirements</div>
      <div class="brief-card">
        <p>${projectBrief}</p>
      </div>

      <div class="reply-banner">
        <p>&bull; Hit <strong>Reply</strong> in your email client to respond directly to <strong>${email}</strong> &bull;</p>
        <a href="mailto:${email}?subject=${encodeURIComponent(`Re: ${EMAIL_SUBJECT} [${enquiryId}]`)}" class="reply-btn">
          Direct Reply to ${fullName}
        </a>
      </div>

      <div class="nda-notice">
        <span>&#128274; <strong>Confidentiality Guarantee:</strong> This consultation request is covered under Niyan Technologies standard mutual non-disclosure policy.</span>
      </div>
    </div>

    <div class="email-footer">
      Automated consultation delivery for <strong>${recipient}</strong>.<br>
      Niyan Technologies &bull; Chennai, Tamil Nadu, India &bull; Serving Global Clients
    </div>
  </div>
</body>
</html>`;

    // 7. Build Clean Plain-Text Fallback
    const textEmail = `===============================================================
${EMAIL_SUBJECT}
===============================================================
Reference ID : ${enquiryId}
Form Source  : ${formName}
Timestamp    : ${formattedDateIST} (IST) / ${formattedDateUTC}

CLIENT CONTACT DETAILS:
---------------------------------------------------------------
Full Name    : ${fullName}
Business Email: ${email}
Contact Number: ${phone}
Company / Org : ${company}

SERVICES REQUIRED (${services.length}):
---------------------------------------------------------------
${services.map((s) => `* ${s}`).join("\n")}

SCOPE PARAMETERS:
---------------------------------------------------------------
Budget Scope : ${budget}
Timeline     : ${timeline}
Preferred Via: ${preferredContact}

PROJECT BRIEF & TECHNICAL REQUIREMENTS:
---------------------------------------------------------------
${projectBrief}

---------------------------------------------------------------
* Direct Reply: You can reply directly to this notification to
  reach the client at: ${email}
===============================================================
Niyan Technologies — Automated Lead Dispatch
Chennai, Tamil Nadu, India
`;

    // 8. Server-side Email Dispatch via Resend API
    const resendApiKey = context.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.warn(
        `[CONFIG NOTICE] RESEND_API_KEY is not set in Cloudflare Secrets. Submission ${enquiryId} recorded.`
      );
      return new Response(
        JSON.stringify({
          success: false,
          error:
            "Email notification service is pending configuration. Please configure RESEND_API_KEY in Cloudflare environment secrets.",
          configRequired: true,
          enquiryId,
        }),
        { status: 503, headers: { "Content-Type": "application/json", ...corsHeaders() } }
      );
    }

    // Call Resend REST API securely from Cloudflare Worker runtime
    let currentRecipient = recipient;
    let resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey.trim()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [currentRecipient],
        reply_to: email,
        subject: EMAIL_SUBJECT,
        html: htmlEmail,
        text: textEmail,
      }),
    });

    let resendData = (await resendRes.json().catch(() => ({}))) as Record<string, unknown>;

    // If Resend free tier restricts to verified account owner, automatically forward to account owner so lead is never lost
    if (!resendRes.ok) {
      const initialError = String(resendData.message || resendData.error || "");
      const match = initialError.match(/own email address \(([^)]+)\)/);
      if (match && match[1] && currentRecipient !== match[1]) {
        const fallbackOwnerEmail = match[1];
        console.warn(`[RESEND NOTICE] Forwarding lead ${enquiryId} to verified account owner: ${fallbackOwnerEmail}`);
        currentRecipient = fallbackOwnerEmail;
        resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey.trim()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: sender,
            to: [fallbackOwnerEmail],
            reply_to: email,
            subject: EMAIL_SUBJECT,
            html: htmlEmail,
            text: textEmail,
          }),
        });
        resendData = (await resendRes.json().catch(() => ({}))) as Record<string, unknown>;
      }
    }

    if (!resendRes.ok) {
      const errorMsg =
        (typeof resendData.message === "string" && resendData.message) ||
        (typeof resendData.error === "string" && resendData.error) ||
        `Resend API returned status ${resendRes.status}`;
      console.error(`[RESEND ERROR] Failed to send email for ${enquiryId}:`, errorMsg);

      return new Response(
        JSON.stringify({
          success: false,
          error: `Email delivery failed: ${errorMsg}. Please try again or reach out directly to ${recipient}.`,
          enquiryId,
          emailDelivered: false,
        }),
        { status: 502, headers: { "Content-Type": "application/json", ...corsHeaders() } }
      );
    }

    console.log(
      `[EMAIL SUCCESS] Notification successfully delivered to ${recipient} (Resend ID: ${resendData.id || "ok"}) for ${enquiryId}`
    );

    return new Response(
      JSON.stringify({
        success: true,
        message:
          "Thank you! Your consultation request has been submitted successfully. Our team will contact you soon.",
        enquiryId,
        emailDelivered: true,
        recipient: currentRecipient,
        resendId: resendData.id,
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders() } }
    );
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal server error";
    console.error("[CRITICAL ENQUIRY HANDLER ERROR]", errorMsg);

    return new Response(
      JSON.stringify({
        success: false,
        error:
          "An unexpected server error occurred while transmitting your consultation request. Please try again or contact us directly at niyantechh@gmail.com.",
      }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders() } }
    );
  }
}
