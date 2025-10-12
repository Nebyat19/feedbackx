import { NestFactory } from "@nestjs/core"
import { AppModule } from "../src/app.module"
import { ExpressAdapter } from "@nestjs/platform-express"
import express, { Request, Response } from "express"
import cors from "cors"
import { toNodeHandler } from "better-auth/node"
import { AuthService } from "@thallesp/nestjs-better-auth"

const server = express()
let cachedApp: any = null

// External-level CORS (for Next.js or Vercel edge deployments)
server.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://www.feedbackx.me",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)

server.options("*", cors())

export default async function handler(req: Request, res: Response) {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
      bodyParser: false, // Disable early to mount BetterAuth first
    })

    app.enableCors({
      origin: process.env.FRONTEND_URL || "https://www.feedbackx.me",
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    })

    // Access Express instance from Nest
    const expressApp = app.getHttpAdapter().getInstance()

    // Get BetterAuth instance
    const authService = app.get(AuthService)

    // Mount BetterAuth BEFORE body parsing (important)
    expressApp.all(
      /^\/api\/auth\/.*/,
      toNodeHandler(authService.instance.api)
    )

    // Re-enable body parser AFTER BetterAuth
    expressApp.use(express.json())

    // Set global prefix for the rest of the API
    app.setGlobalPrefix("api/v1")

    await app.init()
    cachedApp = app
  }

  return server(req, res)
}
