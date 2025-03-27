import { VALID_CATEGORIES } from '../data/constants';

export interface ToolkitItem {
  id: string;
  theme: 'Sales' | 'Delivery' | 'Quality Assurance';
  category: typeof VALID_CATEGORIES[number];
  shortTitle: string;
  shortDescription: string;
  longDescription: string;
  businessValue: string;
  keyCapabilities: string;
  availableTags: string[];
  materials: string[];
  selectedTools: string;
} 