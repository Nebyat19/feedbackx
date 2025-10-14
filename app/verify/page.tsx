"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Loader2, Mail, XCircle, CheckCircle2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

export default function VerifyPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")
  const [resendLoading, setResendLoading] = useState(false)
  const [email, setEmail] = useState(searchParams.get("email") || "")

  const token = searchParams.get("token") || ""

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus("error")
        setMessage("Verification link missing or expired.")
        return
      }

      try {
        const { data, error } = await authClient.verifyEmail({ query: { token } })
        if (error || !data?.user) {
          setStatus("error")
          setMessage("Invalid or expired verification link.")
          return
        }

        setStatus("success")
        setMessage("Your email has been verified successfully!")
      } catch {
        setStatus("error")
        setMessage("Something went wrong during verification.")
      }
    }

    verify()
  }, [token])

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      setMessage("Please enter your email.")
      return
    }

    setResendLoading(true)
    try {
      await authClient.sendVerificationEmail({ email })
      setMessage("Verification email resent! Check your inbox.")
      setStatus("success")
    } catch {
      setMessage("Failed to resend verification email.")
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <div className="bg-card w-full max-w-md rounded-2xl shadow-lg p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          {status === "loading" && <Loader2 className="w-10 h-10 animate-spin text-muted-foreground" />}
          {status === "success" && <CheckCircle2 className="w-10 h-10 text-green-500" />}
          {status === "error" && <XCircle className="w-10 h-10 text-red-500" />}
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold mb-2">
          {status === "loading" && "Verifying your email"}
          {status === "success" && "Email Verified"}
          {status === "error" && "Verification Failed"}
        </h1>

        {/* Message */}
        <p className="text-muted-foreground mb-6">{message}</p>

        {/* Loading State */}
        {status === "loading" && (
          <p className="text-sm text-muted-foreground animate-pulse">
            Please wait while we confirm your verification...
          </p>
        )}

        {/* Success State */}
        {status === "success" && (
          <Button
            onClick={() => router.push("/login")}
            className="w-full h-11 bg-secondary hover:bg-secondary/90"
          >
            Continue to Login
          </Button>
        )}

        {/* Error State */}
        {status === "error" && (
          <form onSubmit={handleResend} className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email to resend link"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 text-center"
              required
            />
            <Button
              type="submit"
              disabled={resendLoading}
              className="w-full h-11 bg-secondary hover:bg-secondary/90"
            >
              {resendLoading ? "Resending..." : "Resend Verification Email"}
            </Button>
          </form>
        )}

        {/* Footer */}
        <div className="mt-8 text-xs text-muted-foreground">
          <Mail className="inline w-4 h-4 mr-1" />
          Powered by FeedbackX Authentication
        </div>
      </div>
    </div>
  )
}
