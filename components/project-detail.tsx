"use client"

import { Copy, Globe, Lock, Settings, ExternalLink, MessageSquare, Clock, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useSWR from "swr"
import { projectApi, feedbackApi } from "@/lib/api-services"
import { useState } from "react"

const FEEDBACK_STATUSES = ["New", "In Progress", "Reviewed", "Resolved", "Archived"] as const

export function ProjectDetail({ projectId }: { projectId: string }) {
  const {
    data: project,
    error: projectError,
    mutate,
  } = useSWR(`project-${projectId}`, () => projectApi.getById(projectId))
  const {
    data: feedbackItems,
    error: feedbackError,
    mutate: mutateFeedback,
  } = useSWR(`feedback-${projectId}`, () => feedbackApi.getByProject(projectId))

  const [isPublic, setIsPublic] = useState(project?.isPublic ?? true)
  const [isActive, setIsActive] = useState(project?.status === "active")
  const [activeFilter, setActiveFilter] = useState("All")

  const shareLink = `${typeof window !== "undefined" ? window.location.origin : ""}/p/${projectId}`

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink)
    // Add toast notification here
  }

  const handlePublicToggle = async (checked: boolean) => {
    setIsPublic(checked)
    // TODO: Call API to update project visibility
    // await projectApi.update(projectId, { isPublic: checked })
    mutate()
  }

  const handleStatusToggle = async (checked: boolean) => {
    setIsActive(checked)
    // TODO: Call API to update project status
    // await projectApi.update(projectId, { status: checked ? "active" : "paused" })
    mutate()
  }

  const handleFeedbackStatusChange = async (feedbackId: string, newStatus: string) => {
    try {
      await feedbackApi.updateStatus(feedbackId, newStatus)
      mutateFeedback()
    } catch (error) {
      console.error("Failed to update feedback status:", error)
    }
  }

  const filteredFeedback = feedbackItems?.filter((item) => {
    if (activeFilter === "All") return true
    return item.status === activeFilter
  })

  if (!project && !projectError) {
    return (
      <div className="bg-card rounded-2xl p-8 shadow-sm flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (projectError) {
    return (
      <div className="bg-card rounded-2xl p-8 shadow-sm">
      <p className="text-muted-foreground text-center">Project not found.</p>
    </div>
    )
  }



  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4">
          <div className="flex-1 w-full">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl">{project?.title}</h1>
              {isPublic ? (
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
              {isActive ? (
                <Badge className="bg-accent text-accent-foreground text-xs">Active</Badge>
              ) : (
                <Badge variant="outline" className="text-muted-foreground text-xs">
                  Paused
                </Badge>
              )}
            </div>
            <p className="text-sm sm:text-base text-muted-foreground">{project?.description}</p>
          </div>
          <Button variant="ghost" size="icon" className="shrink-0">
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        {/* Project Settings */}
        <div className="mt-6 p-4 sm:p-6 rounded-lg bg-muted/30 space-y-4">
          <h3 className="font-medium text-sm mb-4">Project Settings</h3>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Accept Feedback</Label>
              <p className="text-xs text-muted-foreground">
                {isActive ? "Project is accepting new feedback" : "Feedback submission is paused"}
              </p>
            </div>
            <Switch checked={isActive} onCheckedChange={handleStatusToggle} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Public Visibility</Label>
              <p className="text-xs text-muted-foreground">
                {isPublic ? "Everyone can see all feedback" : "Feedback is private to you"}
              </p>
            </div>
            <Switch checked={isPublic} onCheckedChange={handlePublicToggle} />
          </div>
        </div>

        {/* Share Link */}
        <div className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/20">
          <Label className="text-sm font-medium mb-2 block">Shareable Link</Label>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input value={shareLink} readOnly className="bg-background font-mono text-xs sm:text-sm" />
            <div className="flex gap-2">
              <Button
                onClick={copyLink}
                className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 flex-1 sm:flex-none"
              >
                <Copy className="w-4 h-4" />
                <span className="sm:inline">Copy</span>
              </Button>
              <Button variant="outline" className="gap-2 bg-transparent flex-1 sm:flex-none" asChild>
                <a href={shareLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  <span className="sm:inline">Open</span>
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-4 mt-6">
          <div className="p-4 rounded-lg bg-muted/30">
            <p className="text-xl sm:text-2xl font-bold">{project?.feedbackCount || 0}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Total Feedback</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/30">
            <p className="text-xl sm:text-2xl font-bold">{feedbackItems?.length || 0}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Loaded</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/30">
            <p className="text-xl sm:text-2xl font-bold">-</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Avg. Rating</p>
          </div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="font-serif text-2xl sm:text-3xl mb-2">Feedback Submissions</h2>
          <p className="text-muted-foreground text-sm">All feedback received for this project</p>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-2 px-2 sm:mx-0 sm:px-0">
          {["All", ...FEEDBACK_STATUSES].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                activeFilter === filter
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {!feedbackItems && !feedbackError ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : feedbackError ? (
          <p className="text-primary text-center py-12">No feedback found!</p>
        ) : filteredFeedback && filteredFeedback.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">
            {activeFilter === "All" ? "No feedback yet." : `No ${activeFilter.toLowerCase()} feedback.`}
          </p>
        ) : (
          <div className="space-y-4">
            {filteredFeedback?.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-6 rounded-xl border border-border hover:border-accent/50 transition-all group"
              >
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4 mb-3">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-accent/20 transition-colors shrink-0">
                      <MessageSquare className="w-5 h-5 text-muted-foreground group-hover:text-accent-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <Clock className="w-3 h-3" />
                        <span className="truncate">{item.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <Select
                    value={item.status || "New"}
                    onValueChange={(value) => handleFeedbackStatusChange(item.id, value)}
                  >
                    <SelectTrigger className="w-full sm:w-[140px] h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FEEDBACK_STATUSES.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed sm:pl-13">{item.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
