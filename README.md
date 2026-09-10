# Chat APPLICATION

## Frontend- Client Side
  - Reactjs

## Backend - Server side
  - Expressjs



# Cover - Server side
1. ExpressJs
2. Router
3. MVC pattern
4. MongoDb
5. validation - validator expres
6. Multer (multi file, file size limit)
7. jsonwebtoken
8. 


##  structure

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
                   MongoDB/ PostgreSQL
```

For example:

```text
React
  ↓
GET /api/tasks
  ↓
Express
  ↓
PostgreSQL / MongoDB
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
localhost:5000
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

Later,  can add a root `package.json` to run both together:

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

