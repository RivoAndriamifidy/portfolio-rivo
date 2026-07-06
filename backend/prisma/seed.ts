import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const profileData = {
  firstName: 'ANDRIAMIFIDY Manantenasoa',
  lastName: 'Rivoniaina Noelson',
  role: 'Développeur Freelance Full Stack | Java · Angular · Python IA',
  location: 'II A 185 Tanjombato, Antananarivo 102',
  email: 'rivoandriamifidy0@gmail.com',
  phone: '+261 34 42 978 89',
  address: 'II A 185 Tanjombato, Antananarivo 102',
  bio: "Développeur Full Stack passionné, spécialisé en Java (Spring Boot), Angular et Python (IA intégrée). Diplômé d'un Master 2 en Génie Logiciel, je propose mes services en freelance pour la conception et le développement d'applications web modernes, la création d'API REST robustes, et l'intégration de solutions d'intelligence artificielle. Autonome, rigoureux et orienté résultats, je m'adapte rapidement aux besoins de mes clients pour livrer des projets de qualité.",
  badge: 'Disponible immédiatement pour missions freelance',
  tags: ['Java Spring Boot', 'Angular', 'Python IA', 'TypeScript', 'MySQL'],
  availabilityItems: [
    'Disponible immédiatement pour missions freelance',
    'Télétravail ou présentiel (Antananarivo)',
    'Missions courtes ou longues durées',
    'Tarif négociable selon la mission',
  ],
};

async function main() {
  await prisma.project.deleteMany();
  await prisma.service.deleteMany();
  await prisma.stackItem.deleteMany();
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
        title: 'BioPointAI – Pointeuse Biométrique Intelligente',
        description:
          "Conception complète d'un système de gestion des pointages basé sur la reconnaissance faciale et l'IA.",
        category: 'Full Stack',
        period: 'Projet principal',
        highlights: [
          'Back-end : Spring Boot (gestion employés, pointages, rapports RH)',
          'Front-end : Angular + TailwindCSS — interface réactive et moderne',
          'IA : Python, reconnaissance faciale pour l'authentification sécurisée',
          'Base de données : MySQL avec requêtes avancées',
          'API REST complète pour la communication front-back',
        ],
        tags: ['Java', 'Spring Boot', 'Angular', 'Python', 'TensorFlow', 'MySQL'],
        featured: true,
        order: 1,
        demoUrl: null,
        githubUrl: null,
      },
      {
        title: 'Saha Immo – Plateforme Immobilière',
        description:
          "Site vitrine et catalogue de biens immobiliers à Madagascar : vente, location, filtres par type de bien et formulaire de contact.",
        category: 'Full Stack',
        period: 'En production',
        highlights: [
          'Catalogue de biens avec fiches détaillées (vente & location)',
          'Filtres par type : maisons, appartements, villas, bureaux',
          'Sections services, témoignages clients et formulaire de contact',
          'Interface moderne et responsive déployée en production',
        ],
        tags: ['Angular', 'TypeScript', 'TailwindCSS', 'Responsive', 'PostgreSQL'],
        featured: true,
        order: 2,
        demoUrl: 'https://saha-immo.arovainvest.com/',
        githubUrl: null,
      },
      {
        title: 'ORA Call Center – Site Institutionnel',
        description:
          "Site web professionnel pour ORA Call Center, centre d'appel basé à Antananarivo, Madagascar.",
        category: 'Front-End',
        period: 'En production',
        highlights: [
          "Présentation des services du centre d'appel",
          'Design professionnel orienté conversion',
          'Déploiement en production sur domaine dédié',
        ],
        tags: ['Angular', 'TypeScript', 'Responsive', 'SEO'],
        featured: true,
        order: 3,
        demoUrl: 'https://oracall.arovainvest.com/',
        githubUrl: null,
      },
      {
        title: 'PCMI Plans – Application Web',
        description:
          'Application web dédiée à la gestion et consultation de plans, déployée en production sur app-pcmi-plans.fr.',
        category: 'Full Stack',
        period: 'En production',
        highlights: [
          'Application web métier accessible en ligne',
          'Interface utilisateur pour la consultation de plans',
          'Déploiement et mise en production sur domaine .fr',
        ],
        tags: ['Angular', 'TypeScript', 'Spring Boot', 'REST API'],
        featured: true,
        order: 4,
        demoUrl: 'https://app-pcmi-plans.fr/',
        githubUrl: null,
      },
      {
        title: 'Stage VALUEIT',
        description:
          'Stage professionnel en développement full stack avec intégration de solutions IA et interfaces Angular.',
        category: 'Stage',
        period: 'Stage professionnel',
        highlights: [
          'Développement full stack Java / Angular',
          'Intégration de fonctionnalités IA',
          'Travail en équipe sur un projet métier réel',
        ],
        tags: ['Java', 'Spring Boot', 'Angular', 'IA', 'Full Stack'],
        featured: true,
        order: 5,
        demoUrl: null,
        githubUrl: null,
      },
      {
        title: 'Application Web – Gestion de Stock',
        description:
          "Développement d'une solution complète de gestion de stock avec API REST et base relationnelle.",
        category: 'Back-End',
        highlights: [
          "Création d'API REST en Java avec Spring Boot",
          'Conception de base de données relationnelle (MySQL)',
          "Développement d'une solution complète de gestion de stock",
        ],
        tags: ['Java', 'Spring Boot', 'MySQL', 'REST API'],
        featured: false,
        order: 6,
        demoUrl: null,
        githubUrl: null,
      },
      {
        title: "Application CRUD – Gestion d'Étudiants",
        description:
          "Application CRUD complète avec API Java et interface Angular Material.",
        category: 'Full Stack',
        highlights: [
          'API REST Java avec Spring Boot',
          'Interface utilisateur Angular avec Angular Material',
          'Base de données relationnelle MySQL',
        ],
        tags: ['Java', 'Spring Boot', 'Angular', 'Angular Material', 'MySQL'],
        featured: false,
        order: 7,
        demoUrl: null,
        githubUrl: null,
      },
      {
        title: 'Tableau de Bord – Suivi & Extraction de Données',
        description:
          "Tableau de bord Java MVC pour le suivi d'erreurs de sites et extraction de données.",
        category: 'Back-End',
        highlights: [
          "Développement d'un tableau de bord Java MVC pour le suivi d'erreurs de sites",
          'Extraction de données via Talend',
          'Base de données relationnelle MySQL',
        ],
        tags: ['Java', 'MVC', 'Talend', 'MySQL'],
        featured: false,
        order: 8,
        demoUrl: null,
        githubUrl: null,
      },
      {
        title: 'Application IA – Détection de Masque & Traduction',
        description:
          'Application combinant détection de masque en temps réel et traduction par IA.',
        category: 'IA',
        highlights: [
          'Détection de masque en temps réel via TensorFlow + Angular',
          'Interface de traduction de texte par IA',
          'Système de reconnaissance faciale avec affichage temps réel',
        ],
        tags: ['Python', 'TensorFlow', 'Angular', 'IA'],
        featured: true,
        order: 9,
        demoUrl: null,
        githubUrl: null,
      },
    ],
  });

  await prisma.service.createMany({
    data: [
      {
        title: 'Développement Back-End',
        description: 'API robustes, bases de données et architectures scalables.',
        items: [
          'API REST avec Java Spring Boot',
          'Conception et optimisation de bases de données MySQL / MariaDB',
          'Architecture MVC et microservices',
          "Intégration d'IA avec Python Flask",
        ],
        icon: 'server',
        order: 1,
      },
      {
        title: 'Intelligence Artificielle',
        description: 'Solutions IA sur mesure pour automatiser et sécuriser vos applications.',
        items: [
          'Reconnaissance faciale (Python, TensorFlow)',
          'Systèmes de détection en temps réel',
          'Automatisation de tâches via IA',
        ],
        icon: 'brain',
        order: 2,
      },
      {
        title: 'Développement Front-End',
        description: 'Interfaces modernes, réactives et orientées expérience utilisateur.',
        items: [
          'Interfaces dynamiques avec Angular & TypeScript',
          'Design responsive avec TailwindCSS & Bootstrap',
          'Intégration Angular Material',
          "Consommation d'APIs REST",
        ],
        icon: 'layout',
        order: 3,
      },
      {
        title: 'Autres Compétences',
        description: 'Outils et pratiques pour livrer des projets de qualité.',
        items: [
          'Gestion de projet Git / GitHub',
          'Extraction et analyse de données avec Talend',
          'Déploiement et gestion de projets Docker (bases)',
        ],
        icon: 'compass',
        order: 4,
      },
    ],
  });

  await prisma.stackItem.createMany({
    data: [
      { name: 'Java', category: 'Back-End', proficiency: 92, order: 1 },
      { name: 'Spring Boot', category: 'Back-End', proficiency: 90, order: 2 },
      { name: 'Python', category: 'Back-End', proficiency: 88, order: 3 },
      { name: 'Python Flask', category: 'Back-End', proficiency: 82, order: 4 },
      { name: 'MySQL', category: 'Back-End', proficiency: 88, order: 5 },
      { name: 'MariaDB', category: 'Back-End', proficiency: 85, order: 6 },
      { name: 'PostgreSQL', category: 'Back-End', proficiency: 80, order: 7 },
      { name: 'REST API', category: 'Back-End', proficiency: 90, order: 8 },
      { name: 'Angular', category: 'Front-End', proficiency: 90, order: 9 },
      { name: 'TypeScript', category: 'Front-End', proficiency: 88, order: 10 },
      { name: 'TailwindCSS', category: 'Front-End', proficiency: 85, order: 11 },
      { name: 'Bootstrap', category: 'Front-End', proficiency: 82, order: 12 },
      { name: 'Angular Material', category: 'Front-End', proficiency: 86, order: 13 },
      { name: 'TensorFlow', category: 'IA & Data', proficiency: 80, order: 14 },
      { name: 'Python IA', category: 'IA & Data', proficiency: 85, order: 15 },
      { name: 'Talend', category: 'IA & Data', proficiency: 78, order: 16 },
      { name: 'Git', category: 'Outils', proficiency: 90, order: 17 },
      { name: 'GitHub', category: 'Outils', proficiency: 90, order: 18 },
      { name: 'Docker', category: 'Outils', proficiency: 75, order: 19 },
    ],
  });

  await prisma.formation.createMany({
    data: [
      {
        title: 'Master 2 en Génie Logiciel / Développement Full Stack',
        institution: 'IS-INFO Ampasamadinika, Antananarivo',
        period: 'Oct. 2024 – Nov. 2025',
        description: 'Spécialisation développement full stack et génie logiciel.',
        order: 1,
      },
      {
        title: 'Licence Professionnelle en Informatique (L1–M1)',
        institution: 'IS-INFO Ampasamadinika, Antananarivo',
        period: '2019 – 2024',
        description: 'Formation complète en informatique et développement.',
        order: 2,
      },
    ],
  });

  await prisma.language.createMany({
    data: [
      { name: 'Malagasy', level: 'Langue maternelle', order: 1 },
      { name: 'Français', level: 'Niveau intermédiaire', order: 2 },
      { name: 'Anglais', level: 'Niveau basique', order: 3 },
    ],
  });

  await prisma.stat.createMany({
    data: [
      { label: 'Projets réalisés', value: '9+', order: 1 },
      { label: 'Technologies', value: '19+', order: 2 },
      { label: 'Années de formation', value: '6+', order: 3 },
      { label: 'Disponibilité', value: 'Immédiate', order: 4 },
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