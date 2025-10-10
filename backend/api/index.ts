import { NestFactory } from "@nestjs/core"
import { AppModule } from "../src/app.module"
import { ExpressAdapter } from "@nestjs/platform-express"
import express, { Request, Response } from "express"

const server = express()
let cachedApp: any = null

export default async function handler(req: Request, res: Response) {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server))
    await app.init()
    cachedApp = app
  }

  return server(req, res)
}
