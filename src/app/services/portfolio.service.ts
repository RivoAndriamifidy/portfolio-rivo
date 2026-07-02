import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  Formation,
  Profile,
  Project,
  Service,
  StackItem,
  Stat,
} from '../models/portfolio.models';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseUrl}/portfolio/profile`);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/portfolio/projects`);
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.baseUrl}/portfolio/services`);
  }

  getStack(): Observable<StackItem[]> {
    return this.http.get<StackItem[]>(`${this.baseUrl}/portfolio/stack`);
  }

  getFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.baseUrl}/portfolio/formations`);
  }

  getStats(): Observable<Stat[]> {
    return this.http.get<Stat[]>(`${this.baseUrl}/portfolio/stats`);
  }
}