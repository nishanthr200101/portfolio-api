# Portfolio API

NestJS backend for Nishanth's portfolio. Provides contact message tracking, dynamic experience data, resume management via Cloudinary, and site settings.

## Tech Stack

- **NestJS** — Node.js framework
- **TypeORM** + **Neon** (serverless PostgreSQL) — database
- **Cloudinary** — resume PDF storage and CDN
- **Passport JWT** — admin authentication
- **Render** — free tier hosting

## API Endpoints

### Public (no auth required)

| Method | Path | Description |
|---|---|---|
| `GET` | `/experiences` | List all work experiences |
| `GET` | `/settings/public` | Get default theme + resume URL |
| `POST` | `/messages` | Save a contact form submission |
| `POST` | `/auth/login` | Get admin JWT token |

### Admin (JWT required)

| Method | Path | Description |
|---|---|---|
| `GET` | `/messages` | List all contact messages |
| `PATCH` | `/messages/:id/read` | Mark message as read |
| `DELETE` | `/messages/:id` | Delete a message |
| `POST` | `/experiences` | Add a new experience |
| `PATCH` | `/experiences/:id` | Update an experience |
| `DELETE` | `/experiences/:id` | Delete an experience |
| `POST` | `/resume/upload` | Upload PDF → Cloudinary, update URL |
| `PATCH` | `/settings/theme` | Set default color theme |

## Local Development

### 1. Install dependencies
```bash
npm install
```

### 2. Create `.env`
```bash
cp .env.example .env
```

Fill in:
```env
DATABASE_URL=postgresql://...   # from neon.tech
JWT_SECRET=your_32_char_secret
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
FRONTEND_URL=http://localhost:5173
ADMIN_EMAIL=you@example.com
ADMIN_PASSWORD=yourpassword
PORT=3001
```

### 3. Seed the database
```bash
# Create admin user (run once)
npm run seed:admin

# Populate experiences from resume data (run once, or to reset)
npm run seed:experiences
```

### 4. Run the server
```bash
# Development (hot reload)
npm run start:dev

# Production
npm run build
node dist/main
```

API runs at `http://localhost:3001`.

## Database Schema

### `experiences`
Stores work history. `icon_key` maps to frontend asset images (`amphisoft`, `hrlytics`, `studio_diseno`).

### `contact_messages`
Contact form submissions with `is_read` flag.

### `site_settings`
Single row (id=1) storing `default_theme` and `resume_url`.

### `admin_users`
Admin accounts. Created only via `npm run seed:admin` — no sign-up endpoint.

## Deployment (Render)

1. Push this folder to a GitHub repo
2. Create a new **Web Service** on [render.com](https://render.com)
3. Set build command: `npm install && npm run build`
4. Set start command: `node dist/main`
5. Add all env vars from `.env.example` in the Render dashboard

> **Note:** Render's free tier sleeps after 15 min of inactivity (~30s cold start on next request). This is acceptable for a portfolio.

## Free Services Used

| Service | Purpose | Free Tier |
|---|---|---|
| [Neon](https://neon.tech) | PostgreSQL database | 3GB, always-on |
| [Cloudinary](https://cloudinary.com) | Resume PDF CDN | 25GB storage |
| [Render](https://render.com) | API hosting | 750 hrs/month |
