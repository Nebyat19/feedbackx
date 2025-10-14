import { sendEmail } from "./mail.service"

const baseStyles = `
  font-family: 'Inter', Arial, sans-serif;
  background-color: oklch(1 0 0);
  color: oklch(0.145 0 0);
  padding: 40px 0;
  text-align: center;
`

const cardStyles = `
  max-width: 480px;
  background: oklch(1 0 0);
  margin: auto;
  border-radius: 12px;
  padding: 40px 30px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
`

function buildTemplate(title, message, actionUrl, actionLabel) {
  return `
  <div style="${baseStyles}">
    <div style="${cardStyles}">
      <div style="font-size: 32px; font-weight: 700; letter-spacing: -1px; margin-bottom: 16px; color: oklch(0.145 0 0);">
        FX
      </div>
      <h2 style="font-size: 20px; color: oklch(0.205 0 0); margin-bottom: 10px;">
        ${title}
      </h2>
      <p style="color: oklch(0.556 0 0); font-size: 15px; margin-bottom: 30px;">
        ${message}
      </p>
      <a href="${actionUrl}" 
         style="
           display:inline-block;
           background-color: oklch(0.205 0 0);
           color: oklch(0.985 0 0);
           padding: 12px 24px;
           border-radius: 8px;
           text-decoration: none;
           font-weight: 500;
         ">
        ${actionLabel}
      </a>
      <p style="font-size: 12px; color: oklch(0.556 0 0); margin-top: 30px;">
        If you didn’t request this, you can safely ignore this email.
      </p>
      <p style="font-size: 11px; color: oklch(0.556 0 0); margin-top: 10px;">
        Sent securely from <a href="https://feedbackx.me" style="color: oklch(0.205 0 0); text-decoration: none;">FeedbackX</a>
      </p>
    </div>
  </div>
  `
}

export async function sendVerificationEmail(email, token) {
  const url = `https://feedbackx.me/verify?token=${token}`
  const html = buildTemplate(
    "Verify your email",
    "Thanks for joining FeedbackX! Please verify your email to activate your account.",
    url,
    "Verify Email"
  )
  await sendEmail(email, "Verify your email", html)
}

export async function sendPasswordResetOTP(email, otp) {

  const html =`<div style="${baseStyles}">
    <div style="${cardStyles}">
      <div style="font-size: 32px; font-weight: 700; letter-spacing: -1px; margin-bottom: 16px; color: oklch(0.145 0 0);">
        FX
      </div>
      <h2 style="font-size: 20px; color: oklch(0.205 0 0); margin-bottom: 10px;">
        Password Reset OTP
      </h2>
      <p style="color: oklch(0.556 0 0); font-size: 15px; margin-bottom: 30px;">
        Use the following One-Time Password (OTP) to reset your password. This OTP is valid for the next 5 minutes.
      </p>
      <div style="
           display:inline-block;
           background-color: oklch(0.205 0 0);
           color: oklch(0.985 0 0);
           padding: 12px 24px; 
           border-radius: 8px;
           text-decoration: none;
           font-weight: 500;
           font-size: 18px;
           letter-spacing: 2px;
         ">
        ${otp}
      </div>
      <p style="font-size: 12px; color: oklch(0.556 0 0); margin-top: 30px;">
        If you didn’t request this, you can safely ignore this email.
      </p>
      <p style="font-size: 11px; color: oklch(0.556 0 0); margin-top: 10px;">
        Sent securely from <a href="https://feedbackx.me" style="color: oklch(0.205 0 0); text-decoration: none;">FeedbackX</a>
      </p>
    </div>
  </div>
  `
  await sendEmail(email, "Your password reset OTP", html)
}
  
 
