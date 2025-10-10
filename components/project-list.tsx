"use client"

import { useState } from "react"
import { Plus, ExternalLink, Lock, Globe, Copy, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import useSWR from "swr"
import { projectApi, type CreateProjectData } from "@/lib/api-services"

export function ProjectList() {
  const [open, setOpen] = useState(false)
  const [isPublic, setIsPublic] = useState(true)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  const { data: projects, error, mutate } = useSWR("projects", projectApi.getAll)

  const handleCreateProject = async () => {
    if (!title.trim()) return

    setIsCreating(true)
    try {
      const projectData: CreateProjectData = {
        title,
        description,
        isPublic,
      }
      await projectApi.create(projectData)

      // Refresh projects list
      mutate()

      // Reset form and close dialog
      setOpen(false)
      setTitle("")
      setDescription("")
    } catch (error) {
      console.error("Failed to create project:", error)
      // Add toast notification here
    } finally {
      setIsCreating(false)
    }
  }

  const copyLink = (projectId: string) => {
    const link = `${window.location.origin}/p/${projectId}`
    navigator.clipboard.writeText(link)
    // Add toast notification here
  }

  if (!projects && !error) {
    return (
      <div className="bg-card rounded-2xl p-8 shadow-sm flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  // if (error) {
  //   return (
  //     <div className="bg-card rounded-2xl p-8 shadow-sm">
  //       <p className="text-destructive">Failed to load projects. Please try again.</p>
  //     </div>
  //   )
  // }

  return (
    <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl mb-2">Your Projects</h2>
          <p className="text-muted-foreground text-sm">Create and manage feedback collection projects</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2 w-full sm:w-auto">
              <Plus className="w-4 h-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[90%]">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">Create New Project</DialogTitle>
              <DialogDescription>Set up a new feedback collection project with a shareable link.</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Product Feedback, Team Survey"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-muted/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of what feedback you're collecting..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-muted/30 min-h-24 resize-none"
                />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {isPublic ? <Globe className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    <Label htmlFor="public" className="font-medium">
                      {isPublic ? "Public Feedback" : "Private Feedback"}
                    </Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {isPublic ? "Anyone can see all feedback submissions" : "Users only see their own submissions"}
                  </p>
                </div>
                <Switch id="public" checked={isPublic} onCheckedChange={setIsPublic} />
              </div>
              <Button
                onClick={handleCreateProject}
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                size="lg"
                disabled={isCreating || !title.trim()}
              >
                {isCreating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Project"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {projects && projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No projects yet. Create your first one!</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects?.map((project) => (
            <div
              key={project.id}
              className="p-5 sm:p-6 rounded-xl border border-border hover:border-accent/50 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  {project.isPublic ? (
                    <Globe className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  )}
                  <Badge variant="secondary" className="text-xs">
                    {project.feedbackCount} feedback
                  </Badge>
                </div>
              </div>

              <h3 className="font-serif text-lg sm:text-xl mb-2 text-balance">{project.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

              <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 gap-2 hover:bg-accent/20 justify-center"
                  onClick={() => copyLink(project.id)}
                >
                  <Copy className="w-3 h-3" />
                  Copy Link
                </Button>
                <Link href={`/project/${project.id}`} className="flex-1">
                  <Button variant="ghost" size="sm" className="gap-2 hover:bg-accent/20 w-full justify-center">
                    <ExternalLink className="w-3 h-3" />
                    View
                  </Button>
                </Link>
              </div>

              <p className="text-xs text-muted-foreground mt-3">Created {project.createdAt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
