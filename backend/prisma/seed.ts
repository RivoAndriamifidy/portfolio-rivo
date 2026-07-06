import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.profile.upsert({
    where: { id: 1 },
    update: {
      firstName: 'ANDRIAMIFIDY',
      lastName: 'Rivoniaina',
    },
    create: {
      id: 1,
      firstName: 'ANDRIAMIFIDY',
      lastName: 'Rivoniaina',
      role: 'Développeur Full Stack Freelance — Java · Angular · Python IA',
      location: 'Antananarivo, Madagascar',
      badge: 'Disponible pour missions freelance',
      tags: ['Java Spring Boot', 'Angular', 'TypeScript', 'Python'],
    },
  });

  const projects = [
    {
      title: 'Plateforme E-Commerce',
      description:
        'Application e-commerce complète avec panier, paiement et gestion des commandes.',
      tags: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL'],
      featured: true,
      order: 1,
      demoUrl: null,
      githubUrl: null,
    },
    {
      title: 'API REST Microservices',
      description:
        'Architecture microservices avec authentification JWT et documentation Swagger.',
      tags: ['Java', 'Spring Boot', 'Docker', 'Redis'],
      featured: true,
      order: 2,
      demoUrl: null,
      githubUrl: null,
    },
    {
      title: 'Assistant IA Python',
      description:
        'Chatbot intelligent intégrant des modèles de langage pour automatiser des tâches.',
      tags: ['Python', 'FastAPI', 'IA', 'NLP'],
      featured: false,
      order: 3,
      demoUrl: null,
      githubUrl: null,
    },
  ];

  for (const project of projects) {
    const existing = await prisma.project.findFirst({
      where: { title: project.title },
    });
    if (!existing) {
      await prisma.project.create({ data: project });
    }
  }

  const services = [
    {
      title: 'Développement Backend',
      description:
        'API REST robustes avec Java Spring Boot, sécurité, tests et documentation.',
      icon: 'server',
      order: 1,
    },
    {
      title: 'Développement Frontend',
      description:
        'Interfaces modernes et réactives avec Angular, TypeScript et design responsive.',
      icon: 'layout',
      order: 2,
    },
    {
      title: 'Solutions IA & Python',
      description:
        'Intégration de modèles IA, automatisation et scripts Python sur mesure.',
      icon: 'brain',
      order: 3,
    },
    {
      title: 'Conseil & Architecture',
      description:
        'Audit technique, choix technologiques et accompagnement de projets.',
      icon: 'compass',
      order: 4,
    },
  ];

  for (const service of services) {
    const existing = await prisma.service.findFirst({
      where: { title: service.title },
    });
    if (!existing) {
      await prisma.service.create({ data: service });
    }
  }

  const stackItems = [
    { name: 'Java', category: 'Backend', proficiency: 90, order: 1 },
    { name: 'Spring Boot', category: 'Backend', proficiency: 88, order: 2 },
    { name: 'Angular', category: 'Frontend', proficiency: 85, order: 3 },
    { name: 'TypeScript', category: 'Frontend', proficiency: 85, order: 4 },
    { name: 'Python', category: 'IA & Scripts', proficiency: 82, order: 5 },
    { name: 'PostgreSQL', category: 'Base de données', proficiency: 80, order: 6 },
    { name: 'Docker', category: 'DevOps', proficiency: 75, order: 7 },
    { name: 'Git', category: 'Outils', proficiency: 90, order: 8 },
  ];

  for (const item of stackItems) {
    const existing = await prisma.stackItem.findFirst({
      where: { name: item.name },
    });
    if (!existing) {
      await prisma.stackItem.create({ data: item });
    }
  }

  const formations = [
    {
      title: 'Développement Full Stack',
      institution: 'Formation professionnelle',
      period: '2022 — 2024',
      description: 'Java, Spring Boot, Angular et bonnes pratiques de développement.',
      order: 1,
    },
    {
      title: 'Intelligence Artificielle',
      institution: 'Auto-formation & projets',
      period: '2024 — Présent',
      description: 'Python, NLP et intégration de modèles IA dans des applications.',
      order: 2,
    },
  ];

  for (const formation of formations) {
    const existing = await prisma.formation.findFirst({
      where: { title: formation.title },
    });
    if (!existing) {
      await prisma.formation.create({ data: formation });
    }
  }

  const stats = [
    { label: 'Projets réalisés', value: '15+', order: 1 },
    { label: "Années d'expérience", value: '3+', order: 2 },
    { label: 'Clients satisfaits', value: '10+', order: 3 },
    { label: 'Technologies maîtrisées', value: '12+', order: 4 },
  ];

  for (const stat of stats) {
    const existing = await prisma.stat.findFirst({
      where: { label: stat.label },
    });
    if (!existing) {
      await prisma.stat.create({ data: stat });
    }
  }
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