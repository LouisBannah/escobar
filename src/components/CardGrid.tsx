import React from 'react';
import BaseCard from './BaseCard';
import { Search } from 'lucide-react';

interface Material {
  title: string;
  type: string;
  url: string;
}

interface ToolkitItem {
  id: string;
  shortTitle: string;
  shortDescription: string;
  theme: 'Sales' | 'Delivery' | 'Quality Assurance';
  category: string;
  materials: Material[];
  availableTags: string[];
}

interface CardGridProps {
  items: ToolkitItem[];
  onCardClick: (id: string) => void;
}

const CardGrid: React.FC<CardGridProps> = ({ items, onCardClick }) => {
  return (
    <div className="container mx-auto px-4 py-8 relative z-10">
      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {items.map((item) => (
            <BaseCard
              key={item.id}
              item={{
                id: item.id,
                shortTitle: item.shortTitle,
                shortDescription: item.shortDescription,
                theme: item.theme,
                category: item.category,
                materials: item.materials.map(material => ({
                  title: material.title,
                  format: material.type.toUpperCase(),
                  url: material.url
                })),
                tags: item.availableTags
              }}
              onClick={() => onCardClick(item.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No tools found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default CardGrid; 