import React, { useState } from 'react';
import { X, FileText, Archive, Table, Presentation, Code, Globe, Download, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import StructuredContent from './StructuredContent';
import CodeExampleViewer from './CodeExampleViewer';
import { detailedDescriptionsMap } from '../data/content';
import { codeExamplesMap } from '../data/content/codeExamples';
import { getThemeColors } from '../utils/themeUtils';
import { useTheme } from '../contexts/ThemeContext';

interface ExpandedCardProps {
  item: {
    id: string;
    theme: 'Sales' | 'Delivery' | 'Quality Assurance';
    category: string;
    shortTitle: string;
    shortDescription: string;
    longDescription: string;
    businessValue: string;
    keyCapabilities: string;
    availableTags: string[];
    selectedTools: string;
    materials: {
      type: string;
      url: string;
      title: string;
    }[];
    lastUpdated: string;
    version: string;
  };
  onClose: () => void;
}

const ExpandedCard: React.FC<ExpandedCardProps> = ({ item, onClose }) => {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Materials' | 'Code Examples' | 'Contact'>('Overview');
  const [expandedPDF, setExpandedPDF] = useState<{ url: string; title: string } | null>(null);
  const { isDarkMode } = useTheme();

  // Use the centralized theme utility
  const colors = getThemeColors(item.theme, isDarkMode);
  
  // Get the detailed description for this item
  const detailedDescription = detailedDescriptionsMap[item.id];
  
  // Get the code examples for this item
  const codeExamples = codeExamplesMap[item.id] || [];

  const handleDownload = (url: string) => {
    // Always use the sample PDF for downloads
    window.open('/documents/10-page-sample.pdf', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm bg-black/30">
      <div className="min-h-screen px-4 text-center">
        <div className="fixed inset-0" onClick={onClose} />
        <div className="inline-block w-full max-w-3xl my-8 text-left align-middle transition-all transform">
          <div className="card rounded-2xl shadow-2xl overflow-hidden relative z-[51] border">
            {/* Gradient Banner */}
            <div className={`h-4 ${colors.banner}`} />
            
            {/* Header */}
            <div className={`p-6 ${colors.header} border-b ${colors.border}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <h2 className={`text-xl font-semibold ${colors.titleText}`}>{item.shortTitle}</h2>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colors.themeLabel}`}>
                      {item.theme === 'Quality Assurance' ? 'QA' : item.theme}
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
                      ${colors.tagBackground} ${colors.tagText} border ${colors.tagBorder}`}>
                      {item.category}
                    </span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className={`${colors.tabText} hover:opacity-80 transition-colors duration-200`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex space-x-4 mt-6">
                {(['Overview', 'Materials', 'Code Examples', 'Contact'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeTab === tab
                        ? `${colors.button} text-white shadow-sm`
                        : `${colors.cardText} hover:opacity-80`
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Overview Tab */}
              {activeTab === 'Overview' && (
                <div className="space-y-6">
                  {/* Description */}
                  <div className="space-y-6">
                    <p className={`${colors.contentText} text-lg leading-relaxed opacity-80`}>{item.shortDescription}</p>
                    
                    {/* Tags Section */}
                    <div className="flex flex-wrap gap-2">
                      {item.availableTags.map((tag) => (
                        <span
                          key={tag}
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
                            ${colors.tagBackground} ${colors.tagText} border ${colors.tagBorder} hover:opacity-80 transition-colors`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Long Description Section */}
                  <div className={`rounded-xl p-6 ${colors.contentBox} border ${colors.border}`}>
                    <h3 className={`${colors.boxTitle} text-lg font-semibold mb-5 flex items-center`}>
                      <div className={`w-1 h-5 ${colors.button} rounded-full mr-2`}></div>
                      Detailed Description
                    </h3>
                    
                    {detailedDescription ? (
                      <StructuredContent blocks={detailedDescription.blocks} themeColors={colors} />
                    ) : (
                      <div className="prose prose-gray max-w-none">
                        {/* Fallback to original rendering if no structured content is available */}
                        {item.longDescription.split('\n\n').map((paragraph, index) => (
                          <p key={index} className={`mb-4 ${colors.cardText} opacity-80`}>{paragraph}</p>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Business Value Section */}
                  <div className={`rounded-xl p-6 ${colors.contentBox} border ${colors.border}`}>
                    <h3 className={`${colors.boxTitle} text-lg font-semibold mb-5 flex items-center`}>
                      <div className={`w-1 h-5 ${colors.button} rounded-full mr-2`}></div>
                      Business Value
                    </h3>
                    <div className="prose prose-gray max-w-none">
                      {item.businessValue.split('\n\n').map((paragraph, index) => {
                        // Check if this paragraph is a header (ends with ":")
                        if (paragraph.trim().endsWith(':')) {
                          return (
                            <p key={index} className={`font-medium ${colors.cardText} mb-3`}>
                              {paragraph.trim()}
                            </p>
                          );
                        }
                        
                        // Check if this paragraph has bullet points
                        if (paragraph.includes('• ')) {
                          // Check if there's a header section before bullets
                          const headerEndIndex = paragraph.indexOf('• ');
                          const headerPart = headerEndIndex > 0 ? paragraph.substring(0, headerEndIndex).trim() : null;
                          
                          // Extract all bullet points - handle both multi-line and single-line cases
                          let bulletPoints: string[] = [];
                          const bulletContent = paragraph.substring(headerEndIndex);
                          
                          // Handle case where bullets are on separate lines
                          if (bulletContent.includes('\n')) {
                            bulletPoints = bulletContent
                              .split('\n')
                              .filter(line => line.trim().startsWith('• '))
                              .map(line => line.trim().substring(2).trim());
                          } 
                          // Handle case where bullets are all on one line separated by •
                          else {
                            bulletPoints = bulletContent
                              .split('• ')
                              .filter(point => point.trim().length > 0)
                              .map(point => point.trim());
                          }

                          return (
                            <div key={index} className="mb-6">
                              {headerPart && (
                                <p className={`mb-3 ${colors.contentText} opacity-80`}>{headerPart}</p>
                              )}
                              <ul className="space-y-2 pl-2">
                                {bulletPoints.map((point, idx) => (
                                  <li key={idx} className="flex items-start gap-3 group">
                                    <div className={`flex-shrink-0 w-5 h-5 rounded-full ${colors.bulletBackground} flex items-center justify-center mt-0.5`}>
                                      <div className={`w-1.5 h-1.5 rounded-full ${colors.numberBackground}`}></div>
                                    </div>
                                    <span className={`${colors.contentText} opacity-80 flex-1`}>{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        }
                        
                        // Check if this paragraph starts with a number followed by a dot (like "1. Something")
                        const numberedMatch = paragraph.trim().match(/^(\d+)\.\s+(.+)$/);
                        if (numberedMatch) {
                          // Extract the number and content
                          const number = numberedMatch[1];
                          const content = numberedMatch[2];
                          
                          return (
                            <div key={index} className="mb-3">
                              <div className="flex items-start gap-3">
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full ${colors.numberBackground} flex items-center justify-center shadow-sm`}>
                                  <span className={`text-sm font-bold ${colors.numberText}`}>{number}</span>
                                </div>
                                <div className={`${colors.contentText} opacity-80 flex-1 pt-1.5`}>
                                  {content}
                                </div>
                              </div>
                            </div>
                          );
                        }

                        // Handle paragraphs that are continuations of numbered items (indented content)
                        if (index > 0) {
                          const prevParagraph = item.businessValue.split('\n\n')[index - 1];
                          const isPrevNumbered = prevParagraph.trim().match(/^(\d+)\.\s+(.+)$/);
                          
                          if (isPrevNumbered && !paragraph.trim().match(/^(\d+)\.\s+/) && !paragraph.trim().endsWith(':')) {
                            return (
                              <div key={index} className={`mb-4 ml-11 pl-0 border-l-2 ${colors.border}`}>
                                <p className={`${colors.contentText} opacity-80 pl-4 py-1`}>{paragraph}</p>
                              </div>
                            );
                          }
                        }

                        // Regular paragraph
                        return (
                          <p key={index} className={`mb-4 ${colors.cardText} opacity-80`}>{paragraph}</p>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Key Capabilities Section */}
                  <div className={`rounded-xl p-6 ${colors.contentBox} border ${colors.border}`}>
                    <h3 className={`${colors.boxTitle} text-lg font-semibold mb-5 flex items-center`}>
                      <div className={`w-1 h-5 ${colors.button} rounded-full mr-2`}></div>
                      Key Capabilities
                    </h3>
                    <div className="prose prose-gray max-w-none">
                      {item.keyCapabilities.split('\n').length > 1 || item.keyCapabilities.includes('• ') ? (
                        // For structured content with bullet points or multiple lines
                        <div>
                          {/* Extract any header/intro text before bullet points */}
                          {item.keyCapabilities.includes(':') && (
                            <p className={`font-medium ${colors.cardText} mb-4`}>
                              {item.keyCapabilities.split(':')[0]}:
                            </p>
                          )}
                          
                          <ul className="space-y-3 pl-0">
                            {/* Parse and extract bullet points */}
                            {item.keyCapabilities.includes('• ') ? 
                              // Handle bullet points format
                              item.keyCapabilities
                                .split('• ')
                                .filter(point => point.trim().length > 0)
                                .map((point, idx) => (
                                  <li key={idx} className="flex items-start gap-3">
                                    <div className={`flex-shrink-0 w-5 h-5 rounded-full ${colors.medium} flex items-center justify-center mt-0.5`}>
                                      <div className={`w-1.5 h-1.5 rounded-full ${colors.button}`}></div>
                                    </div>
                                    <span className={`${colors.cardText} opacity-80 flex-1`}>{point.trim()}</span>
                                  </li>
                                ))
                              :
                              // Handle multi-line format
                              item.keyCapabilities.split('\n')
                                .filter(line => line.trim() && !line.includes(':'))
                                .map((line, idx) => {
                                  // Check if this is a numbered point
                                  const numberedMatch = line.trim().match(/^(\d+)\.\s+(.+)$/);
                                  if (numberedMatch) {
                                    const number = numberedMatch[1];
                                    const content = numberedMatch[2];
                                    
                                    return (
                                      <li key={idx} className="flex items-start gap-3 mb-3">
                                        <div className={`flex-shrink-0 w-8 h-8 rounded-full ${colors.button} flex items-center justify-center shadow-sm`}>
                                          <span className="text-sm font-bold text-white">{number}</span>
                                        </div>
                                        <div className={`${colors.cardText} opacity-80 flex-1 pt-1.5`}>
                                          {content}
                                        </div>
                                      </li>
                                    );
                                  }
                                  
                                  // Handle regular lines as bullet points
                                  const content = line.trim();
                                  return (
                                    <li key={idx} className="flex items-start gap-3">
                                      <div className={`flex-shrink-0 w-5 h-5 rounded-full ${colors.medium} flex items-center justify-center mt-0.5`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${colors.button}`}></div>
                                      </div>
                                      <span className={`${colors.cardText} opacity-80 flex-1`}>{content}</span>
                                    </li>
                                  );
                                })
                            }
                          </ul>
                        </div>
                      ) : (
                        // If it's just a single paragraph without bullet points
                        <p className={`${colors.cardText} opacity-80`}>{item.keyCapabilities}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Materials Tab */}
              {activeTab === 'Materials' && (
                <div className="space-y-6">
                  <div className={`rounded-xl p-6 ${colors.contentBox} border ${colors.border}`}>
                    <h3 className={`${colors.boxTitle} text-lg font-semibold mb-5 flex items-center`}>
                      <div className={`w-1 h-5 ${colors.button} rounded-full mr-2`}></div>
                      Available Materials
                    </h3>
                    <div className="space-y-3">
                      {item.materials.map((material, index) => (
                        <div 
                          key={index} 
                          className={`${colors.materialBoxBackground} rounded-lg border ${colors.materialBoxBorder} transition-all duration-200 ${
                            expandedPDF?.title === material.title ? 'shadow-md' : ''
                          }`}
                        >
                          <div className={`flex items-center gap-3 p-3 hover:opacity-90 transition-colors`}>
                            {material.type === 'pdf' && <FileText className="w-5 h-5 text-red-500" />}
                            {material.type === 'zip' && <Archive className="w-5 h-5 text-yellow-500" />}
                            {material.type === 'xls' && <Table className="w-5 h-5 text-green-500" />}
                            {material.type === 'docx' && <FileText className="w-5 h-5 text-blue-500" />}
                            {material.type === 'ppt' && <Presentation className="w-5 h-5 text-orange-500" />}
                            {material.type === 'yaml' && <Code className="w-5 h-5 text-purple-500" />}
                            {material.type === 'json' && <Code className="w-5 h-5 text-gray-500" />}
                            {material.type === 'html' && <Globe className="w-5 h-5 text-blue-400" />}
                            <span className={`text-sm ${colors.materialBoxText} font-medium flex-grow`}>{material.title}</span>
                            <span className={`text-xs px-2 py-1 rounded-md ${colors.materialBoxBackground} ${colors.materialBoxText} border ${colors.materialBoxBorder}`}>
                              {material.type.toUpperCase()}
                            </span>
                            <Download className={`w-4 h-4 ${colors.materialBoxText} opacity-50`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Code Examples Tab */}
              {activeTab === 'Code Examples' && (
                <div className="space-y-6">
                  <div className={`rounded-xl p-6 ${colors.contentBox} border ${colors.border}`}>
                    <h3 className={`${colors.boxTitle} text-lg font-semibold mb-5 flex items-center`}>
                      <div className={`w-1 h-5 ${colors.button} rounded-full mr-2`}></div>
                      Code Examples
                    </h3>
                    <div className="space-y-6">
                      {codeExamples.map((example, index) => (
                        <CodeExampleViewer key={index} example={example} themeColors={colors} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Tab */}
              {activeTab === 'Contact' && (
                <div className="space-y-6">
                  {/* Contact Information */}
                  <div className="space-y-6">
                    <p className={`${colors.cardText} text-lg leading-relaxed opacity-80`}>
                      {/* Contact information placeholder */}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedCard;