import React, { useEffect } from 'react';
import { FileText, Archive, Table, Presentation, Code, Globe } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

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
  const { getThemeValue, setThemeCategory } = useTheme();
  
  // Set the theme category when this card is rendered
  useEffect(() => {
    // We don't want to change the global theme when just displaying cards
    // The theme will be properly set when a card is clicked and expanded
  }, []);
  
  // Helper function to determine the icon based on format
  const getIconForFormat = (format: string) => {
    const type = format.toLowerCase();
    if (type === 'pdf') return <FileText className="w-4 h-4 flex-shrink-0" style={{ color: getThemeValue('components.cardComponents.materialsSection.icons.pdf') }} />;
    if (type === 'zip') return <Archive className="w-4 h-4 flex-shrink-0" style={{ color: getThemeValue('components.cardComponents.materialsSection.icons.zip') }} />;
    if (type === 'xls' || type === 'xlsx') return <Table className="w-4 h-4 flex-shrink-0" style={{ color: getThemeValue('components.cardComponents.materialsSection.icons.xls') }} />;
    if (type === 'doc' || type === 'docx') return <FileText className="w-4 h-4 flex-shrink-0" style={{ color: getThemeValue('components.cardComponents.materialsSection.icons.docx') }} />;
    if (type === 'ppt' || type === 'pptx') return <Presentation className="w-4 h-4 flex-shrink-0" style={{ color: getThemeValue('components.cardComponents.materialsSection.icons.ppt') }} />;
    if (type === 'yaml' || type === 'yml') return <Code className="w-4 h-4 flex-shrink-0" style={{ color: getThemeValue('components.cardComponents.materialsSection.icons.yaml') }} />;
    if (type === 'json') return <Code className="w-4 h-4 flex-shrink-0" style={{ color: getThemeValue('components.cardComponents.materialsSection.icons.json') }} />;
    return <FileText className="w-4 h-4 flex-shrink-0" style={{ color: getThemeValue('components.cardComponents.materialsSection.icons.default') }} />;  // Default icon
  };

  // Helper function to get theme-specific styles based on the item's theme
  const getThemeStyles = () => {
    // Temporarily set theme category to get correct theme values
    setThemeCategory(item.theme);
    
    const styles = {
      background: getThemeValue('components.baseCard.background'),
      border: `1px solid ${getThemeValue('components.baseCard.border')}`,
      boxShadow: getThemeValue('components.baseCard.shadow'),
      themeLabel: {
        background: getThemeValue('components.baseCard.themeLabel.bg'),
        color: getThemeValue('components.baseCard.themeLabel.text'),
      },
      categoryLabel: {
        background: getThemeValue('components.baseCard.categoryLabel.bg'),
        color: getThemeValue('components.baseCard.categoryLabel.text'),
      },
      tags: {
        background: getThemeValue('components.baseCard.tags.bg'),
        color: getThemeValue('components.baseCard.tags.text'),
        border: getThemeValue('components.baseCard.tags.border'),
      }
    };
    
    return styles;
  };
  
  const cardStyles = getThemeStyles();

  return (
    <div
      onClick={onClick}
      className="text-left card rounded-lg p-6 hover:shadow-md transition-shadow flex flex-col relative z-20 cursor-pointer"
      style={{ 
        background: cardStyles.background,
        border: cardStyles.border,
        boxShadow: cardStyles.boxShadow
      }}
    >
      {/* Theme Badge */}
      <div className="absolute top-4 right-4">
        <span 
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
          style={{ 
            background: cardStyles.themeLabel.background,
            color: cardStyles.themeLabel.color,
          }}
        >
          {item.theme === 'Quality Assurance' ? 'QA' : item.theme}
        </span>
      </div>

      {/* Category Label */}
      <div className="mb-4">
        <span 
          className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium"
          style={{ 
            background: cardStyles.categoryLabel.background,
            color: cardStyles.categoryLabel.color,
          }}
        >
          {item.category}
        </span>
      </div>

      {/* Title */}
      <h3 
        className="text-lg font-semibold mb-3 pr-24"
        style={{ color: getThemeValue('colors.text.primary') }}
      >
        {item.shortTitle}
      </h3>
      
      {/* Description */}
      <p 
        className="mb-4"
        style={{ color: getThemeValue('colors.text.secondary') }}
      >
        {item.shortDescription}
      </p>

      {/* Available Materials */}
      {item.materials && item.materials.length > 0 && (
        <div className="mt-auto">
          <p 
            className="text-sm font-medium mb-2"
            style={{ color: getThemeValue('colors.text.primary') }}
          >
            Available Materials:
          </p>
          <ul className="space-y-2">
            {item.materials.slice(0, 3).map((material: Material, index: number) => (
              <li key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  {getIconForFormat(material.format)}
                  <span 
                    className="ml-2"
                    style={{ color: getThemeValue('colors.text.secondary') }}
                  >
                    {material.title}
                  </span>
                </div>
                <span 
                  className="text-xs font-medium px-2 py-0.5 rounded"
                  style={{ 
                    background: getThemeValue('components.cardComponents.materialsSection.badgeBg'),
                    color: getThemeValue('components.cardComponents.materialsSection.badgeText')
                  }}
                >
                  {material.format}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4" 
          style={{ borderTop: `1px solid ${getThemeValue('colors.border')}` }}
        >
          {item.tags.slice(0, 3).map((tag: string, index: number) => (
            <span 
              key={index} 
              className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium"
              style={{ 
                background: cardStyles.tags.background,
                color: cardStyles.tags.color,
                border: `1px solid ${cardStyles.tags.border}`
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default BaseCard; 