"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function FeedbackForm() {
  const [feedback, setFeedback] = useState("")

  return (
    <div className="bg-card rounded-2xl p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="font-serif text-3xl mb-2">Submit Feedback</h2>
        <p className="text-muted-foreground text-sm">
          Your feedback is completely anonymous. Share your thoughts freely.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm font-medium">
            Category
          </Label>
          <Select defaultValue="general">
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

        <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2" size="lg">
          <Send className="w-4 h-4" />
          Submit Feedback
        </Button>
      </div>
    </div>
  )
}
