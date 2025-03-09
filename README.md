# E-Learning Platform for Indian College Students

A comprehensive e-learning platform designed for Indian college students to access previous year question papers (PYQs), notes, and study guidance through YouTube playlists. Students can also upload study materials and create study groups to collaborate with peers.

## Features

- **Study Materials**: View PYQs, notes, and YouTube playlists curated for specific subjects
- **Study Groups**: Create and join study groups to collaborate with peers
- **User Accounts**: Secure authentication with Clerk
- **Content Moderation**: Admin system for content moderation
- **Mobile-friendly**: Responsive design for all devices

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Hono.js
- **Database**: PostgreSQL with Drizzle ORM, Neon Serverless
- **Authentication**: Clerk
- **Runtime**: Bun

## Getting Started

### Prerequisites

- Node.js 18+ or Bun 1.0+
- PostgreSQL database (or Neon account)
- Clerk account for authentication

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/e-learning-app.git
   cd e-learning-app
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Set up environment variables:

   - Copy `.env.local.example` to `.env.local`
   - Fill in your database and Clerk credentials

4. Run database migrations:

   ```bash
   bun x drizzle-kit push:pg
   ```

5. Start the development server:

   ```bash
   bun dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
e-learning-app/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # React components
│   ├── db/                  # Database schema and connection
│   └── lib/                 # Utility functions
├── drizzle/                 # Drizzle migrations
├── public/                  # Static assets
├── .env.local               # Environment variables
└── drizzle.config.ts        # Drizzle configuration
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
