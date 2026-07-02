# Portfolio Rivo — API Backend

API NestJS pour le portfolio de **ANDRIAMIFIDY Manantenasoa Rivo**.

## Structure du projet

```
portfolio-rivo/
├── backend/     ← API NestJS (ce dossier)
└── src/         ← Frontend Angular
```

## Démarrage local

### Prérequis

- Node.js 20+
- PostgreSQL (local ou via Docker)

### Installation

```bash
cd backend
cp .env.example .env
npm install
```

### Base de données

Avec Docker :

```bash
docker compose up -d
```

Puis :

```bash
npm run db:migrate
npm run db:seed
```

### Lancer l'API

```bash
npm run start:dev
```

L'API est disponible sur `http://localhost:3000/api`

## Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/portfolio/profile` | Profil |
| GET | `/api/portfolio/projects` | Liste des projets |
| GET | `/api/portfolio/projects/:id` | Détail d'un projet |
| GET | `/api/portfolio/services` | Services |
| GET | `/api/portfolio/stack` | Stack technique |
| GET | `/api/portfolio/formations` | Formations |
| GET | `/api/portfolio/stats` | Statistiques |
| POST | `/api/contact` | Envoyer un message |

### Exemple — Contact

```json
POST /api/contact
{
  "name": "Jean Dupont",
  "email": "jean@example.com",
  "subject": "Projet web",
  "message": "Bonjour, je souhaite discuter d'un projet."
}
```

## Déploiement sur Render (gratuit)

1. Poussez le projet sur **GitHub** ou **GitLab**
2. Créez un compte sur [render.com](https://render.com)
3. **New → Blueprint** et sélectionnez le repo
4. Render détecte `render.yaml` et crée :
   - Une base PostgreSQL gratuite
   - Un Web Service pour l'API
5. Configurez la variable `CORS_ORIGIN` avec l'URL de votre frontend Angular
6. Déployez — l'API sera accessible sur `https://portfolio-rivo-api.onrender.com`

> Le plan gratuit met l'API en veille après 15 min d'inactivité. Le premier appel peut prendre ~30 secondes.

## Variables d'environnement

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | URL PostgreSQL (auto sur Render) |
| `PORT` | Port du serveur (10000 sur Render) |
| `CORS_ORIGIN` | URL(s) du frontend, séparées par des virgules |