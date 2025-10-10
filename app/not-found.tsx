"use client"

import Link from "next/link"

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl text-accent mb-4">404</h1>
      <p className="text-2xl sm:text-3xl text-muted-foreground mb-6">Oops! Page not found.</p>
      <Link href="/" className="bg-secondary text-secondary-foreground px-6 py-3 rounded-xl hover:bg-secondary/90 transition">
        Back to Home
      </Link>
    </div>
  )
}
