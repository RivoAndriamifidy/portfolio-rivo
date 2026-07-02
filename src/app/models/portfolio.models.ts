export interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  location: string;
  badge: string;
  tags: string[];
  updatedAt: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  demoUrl: string | null;
  githubUrl: string | null;
  tags: string[];
  featured: boolean;
  order: number;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string | null;
  order: number;
}

export interface StackItem {
  id: number;
  name: string;
  category: string;
  icon: string | null;
  proficiency: number;
  order: number;
}

export interface Formation {
  id: number;
  title: string;
  institution: string;
  period: string;
  description: string | null;
  order: number;
}

export interface Stat {
  id: number;
  label: string;
  value: string;
  order: number;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ContactResponse {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  createdAt: string;
}

export interface StackGroup {
  category: string;
  items: StackItem[];
}