# Fleeting Jobs — Frontend

A SvelteKit dashboard UI for an AI-powered job search platform, built to match the visual style of the `/example-ui` design reference (layout, theme, typography, and components).

The **Companies** and **Job Search** modules are connected to the Spring Boot backend. Other pages still use placeholder data.

## Features

- **Dashboard** — summary stats, recent applications, and latest jobs
- **Job Search** — search, filters, job cards, resume/cover letter modals, pagination
- **Resume Generator** — template selection and preview UI
- **Applications** — trackable table with status badges and filtering
- **Companies** — full CRUD connected to the backend API
- **Settings** — profile, templates, API keys placeholder, preferences (including dark mode)

## Tech stack

- [SvelteKit](https://kit.svelte.dev/) (Svelte 5)
- TypeScript
- Tailwind CSS 4 + DaisyUI
- [lucide-svelte](https://lucide.dev/) icons

## Prerequisites

- Node.js 18+
- npm
- Spring Boot backend running (see backend project)
- PostgreSQL (via backend `docker-compose`)

## Getting started

### 1. Start the backend

```bash
cd fleeting-jobs-backend/fleeting-jobs-backend
docker compose up -d
./mvnw spring-boot:run
```

### 2. Configure the frontend

```bash
cd frontend
cp .env.example .env
```

`.env` defaults to `PUBLIC_API_BASE_URL=http://localhost:8080`.

### 3. Run the frontend

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The app redirects `/` to `/dashboard`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run check` | Run TypeScript and Svelte type checking |

## Project structure

```
src/
├── lib/
│   ├── api/          # API client (companies)
│   ├── components/   # Reusable UI (common, company, dashboard, jobs, etc.)
│   ├── data/         # Placeholder data for unconnected pages
│   ├── stores/       # Layout state (sidebar, theme, mobile menu)
│   └── types/        # TypeScript types
└── routes/
    └── (app)/        # Dashboard layout and pages
```

## Routes

| Path | Page | Data source |
|------|------|-------------|
| `/` | Redirects to `/dashboard` | — |
| `/dashboard` | Overview and recent activity | Placeholder |
| `/jobs` | Job search and results | **Backend API** (enriched with placeholders) |
| `/resume` | Resume generator | Placeholder |
| `/applications` | Application tracker | Placeholder |
| `/companies` | Company management | **Backend API** |
| `/parsers` | Redirects to `/companies` | — |
| `/settings` | Account and preferences | Placeholder |

## Company API integration

The companies module calls these backend endpoints:

| Method | Endpoint | Action |
|--------|----------|--------|
| `GET` | `/companies/list` | List all companies |
| `GET` | `/companies/get/{id}` | Get company by ID |
| `POST` | `/companies/create` | Create company |
| `PUT` | `/companies/update/{id}` | Update company |
| `DELETE` | `/companies/delete/{id}` | Delete company |

Client-side and server-side validation errors from the backend are surfaced in the create/edit form.

## Jobs API integration

The job search page calls `GET /jobs/list`. The API currently returns `id`, `title`, and `url` only. The frontend enriches each item with static placeholder values for fields the UI still expects:

| API field | UI fields filled statically |
|-----------|----------------------------|
| `id`, `title`, `url` | Used directly |
| — | `company` (derived from job URL hostname) |
| — | `location`, `employmentType`, `salary`, `experience`, `description`, `datePosted`, `remote` |

Apply opens the job listing URL from the API. Search and filters run client-side on the enriched data.

## Out of scope

- Authentication
- Real AI resume/cover letter generation
- PDF export
- Job search, applications, and parser execution APIs
