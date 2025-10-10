import { NestFactory } from "@nestjs/core"
import { AppModule } from "../src/app.module"
import { ExpressAdapter } from "@nestjs/platform-express"
import express, { Request, Response } from "express"
import cors from "cors"

const server = express()
let cachedApp: any = null

// Enable CORS on Express directly
server.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
)

// Automatically handle OPTIONS requests
server.options("*", cors())

export default async function handler(req: Request, res: Response) {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server))
    app.setGlobalPrefix("api/v1")
    await app.init()
    cachedApp = app
  }

  return server(req, res)
}
