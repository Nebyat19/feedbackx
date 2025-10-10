"use client"

import { useState } from "react"
import { Send, MessageSquare, Clock, Globe, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Mock data for demo
const mockProject = {
  id: "demo-123",
  title: "feedback.me Platform",
  description:
    "Help us improve feedback.me by sharing your thoughts, suggestions, and ideas. Your feedback shapes the future of our platform.",
  isPublic: true,
}

const mockFeedback = [
  {
    id: "1",
    category: "Feature Request",
    message:
      "It would be great to have email notifications when someone submits feedback to my project. This would help me respond faster to user concerns.",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    category: "General Feedback",
    message:
      "Love the clean interface! The gradient background and typography choices make it feel modern and professional. Great work on the design.",
    timestamp: "5 hours ago",
  },
  {
    id: "3",
    category: "Improvement",
    message:
      "The feedback form is intuitive, but it would be helpful to add a character counter so users know how much they can write.",
    timestamp: "1 day ago",
  },
  {
    id: "4",
    category: "Bug Report",
    message:
      "I noticed the copy link button doesn't show a confirmation message. A small toast notification would improve the user experience.",
    timestamp: "1 day ago",
  },
  {
    id: "5",
    category: "General Feedback",
    message:
      "The public/private toggle is a brilliant feature. It gives project owners full control over how they collect feedback.",
    timestamp: "2 days ago",
  },
]

export function DemoFeedbackPage() {
  const [feedback, setFeedback] = useState("")
  const [category, setCategory] = useState("general")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [localFeedback, setLocalFeedback] = useState(mockFeedback)

  const handleSubmit = () => {
    if (!feedback.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newFeedback = {
        id: Date.now().toString(),
        category: category.charAt(0).toUpperCase() + category.slice(1).replace("-", " "),
        message: feedback,
        timestamp: "Just now",
      }

      setLocalFeedback([newFeedback, ...localFeedback])
      setFeedback("")
      setCategory("general")
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back button */}
        <Link href="/">
          <Button variant="ghost" className="gap-2 -ml-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Header */}
        <div className="bg-card rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <h1 className="font-serif text-4xl md:text-5xl">{mockProject.title}</h1>
            <Badge variant="secondary" className="gap-1">
              <Globe className="w-3 h-3" />
              Public
            </Badge>
          </div>
          <p className="text-muted-foreground leading-relaxed">{mockProject.description}</p>
        </div>

        {/* Feedback Form */}
        <div className="bg-card rounded-2xl p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="font-serif text-3xl mb-2">Submit Your Feedback</h2>
            <p className="text-muted-foreground text-sm">
              Your feedback is completely anonymous. Share your thoughts freely.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">
                Category
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category" className="bg-muted/30 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Feedback</SelectItem>
                  <SelectItem value="bug">Bug Report</SelectItem>
                  <SelectItem value="feature">Feature Request</SelectItem>
                  <SelectItem value="improvement">Improvement</SelectItem>
                  <SelectItem value="complaint">Complaint</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedback" className="text-sm font-medium">
                Your Feedback
              </Label>
              <Textarea
                id="feedback"
                placeholder="Share your thoughts, ideas, or concerns..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-32 bg-muted/30 border-border resize-none"
              />
            </div>

            <Button
              onClick={handleSubmit}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2"
              size="lg"
              disabled={isSubmitting || !feedback.trim()}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Feedback
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Community Feedback */}
        <div className="bg-card rounded-2xl p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="font-serif text-3xl mb-2">Community Feedback</h2>
            <p className="text-muted-foreground text-sm">See what others are saying</p>
          </div>

          <div className="space-y-4">
            {localFeedback.map((item) => (
              <div key={item.id} className="p-6 rounded-xl border border-border hover:border-accent/50 transition-all">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.category}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <Clock className="w-3 h-3" />
                      {item.timestamp}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed pl-13">{item.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
