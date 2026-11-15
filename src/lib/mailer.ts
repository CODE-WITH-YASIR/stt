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

/**
 * Creates a nodemailer transporter based on environment variables.
 * Supports standard Gmail SMTP, custom SMTP, or SendGrid/AWS SES.
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
 * Dispatches an automated email notification to niyantechh@gmail.com
 * whenever any website form is submitted.
 */
export async function sendEnquiryNotification(
  payload: EnquiryNotificationPayload
): Promise<{ success: boolean; delivered: boolean; error?: string }> {
  const {
    id,
    formName = "Website General Enquiry",
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

  const subject = `New NIYAN Website Enquiry – ${fullName} [${id}]`;

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f6f9; margin: 0; padding: 24px; color: #1a1a1a; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid rgba(48, 12, 65, 0.12); box-shadow: 0 10px 30px rgba(48, 12, 65, 0.08); }
    .header { background: #300C41; padding: 32px 28px; text-align: left; border-bottom: 4px solid #DEE948; }
    .header h1 { color: #ffffff; margin: 0 0 6px 0; font-size: 22px; font-weight: 800; letter-spacing: -0.02em; }
    .header p { color: rgba(255, 255, 255, 0.75); margin: 0; font-size: 12px; font-family: monospace; letter-spacing: 0.15em; text-transform: uppercase; }
    .tag { display: inline-block; background: #DEE948; color: #300C41; font-weight: 800; font-size: 11px; padding: 4px 10px; border-radius: 999px; margin-top: 12px; text-transform: uppercase; }
    .body { padding: 28px; }
    .section-title { font-size: 11px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.18em; color: #300C41; font-weight: bold; margin-bottom: 12px; }
    .details-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .details-table td { padding: 10px 12px; border-bottom: 1px solid #f0edf3; font-size: 13px; vertical-align: top; }
    .details-table td.label { font-weight: 700; color: #300C41; width: 34%; }
    .details-table td.value { color: #222222; }
    .message-box { background: #faf9fc; border-left: 4px solid #300C41; padding: 16px; border-radius: 8px; margin-bottom: 24px; }
    .message-box p { margin: 0; font-size: 13px; line-height: 1.6; color: #222222; white-space: pre-wrap; }
    .cta-button { display: inline-block; background: #300C41; color: #ffffff !important; text-decoration: none; font-weight: 700; font-size: 13px; padding: 12px 24px; border-radius: 8px; margin-top: 8px; text-align: center; }
    .cta-button:hover { background: #230830; }
    .footer { background: #faf9fc; padding: 20px 28px; border-top: 1px solid #f0edf3; font-size: 11px; color: #666666; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <p>NIYAN Central Lead Management</p>
      <h1>New Website Enquiry</h1>
      <span class="tag">Ref: ${id}</span>
    </div>

    <div class="body">
      <div class="section-title">Client Information</div>
      <table class="details-table">
        <tr>
          <td class="label">Full Name</td>
          <td class="value"><strong>${fullName}</strong></td>
        </tr>
        <tr>
          <td class="label">Client Email</td>
          <td class="value"><a href="mailto:${email}" style="color: #300C41; font-weight: bold; text-decoration: underline;">${email}</a></td>
        </tr>
        <tr>
          <td class="label">Contact Number</td>
          <td class="value">${phone}</td>
        </tr>
        <tr>
          <td class="label">Company / Institution</td>
          <td class="value">${company}</td>
        </tr>
        <tr>
          <td class="label">Form Source</td>
          <td class="value">${formName}</td>
        </tr>
        <tr>
          <td class="label">Submission Time</td>
          <td class="value">${submittedAt}</td>
        </tr>
      </table>

      <div class="section-title">Project Specifications</div>
      <table class="details-table">
        <tr>
          <td class="label">Services</td>
          <td class="value"><strong>${services.join(", ")}</strong></td>
        </tr>
        <tr>
          <td class="label">Budget Estimate</td>
          <td class="value">${budget}</td>
        </tr>
        <tr>
          <td class="label">Target Timeline</td>
          <td class="value">${timeline}</td>
        </tr>
        <tr>
          <td class="label">Preferred Contact</td>
          <td class="value">${preferredContact}</td>
        </tr>
      </table>

      <div class="section-title">Client Message & Requirements</div>
      <div class="message-box">
        <p>${description}</p>
      </div>

      <div style="text-align: center; margin-top: 24px;">
        <a href="mailto:${email}?subject=${encodeURIComponent(`Re: Your NIYAN Technology Enquiry [${id}]`)}" class="cta-button">
          Direct Reply to ${fullName}
        </a>
      </div>
    </div>

    <div class="footer">
      This notification was automatically generated by the NIYAN Website Lead Management System for <strong>${PRIMARY_RECIPIENT}</strong>.<br/>
      NIYAN AI & Digital Solutions • Confirmed Delivery
    </div>
  </div>
</body>
</html>
  `;

  const plainTextContent = `
========================================
NEW NIYAN WEBSITE ENQUIRY [${id}]
========================================
Form Origin: ${formName}
Timestamp: ${submittedAt}

CLIENT DETAILS:
- Name: ${fullName}
- Email: ${email}
- Contact Number: ${phone}
- Company/Org: ${company}

PROJECT DETAILS:
- Services: ${services.join(", ")}
- Budget: ${budget}
- Timeline: ${timeline}
- Preferred Contact: ${preferredContact}

MESSAGE / SCOPE DESCRIPTION:
----------------------------------------
${description}
----------------------------------------

Quick Reply: mailto:${email}?subject=Re:%20NIYAN%20Enquiry%20${id}
========================================
NIYAN Automated Lead Management Desk
`;

  try {
    const transporter = createTransporter();

    if (!transporter) {
      console.warn(
        `[MAILER NOTICE] SMTP credentials not set in environment. Lead ${id} for ${fullName} (${email}) saved securely in database.`
      );
      return {
        success: true,
        delivered: false,
        error: "SMTP credentials not configured in environment variables.",
      };
    }

    const fromAddress =
      process.env.SMTP_FROM || `"NIYAN Notification Desk" <${process.env.SMTP_USER}>`;

    const info = await transporter.sendMail({
      from: fromAddress,
      to: PRIMARY_RECIPIENT,
      replyTo: email,
      subject,
      text: plainTextContent,
      html: htmlContent,
    });

    console.log(`[MAILER SUCCESS] Email dispatched to ${PRIMARY_RECIPIENT} (Message ID: ${info.messageId})`);
    return { success: true, delivered: true };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error(`[MAILER ERROR] Failed to send email for enquiry ${id}:`, errorMessage);
    return { success: true, delivered: false, error: errorMessage };
  }
}

