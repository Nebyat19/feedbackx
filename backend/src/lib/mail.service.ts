const Brevo = require("@getbrevo/brevo");

const apiInstance = new Brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export async function sendEmail(to, subject, html) {
  const emailData = {
    sender: { name: "FeedbackX", email: "no-reply@mail.feedbackx.me" },
    to: [{ email: to }],
    subject,
    htmlContent: html,
  };

  try {
    await apiInstance.sendTransacEmail(emailData);
    console.log(`Email sent successfully to: ${to}`);
  } catch (error) {
    console.error("Email sending failed:", error.message);
  }
}


