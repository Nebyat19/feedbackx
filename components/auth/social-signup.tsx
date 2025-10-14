import { authClient } from "@/lib/auth-client";
interface SocialSigUpProps {
    setError: (message: string) => void
  }
export const SocialSigUp = ({ setError }: SocialSigUpProps ) => {

const handleSocialSignup = async (provider: "google" | "github") => {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/dashboard`,
      });
    } catch {
      setError(`Failed to sign up with ${provider}`);
    }
  };

    return (<div className="mt-7 flex flex-col gap-2">
              <button onClick={async()=>{await handleSocialSignup("github")}} className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                <img
                  src="https://www.svgrepo.com/show/512317/github-142.svg"
                  alt="GitHub"
                  className="h-[18px] w-[18px] "
                ></img>
                Continue with GitHub 
              </button>
    
              <button onClick={async()=>{await handleSocialSignup("google")}} className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="h-[18px] w-[18px] "
                ></img>
                Continue with Google
              </button>
            </div>
      )

}
