"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, Lock, LinkIcon, BarChart3, Users, Shield, Zap } from "lucide-react"
import { LandingNav } from "./landing-nav"
import Image from "next/image"

export function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
    {/* Transparent grid pattern */}
    <div className="absolute inset-0 pattern z-0" />
  
    <LandingNav />
  
    {/* Hero Section */}
    <section className="relative  px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
    
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-sm">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-accent-foreground font-medium">Anonymous feedback made simple</span>
            </div>

            <h1 className="fontfeedback-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-balance leading-tight">
              Collect honest  with shareable links
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
              Create projects, share links, and gather anonymous feedback from your team, customers, or community.
              Simple, private, and powerful.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto"
                >
                  Get started—it's free
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/demo" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto bg-transparent"
                >
                  View demo
                </Button>
              </Link>
            </div>

            <p className="text-sm text-muted-foreground">No credit card required • Free forever</p>
          </div>
        </div>
        <div className="relative mt-20 px-4 sm:px-6 lg:px-8">
  <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12 lg:gap-20 max-w-7xl mx-auto">
    {/* Left: Image */}
    <div>
      <Image
        src="/dashboard-screenshot.png"
        alt="FeedbackX Dashboard Screenshot"
        width={1200}
        height={1000}
        className="rounded-2xl shadow-lg border border-border"
      />
    </div>

    {/* Right: Text */}
    <div className="text-center lg:text-left space-y-4">
      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-balance">
        See FeedbackX in Action
      </h2>
      <p className="text-lg text-muted-foreground max-w-md">
        Explore the dashboard that makes feedback collection effortless. Manage projects, view analytics, and collaborate with your team—all in one place.
      </p>
      <Button
        size="lg"
        className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2 text-base sm:text-lg px-6 sm:px-8 py-4"
      >
        Try it now
        <ArrowRight className="w-5 h-5" />
      </Button>
    </div>
  </div>
</div>

      </section>

      {/* Features Grid */}
      <section className="relative px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl mb-4 text-balance">
              Everything you need to collect feedback
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Powerful features designed to make feedback collection effortless and insightful
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: LinkIcon,
                title: "Shareable Links",
                description:
                  "Create unique links for each project. Share anywhere and start collecting feedback instantly.",
              },
              {
                icon: Globe,
                title: "Public or Private",
                description:
                  "Choose whether respondents can see other submissions or keep feedback completely private.",
              },
              {
                icon: Lock,
                title: "Anonymous by Default",
                description: "No sign-up required for respondents. Collect honest, unbiased feedback every time.",
              },
              {
                icon: BarChart3,
                title: "Real-time Analytics",
                description: "Track feedback trends, categories, and status updates in a beautiful dashboard.",
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Manage feedback status, categorize submissions, and collaborate with your team.",
              },
              {
                icon: Zap,
                title: "Pause Anytime",
                description: "Control when you accept feedback. Pause and resume projects whenever you need.",
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all border border-border hover:border-accent/50"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-accent/20 flex items-center justify-center mb-4 sm:mb-6">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent-foreground" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl mb-4 text-balance">How it works</h2>
            <p className="text-lg text-muted-foreground text-pretty">Three simple steps to start collecting feedback</p>
          </div>

          <div className="space-y-8 sm:space-y-12">
            {[
              {
                step: "01",
                title: "Create a project",
                description:
                  "Give your project a title and description. Choose whether feedback should be public or private.",
              },
              {
                step: "02",
                title: "Share the link",
                description:
                  "Copy your unique feedback link and share it with your team, customers, or community via email, Slack, or social media.",
              },
              {
                step: "03",
                title: "Collect insights",
                description:
                  "Watch feedback roll in. Categorize, update status, and gain valuable insights from your audience.",
              },
            ].map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-accent/20 flex items-center justify-center">
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-accent-foreground">
                      {item.step}
                    </span>
                  </div>
                </div>
                <div className="flex-1 pt-1 sm:pt-2">
                  <h3 className="font-serif text-2xl sm:text-3xl mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof 
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="bg-card rounded-3xl p-8 sm:p-12 lg:p-16 shadow-sm border border-border">
            <div className="grid sm:grid-cols-3 gap-8 sm:gap-12 text-center">
              <div>
                <div className="font-serif text-4xl sm:text-5xl lg:text-6xl mb-2 text-accent-foreground">10K+</div>
                <p className="text-muted-foreground text-sm sm:text-base">Projects created</p>
              </div>
              <div>
                <div className="font-serif text-4xl sm:text-5xl lg:text-6xl mb-2 text-accent-foreground">50K+</div>
                <p className="text-muted-foreground text-sm sm:text-base">Feedback collected</p>
              </div>
              <div>
                <div className="font-serif text-4xl sm:text-5xl lg:text-6xl mb-2 text-accent-foreground">98%</div>
                <p className="text-muted-foreground text-sm sm:text-base">User satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>
*/}
      {/* CTA Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-balance leading-tight">
            Start collecting feedback today
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
            Join thousands of teams using feedbackx.me to gather honest, actionable insights.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/signup" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto"
              >
                Get started for free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 bg-foreground rounded-xl flex items-center justify-center">
                <Shield className="w-4 h-4 text-card" />
              </div>
              <span className="font-serif text-lg sm:text-xl font-semibold">feedbackx.me</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 feedbackx.me. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
