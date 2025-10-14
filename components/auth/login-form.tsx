"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { authApi } from "@/lib/api-services";
import { authClient } from "@/lib/auth-client";
import { Eye, EyeOff } from "lucide-react";
import { SocialSigUp } from "./social-signup";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      rememberMe,
    });

    if (data?.user) {
      router.push("/dashboard");
      return;
    }

    if (error) {
      if (error?.code == "EMAIL_NOT_VERIFIED") {
        setInfo("Please verify your email address before signing in");
      } else {
        setError(error?.message || "Invalid email or password");
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-card rounded-2xl shadow-xl p-6 sm:p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-foreground rounded-xl mb-4">
            <span className="text-card font-bold text-xl">FX</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-2">
            Welcome back
          </h1>
          <p className="text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {info && (
          <Alert variant="default" className="mb-6 flex items-center">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{info}</AlertDescription>
          </Alert>
        )}
        {/* Social Signup */}
        <SocialSigUp setError={setError} />
        {/* Divider */}
        <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
          <div className="h-px w-full bg-slate-200"></div>
          or <div className="h-px w-full bg-slate-200"></div>
        </div>

        {/* Email Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="h-11"
            />
          </div>

          <div className="relative space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <div className="flex items-center">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="h-11 pr-10" // add right padding for the icon
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="-ml-10 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          {/** remember me */}
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 text-secondary focus:ring-2 focus:ring-offset-0 focus:ring-secondary"
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember" className="ml-2 text-sm">
              Remember me
            </label>
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-secondary hover:bg-secondary/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">Don't have an account? </span>
          <Link
            href="/signup"
            className="text-foreground font-medium hover:text-secondary transition-colors"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
