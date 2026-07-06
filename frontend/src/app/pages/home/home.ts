import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { Stats } from '../../components/stats/stats';
import { Services } from '../../components/services/services';
import { Projects } from '../../components/projects/projects';
import { Stack } from '../../components/stack/stack';
import { Formation } from '../../components/formation/formation';
import { Contact } from '../../components/contact/contact';

@Component({
  selector: 'app-home',
  imports: [Hero, Stats, Services, Projects, Stack, Formation, Contact],
  templateUrl: './home.html',
})
export class Home {}