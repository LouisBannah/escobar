export interface Tool {
  id: string;
  title: string;
  description: string;
  category: 'Sales' | 'Delivery' | 'Quality Assurance';
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

export type Theme = 'light' | 'dark' | 'brand';