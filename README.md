# Visionary Vogues

AI-powered color & style analysis web app. Upload a photo and get personalized
skin-tone, undertone, face-shape, and body-shape estimates, a matching color
palette, and outfit recommendations across 11 occasions.

## Stack

- **Frontend:** React + Vite, Tailwind CSS, React Router, Framer Motion, Axios, React Icons
- **Backend:** Node.js + Express
- **Database:** MongoDB (via Mongoose) — optional in dev; the API runs without it
- **Vision analysis:** pluggable — see `backend/controllers/analyzeController.js`

## Project structure

```
visionary-vogues/
├── frontend/                  React app (Vite)
│   └── src/
│       ├── components/        Navbar, Footer, ImageUploader, OutfitCard, etc.
│       ├── pages/              Home, Upload, Analysis, Dashboard, SavedLooks...
│       ├── context/            AnalysisContext — app-wide analysis state
│       ├── services/api.js     Axios client for the backend API
│       └── data/occasions.js   Shared occasion list
└── backend/                   Express API
    ├── routes/                 /api/analyze, /api/outfits, /api/user/profile
    ├── controllers/            Request handlers, incl. the CV integration point
    ├── models/                 Mongoose schemas (Analysis, User, SavedOutfit)
    ├── middleware/              multer upload + centralized error handling
    └── data/                    Color palette, face-shape, body-shape, outfit reference data
```

## Getting started

### Backend

```bash
cd backend
cp .env.example .env   # fill in MONGODB_URI if you have one; the API runs fine without it
npm install
npm run dev             # http://localhost:5000
```

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev              # http://localhost:5173
```

The Vite dev server proxies `/api` to `http://localhost:5000`, so both servers
need to be running for the full flow (upload → analyze → dashboard) to work.

## Plugging in a real computer-vision provider

The app ships with a **deterministic placeholder** vision model
(`backend/controllers/analyzeController.js` → `runPlaceholderVisionModel`) so
the entire product — upload, loading states, palette, occasion outfits,
dashboard — works end to end without any external API key.

To go live with real face detection, facial-landmark analysis, skin-region
sampling, and body-proportion estimation:

1. Sign up with a computer-vision provider (e.g. a face-landmark API, a
   dedicated skin-tone/body-shape model, or a custom-trained model behind
   your own inference endpoint).
2. Add its API key to `backend/.env` as `CV_PROVIDER_API_KEY` (never expose
   this to the frontend).
3. Replace the body of `runPlaceholderVisionModel` with a real call to that
   provider, keeping the same return shape:
   `{ skinToneCategory, undertone, faceShapeCategory, bodyShapeCategory, confident }`.

Everything downstream — the palette lookup, face/body recommendation guides,
and occasion-based outfit generation — already consumes that shape, so no
other code needs to change.

## API

| Method | Route                | Purpose                                   |
|--------|-----------------------|--------------------------------------------|
| POST   | `/api/analyze`         | Upload + analyze a photo                   |
| GET    | `/api/analysis/:id`    | Retrieve a stored analysis                 |
| GET    | `/api/outfits`         | Retrieve outfit recommendations            |
| POST   | `/api/outfits/save`    | Save a favorite outfit                     |
| POST   | `/api/user/profile`    | (GET) Retrieve user preferences            |

## Privacy

Uploaded photos are processed in memory and never written to disk or a
database by default — see the in-app Privacy section (`/about#privacy`) for
the full explanation shown to users. Saved looks persist only in the
browser's local storage unless you wire up the optional user accounts.

## Notes on scope

This is a production-shaped scaffold: real routing, state management, a
documented API contract, and a clearly marked integration point for computer
vision — not a static mockup. To take it fully to production you'd still want
to add authentication, connect a live MongoDB instance, plug in a real CV
provider, and add automated tests.
