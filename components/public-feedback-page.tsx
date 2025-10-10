"use client"

import { useState } from "react"
import { Send, MessageSquare, Clock, Globe, Lock, Loader2, PauseCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import useSWR from "swr"
import { publicApi, feedbackApi, type CreateFeedbackData } from "@/lib/api-services"

export function PublicFeedbackPage({ projectId }: { projectId: string }) {
  const [feedback, setFeedback] = useState("")
  const [category, setCategory] = useState("general")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data: project, error: projectError } = useSWR(`public-project-${projectId}`, () =>
    publicApi.getProject(projectId),
  )
  const {
    data: existingFeedback,
    error: feedbackError,
    mutate,
  } = useSWR(project?.isPublic ? `public-feedback-${projectId}` : null, () => publicApi.getFeedback(projectId), {
    revalidateOnFocus: false,
  })

  const isPaused = project?.status === "paused"

  const handleSubmit = async () => {
    if (!feedback.trim() || isPaused) return

    setIsSubmitting(true)
    try {
      const feedbackData: CreateFeedbackData = {
        projectId,
        category,
        message: feedback,
      }
      await feedbackApi.submit(feedbackData)
      

      if (project?.isPublic) {
        mutate()
      }

      setFeedback("")
      setCategory("general")
    } catch (error) {
      console.error("Failed to submit feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!project && !projectError) {
    return (
      <div className="min-h-screen p-6 md:p-8 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (projectError) {
    return (
      <div className="min-h-screen p-6 md:p-8 flex items-center justify-center">
        <div className="bg-card rounded-2xl p-8 shadow-sm max-w-md text-center">
          <p className="text-destructive">Project not found or unavailable.</p>
        </div>
      </div>
    )
  }

  if (isPaused) {
    return (
      <div className="min-h-screen p-6 md:p-8 flex items-center justify-center">
        <div className="bg-card rounded-2xl p-8 shadow-sm max-w-md text-center">
          <PauseCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="font-serif text-3xl mb-3">{project?.title}</h1>
          <Badge variant="outline" className="mb-4">
            Temporarily Closed
          </Badge>
          <p className="text-muted-foreground mb-2">
            This feedback project is currently paused and not accepting new submissions.
          </p>
          <p className="text-sm text-muted-foreground">Please check back later when the project owner reopens it.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
        <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl">{project?.title}</h1>
            {project?.isPublic ? (
              <Badge variant="secondary" className="gap-1 text-xs">
                <Globe className="w-3 h-3" />
                Public
              </Badge>
            ) : (
              <Badge variant="secondary" className="gap-1 text-xs">
                <Lock className="w-3 h-3" />
                Private
              </Badge>
            )}
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{project?.description}</p>
        </div>

        <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="font-serif text-2xl sm:text-3xl mb-2">Submit Your Feedback</h2>
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
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2 w-full sm:w-auto"
              size="lg"
              disabled={isSubmitting || !feedback.trim()}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
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

        {project?.isPublic && (
          <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="mb-6">
              <h2 className="font-serif text-2xl sm:text-3xl mb-2">Community Feedback</h2>
              <p className="text-muted-foreground text-sm">See what others are saying</p>
            </div>

            {!existingFeedback && !feedbackError ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : feedbackError ? (
              <p className="text-muted-foreground text-center py-12">No feedback yet. Be the first to share!</p>
            ) : existingFeedback && existingFeedback.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">No feedback yet. Be the first to share!</p>
            ) : (
              <div className="space-y-4">
                {existingFeedback?.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 sm:p-6 rounded-xl border border-border hover:border-accent/50 transition-all"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <MessageSquare className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm">{item.category}</h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <Clock className="w-3 h-3" />
                          <span className="truncate">{item.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed sm:pl-13">{item.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {!project?.isPublic && (
          <div className="bg-card rounded-2xl p-8 shadow-sm text-center">
            <Lock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-serif text-2xl mb-2">Private Feedback Mode</h3>
            <p className="text-muted-foreground text-sm">
              This project uses private feedback. Your submission will only be visible to the project owner.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
