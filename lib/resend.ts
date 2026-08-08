import { Resend } from "resend";
import { getEnv } from "@/lib/env";

function getResendClient() {
  const env = getEnv();

  if (!env.RESEND_API_KEY) {
    throw new Error("Resend API key is not configured.");
  }

  return new Resend(env.RESEND_API_KEY);
}

function escapeHtml(value: string = "") {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatValue(label: string, value: string) {
  const escaped = escapeHtml(value).replace(/\n/g, "<br>");

  switch (label.toLowerCase()) {
    case "email":
      return `<a href="mailto:${escaped}" style="color:#0A3D91;text-decoration:none;">${escaped}</a>`;

    case "phone":
      return `<a href="tel:${escaped}" style="color:#0A3D91;text-decoration:none;">${escaped}</a>`;

    case "message":
      return `
        <div
          style="
            background:#F8FAFC;
            border:1px solid #E5E7EB;
            border-radius:10px;
            padding:14px;
            white-space:pre-wrap;
            word-break:break-word;
            overflow-wrap:anywhere;
            line-height:1.7;
          "
        >
          ${escaped}
        </div>
      `;

    default:
      return escaped || "—";
  }
}

function baseTemplate(title: string, rows: Array<[string, string]>) {
  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td class="label">
            ${escapeHtml(label)}
          </td>

          <td class="value">
            ${formatValue(label, value)}
          </td>
        </tr>
      `
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<title>${escapeHtml(title)}</title>

<style>

body{
    margin:0;
    padding:0;
    background:#F4F7FB;
    font-family:Arial,Helvetica,sans-serif;
    -webkit-text-size-adjust:100%;
}

table{
    border-collapse:collapse;
    width:100%;
}

.wrapper{
    width:100%;
    padding:24px 12px;
    box-sizing:border-box;
}

.container{
    width:100%;
    max-width:600px;
    margin:auto;
    background:#ffffff;
    border-radius:16px;
    overflow:hidden;
    border:1px solid #E5E7EB;
}

.header{
    background:#0A3D91;
    padding:28px;
    text-align:center;
}

.header h1{
    margin:0;
    color:#ffffff;
    font-size:24px;
    font-weight:700;
}

.header p{
    margin:8px 0 0;
    color:#DCE8FF;
    font-size:14px;
}

.content{
    padding:28px;
}

.title{
    margin:0 0 24px;
    color:#111827;
    font-size:22px;
    font-weight:700;
}

tr{
    border-bottom:1px solid #EDF2F7;
}

.label{
    width:34%;
    padding:14px 0;
    color:#64748B;
    font-size:14px;
    font-weight:600;
    vertical-align:top;
}

.value{
    padding:14px 0;
    color:#111827;
    font-size:15px;
    line-height:1.6;
    word-break:break-word;
    overflow-wrap:anywhere;
}

.footer{
    background:#F8FAFC;
    text-align:center;
    padding:18px;
    color:#64748B;
    font-size:13px;
}

@media only screen and (max-width:600px){

.wrapper{
    padding:10px !important;
}

.content{
    padding:20px !important;
}

.header{
    padding:22px !important;
}

.header h1{
    font-size:22px !important;
}

.title{
    font-size:20px !important;
}

table,
tbody,
tr,
td{
    display:block;
    width:100% !important;
}

.label{
    padding-bottom:6px !important;
    font-size:13px !important;
}

.value{
    padding-top:0 !important;
    padding-bottom:18px !important;
    font-size:15px !important;
}

}

</style>

</head>

<body>

<div class="wrapper">

<div class="container">

<div class="header">

<h1>CHEM by Neeraj Sir</h1>

<p>Website Form Notification</p>

</div>

<div class="content">

<h2 class="title">${escapeHtml(title)}</h2>

<table>

${rowsHtml}

</table>

</div>

<div class="footer">

This email was automatically generated from the CHEM by Neeraj Sir website.

</div>

</div>

</div>

</body>

</html>
`;
}

export async function sendContactNotification(data: {
  name: string;
  phone: string;
  email: string;
  studentClass: string;
  message: string;
}) {
  const env = getEnv();

  if (
    !env.RESEND_API_KEY ||
    !env.RESEND_FROM_EMAIL ||
    !env.ADMIN_NOTIFICATION_EMAIL
  ) {
    return;
  }

  const resend = getResendClient();

  await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to: env.ADMIN_NOTIFICATION_EMAIL,
    subject: `📩 New Contact Form Submission - ${data.name}`,
    html: baseTemplate("New Contact Form Submission", [
      ["Name", data.name],
      ["Phone", data.phone],
      ["Email", data.email],
      ["Class", data.studentClass],
      ["Message", data.message],
    ]),
  });
}

export async function sendWaitingListNotification(data: {
  name?: string;
  phone?: string;
  email: string;
  studentClass?: string;
  city?: string;
  school?: string;
}) {
  const env = getEnv();

  if (
    !env.RESEND_API_KEY ||
    !env.RESEND_FROM_EMAIL ||
    !env.ADMIN_NOTIFICATION_EMAIL
  ) {
    return;
  }

  const resend = getResendClient();

  await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to: env.ADMIN_NOTIFICATION_EMAIL,
    subject: `🎉 New Waiting List Signup - ${data.email}`,
    html: baseTemplate("New Waiting List Signup", [
      ["Name", data.name ?? "—"],
      ["Phone", data.phone ?? "—"],
      ["Email", data.email],
      ["Class", data.studentClass ?? "—"],
      ["City", data.city ?? "—"],
      ["School", data.school ?? "—"],
    ]),
  });
}