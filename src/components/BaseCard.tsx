import React from 'react';
import { FileText, Archive, Table, Presentation, Code, Globe } from 'lucide-react';

// Define the material interface
interface Material {
  title: string;
  format: string;
  url?: string;
}

// Define the ToolkitItem interface
interface ToolkitItem {
  id: string;
  shortTitle: string;
  shortDescription: string;
  theme: 'Sales' | 'Delivery' | 'Quality Assurance';
  category: string;
  materials?: Material[];
  tags?: string[];
}

interface BaseCardProps {
  item: ToolkitItem;
  onClick: () => void;
}

const BaseCard: React.FC<BaseCardProps> = ({ item, onClick }) => {
  // Helper function to determine the icon based on format
  const getIconForFormat = (format: string) => {
    const type = format.toLowerCase();
    if (type === 'pdf') return <FileText className="w-4 h-4 text-gray-600 flex-shrink-0" />;
    if (type === 'zip') return <Archive className="w-4 h-4 text-gray-600 flex-shrink-0" />;
    if (type === 'xls' || type === 'xlsx') return <Table className="w-4 h-4 text-gray-600 flex-shrink-0" />;
    if (type === 'doc' || type === 'docx') return <FileText className="w-4 h-4 text-gray-600 flex-shrink-0" />;
    if (type === 'ppt' || type === 'pptx') return <Presentation className="w-4 h-4 text-gray-600 flex-shrink-0" />;
    if (type === 'yaml' || type === 'yml' || type === 'json') return <Code className="w-4 h-4 text-gray-600 flex-shrink-0" />;
    if (type === 'html') return <Globe className="w-4 h-4 text-gray-600 flex-shrink-0" />;
    return <FileText className="w-4 h-4 text-gray-600 flex-shrink-0" />;  // Default icon
  };

  return (
    <div
      onClick={onClick}
      className="text-left card rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow flex flex-col relative z-20 cursor-pointer"
    >
      {/* Theme Badge */}
      <div className="absolute top-4 right-4">
        <span 
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border`}
          style={
            item.theme === 'Sales'
              ? { 
                  background: 'linear-gradient(135deg, rgba(5, 237, 4, 0.1), rgba(36, 146, 13, 0.15))',
                  color: '#1A7309',
                  borderColor: 'rgba(36, 146, 13, 0.2)'
                }
              : item.theme === 'Delivery'
              ? { 
                  background: 'linear-gradient(135deg, rgba(54, 218, 179, 0.1), rgba(0, 160, 222, 0.15))',
                  color: '#0078A8',
                  borderColor: 'rgba(0, 160, 222, 0.2)'
                }
              : { 
                  background: 'linear-gradient(135deg, rgba(212, 30, 222, 0.1), rgba(179, 142, 239, 0.15))',
                  color: '#9061E5',
                  borderColor: 'rgba(179, 142, 239, 0.2)'
                }
          }
        >
          {item.theme === 'Quality Assurance' ? 'QA' : item.theme}
        </span>
      </div>

      {/* Category Label */}
      <div className="mb-4">
        <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 ring-1 ring-gray-200/50">
          {item.category}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-3 pr-24">
        {item.shortTitle}
      </h3>
      
      {/* Description */}
      <p className="text-gray-600 mb-4">
        {item.shortDescription}
      </p>

      {/* Available Materials */}
      {item.materials && item.materials.length > 0 && (
        <div className="mt-auto">
          <p className="text-sm font-medium text-gray-700 mb-2">Available Materials:</p>
          <ul className="space-y-2">
            {item.materials.slice(0, 3).map((material: Material, index: number) => (
              <li key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  {getIconForFormat(material.format)}
                  <span className="text-gray-700 ml-2">{material.title}</span>
                </div>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  {material.format}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
          {item.tags.slice(0, 3).map((tag: string, index: number) => (
            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default BaseCard; 