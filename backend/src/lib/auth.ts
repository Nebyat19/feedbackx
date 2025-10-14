// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { sendVerificationEmail } from "./send-email";

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
    trustedOrigins: [
        "http://localhost:3000",
        "https://feedbackx.me",
        process.env.FRONTEND_URL,
        "insomnia://", 
        "postman://",
       
       ]
  });