import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left: Login Form */}
      <div className="flex flex-1 items-center justify-center px-6 sm:px-12">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>

      {/* Right: Visual Section */}
      <div className="hidden lg:flex lg:flex-1 items-center justify-center relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/20 to-background"></div>

        {/* Decorative Blobs */}
        <div className="absolute top-10 right-10 h-48 w-48 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 h-48 w-48 rounded-full bg-chart-1/30 blur-3xl"></div>

        {/* Center Text */}
        <div className="relative z-10 text-center">
          <h1 className="text-xl font-bold text-primary sm:text-4xl lg:text-xl">
            The Right Tool
            <br />
            <span className="text-foreground/80 text-4xl">For Your </span>
            <span className="text-accent text-4xl font-serif">Business</span>
          </h1>
        </div>

        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_95%,var(--color-border)_100%)] bg-[length:20px_1px] opacity-10"></div>
      </div>
    </div>
  );
}
