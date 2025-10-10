import { apiClient } from "./api-config"
import { mockProjects, mockFeedback, getMockFeedbackByProject, getMockProjectById } from "./mock-data"

export const USE_MOCK_DATA = false

export interface Project {
  id: string
  title: string
  description: string
  isPublic: boolean
  status: "active" | "paused"
  feedbackCount: number
  createdAt: string
}

export interface Feedback {
  id: string
  projectId: string
  category: string
  message: string
  timestamp: string
  status?: string
}

export interface CreateProjectData {
  title: string
  description: string
  isPublic: boolean
}

export interface CreateFeedbackData {
  projectId: string
  category: string
  message: string
}

export const projectApi = {
  // GET /projects - Get all projects for current user
  getAll: async (): Promise<Project[]> => {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => setTimeout(() => resolve(mockProjects), 500))
    }
    const response = await apiClient.get("/projects")
    return response.data
  },

  // GET /projects/:id - Get single project
  getById: async (id: string): Promise<Project> => {
    if (USE_MOCK_DATA) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const project = getMockProjectById(id)
          if (project) resolve(project)
          else reject(new Error("Project not found"))
        }, 300)
      })
    }
    const response = await apiClient.get(`/projects/${id}`)
    return response.data
  },

  // POST /projects - Create new project
  create: async (data: CreateProjectData): Promise<Project> => {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newProject: Project = {
            id: `proj-${Date.now()}`,
            ...data,
            feedbackCount: 0,
            status: 'active',
            createdAt:  new Date().toISOString(),
          }
          mockProjects.unshift(newProject)
          resolve(newProject)
        }, 500)
      })
    }
    const response = await apiClient.post("/projects", data)
    return response.data
  },

  // PUT /projects/:id - Update project
  update: async (id: string, data: Partial<CreateProjectData>): Promise<Project> => {
    const response = await apiClient.put(`/projects/${id}`, data)
    return response.data
  },

  // DELETE /projects/:id - Delete project
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/projects/${id}`)
  },
}

export const feedbackApi = {
  // GET /projects/:projectId/feedback - Get all feedback for a project
  getByProject: async (projectId: string): Promise<Feedback[]> => {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(getMockFeedbackByProject(projectId)), 400)
      })
    }
    const response = await apiClient.get(`/feedback/project/${projectId}`)
    return response.data
  },

  // POST /feedback - Submit new feedback (public endpoint, no auth required)
  submit: async (data: CreateFeedbackData): Promise<Feedback> => {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newFeedback: Feedback = {
            id: `fb-${Date.now()}`,
            ...data,
            timestamp: "Just now",
            status: "New",
          }
          mockFeedback.unshift(newFeedback)
          resolve(newFeedback)
        }, 600)
      })
    }
    alert("Submitting feedback to backend /feedback/project/:projectId")
    const response = await apiClient.post("/feedback/project/"+data.projectId, data)
    return response.data
  },

  // PUT /feedback/:id/status - Update feedback status
  updateStatus: async (id: string, status: string): Promise<Feedback> => {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const feedback = mockFeedback.find((fb) => fb.id === id)
          if (feedback) {
            feedback.status = status
            resolve(feedback)
          }
        }, 300)
      })
    }
    const response = await apiClient.put(`/feedback/${id}/status`, { status })
    return response.data
  },

  // DELETE /feedback/:id - Delete feedback
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/feedback/${id}`)
  },
}

export const publicApi = {
  // GET /p/:projectId - Get public project info
  getProject: async (projectId: string): Promise<Project> => {
    if (USE_MOCK_DATA) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const project = getMockProjectById(projectId)
          if (project) resolve(project)
          else reject(new Error("Project not found"))
        }, 300)
      })
    }
    const response = await apiClient.get(`/projects/p/${projectId}`)
    return response.data
  },

  // GET /p/:projectId/feedback - Get public feedback (only if project is public)
  getFeedback: async (projectId: string): Promise<Feedback[]> => {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(getMockFeedbackByProject(projectId)), 400)
      })
    }
    const response = await apiClient.get(`/feedback/project/${projectId}`)
    return response.data
  },
}

export const authApi = {
  // POST /auth/signup - Register new user
  signup: async (data: { email: string; password: string; name?: string }) => {
    const response = await apiClient.post("/auth/signup", data)
    return response.data
  },

  // POST /auth/login - Login user
  login: async (data: { email: string; password: string }) => {
    const response = await apiClient.post("/auth/login", data)
    return response.data
  },

  // POST /auth/logout - Logout user
  logout: async () => {
    const response = await apiClient.post("/auth/logout")
    return response.data
  },

  // GET /auth/session - Get current session
  getSession: async () => {
    const response = await apiClient.get("/auth/session")
    return response.data
  },

  // POST /auth/forgot-password - Request password reset
  forgotPassword: async (email: string) => {
    const response = await apiClient.post("/auth/forgot-password", { email })
    return response.data
  },
}


export const profileApi = {
  // GET /auth/me - Get current user profile
  getProfile: async () => {
    const response = await apiClient.get("/auth/me")
    return response.data
  },

  // PUT /auth/me - Update current user profile
  updateProfile: async (data: { name?: string; email?: string; password?: string }) => {
    const response = await apiClient.put("/auth/me", data)
    return response.data
  },
}

