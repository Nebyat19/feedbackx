import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Enable CORS for frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
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

  const port = process.env.PORT || 4000
  if (process.env.NODE_ENV !== 'production') {
    await app.listen(port)
  }
  
  
  console.log(`🚀 FeedbackX API running on http://localhost:${port}/api`)
}
bootstrap()
