# AgriSmart

Auth options:

- Default: localStorage-only (works offline). Use the Connexion/Inscription forms; data is saved to `localStorage.users` and current session to `localStorage.user`.
- Optional: simple PHP backend under `backend-php/` (see below). Set `API_BASE` in `src/App.js` to your server URL.

Run frontend:

```bash
npm install
npm start
```

Run PHP backend (example using PHP built-in server):

```bash
cd backend-php
php -S 127.0.0.1:8000
```

Then set `API_BASE = "http://127.0.0.1:8000"` in `src/App.js`.