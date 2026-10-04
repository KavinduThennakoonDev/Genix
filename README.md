# Genix Academy

Website and admin panel for Genix Academy, a training institute offering courses and webinars.

## Features

- **Public site** – home page, course listing, course detail pages and webinar detail pages
- **Registration forms** – visitors can register for a course or a webinar
- **Admin panel** (`/admin`) – password-protected dashboard to:
  - Create, edit and delete courses, webinars and testimonials
  - Upload images (JPEG, PNG, WebP, GIF or SVG, up to 5 MB)
  - View registrations and update their status (new / contacted / enrolled / rejected)
  - Seed the database from the bundled static data
- **Fallback data** – public pages use static data when the database is empty

## Tech stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- MongoDB with Mongoose
- Cloudinary for image hosting
- GSAP for animations

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` in the project root:

   ```bash
   MONGODB_URI=your-mongodb-connection-string
   ADMIN_PASSWORD=your-admin-password
   ADMIN_SECRET=a-long-random-string

   # Image uploads – required in production, optional in development
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000). Log in at `/admin/login` with `ADMIN_PASSWORD`, then use the seed button on the dashboard to load the sample data.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | Yes | MongoDB connection string |
| `ADMIN_PASSWORD` | Yes | Password for the admin login |
| `ADMIN_SECRET` | Yes | Secret used to sign the admin session cookie |
| `CLOUDINARY_CLOUD_NAME` | Production | Cloudinary account name |
| `CLOUDINARY_API_KEY` | Production | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Production | Cloudinary API secret |

Without the Cloudinary variables, uploaded images are saved to `public/uploads/` in development. In production, uploads are rejected until Cloudinary is configured.

## Project structure

```
app/
├── admin/          Admin panel pages
├── api/            Public and admin API routes
├── components/     Shared UI components
├── courses/        Course listing and detail pages
├── webinar/        Webinar detail pages
├── sections/       Page sections (home, courses, course and webinar details)
├── data/           Static and seed data
└── lib/            Database connection, auth, Mongoose models, queries
middleware.ts       Protects /admin routes
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |
