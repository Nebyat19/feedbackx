"use client"
import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Loader2, Mail } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

export default function VerifyPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const [resendLoading, setResendLoading] = useState(false)

  const token = searchParams.get('token') || ''

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus('error')
        setMessage('No token provided')
        return
      }

      try {
        const { data, error } = await authClient.verifyEmail({ query: { token } })

        if (error || data?.status) {
          setStatus('error')
          setMessage(error?.message || 'Invalid or expired token')
          return
        }

        setStatus('success')
        setMessage('Your email has been verified successfully!')
      } catch (err: any) {
        setStatus('error')
        setMessage(err.message || 'Something went wrong')
      }
    }

    verify()
  }, [token])

  const handleResend = async () => {
    setResendLoading(true)
    try {
      await authClient.resendVerificationEmail({ email: searchParams.get('email') || '' })
      setMessage('Verification email resent! Please check your inbox.')
      setStatus('success')
    } catch (err: any) {
      setMessage(err.message || 'Failed to resend email')
    } finally {
      setResendLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="flex flex-col justify-center items-center h-screen px-4">
        <Loader2 className="w-8 h-8 animate-spin mb-4" />
        <p className="text-muted-foreground">Verifying your email...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen px-4">
      <div className="bg-card rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md text-center">
        <div className="mb-4">
          <Mail className="w-12 h-12 mx-auto text-foreground" />
        </div>
        <Alert variant={status === 'success' ? 'default' : 'destructive'}>
          <AlertDescription>{message}</AlertDescription>
        </Alert>

        {status === 'error' && (
          <div className="mt-6 flex justify-center">
            <Button
              onClick={handleResend}
              disabled={resendLoading}
              className="bg-secondary hover:bg-secondary/90"
            >
              {resendLoading ? 'Resending...' : 'Resend Verification Email'}
            </Button>
          </div>
        )}

        {status === 'success' && (
          <div className="mt-6 flex justify-center">
            <Button
              onClick={() => router.push('/login')}
              className="bg-secondary hover:bg-secondary/90"
            >
              Back to Login
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
