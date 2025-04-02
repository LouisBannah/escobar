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
  id?: string;
  name?: string;
  email: string;
  accessLevel: 1 | 2;
  isAuthenticated: boolean;
  avatar?: string;
}

export interface CodeExample {
  title: string;
  description: string;
  language: string;
  filePath: string;
  code: string;
}

export type Theme = 'light' | 'dark' | 'brand';

export interface Material {
  title: string;
  type: string;
  url: string;
}

// Base toolkit item properties needed for BaseCard
export interface BaseToolkitItem {
  id: string;
  shortTitle: string;
  shortDescription: string;
  theme: 'Sales' | 'Delivery' | 'Quality Assurance';
  category: string;
  materials: Material[];
  availableTags: string[];
  lastUpdated: string;
  version: string;
}

// Properties needed for DetailedCard
export interface DetailedCardItem extends BaseToolkitItem {}

// Additional properties needed for ExpandedCard
export interface ExpandedCardItem extends BaseToolkitItem {
  longDescription: string;
  businessValue: string;
  keyCapabilities: string;
  selectedTools: string;
}

// Union type that can represent any toolkit item
export type ToolkitItem = BaseToolkitItem & Partial<ExpandedCardItem>;

export interface Filters {
  themes: string[];
  categories: string[];
  materialTypes: string[];
}