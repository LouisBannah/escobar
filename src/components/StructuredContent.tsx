import React from 'react';
import { ContentBlock } from '../data/content';

interface StructuredContentProps {
  blocks: ContentBlock[];
  themeColors: {
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
  };
}

const StructuredContent: React.FC<StructuredContentProps> = ({ blocks, themeColors }) => {
  return (
    <div className="prose prose-gray max-w-none">
      {blocks.map((block, blockIndex) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={blockIndex} className="mb-4 text-gray-700">
                {block.content}
              </p>
            );
            
          case 'header':
            return (
              <p key={blockIndex} className={`font-medium ${themeColors.text} mb-4`}>
                {block.content}
              </p>
            );
            
          case 'bullet_list':
            return (
              <div key={blockIndex} className="space-y-3 mt-3 mb-6">
                {block.items?.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full ${themeColors.medium} flex items-center justify-center mt-0.5`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${themeColors.button}`}></div>
                    </div>
                    <span className="text-gray-700 flex-1">{item.content}</span>
                  </div>
                ))}
              </div>
            );
            
          case 'numbered_list':
            return (
              <div key={blockIndex} className="space-y-5 mt-3 mb-6">
                {block.items?.map((item, itemIndex) => (
                  <div key={itemIndex} className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full ${themeColors.numberBackground} flex items-center justify-center shadow-sm`}>
                        <span className={`text-sm font-bold ${themeColors.numberText}`}>{itemIndex + 1}</span>
                      </div>
                      <div className={`${themeColors.contentText} flex-1 pt-1.5 font-medium`}>
                        {item.content}
                      </div>
                    </div>
                    
                    {item.sub_bullets && item.sub_bullets.length > 0 && (
                      <div className="ml-11 space-y-2">
                        {item.sub_bullets.map((subItem, subIndex) => (
                          <div key={subIndex} className="flex items-start gap-3">
                            <div className={`flex-shrink-0 w-4 h-4 rounded-full ${themeColors.bulletBackground} flex items-center justify-center mt-0.5`}>
                              <div className={`w-1 h-1 rounded-full ${themeColors.numberBackground}`}></div>
                            </div>
                            <span className={`${themeColors.contentText} flex-1`}>{subItem}</span>
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