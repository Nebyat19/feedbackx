import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";

interface SocialSigUpProps {
  setError: (message: string) => void;
}

export const SocialSigUp = ({ setError }: SocialSigUpProps) => {
  const [loadingProvider, setLoadingProvider] = useState<"google" | "github" | null>(null);

  const handleSocialSignup = async (provider: "google" | "github") => {
    try {
      setLoadingProvider(provider);
      await authClient.signIn.social({
        provider,
        callbackURL: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/dashboard`,
      });
    } catch {
      setError(`Failed to sign up with ${provider}`);
      setLoadingProvider(null);
    }
  };

  return (
    <div className="mt-7 flex flex-col gap-2">
      {/* GitHub */}
      <button
        onClick={() => handleSocialSignup("github")}
        disabled={!!loadingProvider}
        className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loadingProvider === "github" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <img
            src="https://www.svgrepo.com/show/512317/github-142.svg"
            alt="GitHub"
            className="h-[18px] w-[18px]"
          />
        )}
        {loadingProvider === "github" ? "Connecting..." : "Continue with GitHub"}
      </button>

      {/* Google */}
      <button
        onClick={() => handleSocialSignup("google")}
        disabled={!!loadingProvider}
        className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loadingProvider === "google" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="h-[18px] w-[18px]"
          />
        )}
        {loadingProvider === "google" ? "Connecting..." : "Continue with Google"}
      </button>
    </div>
  );
};
