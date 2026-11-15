import nodemailer from "nodemailer";

export interface EnquiryNotificationPayload {
  id: string;
  formName?: string;
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  services?: string[];
  description: string;
  budget?: string;
  timeline?: string;
  preferredContact?: string;
  submittedAt?: string;
}

const PRIMARY_RECIPIENT =
  process.env.ENQUIRY_NOTIFICATION_EMAIL || "niyantechh@gmail.com";
const DEFAULT_SENDER =
  process.env.EMAIL_FROM || "Niyan Technologies <onboarding@resend.dev>";
const EMAIL_SUBJECT = "New Client Consultation Request — Niyan Technologies";

/**
 * Creates a nodemailer transporter based on environment variables.
 * Used when running in a Node.js runtime with SMTP credentials.
 */
function createTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT) || 465;
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

/**
 * Builds the professional HTML email notification.
 */
export function buildEnquiryHtml(payload: EnquiryNotificationPayload): string {
  const {
    id,
    formName = "Consultation Brief",
    fullName,
    email,
    phone = "Not provided",
    company = "Independent / Individual",
    services = ["General Technology Inquiry"],
    description,
    budget = "To be discussed during scoping (Personalized)",
    timeline = "Standard (2-4 Weeks)",
    preferredContact = "Email",
    submittedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
  } = payload;

  return `<!DOCTYPE html>
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
      <p>REF ID: ${id} &bull; SOURCE: ${formName}</p>
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
          <td class="col-value">${submittedAt}</td>
        </tr>
      </table>

      <div class="section-label">4. Project Brief & Technical Requirements</div>
      <div class="brief-card">
        <p>${description}</p>
      </div>

      <div class="reply-banner">
        <p>&bull; Hit <strong>Reply</strong> in your email client to respond directly to <strong>${email}</strong> &bull;</p>
        <a href="mailto:${email}?subject=${encodeURIComponent(`Re: ${EMAIL_SUBJECT} [${id}]`)}" class="reply-btn">
          Direct Reply to ${fullName}
        </a>
      </div>

      <div class="nda-notice">
        <span>&#128274; <strong>Confidentiality Guarantee:</strong> This consultation request is covered under Niyan Technologies standard mutual non-disclosure policy.</span>
      </div>
    </div>

    <div class="email-footer">
      Automated consultation delivery for <strong>${PRIMARY_RECIPIENT}</strong>.<br>
      Niyan Technologies &bull; Chennai, Tamil Nadu, India &bull; Serving Global Clients
    </div>
  </div>
</body>
</html>`;
}

/**
 * Builds the plain-text fallback email.
 */
export function buildEnquiryPlainText(payload: EnquiryNotificationPayload): string {
  const {
    id,
    formName = "Consultation Brief",
    fullName,
    email,
    phone = "Not provided",
    company = "Independent / Individual",
    services = ["General Technology Inquiry"],
    description,
    budget = "To be discussed during scoping",
    timeline = "Standard",
    preferredContact = "Email",
    submittedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
  } = payload;

  return `===============================================================
${EMAIL_SUBJECT}
===============================================================
Reference ID : ${id}
Form Source  : ${formName}
Timestamp    : ${submittedAt}

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
${description}

---------------------------------------------------------------
* Direct Reply: You can reply directly to this notification to
  reach the client at: ${email}
===============================================================
Niyan Technologies — Automated Lead Dispatch
Chennai, Tamil Nadu, India
`;
}

/**
 * Dispatches an automated email notification to niyantechh@gmail.com
 * Supports Resend API (HTTP) as primary provider, with SMTP as fallback.
 */
export async function sendEnquiryNotification(
  payload: EnquiryNotificationPayload
): Promise<{ success: boolean; delivered: boolean; error?: string; messageId?: string }> {
  const { id, fullName, email } = payload;
  const htmlContent = buildEnquiryHtml(payload);
  const plainTextContent = buildEnquiryPlainText(payload);

  // 1. Try Resend API if RESEND_API_KEY is available
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey.trim()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: DEFAULT_SENDER,
          to: [PRIMARY_RECIPIENT],
          reply_to: email,
          subject: EMAIL_SUBJECT,
          html: htmlContent,
          text: plainTextContent,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;

      if (!res.ok) {
        const initialError = String(data.message || data.error || "");
        const match = initialError.match(/own email address \(([^)]+)\)/);
        if (match && match[1]) {
          const fallbackOwner = match[1];
          const retryRes = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${resendApiKey.trim()}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: DEFAULT_SENDER,
              to: [fallbackOwner],
              reply_to: email,
              subject: EMAIL_SUBJECT,
              html: htmlContent,
              text: plainTextContent,
            }),
          });
          const retryData = (await retryRes.json().catch(() => ({}))) as Record<string, unknown>;
          if (retryRes.ok) {
            console.log(`[RESEND SUCCESS] Forwarded to account owner ${fallbackOwner} for lead ${id}`);
            return { success: true, delivered: true, messageId: String(retryData.id || "ok") };
          }
        }
      }

      if (res.ok) {
        console.log(`[RESEND SUCCESS] Email dispatched to ${PRIMARY_RECIPIENT} for lead ${id}`);
        return { success: true, delivered: true, messageId: String(data.id || "ok") };
      }

      const errMsg = String(data.message || data.error || `HTTP ${res.status}`);
      console.error(`[RESEND ERROR] Failed for lead ${id}:`, errMsg);
      return { success: false, delivered: false, error: errMsg };
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error(`[RESEND EXCEPTION] Failed for lead ${id}:`, errMsg);
      return { success: false, delivered: false, error: errMsg };
    }
  }

  // 2. Fall back to SMTP transporter (Node.js runtime)
  try {
    const transporter = createTransporter();

    if (!transporter) {
      console.warn(
        `[MAILER NOTICE] Neither RESEND_API_KEY nor SMTP credentials configured. Lead ${id} for ${fullName} (${email}) saved securely.`
      );
      return {
        success: false,
        delivered: false,
        error: "Email credentials not configured in environment variables.",
      };
    }

    const fromAddress =
      process.env.SMTP_FROM || `"Niyan Technologies" <${process.env.SMTP_USER}>`;

    const info = await transporter.sendMail({
      from: fromAddress,
      to: PRIMARY_RECIPIENT,
      replyTo: email,
      subject: EMAIL_SUBJECT,
      text: plainTextContent,
      html: htmlContent,
    });

    console.log(`[SMTP SUCCESS] Email dispatched to ${PRIMARY_RECIPIENT} (Message ID: ${info.messageId})`);
    return { success: true, delivered: true, messageId: info.messageId };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error(`[SMTP ERROR] Failed to send email for enquiry ${id}:`, errorMessage);
    return { success: false, delivered: false, error: errorMessage };
  }
}
