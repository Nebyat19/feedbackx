// Mock data for testing without backend
export const mockProjects = [
  {
    id: "proj-1",
    title: "Product Feedback Portal",
    description: "Share your thoughts on our new product features and help us improve",
    isPublic: true,
    status: "active" as "active" | "paused",
    feedbackCount: 12,
    createdAt: "2 days ago",
  },
  {
    id: "proj-2",
    title: "Team Culture Survey",
    description: "Anonymous feedback about our workplace culture and team dynamics",
    isPublic: false,
    status: "active" as "active" | "paused",
    feedbackCount: 8,
    createdAt: "5 days ago",
  },
  {
    id: "proj-3",
    title: "Website Redesign Ideas",
    description: "Help us redesign our website by sharing your ideas and suggestions",
    isPublic: true,
    status: "paused" as "active" | "paused",
    feedbackCount: 24,
    createdAt: "1 week ago",
  },
  {
    id: "proj-4",
    title: "Customer Support Experience",
    description: "Tell us about your recent experience with our support team",
    isPublic: true,
    status: "active" as "active" | "paused",
    feedbackCount: 15,
    createdAt: "3 days ago",
  },
]

export const mockFeedback = [
  {
    id: "fb-1",
    projectId: "proj-1",
    category: "Feature Request",
    message:
      "It would be great to have a dark mode option. I often work late at night and the bright interface can be straining on the eyes.",
    timestamp: "2 hours ago",
    status: "New",
  },
  {
    id: "fb-2",
    projectId: "proj-1",
    category: "Bug Report",
    message:
      "I noticed that the search function doesn't work properly when using special characters. It returns no results even when there should be matches.",
    timestamp: "5 hours ago",
    status: "In Progress",
  },
  {
    id: "fb-3",
    projectId: "proj-1",
    category: "General Feedback",
    message:
      "Love the new interface! It's much cleaner and easier to navigate than the previous version. Great job to the design team!",
    timestamp: "1 day ago",
    status: "Reviewed",
  },
  {
    id: "fb-4",
    projectId: "proj-1",
    category: "Improvement",
    message:
      "The loading times could be faster. Sometimes it takes 3-4 seconds to load the dashboard, which feels a bit slow.",
    timestamp: "1 day ago",
    status: "New",
  },
  {
    id: "fb-5",
    projectId: "proj-1",
    category: "Feature Request",
    message:
      "Can we get email notifications when someone responds to our feedback? It would help keep the conversation going.",
    timestamp: "2 days ago",
    status: "Reviewed",
  },
  {
    id: "fb-6",
    projectId: "proj-3",
    category: "General Feedback",
    message: "The current website looks outdated. A modern, minimalist design would be much better.",
    timestamp: "3 hours ago",
    status: "New",
  },
  {
    id: "fb-7",
    projectId: "proj-3",
    category: "Feature Request",
    message: "Please add a mobile app! The mobile website is okay but a native app would be so much better.",
    timestamp: "6 hours ago",
    status: "New",
  },
  {
    id: "fb-8",
    projectId: "proj-4",
    category: "General Feedback",
    message: "The support team was incredibly helpful and resolved my issue within 10 minutes. Excellent service!",
    timestamp: "4 hours ago",
    status: "Reviewed",
  },
]

// Helper function to get feedback by project ID
export const getMockFeedbackByProject = (projectId: string) => {
  return mockFeedback.filter((fb) => fb.projectId === projectId)
}

// Helper function to get project by ID
export const getMockProjectById = (projectId: string) => {
  return mockProjects.find((p) => p.id === projectId)
}
