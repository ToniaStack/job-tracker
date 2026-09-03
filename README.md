# JobTrack

Track your applications. Manage your career.

A job application management dashboard built with React, Vite, and Tailwind CSS. All data is stored locally in your browser via LocalStorage — no backend required.

## Getting started

```bash
npm install
npm run dev
```

Then open the URL shown in your terminal (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

## Features

- **Dashboard** — stats, application-progress bars, job search insights, and recent applications
- **Applications** — searchable, filterable table (with responsive card view on mobile), full CRUD
- **Application Pipeline** — Kanban board with drag-and-drop between stages
- **Settings** — export/import your data as JSON, or clear it and start fresh
- Sample data seeds on first load; once you add/edit/delete, your own data takes over

## Stack

React 19 · Vite · Tailwind CSS v4 · lucide-react · Browser LocalStorage

## Project structure

```
src/
  components/   Sidebar, Header, StatCard, ApplicationCard, ApplicationTable,
                ApplicationModal, StatusBadge, SearchBar, FilterTabs,
                KanbanColumn, KanbanCard, Toast, EmptyState, ConfirmDialog,
                ApplicationDetails
  pages/        Dashboard.jsx, Applications.jsx, Kanban.jsx, Settings.jsx
  utils/        storage.js (LocalStorage CRUD), helpers.js (stats/formatting)
  App.jsx       top-level state and layout
  main.jsx      entry point
```
