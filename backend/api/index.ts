import { NestFactory } from "@nestjs/core"
import { AppModule } from "../src/app.module"
import { ExpressAdapter } from "@nestjs/platform-express"
import express, { Request, Response } from "express"
import cors from "cors"

const server = express()
let cachedApp: any = null

// Enable CORS globally on the Express server once
server.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)
// Handle preflight requests automatically
server.options("*", cors())

export default async function handler(req: Request, res: Response) {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server))
    app.setGlobalPrefix("api/v1")
    await app.init()
    cachedApp = app
  }

  // Express will handle the request, including OPTIONS preflight
  return server(req, res)
}
