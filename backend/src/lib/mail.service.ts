const nodemailer = require("nodemailer")

export const transporter = nodemailer.createTransport({
  host: process.env.BREVO_HOST,
  port: process.env.BREVO_PORT,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS
  }
})

export async function sendEmail(to, subject, html) {
  await transporter.sendMail({
    from: "no-reply@mail.feedbackx.me",
    to,
    subject,
    html
  })
}
