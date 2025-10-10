# FeedbackX Backend API

NestJS backend with Better Auth integration for the FeedbackX platform.

## Setup

1. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Configure environment:**
   \`\`\`bash
   cp .env.example .env
   # Edit .env with your database credentials
   \`\`\`

3. **Setup database:**
   \`\`\`bash
   npx prisma migrate dev --name init
   npx prisma generate
   \`\`\`

4. **Run development server:**
   \`\`\`bash
   npm run start:dev
   \`\`\`

The API will be available at `http://localhost:4000/api`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Projects
- `POST /api/projects` - Create project (protected)
- `GET /api/projects` - Get all user projects (protected)
- `GET /api/projects/:id` - Get project details (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)
- `GET /api/projects/:id/stats` - Get project stats (protected)

### Feedback
- `POST /api/feedback/project/:projectId` - Submit feedback (public)
- `GET /api/feedback/project/:projectId/public` - Get public feedback (public)
- `GET /api/feedback/project/:projectId` - Get all feedback (protected)
- `PUT /api/feedback/:id/status` - Update feedback status (protected)
- `DELETE /api/feedback/:id` - Delete feedback (protected)

## Database Schema

The API uses PostgreSQL with Prisma ORM. Run migrations with:
\`\`\`bash
npx prisma migrate dev
\`\`\`

View database in Prisma Studio:
\`\`\`bash
npx prisma studio
\`\`\`

## Production Build

\`\`\`bash
npm run build
npm run start:prod
