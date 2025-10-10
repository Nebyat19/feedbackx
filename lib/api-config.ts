import axios from "axios"

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
})

apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = sessionStorage.getItem("auth_token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }else{
      config.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OGU5MDVkZTAxZjkwMzllNDg5ZGVkNDUiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTc2MDExNTk3MiwiZXhwIjoxNzYwMjAyMzcyfQ.9_hnWnn45B6lnwKeju6pnKSv2T6_RNnE5yOUf1sHmxA'
      console.log(" auth token default used")
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
     // localStorage.removeItem("auth_token")
    }
    return Promise.reject(error)
  },
)
