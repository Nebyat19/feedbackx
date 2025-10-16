"use client"
import { projectApi } from "@/lib/api-services"
import { MessageSquare, TimerIcon,PlaneIcon, CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"

const statsIcon = {
  TotalFeedback: MessageSquare,
  ThisWeek: PlaneIcon,
  New: TimerIcon,
  Resolved: CheckCircle,
}

export function StatsSection() {
  const [stats, setStats] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await projectApi.getAllstats()
        if (res) setStats(res)
      } catch (err) {
        console.error("Failed to load stats:", err)
      } finally {
        setLoading(false)
      }
    }
    loadStats()
  }, [])

  if (loading) {
    // skeleton loader (clean and responsive)
    return (
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-card rounded-2xl p-5 sm:p-6 animate-pulse">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent/10" />
              <div className="h-4 w-10 bg-secondary/20 rounded-full" />
            </div>
            <div className="h-6 w-20 bg-muted rounded mb-2" />
            <div className="h-3 w-24 bg-muted rounded" />
          </div>
        ))}
      </div>
    )
  }

  const formattedStats = stats.map((stat: any) => ({
    label: stat.label,
    value: stat.value,
    change: stat.change,
    icon: statsIcon[stat.icon as keyof typeof statsIcon],
  }))

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
      {formattedStats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className="bg-card rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent-foreground" />
              </div>
              <span className="text-xs font-medium text-secondary px-2 py-1 bg-secondary/10 rounded-full">
                {stat.change}
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl mb-1">{stat.value}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
          </div>
        )
      })}
    </div>
  )
}
