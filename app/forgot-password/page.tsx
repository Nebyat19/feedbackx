import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export default function ForgotPasswordPage() {
  return (
    <div className="relative flex justify-center items-center min-h-screen bg-background overflow-hidden">
    {/* Transparent grid pattern */}
    <div className="absolute inset-0 pattern" />    
    <div className="relative flex justify-center items-center w-[90%] z-10">
      <ForgotPasswordForm />
      </div>
    </div>
  )
}
