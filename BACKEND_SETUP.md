# FeedbackX Backend Setup with Better Auth

The NestJS backend should be set up as a **separate project** outside of this Next.js frontend.

## Quick Setup

1. **Create a new directory for the backend:**
   \`\`\`bash
   mkdir feedbackx-backend
   cd feedbackx-backend
   \`\`\`

2. **Initialize NestJS project:**
   \`\`\`bash
   npm i -g @nestjs/cli
   nest new .
   \`\`\`

3. **Install dependencies:**
   \`\`\`bash
   npm install @nestjs/config @prisma/client better-auth class-validator class-transformer
   npm install -D prisma
   \`\`\`

4. **Initialize Prisma:**
   \`\`\`bash
   npx prisma init
   \`\`\`

5. **Create Prisma Schema** (`prisma/schema.prisma`):
   \`\`\`prisma
   generator client {
     provider = "prisma-client-js"
   }

   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }

   model User {
     id        String    @id @default(cuid())
     email     String    @unique
     name      String?
     image     String?
     emailVerified DateTime?
     createdAt DateTime  @default(now())
     updatedAt DateTime  @updatedAt
     
     sessions  Session[]
     accounts  Account[]
     projects  Project[]
   }

   model Session {
     id           String   @id @default(cuid())
     sessionToken String   @unique
     userId       String
     expires      DateTime
     user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
   }

   model Account {
     id                String  @id @default(cuid())
     userId            String
     type              String
     provider          String
     providerAccountId String
     refresh_token     String?
     access_token      String?
     expires_at        Int?
     token_type        String?
     scope             String?
     id_token          String?
     session_state     String?
     user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

     @@unique([provider, providerAccountId])
   }

   model VerificationToken {
     identifier String
     token      String   @unique
     expires    DateTime

     @@unique([identifier, token])
   }

   model Project {
     id          String     @id @default(cuid())
     title       String
     description String
     isPublic    Boolean    @default(true)
     status      String     @default("active")
     userId      String
     user        User       @relation(fields: [userId], references: [id], onDelete: Cascade)
     feedback    Feedback[]
     createdAt   DateTime   @default(now())
     updatedAt   DateTime   @updatedAt
   }

   model Feedback {
     id        String   @id @default(cuid())
     projectId String
     project   Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
     category  String
     message   String
     status    String   @default("New")
     createdAt DateTime @default(now())
     updatedAt DateTime @updatedAt
   }
   \`\`\`

6. **Configure Better Auth** (`src/auth/auth.config.ts`):
   \`\`\`typescript
   import { betterAuth } from "better-auth"
   import { PrismaClient } from "@prisma/client"

   const prisma = new PrismaClient()

   export const auth = betterAuth({
     database: prisma,
     emailAndPassword: {
       enabled: true,
       requireEmailVerification: false, // Set to true in production
     },
     session: {
       expiresIn: 60 * 60 * 24 * 7, // 7 days
       updateAge: 60 * 60 * 24, // 1 day
     },
     advanced: {
       generateId: () => {
         return crypto.randomUUID()
       },
     },
   })
   \`\`\`

7. **Create Auth Module** (`src/auth/auth.module.ts`):
   \`\`\`typescript
   import { Module } from '@nestjs/common'
   import { AuthController } from './auth.controller'
   import { AuthService } from './auth.service'

   @Module({
     controllers: [AuthController],
     providers: [AuthService],
     exports: [AuthService],
   })
   export class AuthModule {}
   \`\`\`

8. **Create Auth Controller** (`src/auth/auth.controller.ts`):
   \`\`\`typescript
   import { Controller, Post, Get, Body, Req, Res, HttpCode } from '@nestjs/common'
   import { Request, Response } from 'express'
   import { auth } from './auth.config'

   @Controller('auth')
   export class AuthController {
     @Post('signup')
     async signup(@Body() body: { email: string; password: string; name?: string }, @Req() req: Request, @Res() res: Response) {
       return auth.api.signUpEmail({
         body,
         headers: req.headers,
       }).then((response) => res.json(response))
     }

     @Post('login')
     @HttpCode(200)
     async login(@Body() body: { email: string; password: string }, @Req() req: Request, @Res() res: Response) {
       return auth.api.signInEmail({
         body,
         headers: req.headers,
       }).then((response) => res.json(response))
     }

     @Post('logout')
     @HttpCode(200)
     async logout(@Req() req: Request, @Res() res: Response) {
       return auth.api.signOut({
         headers: req.headers,
       }).then((response) => res.json(response))
     }

     @Get('session')
     async getSession(@Req() req: Request) {
       return auth.api.getSession({
         headers: req.headers,
       })
     }

     @Post('forgot-password')
     @HttpCode(200)
     async forgotPassword(@Body() body: { email: string }, @Req() req: Request, @Res() res: Response) {
       // Implement password reset logic
       return res.json({ message: 'Password reset email sent' })
     }
   }
   \`\`\`

9. **Create Auth Guard** (`src/auth/auth.guard.ts`):
   \`\`\`typescript
   import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
   import { auth } from './auth.config'

   @Injectable()
   export class AuthGuard implements CanActivate {
     async canActivate(context: ExecutionContext): Promise<boolean> {
       const request = context.switchToHttp().getRequest()
       
       const session = await auth.api.getSession({
         headers: request.headers,
       })

       if (!session?.user) {
         throw new UnauthorizedException('Not authenticated')
       }

       request.user = session.user
       return true
     }
   }
   \`\`\`

10. **Update App Module** (`src/app.module.ts`):
    \`\`\`typescript
    import { Module } from '@nestjs/common'
    import { ConfigModule } from '@nestjs/config'
    import { AuthModule } from './auth/auth.module'
    import { ProjectsModule } from './projects/projects.module'
    import { FeedbackModule } from './feedback/feedback.module'

    @Module({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        ProjectsModule,
        FeedbackModule,
      ],
    })
    export class AppModule {}
    \`\`\`

11. **Configure environment variables** in `.env`:
    \`\`\`env
    DATABASE_URL="postgresql://user:password@localhost:5432/feedbackx"
    BETTER_AUTH_SECRET="your-secret-key-min-32-chars"
    BETTER_AUTH_URL="http://localhost:4000"
    PORT=4000
    FRONTEND_URL="http://localhost:3000"
    \`\`\`

12. **Run migrations:**
    \`\`\`bash
    npx prisma migrate dev --name init
    npx prisma generate
    \`\`\`

13. **Enable CORS** in `src/main.ts`:
    \`\`\`typescript
    import { NestFactory } from '@nestjs/core'
    import { AppModule } from './app.module'

    async function bootstrap() {
      const app = await NestFactory.create(AppModule)
      
      app.enableCors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        credentials: true,
      })
      
      app.setGlobalPrefix('api')
      
      await app.listen(process.env.PORT || 4000)
    }
    bootstrap()
    \`\`\`

14. **Start the backend:**
    \`\`\`bash
    npm run start:dev
    \`\`\`

## API Endpoints

The backend will run on `http://localhost:4000/api` with these endpoints:

### Authentication (Better Auth)
- `POST /api/auth/signup` - Register with email/password
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/logout` - Logout
- `GET /api/auth/session` - Get current session
- `POST /api/auth/forgot-password` - Request password reset

### Projects (Protected)
- `POST /api/projects` - Create project
- `GET /api/projects` - Get all user projects
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Feedback
- `POST /api/feedback` - Submit feedback (public, no auth)
- `GET /api/projects/:projectId/feedback` - Get project feedback (protected)
- `PUT /api/feedback/:id/status` - Update feedback status (protected)
- `DELETE /api/feedback/:id` - Delete feedback (protected)

## Connect Frontend

Update your frontend `.env`:
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
\`\`\`

Then set `USE_MOCK_DATA = false` in `lib/api-services.ts` to use the real backend.

## Better Auth Benefits

- **Built-in session management** - Automatic session handling with cookies
- **Email verification** - Easy to enable for production
- **Password reset** - Built-in password reset flow
- **OAuth providers** - Easy to add Google, GitHub, etc.
- **Type-safe** - Full TypeScript support
- **Secure by default** - CSRF protection, secure cookies
- **Easy to extend** - Plugin system for additional features
