# Book Management - React & JSON Server

A simple book management web app built with React and Vite. It includes book listing, searching, filtering, local cover image upload, modal add/edit forms, and a JSON Server mock API.

## Features

- React + Vite frontend
- JSON Server mock backend using `db.json`
- Add and edit books in a modal form
- Local cover image selection with live preview
- Search by title/author and filter by genre
- Responsive 3-column card grid on desktop
- Delete book support with confirmation
- Theme toggle (light/dark)
- Loading skeletons while data loads
- Test coverage with Vitest + Testing Library

## Project structure

- `src/` - React application source
- `src/components/` - reusable UI components
- `src/api.js` - API helper functions for CRUD operations
- `db.json` - mock book data for JSON Server
- `package.json` - scripts and dependencies
- `vite.config.js` - Vite configuration
- `src/__tests__/` - unit tests

## Getting started

Open a terminal in the project folder:

```powershell
cd C:\Users\DELL\OneDrive\Desktop\book-management
```

Install dependencies:

```powershell
npm.cmd install
```

Start both the React app and JSON Server:

```powershell
npm.cmd run start
```

This will run:
- React dev server on `http://localhost:5173`
- JSON Server API on `http://localhost:4000`

## Available scripts

- `npm.cmd run dev` - run the Vite development server
- `npm.cmd run start` - run both the app and JSON Server in parallel
- `npm.cmd run build` - build the production app
- `npm.cmd run preview` - preview the production build locally
- `npm.cmd run test` - run tests once with Vitest
- `npm.cmd run test:watch` - run tests in watch mode

## Notes

- The app stores book images as browser data URLs when selected locally.
- The modal form is used for both create and update flows.
- The grid displays three book cards per row on large screens and adapts responsively.

## Deploying

To deploy the frontend:

1. Build the app:

```powershell
npm.cmd run build
```

2. Deploy the `dist/` folder on Vercel, Netlify, or any static host.

3. If using a hosted API, update `VITE_API_URL` accordingly.

## GitHub

The repository is already connected to `https://github.com/ram294167/Book-Management.git`.

## Testing

Run the test suite with:

```powershell
npm.cmd run test
```

## Demo

Live demo: https://book-management-ddwxrnnxh-ram294167s-projects.vercel.app/

## API usage

- Does the app use API calls?: **Yes.** The frontend performs CRUD requests using the helper functions in `src/api.js`.
- Which API does it call?: By default the app uses the environment variable `VITE_API_URL` (when set) and falls back to `http://localhost:4000`.
- For the demo to work properly: the deployed site must have `VITE_API_URL` pointed to a reachable API (a hosted JSON Server or real backend). If `VITE_API_URL` is not set, the production site will attempt to call `http://localhost:4000`, which only works if the API is also hosted and accessible from the deployed site.
