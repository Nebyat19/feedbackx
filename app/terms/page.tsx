"use client"

import Link from "next/link"
import { LandingNav } from "../../components/landing-nav"

export default function TermsPage() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <LandingNav />
      <section className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-balance mb-6">Terms of Service</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Welcome to FeedbackX. By using our platform, you agree to these terms...
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {/* Add sections like account responsibilities, permitted use, etc. */}
            We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of the new terms.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Please read our <Link href="/privacy" className="text-accent underline">Privacy Policy</Link> for information on how we handle your data.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            If you have any questions about these Terms, please contact us.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            For more information, contact us at <Link href="mailto:support@feedbackx.me" className="text-accent underline">support@feedbackx.me</Link>.
          </p>
        </div>
      </section>
    </div>
  )
}
