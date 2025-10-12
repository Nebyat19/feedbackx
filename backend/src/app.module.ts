import { Controller, Module } from '@nestjs/common';
//import { AuthModule } from './auth/auth.module';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from "./lib/auth"; // Your Better Auth instance
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { FeedbackModule } from './feedback/feedback.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [
    AuthModule.forRoot(auth),
    UsersModule,
    ProjectsModule,
    FeedbackModule,
    PrismaModule
  
  ],
 
  
})
export class AppModule {}