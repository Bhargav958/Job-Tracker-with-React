# Job Tracker

Job Tracker is a React and Appwrite web app for managing job applications in one place. It helps users save job details, update application statuses, view progress, and use an AI assistant for job insights and interview preparation.

## Features

- User registration, login, logout, and protected routes with Appwrite Auth
- Dashboard for adding, editing, deleting, searching, and filtering job applications
- Kanban-style job board with drag-and-drop status updates
- Realtime Appwrite updates when job records change
- Profile page with user details and job-search summary
- Progress chart powered by Recharts
- Toast notifications for user actions and errors
- Responsive layout with navbar, sidebar, and centered page content
- AI assistant using Gemini through an Appwrite Function

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- React Router
- Appwrite Auth, Database, Realtime, and Functions
- Framer Motion 
- React Toastify   --> toastify instead of alert
- Recharts  --> for improving the chart facility
- Lucide React   --> for icons
- @hello-pangea/dnd  --> for drag and drop feature

## Project Structure

```text
job-tracker/
  appwrite-functions/
    gemini-ai/          # Appwrite Function for Gemini AI requests
  public/
  src/
    appwrite/           # Appwrite config, auth helpers, AI helper
    hooks/              # Shared React hooks
    pages/              # Home, dashboard, auth, profile, layout pages
  Dockerfile
  package.json
  vite.config.js
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run ESLint:

```bash
npm run lint
```

## Appwrite Setup

This project uses Appwrite for authentication, database storage, realtime updates, and server-side AI execution.

The current Appwrite client settings are in:

```text
src/appwrite/config.js
```

The app expects:

- An Appwrite project
- Email/password authentication enabled
- A database
- A `jobs` collection
- Job document attributes:
  - `title`
  - `company`
  - `status`
  - `userId`

The app filters job records by the logged-in user's `userId`, so each user only sees their own saved jobs.

## Environment Variables

Create a `.env` file in the project root when using the AI assistant:

```bash
VITE_APPWRITE_AI_FUNCTION_ID=YOUR_APPWRITE_FUNCTION_ID
```

The included `.env.example` contains the same variable as a starting point.

## AI Assistant Setup

The AI assistant sends requests to Gemini through an Appwrite Function so the Gemini API key stays server-side.

1. Create an Appwrite Function using the code in:

```text
appwrite-functions/gemini-ai/
```

2. Add this environment variable to the Appwrite Function:

```bash
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

3. Deploy the function.

4. Copy the Appwrite Function ID into your frontend `.env` file:

```bash
VITE_APPWRITE_AI_FUNCTION_ID=YOUR_APPWRITE_FUNCTION_ID
```

5. Restart the Vite dev server.

Keep `GEMINI_API_KEY` inside Appwrite only. Do not put it in the React frontend.

## Docker

The project includes a `Dockerfile`. If you build and run it with Docker, use your preferred image name:

```bash
docker build -t job-tracker .
docker run -p 5173:5173 job-tracker
```

If you already created a container named `job-app`, you can start and stop it with:

```bash
docker start job-app
docker stop job-app
```

## Notes

- `src/pages/Dashboard.jsx` contains the main job tracking experience, including CRUD actions, drag-and-drop, filtering, charts, realtime updates, and the AI assistant panel.
- `src/pages/Home.jsx` introduces the app and changes its buttons depending on whether a user is logged in.
- `src/pages/Layout.jsx`, `src/pages/Navbar.jsx`, and `src/pages/Sidebar.jsx` provide the shared responsive app shell.
