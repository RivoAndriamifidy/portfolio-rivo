import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const profileData = {
  firstName: 'Rivo',
  lastName: 'ANDRIAMIFIDY',
  role: 'Développeur Full Stack | Angular, NestJS, Java Spring Boot, Python',
  location: 'Antananarivo, Madagascar',
  email: 'rivoandriamifidy0@gmail.com',
  phone: '+261 34 42 978 89',
  address: 'Disponible en télétravail (remote), fuseau UTC+3',
  bio: "Développeur Full Stack titulaire d'un Master 2 en Génie Logiciel, avec 3 ans d'expérience dans la conception, le développement et le déploiement d'applications web et de plateformes SaaS. Maîtrise de l'ensemble du cycle : modélisation de base de données, API REST, interfaces Angular, gestion des rôles et des accès, mise en production et maintenance. Expérience confirmée avec des clients francophones en télétravail et solide double compétence développement / infrastructure.",
  badge: 'Disponible — Freelance & télétravail',
  tags: ['Angular', 'NestJS', 'Java Spring Boot', 'Python', 'TypeScript', 'PostgreSQL', 'WordPress'],
  availabilityItems: [
    'Disponible pour missions freelance et postes en télétravail',
    'Fuseau horaire UTC+3 (Antananarivo), compatible avec les horaires européens',
    'Habitué à travailler avec des clients francophones à distance',
    'Missions courtes ou longues durées, maintenance incluse',
  ],
};

async function main() {
  await prisma.project.deleteMany();
  await prisma.service.deleteMany();
  await prisma.stackItem.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.formation.deleteMany();
  await prisma.language.deleteMany();
  await prisma.stat.deleteMany();

  await prisma.profile.upsert({
    where: { id: 1 },
    update: profileData,
    create: { id: 1, ...profileData },
  });

  await prisma.project.createMany({
    data: [
      {
        title: 'PCMI Plans – Plateforme SaaS de gestion de projets',
        description:
          'Plateforme SaaS de gestion de projets pour un cabinet de dessin en bâtiment (France), aujourd’hui en production.',
        category: 'SaaS',
        period: '2025 – Présent · En production',
        highlights: [
          '4 rôles (Admin, Sous-admin, Dessinateur, Client) avec tableaux de bord dédiés',
          'Validation de documents, messagerie client et interne, visionneuse PDF, planning',
          'Schéma de base de données conçu avec le client, migrations Prisma',
          'IA hébergée en Suisse (synthèse, transcription Whisper) conforme RGPD',
          'Déploiement automatisé sur o2switch (cPanel, Passenger) via SSH et rsync',
        ],
        tags: ['Angular 18', 'NestJS', 'Prisma', 'MySQL', 'pdf.js', 'Whisper'],
        featured: true,
        order: 4,
        imageUrl: '/projects/pcmi-plans.jpg',
        demoUrl: 'https://app-pcmi-plans.fr/',
        githubUrl: null,
      },
      {
        title: 'Saha Immo – Plateforme immobilière',
        description:
          'Plateforme immobilière pour le marché malgache : vente, location, filtres par type de bien, avec optimisation SEO complète.',
        category: 'Full Stack',
        period: 'ORA Call Center · En production',
        highlights: [
          'Catalogue de biens avec fiches détaillées (vente et location)',
          'Filtres par type : maisons, appartements, villas, bureaux',
          'Optimisation SEO complète et données structurées',
          'Interface responsive déployée en production',
        ],
        tags: ['Angular', 'TypeScript', 'SEO', 'Responsive'],
        featured: true,
        order: 5,
        imageUrl: '/projects/saha-immo.jpg',
        demoUrl: 'https://saha-immo.arovainvest.com/',
        githubUrl: null,
      },
      {
        title: 'BioPointAI – Pointage biométrique',
        description:
          'Système de pointage biométrique pour ORA Call Center, migré de la reconnaissance faciale vers des terminaux d’empreintes Hikvision.',
        category: 'Full Stack',
        period: 'ORA Call Center · En production',
        highlights: [
          'Back-end Python / Flask',
          'Migration de la reconnaissance faciale vers les empreintes digitales',
          'Intégration des terminaux Hikvision via l’API ISAPI',
          'Réception des pointages en temps réel par webhooks',
        ],
        tags: ['Python', 'Flask', 'Hikvision ISAPI', 'Webhooks'],
        featured: true,
        order: 6,
        imageUrl: null,
        demoUrl: null,
        githubUrl: null,
      },
      {
        title: 'AutoStock Madagascar – SaaS multi-tenant',
        description:
          'SaaS par abonnement pour la gestion des boutiques de pièces automobiles, évolutif vers une marketplace B2B/B2C.',
        category: 'SaaS',
        period: '2026 · En cours',
        highlights: [
          'Architecture monolithe modulaire multi-tenant',
          'Modèle par abonnement pour les boutiques',
          'Évolution prévue vers une marketplace B2B/B2C',
        ],
        tags: ['Angular', 'NestJS', 'PostgreSQL', 'Multi-tenant'],
        featured: true,
        order: 7,
        imageUrl: null,
        demoUrl: null,
        githubUrl: null,
      },
      {
        title: 'ORA Call Center – Site vitrine',
        description:
          'Site vitrine de l’entreprise ORA Call Center, centre d’appel basé à Antananarivo.',
        category: 'Front-End',
        period: 'En production',
        highlights: [
          'Présentation des services du centre d’appel',
          'Design professionnel orienté conversion',
          'Déploiement en production sur domaine dédié',
        ],
        tags: ['Angular', 'TypeScript', 'Responsive', 'SEO'],
        featured: false,
        order: 8,
        imageUrl: '/projects/oracall.jpg',
        demoUrl: 'https://oracall.arovainvest.com/',
        githubUrl: null,
      },
      {
        title: 'pcmi-plans.fr – Refonte WordPress',
        description:
          'Participation à la refonte du site d’un dessinateur en bâtiment et optimisation SEO page par page.',
        category: 'WordPress',
        period: '2025 – Présent',
        highlights: [
          'Refonte avec WordPress et Bricks Builder',
          'Optimisation SEO page par page avec Rank Math',
        ],
        tags: ['WordPress', 'Bricks Builder', 'Rank Math SEO'],
        featured: true,
        order: 1,
        imageUrl: null,
        demoUrl: 'https://pcmi-plans.fr/',
        githubUrl: null,
      },
      {
        title: 'soins-holistica.fr – Site vitrine',
        description: 'Site vitrine pour une thérapeute.',
        category: 'WordPress',
        period: '2025 – Présent',
        highlights: ['Pages services', 'Formulaire de contact', 'Section événements'],
        tags: ['WordPress', 'Bricks Builder'],
        featured: true,
        order: 2,
        imageUrl: null,
        demoUrl: 'https://soins-holistica.fr/',
        githubUrl: null,
      },
      {
        title: 'mon-appui-social.fr – Migration Wix vers WordPress',
        description: 'Refonte d’un site Wix vers WordPress et Bricks Builder.',
        category: 'WordPress',
        period: '2025 – Présent',
        highlights: [
          'Design aligné sur la charte graphique',
          'Reprise de tout le contenu existant',
        ],
        tags: ['WordPress', 'Bricks Builder', 'Migration Wix'],
        featured: true,
        order: 3,
        imageUrl: null,
        demoUrl: 'https://mon-appui-social.fr/',
        githubUrl: null,
      },
    ],
  });

  await prisma.service.createMany({
    data: [
      {
        title: 'Applications web & SaaS',
        description: 'Du schéma de base de données à la mise en production.',
        items: [
          'Interfaces Angular (v18, standalone components) et TypeScript',
          'API REST avec NestJS, Node.js ou Java Spring Boot',
          'Authentification JWT et contrôle d’accès par rôles (RBAC)',
          'Modélisation PostgreSQL / MySQL avec Prisma ou TypeORM',
          'Architectures SaaS multi-tenant',
        ],
        icon: 'server',
        order: 1,
      },
      {
        title: 'Sites WordPress & SEO',
        description: 'Sites vitrines rapides, faciles à gérer et bien référencés.',
        items: [
          'Création et refonte avec Bricks Builder',
          'Migration Elementor, Divi, WPBakery ou Wix vers Bricks',
          'SEO avec Rank Math et données structurées (Schema.org)',
          'Mise en ligne : domaine, hébergement, SSL, e-mails professionnels',
          'Maintenance et sécurisation',
        ],
        icon: 'layout',
        order: 2,
      },
      {
        title: 'Intégrations & IA',
        description: 'Connecter vos applications à des services externes et à l’IA.',
        items: [
          'Transcription audio (Whisper) et synthèse de texte par LLM',
          'Hébergement conforme RGPD des services d’IA',
          'Webhooks et API tierces',
          'Terminaux biométriques Hikvision (ISAPI)',
          'Visionneuse PDF intégrée (pdf.js)',
        ],
        icon: 'brain',
        order: 3,
      },
      {
        title: 'Déploiement & infrastructure',
        description: 'Mise en production, maintenance et réseau.',
        items: [
          'Déploiement Linux via SSH et rsync',
          'Hébergement cPanel et Phusion Passenger (o2switch)',
          'Maintenance corrective et évolutive',
          'Administration réseau MikroTik (filtrage par poste)',
          'Gestion de parc informatique et support utilisateurs',
        ],
        icon: 'compass',
        order: 4,
      },
    ],
  });

  const stack: Record<string, string[]> = {
    'Front-end': ['Angular', 'TypeScript', 'JavaScript', 'RxJS', 'HTML5', 'CSS3', 'React', 'Vite'],
    'Back-end': ['NestJS', 'Node.js', 'Java Spring Boot', 'Python', 'Flask', 'API REST', 'JWT', 'RBAC'],
    'Bases de données': ['PostgreSQL', 'MySQL', 'Prisma ORM', 'TypeORM', 'Modélisation de données'],
    'CMS & SEO': ['WordPress', 'Bricks Builder', 'Rank Math SEO', 'Schema.org'],
    'DevOps & outils': ['Git', 'GitHub', 'Linux', 'SSH', 'rsync', 'cPanel', 'Phusion Passenger'],
    'Réseau & systèmes': ['MikroTik', 'Administration réseau', 'Parc informatique', 'Support utilisateurs'],
    'Intégrations': ['Webhooks', 'Hikvision ISAPI', 'Whisper', 'API LLM', 'pdf.js'],
  };
  let stackOrder = 0;
  await prisma.stackItem.createMany({
    data: Object.entries(stack).flatMap(([category, names]) =>
      names.map((name) => ({ name, category, order: ++stackOrder })),
    ),
  });

  await prisma.experience.createMany({
    data: [
      {
        title: 'Développeur Full Stack Freelance',
        company: 'Indépendant',
        location: 'Télétravail (clients en France et à Madagascar)',
        period: '2025 – Présent',
        highlights: [
          'Développé PCMI Plans, plateforme SaaS de gestion de projets pour un cabinet de dessin en bâtiment (France), aujourd’hui en production, avec Angular 18, NestJS, Prisma et MySQL.',
          'Mis en place 4 rôles utilisateurs (Admin, Sous-admin, Dessinateur, Client) avec tableaux de bord dédiés, validation de documents, messagerie client et interne, visionneuse PDF et planning.',
          'Conçu le schéma de base de données avec le client et géré les migrations Prisma ; résolu des problèmes de CORS et de compatibilité MySQL entre Windows et Linux.',
          'Automatisé le déploiement sur hébergement o2switch (cPanel, Passenger) via SSH et rsync ; assure la maintenance corrective et évolutive.',
          'Intégré des services d’IA hébergés en Suisse (synthèse de texte, transcription Whisper) en respectant les exigences RGPD.',
          'Créé et refondu des sites WordPress avec Bricks Builder pour des clients en France.',
        ],
        order: 1,
      },
      {
        title: 'Responsable Informatique et Développeur',
        company: 'ORA Call Center',
        location: 'Antananarivo, Madagascar',
        period: '2023 – Présent',
        highlights: [
          'Développé BioPointAI, système de pointage biométrique en Python et Flask, migré de la reconnaissance faciale vers des terminaux d’empreintes Hikvision (API ISAPI, webhooks).',
          'Développé Saha Immo, plateforme immobilière en Angular pour le marché malgache, avec optimisation SEO complète, ainsi que le site vitrine de l’entreprise.',
          'Administre le réseau et le parc informatique : configuration de routeurs MikroTik (filtrage par poste), serveurs et support utilisateurs.',
          'Promu Responsable Informatique en 2024.',
        ],
        order: 2,
      },
      {
        title: 'Technicien Informatique (freelance)',
        company: 'Optimax',
        location: 'Antananarivo, Madagascar',
        period: '09/2026 – Présent',
        highlights: ['Gestion, maintenance et suivi du parc informatique.'],
        order: 3,
      },
    ],
  });

  await prisma.formation.createMany({
    data: [
      {
        title: 'Master 2 en Génie Logiciel – Développement Full Stack',
        institution: 'IS-INFO Ampasamadinika, Antananarivo, Madagascar',
        period: '2025',
        description: null,
        order: 1,
      },
      {
        title: 'Licence Professionnelle en Informatique',
        institution: 'IS-INFO Ampasamadinika, Antananarivo, Madagascar',
        period: '2024',
        description: null,
        order: 2,
      },
    ],
  });

  await prisma.language.createMany({
    data: [
      { name: 'Malgache', level: 'Langue maternelle', order: 1 },
      { name: 'Français', level: 'Intermédiaire (usage professionnel quotidien)', order: 2 },
      { name: 'Anglais', level: 'Notions (lecture technique)', order: 3 },
    ],
  });

  await prisma.stat.createMany({
    data: [
      { label: "Années d'expérience", value: '3', order: 1 },
      { label: 'Projets livrés', value: '7+', order: 2 },
      { label: 'Génie Logiciel', value: 'Master 2', order: 3 },
      { label: 'Télétravail', value: 'UTC+3', order: 4 },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
