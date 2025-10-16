"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { Fragment } from "react"

export function Breadcrumbs() {
  const pathname = usePathname()

  // Don't show breadcrumbs on home page
  if (pathname === "/") return null

  const segments = pathname.split("/").filter(Boolean)

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
      <Link href="/dashboard" className="hover:text-foreground transition-colors flex items-center gap-1">
        <Home className="w-4 h-4" />
        Home
      </Link>

      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`
        const isLast = index === segments.length - 1
        const label = segment.charAt(0).toUpperCase() + segment.slice(1)

        return (
          <Fragment key={href}>
            <ChevronRight className="w-4 h-4" />
            {isLast ? (
              <span className="text-foreground font-medium">{label}</span>
            ) : (
              <Link href={href} className="hover:text-foreground transition-colors">
                {label}
              </Link>
            )}
          </Fragment>
        )
      })}
    </nav>
  )
}
