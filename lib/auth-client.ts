import { createAuthClient } from "better-auth/react" // make sure to import from better-auth/react
import { emailOTPClient } from "better-auth/client/plugins"
export const authClient =  createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/auth",
    plugins: [
      emailOTPClient()
    ]
    
})

