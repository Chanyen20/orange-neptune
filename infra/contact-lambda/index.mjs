import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

// Configured via Lambda environment variables.
const TO_ADDRESS = process.env.CONTACT_TO_ADDRESS; // where leads land, e.g. hello@orangeneptune.com
const FROM_ADDRESS = process.env.CONTACT_FROM_ADDRESS; // an SES-verified sender, e.g. no-reply@orangeneptune.com
const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN ?? "*"; // set to your site origin in prod

// Defaults to the Lambda's own region (AWS_REGION); override with SES_REGION
// if your verified SES sender lives in a different region.
const ses = new SESv2Client(process.env.SES_REGION ? { region: process.env.SES_REGION } : {});

const corsHeaders = {
  "Access-Control-Allow-Origin": ALLOW_ORIGIN,
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const json = (statusCode, body) => ({
  statusCode,
  headers: { "Content-Type": "application/json", ...corsHeaders },
  body: JSON.stringify(body),
});

const isEmail = (v) => typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const clean = (v) => (typeof v === "string" ? v.trim() : "");
const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export const handler = async (event) => {
  const method = event?.requestContext?.http?.method ?? event?.httpMethod;
  if (method === "OPTIONS") return { statusCode: 204, headers: corsHeaders, body: "" };
  if (method !== "POST") return json(405, { error: "Method not allowed" });

  let data;
  try {
    data = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid JSON" });
  }

  const name = clean(data.name);
  const company = clean(data.company);
  const email = clean(data.email);
  const phone = clean(data.phone);
  const message = clean(data.message);

  if (!name || !company || !message) return json(400, { error: "Missing required fields" });
  if (!isEmail(email)) return json(400, { error: "Invalid email" });
  if (message.length > 5000) return json(400, { error: "Message too long" });

  const rows = [
    ["Name", name],
    ["Company", company],
    ["Email", email],
    ["Phone", phone || "—"],
  ];
  const textBody =
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nMessage:\n${message}\n`;
  const htmlBody =
    `<h2>New contact enquiry</h2>` +
    `<table cellpadding="6" style="border-collapse:collapse">` +
    rows.map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`).join("") +
    `</table>` +
    `<h3>Message</h3><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`;

  try {
    await ses.send(
      new SendEmailCommand({
        FromEmailAddress: FROM_ADDRESS,
        Destination: { ToAddresses: [TO_ADDRESS] },
        ReplyToAddresses: [email],
        Content: {
          Simple: {
            Subject: { Data: `New enquiry from ${name} (${company})` },
            Body: { Text: { Data: textBody }, Html: { Data: htmlBody } },
          },
        },
      }),
    );
    return json(200, { ok: true });
  } catch (err) {
    console.error("SES send failed", err);
    return json(502, { error: "Failed to send" });
  }
};
