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
- **Frontend** : Vercel (repo racine, `vercel.json` pointe vers `frontend/`)
  - Variable optionnelle : `API_URL=https://rivoandry-api.onrender.com/api`
  - Domaine custom `rivoandry.site` : à configurer dans Vercel + DNS
- **API custom** : `api.rivoandry.site` → CNAME vers Render (quand le domaine est actif)