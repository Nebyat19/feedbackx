import { MessageSquare, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const feedbackItems = [
  {
    id: 1,
    category: "Feature Request",
    message: "Would love to see dark mode support in the dashboard",
    timestamp: "23 minutes ago",
    status: "New",
  },
  {
    id: 2,
    category: "Bug Report",
    message: "The export function is not working properly on mobile devices",
    timestamp: "1 hour ago",
    status: "In Progress",
  },
  {
    id: 3,
    category: "General Feedback",
    message: "Great platform! Very easy to use and intuitive interface",
    timestamp: "2 hours ago",
    status: "Reviewed",
  },
  {
    id: 4,
    category: "Improvement",
    message: "Consider adding email notifications for new feedback submissions",
    timestamp: "5 hours ago",
    status: "Reviewed",
  },
]

export function FeedbackDashboard() {
  return (
    <div className="bg-card rounded-2xl p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="font-serif text-3xl mb-2">Recent Feedback</h2>
        <p className="text-muted-foreground text-sm">All feedback submissions from your community</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {["All", "New", "In Progress", "Reviewed", "Archived"].map((filter, index) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              index === 0 ? "bg-accent text-accent-foreground" : "bg-muted/50 text-muted-foreground hover:bg-muted"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {feedbackItems.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-xl border border-border hover:border-accent/50 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <MessageSquare className="w-5 h-5 text-muted-foreground group-hover:text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">{item.category}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <Clock className="w-3 h-3" />
                    {item.timestamp}
                  </div>
                </div>
              </div>
              <Badge
                variant={item.status === "New" ? "default" : "secondary"}
                className={
                  item.status === "New" ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                }
              >
                {item.status}
              </Badge>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed pl-13">{item.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
