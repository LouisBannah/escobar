import React from 'react';
import { ContentBlock } from '../data/content';
import { useTheme } from '../contexts/ThemeContext';

interface StructuredContentProps {
  blocks: ContentBlock[];
  themeColors?: {
    medium: string;
    text: string;
    border: string;
    button: string;
    success: string;
    banner: string;
    numberBackground: string;
    numberText: string;
    contentText: string;
    bulletBackground: string;
  } | null;
}

const StructuredContent: React.FC<StructuredContentProps> = ({ blocks, themeColors }) => {
  const { getThemeValue } = useTheme();
  
  // Helper to get either theme value from the new system or fallback to old themeColors if provided
  const getThemeStyle = (legacyKey: string, newPath: string) => {
    if (themeColors) {
      return themeColors[legacyKey as keyof typeof themeColors];
    }
    return getThemeValue(newPath);
  };

  return (
    <div className="prose prose-gray max-w-none">
      {blocks.map((block, blockIndex) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p 
                key={blockIndex} 
                style={{ 
                  marginBottom: '1rem', 
                  color: getThemeStyle('contentText', 'colors.text.secondary') 
                }}
              >
                {block.content}
              </p>
            );
            
          case 'header':
            return (
              <p 
                key={blockIndex} 
                style={{ 
                  fontWeight: 500, 
                  color: getThemeStyle('text', 'colors.text.primary'),
                  marginBottom: '1rem' 
                }}
              >
                {block.content}
              </p>
            );
            
          case 'bullet_list':
            return (
              <div key={blockIndex} style={{ marginTop: '0.75rem', marginBottom: '1.5rem', rowGap: '0.75rem', display: 'flex', flexDirection: 'column' }}>
                {block.items?.map((item, itemIndex) => (
                  <div key={itemIndex} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ 
                      flexShrink: 0, 
                      width: '1.25rem', 
                      height: '1.25rem', 
                      borderRadius: '9999px', 
                      background: getThemeStyle('medium', 'colors.primary.light'),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '0.125rem'
                    }}>
                      <div style={{ 
                        width: '0.375rem', 
                        height: '0.375rem', 
                        borderRadius: '9999px', 
                        background: getThemeStyle('button', 'colors.primary.main') 
                      }}></div>
                    </div>
                    <span style={{ 
                      color: getThemeStyle('contentText', 'colors.text.secondary'), 
                      flexGrow: 1 
                    }}>
                      {item.content}
                    </span>
                  </div>
                ))}
              </div>
            );
            
          case 'numbered_list':
            return (
              <div key={blockIndex} style={{ rowGap: '1.25rem', marginTop: '0.75rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                {block.items?.map((item, itemIndex) => (
                  <div key={itemIndex} style={{ rowGap: '0.75rem', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <div style={{ 
                        flexShrink: 0, 
                        width: '2rem', 
                        height: '2rem', 
                        borderRadius: '9999px', 
                        background: getThemeStyle('numberBackground', 'colors.primary.main'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                      }}>
                        <span style={{ 
                          fontSize: '0.875rem', 
                          fontWeight: 'bold', 
                          color: getThemeStyle('numberText', 'colors.primary.contrast')
                        }}>
                          {itemIndex + 1}
                        </span>
                      </div>
                      <div style={{ 
                        color: getThemeStyle('contentText', 'colors.text.secondary'), 
                        flexGrow: 1, 
                        paddingTop: '0.375rem', 
                        fontWeight: 500 
                      }}>
                        {item.content}
                      </div>
                    </div>
                    
                    {item.sub_bullets && item.sub_bullets.length > 0 && (
                      <div style={{ marginLeft: '2.75rem', rowGap: '0.5rem', display: 'flex', flexDirection: 'column' }}>
                        {item.sub_bullets.map((subItem, subIndex) => (
                          <div key={subIndex} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                            <div style={{ 
                              flexShrink: 0, 
                              width: '1rem', 
                              height: '1rem', 
                              borderRadius: '9999px', 
                              background: getThemeStyle('bulletBackground', 'colors.primary.light'),
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginTop: '0.125rem'
                            }}>
                              <div style={{ 
                                width: '0.25rem', 
                                height: '0.25rem', 
                                borderRadius: '9999px', 
                                background: getThemeStyle('numberBackground', 'colors.primary.main')
                              }}></div>
                            </div>
                            <span style={{ 
                              color: getThemeStyle('contentText', 'colors.text.secondary'), 
                              flexGrow: 1 
                            }}>
                              {subItem}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
            
          default:
            return null;
        }
      })}
    </div>
  );
};

export default StructuredContent; 