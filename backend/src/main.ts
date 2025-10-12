import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { toNodeHandler } from 'better-auth/node';
import { AuthService } from '@thallesp/nestjs-better-auth';
async function bootstrap() {
   // Disable NestJS's built-in body parser so we can control ordering
   const app = await NestFactory.create(AppModule, { bodyParser: false });

   app.enableCors({
    origin: [process.env.FRONTEND_URL ],
    credentials: true,
   });

   // Access Express instance
   const expressApp = app.getHttpAdapter().getInstance();
 
   // Access BetterAuth instance from AuthService
   const authService = app.get<AuthService>(AuthService);
 
   // Mount BetterAuth before body parsers
   expressApp.all(
     /^\/api\/auth\/.*/,
     toNodeHandler(authService.instance.handler),
   );
 
   // Re-enable Nest's JSON body parser AFTER mounting BetterAuth
   expressApp.use(require('express').json());
 
   //app.setGlobalPrefix('api');
    await app.listen(process.env.PORT || 3000);
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
}
bootstrap();