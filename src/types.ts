import { VALID_CATEGORIES } from './data/constants';

export interface Tool {
  id: string;
  title: string;
  description: string;
  theme: 'Sales' | 'Delivery' | 'Quality Assurance';
  category: typeof VALID_CATEGORIES[number];
  accessLevel: 1 | 2;
  owner: string;
  contact: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  accessLevel: 1 | 2;
}

export interface CodeExample {
  title: string;
  description: string;
  language: string;
  filePath: string;
  code: string;
}

export type Theme = 'light' | 'dark' | 'brand';