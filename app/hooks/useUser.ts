import { useState, useEffect, useCallback } from "react"
import { profileApi } from "@/lib/api-services"

export interface User {
  id: string
  email: string
  name?: string
  createdAt: string
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUser = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await profileApi.getProfile()
      setUser(data)
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Failed to fetch user")
    } finally {
      setLoading(false)
    }
  }, [])

  const updateUser = useCallback(
    async (updates: Partial<User>) => {
      if (!user) return
      setLoading(true)
      setError(null)
      try {
        const updated = await profileApi.updateProfile(updates)
        setUser(updated)
        return updated
      } catch (err: any) {
        console.error(err)
        setError(err.message || "Failed to update profile")
        throw err
      } finally {
        setLoading(false)
      }
    },
    [user]
  )

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return { user, loading, error, refetch: fetchUser, updateUser }
}
