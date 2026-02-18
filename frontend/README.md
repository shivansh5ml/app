# Studio Music World Frontend

## Prerequisites
- Node.js 20+ (LTS recommended)
- npm 10+

## 1) Install dependencies (including CRACO)
Run from `frontend/`:

```bash
npm install
```

`@craco/craco` is already declared in `devDependencies`, so a successful install places the binary at `node_modules/.bin/craco` and enables:
- `npm start` → `craco start`
- `npm run build` → `craco build`
- `npm test` → `craco test`

If you see `craco: not found`, it means install did not complete or `node_modules` is missing.

## 2) Resolve `date-fns` and `react-day-picker` conflict
`react-day-picker@8.10.1` supports `date-fns` v2/v3, not v4. This project pins:

- `date-fns: ^3.6.0`

After pulling latest changes, reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

## 3) Fix npm 403 / proxy issues
A 403 from npm registry is usually from proxy/auth policy, not your code.

Check active npm proxy/registry config:

```bash
npm config get registry
npm config get proxy
npm config get https-proxy
```

If you are on an unrestricted network, clear proxy overrides and retry:

```bash
npm config delete proxy
npm config delete https-proxy
npm install
```

If you are in a corporate network, use your approved registry/token instead:

```bash
npm config set registry https://<your-company-registry>/
npm config set // <your-company-registry>/:_authToken <TOKEN>
npm install
```

## 4) Run frontend server

```bash
npm start
```

Open `http://127.0.0.1:3000` (or `http://localhost:3000`).

## 5) Build frontend

```bash
npm run build
```

---

## Backend test dependency note
From repo root, create/activate a virtual environment and install backend requirements before running pytest:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
pytest -q
```

This installs `requests`, which is required by `backend_test.py`.
