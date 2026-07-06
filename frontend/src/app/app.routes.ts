import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ProjectsPage } from './pages/projects-page/projects-page';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'projets', component: ProjectsPage },
  { path: '**', redirectTo: '' },
];