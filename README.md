# Portfolio Rivo

Portfolio full stack de **ANDRIAMIFIDY Manantenasoa Rivo**.

## Structure

```
portfolio-rivo/
├── frontend/   # Angular
├── backend/    # NestJS API
└── render.yaml # Déploiement API (Render)
```

## Démarrage local

### API

```bash
cd backend
cp .env.example .env
npm install
npm run db:migrate
npm run db:seed
npm run start:dev
```

→ `http://localhost:3000/api`

### Frontend

```bash
cd frontend
npm install
npm start
```

→ `http://localhost:4200`

## Déploiement

- **API** : Render (`render.yaml`, dossier `backend/`)
- **Frontend** : Vercel (dossier `frontend/`, variable `API_URL`)