// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { sendVerificationEmail, sendPasswordResetOTP } from "./send-email";
import { emailOTP } from "better-auth/plugins";

const client = new MongoClient(process.env.DATABASE_URL);
const db = client.db();

const prisma = new PrismaClient();

export const auth = betterAuth({
    url: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET, 
    database: mongodbAdapter(db, {
        client
      }),
    advanced: {
        database: {
          generateId: false,
        },
        defaultCookieAttributes: {
          sameSite: "none",
          secure: true,
          httpOnly: true,
        },
      },
    emailAndPassword: { 
      enabled: true ,
      requireEmailVerification: true,

    },
    emailVerification: {
      sendOnSignUp: true, 
      sendOnSignIn: true, 
      autoSignInAfterVerification: true, 
      async sendVerificationEmail({ user, url, token }, request) {
      
        await sendVerificationEmail(user.email, token ); 
      },
    },
    socialProviders: {
      github: { 
        clientId: process.env.GITHUB_CLIENT_ID, 
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }, 
      google:{
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }
    },
    plugins: [
      emailOTP({
        async sendVerificationOTP({ email, otp, type }) {
        
          if (type === "forget-password") {
            await sendPasswordResetOTP(email, otp);
          }
          
        },
        otpLength: 6, 
        expiresIn: 300, 
        allowedAttempts: 3, 
      })
    ],
    trustedOrigins: [
        "http://localhost:3000",
        "https://feedbackx.me",
        process.env.FRONTEND_URL,
        "insomnia://", 
        "postman://",
       
       ]
  });