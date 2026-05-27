# Book Management - React & JSON Server

A simple book management web app built with React and Vite. It includes book listing, searching, filtering, local cover image upload, modal add/edit forms, and a JSON Server mock API.

## Features

- React + Vite frontend
- JSON Server mock backend using `db.json`
- Add and edit books in a modal form
- Local cover image selection with live preview
- Click a book cover to view it in a fullscreen modal with an X-close button
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
cd C:\Users\DELL\github-repos\Book-Management
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
- Clicking a book cover opens it in a fullscreen image preview modal with an X button to close.
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

### Vercel environment variable

For your current MockAPI project, set the environment variable name to:

```text
VITE_API_URL
```

Set the value to the full books endpoint:

```text
https://6a1682401b90031f81b118b5.mockapi.io/books/books
```

Then redeploy the project.

### MockAPI data setup

The local `db.json` contains these four books:

- The Great Gatsby
- 1984
- To Kill a Mockingbird
- The Hobbit

To mirror this data in MockAPI:

1. Open your MockAPI project.
2. Create a `books` resource if it does not already exist.
3. Add the same four items manually or import the JSON from `db.json`.
4. Confirm the endpoint returns data at:

```text
https://6a1682401b90031f81b118b5.mockapi.io/books/books
```

### Local development

For local development with `json-server`, the app uses the default local endpoint:

```text
http://localhost:4000/books
```

## Mobile and incognito support

- The deployed app is a static site, so it can be opened in incognito mode.
- It also works on mobile phones as long as the Vercel site and API are accessible.
- The UI is responsive and should adapt to phone screens, but test on a real device to confirm spacing and layout.

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
