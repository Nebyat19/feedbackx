import { Handler } from '@vercel/node'
import { NestFactory } from '@nestjs/core'
import { AppModule } from '../src/app.module'
import { ExpressAdapter } from '@nestjs/platform-express'
import express from 'express'

const server = express()

let cachedApp: any = null

const handler: Handler = async (req, res) => {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server))
    await app.init()
    cachedApp = app
  }
  server(req, res)
}

export default handler
