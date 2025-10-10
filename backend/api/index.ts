import { NestFactory } from "@nestjs/core"
import { AppModule } from "../src/app.module"
import { ExpressAdapter } from "@nestjs/platform-express"
import express, { Request, Response } from "express"
import cors from "cors"

const server = express()
let cachedApp: any = null

// Enable CORS for Express (external level)
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
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server))

    // Enable CORS inside Nest too (internal routes, guards, etc.)
    app.enableCors({
      origin: process.env.FRONTEND_URL || "https://www.feedbackx.me",
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    })

    app.setGlobalPrefix("api/v1")
    await app.init()
    cachedApp = app
  }

  return server(req, res)
}
