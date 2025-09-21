# Health Chatbot - SIH Project

A comprehensive health chatbot application built with Next.js, TypeScript, and real-time messaging capabilities.

## What's inside?

This project includes the following packages/apps:

### Apps and Packages

- `web`: Next.js frontend application with Clerk authentication
- `api`: Express.js backend with HTTP REST API and WebSocket server
- `validator`: Zod schemas for type-safe validation
- `@repo/db`: Prisma database client and schema
- `@repo/ui`: Shared React component library
- `@repo/eslint-config`: ESLint configurations
- `@repo/typescript-config`: TypeScript configurations

### Features

- User authentication with Clerk
- Real-time chat via WebSocket
- HTTP REST API for chat management
- PostgreSQL database with Prisma ORM
- Type-safe validation with Zod
- Health-focused chat system

### Tech Stack

- [Next.js](https://nextjs.org/) - Frontend framework
- [Express.js](https://expressjs.com/) - Backend API server
- [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) - Real-time messaging
- [Prisma](https://prisma.io/) - Database ORM
- [Clerk](https://clerk.dev/) - Authentication
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Zod](https://zod.dev/) - Schema validation
- [Bun](https://bun.sh/) - Runtime and package manager

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- PostgreSQL database
- Clerk account for authentication

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd SIH

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env
# Edit .env with your database and Clerk credentials

# Run database migrations
cd packages/db
bunx prisma migrate dev

# Start development servers
cd ../..
bun dev
```

### Environment Variables

Create `.env` files in the appropriate directories:

**packages/db/.env:**
```
DATABASE_URL="postgresql://username:password@localhost:5432/health_chatbot"
```

**apps/api/.env:**
```
JWT_SECRET=your_jwt_secret
HTTP_PORT=4000
<<<<<<< HEAD
WS_PORT=5001
=======
WS_PORT=4001
>>>>>>> 81b85bd6b75ad5a2a4ca616b9697aaf41e33a516
```

## Development

### Start all services
```bash
bun dev
```

### Start individual services
```bash
# Frontend only
cd apps/web && bun dev

# API only
cd apps/api && bun run index.ts

# Database studio
cd packages/db && bunx prisma studio
```

## API Endpoints

### Authentication
- `POST /api/v1/users/register` - User registration
- `POST /api/v1/users/login` - User login

### Chat Sessions
- `GET /api/v1/chat/sessions` - Get user's chat sessions
- `POST /api/v1/chat/sessions` - Create new chat session
- `GET /api/v1/chat/sessions/:id` - Get specific session

### Messages
- `POST /api/v1/chat/messages` - Send message
- `GET /api/v1/chat/sessions/:id/messages` - Get session messages

### WebSocket
- `ws://localhost:4001?token=<jwt_token>` - Real-time messaging

## Database Schema

The application uses a health-focused database schema with:
- Users (authentication and profiles)
- Chat Sessions (conversation management)
- Chat Messages (message storage)
- Reminders (health reminders)
- Symptoms (health symptom tracking)

## Deployment

Build and deploy the applications:

```bash
# Build all packages
bun run build

# Deploy frontend (Vercel/Netlify)
cd apps/web && bun run build

# Deploy API (Railway/Heroku/VPS)
cd apps/api && bun run build
```
