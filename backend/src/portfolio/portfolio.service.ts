import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PortfolioService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile() {
    const profile = await this.prisma.profile.findUnique({ where: { id: 1 } });
    if (!profile) {
      throw new NotFoundException('Profil introuvable');
    }
    return profile;
  }

  getProjects() {
    return this.prisma.project.findMany({ orderBy: { order: 'asc' } });
  }

  async getProject(id: number) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Projet #${id} introuvable`);
    }
    return project;
  }

  getServices() {
    return this.prisma.service.findMany({ orderBy: { order: 'asc' } });
  }

  getStack() {
    return this.prisma.stackItem.findMany({ orderBy: { order: 'asc' } });
  }

  getFormations() {
    return this.prisma.formation.findMany({ orderBy: { order: 'asc' } });
  }

  getStats() {
    return this.prisma.stat.findMany({ orderBy: { order: 'asc' } });
  }

  getLanguages() {
    return this.prisma.language.findMany({ orderBy: { order: 'asc' } });
  }
}