import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  //app.setGlobalPrefix("api/v1")
  //app.useGlobalPipes(new ValidationPipe())
  
  // Enable CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })

  // Start the server
  const port = process.env.PORT || 4000
  if (process.env.NODE_ENV !== 'production') {
  await app.listen(port)
  }

  
  console.log(`🚀 FeedbackX API running on http://localhost:${port}/api`)
}
bootstrap()
