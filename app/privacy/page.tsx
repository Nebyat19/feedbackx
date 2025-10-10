"use client"

import Link from "next/link"
import { LandingNav } from "../../components/landing-nav"

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <LandingNav />
      <section className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-balance mb-6">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            FeedbackX values your privacy. We collect only the information needed to provide our services...
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {/* Sections for data collection, cookies, analytics, user rights */}
            We do not sell or share your personal data with third parties without your consent.


          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Questions? Contact <Link href="mailto:privacy@feedbackx.me" className="text-accent underline">privacy@feedbackx.me</Link>.
          </p>
        </div>
      </section>
    </div>
  )
}
