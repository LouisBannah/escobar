export interface ToolkitItem {
  id: string;
  theme: 'Sales' | 'Delivery' | 'Quality Assurance';
  category: string;
  shortTitle: string;
  shortDescription: string;
  longDescription: string;
  businessValue: string;
  keyCapabilities: string;
  availableTags: string[];
  materials: string[];
  selectedTools: string;
} 