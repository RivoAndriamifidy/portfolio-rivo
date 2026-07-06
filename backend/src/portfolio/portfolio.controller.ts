import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get('profile')
  getProfile() {
    return this.portfolioService.getProfile();
  }

  @Get('projects')
  getProjects() {
    return this.portfolioService.getProjects();
  }

  @Get('projects/:id')
  getProject(@Param('id', ParseIntPipe) id: number) {
    return this.portfolioService.getProject(id);
  }

  @Get('services')
  getServices() {
    return this.portfolioService.getServices();
  }

  @Get('stack')
  getStack() {
    return this.portfolioService.getStack();
  }

  @Get('formations')
  getFormations() {
    return this.portfolioService.getFormations();
  }

  @Get('stats')
  getStats() {
    return this.portfolioService.getStats();
  }

  @Get('languages')
  getLanguages() {
    return this.portfolioService.getLanguages();
  }
}