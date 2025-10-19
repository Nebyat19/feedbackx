"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Eye, EyeOff, Loader2, Mail } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { SocialSigUp } from "./social-signup";

export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
      });
      if (data?.user) setEmailSent(true);
      else setError(error?.message || "An error occurred during signup");
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-card rounded-2xl shadow-lg p-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-foreground rounded-xl mb-4">
            <Mail className="w-6 h-6 text-card" />
          </div>
          <h2 className="font-serif text-2xl font-bold mb-2">
            Check your email
          </h2>
          <p className="text-muted-foreground mb-6">
            A verification link was sent to <b>{email}</b>. Please verify your
            account to continue.
          </p>
          <Link
            href="/login"
            className="inline-block bg-secondary text-primary-foreground font-medium px-6 py-2 rounded-lg hover:bg-secondary/90 transition"
          >
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-20 max-w-md">
      <div className="flex items-center gap-1 sm:justify-center w-full">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-foreground rounded-xl mb-4">
            <span className="text-card font-bold text-xl">FX</span>
          </div>
          <p className="text-sm text-gray-900"></p>
      </div>
        <div className="text-center mb-8">
         
          <h1 className="font-serif text-3xl font-bold mb-2">
            Create your account
          </h1>
          <p className="text-muted-foreground text-sm">
            Start collecting feedback instantly
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-5">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Email Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
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

          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-secondary hover:bg-secondary/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
        {/* Divider */}
        <div className="flex w-full items-center gap-2 pt-5 text-sm text-slate-600">
          <div className="h-px w-full bg-slate-200"></div>
          or <div className="h-px w-full bg-slate-200"></div>
        </div>
        {/* Social Signup */}
        <SocialSigUp setError={setError} />
        {/* Footer */}
        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">
            Already have an account?{" "}
          </span>
          <Link
            href="/login"
            className="text-foreground font-medium hover:text-secondary transition"
          >
            Sign in
          </Link>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-foreground">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-foreground">
            Privacy Policy
          </Link>
          .
        </div>
      </div>
   

  );
}
