# Book Management - React Assignment

This project is a simple Book Management System built with React and Vite. It demonstrates viewing, adding, editing, deleting, searching and filtering books. A JSON Server is used as a mock API.


Getting started

1. Install dependencies:

```bash
npm install
```

2. Start the app and mock API (runs both in parallel):

```bash
npm run start
```

This starts the JSON Server at `http://localhost:4000` and the React dev server (Vite).

Environment

Create a `.env` file at project root or set `VITE_API_URL` in your environment to point to the API. Use the included `.env.example` as a reference.

API options for deployment

- Host `db.json` using a simple JSON Server host or use a hosted mock API (MockAPI, Beeceptor, etc.) and set `VITE_API_URL` to the hosted URL.

Build & preview

```bash
npm run build
npm run preview
```

Deploying the frontend

- Vercel / Netlify: Connect the repository, build command `npm run build`, and publish directory `dist`.
- In Vercel/Netlify set the `VITE_API_URL` env var to your hosted API URL.

Publishing to GitHub

```bash
git init
git add .
git commit -m "Initial commit - book management"
gh repo create your-username/book-management --public --source=. --remote=origin
git push -u origin main
```

Replace `your-username` with your GitHub username. After pushing, connect the repo to Vercel/Netlify for automatic deploys.

What I included

- Simple React app using Vite
- JSON Server `db.json` with mock books
- Components: `BookList`, `BookForm`, `SearchBar`, `Filter`
- Basic loading/error handling and confirm for deletes
- `README.md` with instructions and `.env.example`

Next steps (suggested)

- Improve accessibility and add tests
- Add pagination and sorting
- Replace JSON Server with a simple hosted API for live deployment

