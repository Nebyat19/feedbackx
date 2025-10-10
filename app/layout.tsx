import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "feedbackx.me - Anonymous Feedback Platform",
  description: "Collect and manage anonymous feedback with shareable links. Simple, private, and powerful.",
  generator: "",
  applicationName: "feedbackx",
  referrer: "origin-when-cross-origin",
  keywords: [
    "feedback",
    "anonymous feedback",
    "feedback platform",
    "shareable feedback",
    "private feedback",
    "feedback management",
    "user feedback",
    "feedback collection",
    "feedback tool",
    "feedback app",
  ],
  authors: [{ name: "Nebyat B", url: "https://nebyat.vercel.app/" }],
  colorScheme: "light dark",
  creator: "Nebyat B",
  publisher: "Nebyat B",
  metadataBase: new URL("https://feedbackx.me"),
  openGraph: {
    title: "feedbackx.me - Feedback Platform",
    description: "Collect and manage anonymous and public feedback with shareable links. Simple, private, and powerful.",
    url: "https://feedbackx.me",
    siteName: "feedbackx",
    images: [
      {
        url: "https://feedbackx.me/logo.png",
        width: 1200,
        height: 630,
        alt: "feedbackx.me - Feedback Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" >
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    
      <link rel="icon" href="/logo.png" />
     
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${playfair.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
