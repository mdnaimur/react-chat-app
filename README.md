# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh




Yes. For a project where **Express.js backend + React frontend work together**, I recommend keeping them in **one Git repository (monorepo)**.

## Recommended structure

```text
my-project/
│
├── client/                 # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Express backend
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── models/
│   │   └── app.js
│   ├── package.json
│   └── .env
│
├── docs/                   # Optional documentation
│   ├── api.md
│   └── architecture.md
│
├── .gitignore
├── README.md
└── package.json            # Optional root package
```

### How they communicate

```text
                 Git Repository
                       │
          ┌────────────┴────────────┐
          ↓                         ↓
       client/                    server/
       React                     Express
          │                         │
          │ HTTP/API                │
          └──────────→←─────────────┘
                       │
                   PostgreSQL
```

For example:

```text
React
  ↓
GET /api/tasks
  ↓
Express
  ↓
PostgreSQL
  ↓
Express
  ↓
JSON response
  ↓
React
```

## During development

You normally run **two development servers**:

```text
React
localhost:5173

Express
localhost:3000
```

React calls:

```text
http://localhost:3000/api/tasks
```

You can configure a Vite proxy so your frontend can simply use:

```text
/api/tasks
```

instead of hardcoding the backend URL.

---

## Git workflow

You commit both applications together:

```bash
git add .
git commit -m "feat: add task creation API and UI"
git push
```

A feature might change both:

```text
client/src/pages/Tasks.jsx
        +
server/src/routes/taskRoutes.js
        +
server/src/controllers/taskController.js
```

That's one advantage of a monorepo: **frontend and backend changes for the same feature stay together.**

---

## Root `.gitignore`

```gitignore
node_modules/
.env
.env.*
dist/
build/
coverage/
*.log
```

Don't commit:

```text
.env
node_modules/
```

---

## Should you have one `package.json` or two?

For your case:

```text
my-project/
│
├── client/
│   └── package.json
│
└── server/
    └── package.json
```

**Keep separate package.json files.**

React and Express have different dependencies.

Later, you can add a root `package.json` to run both together:

```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev --prefix server\" \"npm run dev --prefix client\""
  }
}
```

Then:

```bash
npm run dev
```

starts both.

### Best structure for learning → professional

I'd use:

```text
my-app/
│
├── client/       ← React
├── server/       ← Express
├── docs/
├── .gitignore
├── README.md
└── package.json  ← optional orchestration
```

**Don't put React inside the Express `src/` directory.** Keep the frontend and backend clearly separated.

For a full-stack project, this is probably the cleanest structure to learn with and later showcase on GitHub.
