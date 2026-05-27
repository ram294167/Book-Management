# Book Management - React & MockAPI

A simple Book Management web application built with React and Vite. It includes book listing, searching, filtering, image upload support, modal add/edit forms, and hosted API integration.

## Features

- React + Vite frontend
- MockAPI integration for CRUD operations
- Express + Multer upload server for image uploads
- Add and edit books in a modal form
- Cover image upload with live preview
- Click a book cover to view it in a fullscreen modal with an X-close button
- Search by title/author and filter by genre
- Responsive 3-column card grid on desktop
- Delete book support with confirmation
- Theme toggle (light/dark)
- Loading skeletons while data loads
- Error handling for API requests
- Test coverage with Vitest + Testing Library

## Project structure

- `src/` - React application source
- `src/components/` - reusable UI components
- `src/api.js` - API helper functions for CRUD operations
- `src/uploadService.js` - upload helper functions
- `upload-server.js` - Express upload server
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
npm install
```

Start all services:

```powershell
npm run start
```

This will run:

- React dev server on `http://localhost:5173`
- JSON Server API on `http://localhost:4000`
- Upload server on `http://localhost:5000`

## Available scripts

- `npm run dev` - run Vite development server
- `npm run server` - run JSON Server
- `npm run start:upload` - run upload server
- `npm run start` - run all services
- `npm run build` - build the production app
- `npm run preview` - preview production build
- `npm run test` - run tests
- `npm run test:watch` - run tests in watch mode

## Notes

- Images are uploaded using Express + Multer.
- Clicking a book cover opens a fullscreen image preview modal.
- The modal form is used for both create and update operations.
- The UI is responsive across desktop and mobile devices.
- CRUD operations use hosted MockAPI.

## Deploying

To deploy frontend:

Build the app:

```powershell
npm run build
```

Deploy `dist/` to Vercel.

### Vercel environment variables

```text
VITE_API_URL=https://6a1682401b90031f81b118b5.mockapi.io/books/books

VITE_UPLOAD_URL=https://book-management-2-57qd.onrender.com
```

Then redeploy the application.

## Live Demo

Frontend:

https://book-management-pxv1.vercel.app/

Upload Server:

https://book-management-2-57qd.onrender.com

## GitHub

Repository:

https://github.com/ram294167/Book-Management.git

## Testing

Run tests:

```powershell
npm run test
```

## API usage

- The application uses API calls through `src/api.js`
- CRUD operations use MockAPI
- Image uploads use Express upload server
- API endpoints are configured using environment variables