import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Enable CORS for frontend
  app.enableCors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:3000",
      "https://feedbackx.vercel.app", "https://api.feedbackx.me"
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })

  // API prefix
  app.setGlobalPrefix("api")

  // Enable validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )
  app.enableCors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:3000",
      "https://feedbackx.vercel.app",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  })
  
  // Handle preflight OPTIONS requests manually (for serverless)
  app.use((req, res, next) => {
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL || "http://localhost:3000")
      res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS")
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization")
      res.header("Access-Control-Allow-Credentials", "true")
      return res.sendStatus(204)
    }
    next()
  })
  const port = process.env.PORT || 4000
  if (process.env.NODE_ENV !== 'production') {
  await app.listen(port)
  }

  
  console.log(`🚀 FeedbackX API running on http://localhost:${port}/api`)
}
bootstrap()
