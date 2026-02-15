# Task Board

A frontend Task Board application with static login, drag-and-drop columns (Todo, Doing, Done), and full persistence in `localStorage`. Built for the Frontend Internship assignment.

## Features

- **Static login**: Hardcoded credentials `intern@demo.com` / `intern123`; error messages for invalid login; "Remember me" and logout; route protection.
- **Task board**: Fixed columns Todo, Doing, Done. Tasks have Title (required), Description, Priority, Due Date, Tags, CreatedAt. Create, edit, delete tasks; drag and drop across columns.
- **Search & filter**: Search by title; filter by priority; sort by due date (empty values last).
- **Persistence**: Board and activity log persist in `localStorage`; safe handling of empty/missing storage; "Reset board" with confirmation.
- **Activity log**: Latest actions (task created, edited, moved, deleted).

## Tech stack

- **React 19** + **Vite 7**
- **React Router** for routing and protected routes
- **@dnd-kit** for drag and drop
- **localStorage** for persistence (no backend)
- **Vitest** + **Testing Library** for tests

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run development server**

   ```bash
   npm run dev
   ```

   Open the URL shown (e.g. `http://localhost:5173`).

3. **Build for production**

   ```bash
   npm run build
   ```

4. **Preview production build**

   ```bash
   npm run preview
   ```

5. **Run tests**

   ```bash
   npm run test
   ```

## Project structure

```
src/
  context/       # AuthContext, BoardContext
  lib/           # auth, storage, constants, taskUtils
  components/    # Button, Input, Modal, LoginForm, ProtectedRoute,
                 # Header, TaskForm, TaskCard, Column, Board, ActivityLog
  pages/         # LoginPage, BoardPage
  test/          # Vitest setup
```

## Explanations

- **State management**: Auth state in `AuthContext` (user, login, logout, remember me). Board state in `BoardContext` (columns, tasks, activity log, search/filter, persistence). No global store beyond these two contexts.
- **Reusable components**: `Button`, `Input`, `Modal` used across login and board; form validation in `LoginForm` and `TaskForm` (required title, error messages).
- **Persistence**: `storage.js` reads/writes board and activity to `localStorage` with try/catch and safe defaults when data is missing or invalid.
- **Route protection**: `ProtectedRoute` checks `AuthContext`; if not logged in, redirects to `/login` and stores `from` in location state so the user returns to the intended page after login.

## Demo credentials

- **Email:** `intern@demo.com`
- **Password:** `intern123`

## Deploy

### GitHub Pages

1. **Create a repo** on GitHub and push this project (e.g. repo name: `frontend-hitro` or `task-board`).

2. **Turn on GitHub Pages**: In the repo go to **Settings** → **Pages** → under **Build and deployment** set **Source** to **GitHub Actions**.

3. **Deploy**: Push to the `main` branch (or run the workflow from the **Actions** tab). The workflow builds the app and deploys to Pages.

4. **Your live URL** will be:
   - `https://<your-username>.github.io/<repo-name>/`  
   Example: `https://johndoe.github.io/frontend-hitro/`

The workflow (`.github/workflows/deploy.yml`) builds with the correct base path and copies `index.html` to `404.html` so routes like `/login` work when opened directly.

### Vercel (alternative)

1. Run `npm run build`, then `npx vercel`.
2. Or push to GitHub and import the repo at [vercel.com](https://vercel.com).

## Submission

- **Deployed URL:** (paste your Vercel/Netlify URL here after deploying)
- **Source:** ZIP of this repo or link to repository
- **README:** This file (setup steps and explanations)
