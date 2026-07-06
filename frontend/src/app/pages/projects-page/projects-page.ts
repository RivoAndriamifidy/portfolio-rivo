import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Projects } from '../../components/projects/projects';

@Component({
  selector: 'app-projects-page',
  imports: [RouterLink, Projects],
  templateUrl: './projects-page.html',
  styleUrl: './projects-page.css',
})
export class ProjectsPage {}