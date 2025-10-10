"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

export function LandingNav() {
  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex justify-center  items-center gap-2 sm:gap-3">
           
            <div className="inline-flex items-center justify-center w-10 h-10 bg-foreground rounded-xl ">
            <span className="text-card font-bold text-xl">FX</span>
            </div>
           
            <span className="font-serif text-xl sm:text-2xl font-semibold">feedbackx.me</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-sm sm:text-base">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-sm sm:text-base">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
