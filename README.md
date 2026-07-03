# Fleeting Jobs — Frontend

A SvelteKit dashboard UI for an AI-powered job search platform. This is a **frontend-only prototype** with placeholder data, built to match the visual style of the `/example-ui` design reference (layout, theme, typography, and components).

It is intended to be connected to a Spring Boot backend later. No API calls, authentication, or business logic are implemented.

## Features

- **Dashboard** — summary stats, recent applications, and latest jobs
- **Job Search** — search, filters, job cards, resume/cover letter modals, pagination
- **Resume Generator** — template selection and preview UI
- **Applications** — trackable table with status badges and filtering
- **Parsers** — manage company job page parsers
- **Settings** — profile, templates, API keys placeholder, preferences (including dark mode)

## Tech stack

- [SvelteKit](https://kit.svelte.dev/) (Svelte 5)
- TypeScript
- Tailwind CSS 4 + DaisyUI
- [lucide-svelte](https://lucide.dev/) icons

## Prerequisites

- Node.js 18+
- npm

## Getting started

```bash
# From the project root
cd frontend

# Install dependencies
npm install

# Start the dev server
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
│   ├── components/   # Reusable UI (common, dashboard, jobs, applications, parser, resume)
│   ├── data/         # Dummy data (jobs, applications, parsers, etc.)
│   ├── stores/       # Layout state (sidebar, theme, mobile menu)
│   └── types/        # TypeScript types
└── routes/
    └── (app)/        # Dashboard layout and pages
```

## Routes

| Path | Page |
|------|------|
| `/` | Redirects to `/dashboard` |
| `/dashboard` | Overview and recent activity |
| `/jobs` | Job search and results |
| `/resume` | Resume generator |
| `/applications` | Application tracker |
| `/parsers` | Parser management |
| `/settings` | Account and preferences |

## Out of scope

This prototype does **not** include:

- Backend or REST API integration
- Authentication
- Real AI resume/cover letter generation
- PDF export
- Parser execution or job application submission

All interactions use local placeholder data from `src/lib/data/`.
