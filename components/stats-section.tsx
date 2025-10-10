import { MessageSquare, TrendingUp, Users, CheckCircle } from "lucide-react"

const stats = [
  {
    label: "Total Feedback",
    value: "1,247",
    change: "+12%",
    icon: MessageSquare,
  },
  {
    label: "This Week",
    value: "89",
    change: "+23%",
    icon: TrendingUp,
  },
  {
    label: "Contributors",
    value: "342",
    change: "+8%",
    icon: Users,
  },
  {
    label: "Resolved",
    value: "1,089",
    change: "+15%",
    icon: CheckCircle,
  },
]

export function StatsSection() {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div key={stat.label} className="bg-card rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
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
