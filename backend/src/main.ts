import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  
 
  const port = process.env.PORT || 4000
  if (process.env.NODE_ENV !== 'production') {
  await app.listen(port)
  }

  
  console.log(`🚀 FeedbackX API running on http://localhost:${port}/api`)
}
bootstrap()
