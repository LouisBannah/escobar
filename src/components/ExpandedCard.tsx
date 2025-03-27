import React, { useState } from 'react';
import { X, FileText, Archive, Table, Presentation, Code, Globe, Download } from 'lucide-react';
import StructuredContent from './StructuredContent';
import { detailedDescriptionsMap } from '../data/content';

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

  const getThemeColors = (theme: string) => {
    switch (theme) {
      case 'Sales':
        return {
          light: 'bg-gradient-to-r from-emerald-100/70 to-teal-200/70 backdrop-blur-sm',
          lighter: 'bg-gradient-to-r from-emerald-50/40 to-teal-50/40 backdrop-blur-sm',
          medium: 'bg-emerald-200',
          text: 'text-emerald-800',
          border: 'border-emerald-200',
          button: 'bg-emerald-600 hover:bg-emerald-700',
          success: 'bg-emerald-50',
          banner: 'bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400'
        };
      case 'Delivery':
        return {
          light: 'bg-gradient-to-r from-blue-100/70 to-indigo-200/70 backdrop-blur-sm',
          lighter: 'bg-gradient-to-r from-blue-50/40 to-indigo-50/40 backdrop-blur-sm',
          medium: 'bg-blue-200',
          text: 'text-blue-800',
          border: 'border-blue-200',
          button: 'bg-blue-600 hover:bg-blue-700',
          success: 'bg-blue-50',
          banner: 'bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-400'
        };
      default: // Quality Assurance
        return {
          light: 'bg-gradient-to-r from-purple-100/70 to-fuchsia-200/70 backdrop-blur-sm',
          lighter: 'bg-gradient-to-r from-purple-50/40 to-fuchsia-50/40 backdrop-blur-sm',
          medium: 'bg-purple-200',
          text: 'text-purple-800',
          border: 'border-purple-200',
          button: 'bg-purple-600 hover:bg-purple-700',
          success: 'bg-purple-50',
          banner: 'bg-gradient-to-r from-purple-400 via-fuchsia-500 to-purple-400'
        };
    }
  };

  const colors = getThemeColors(item.theme);
  
  // Get the detailed description for this item
  const detailedDescription = detailedDescriptionsMap[item.id];

  const handleDownload = (url: string) => {
    // Implementation for downloading a file
    console.log(`Downloading file from: ${url}`);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm bg-black/30">
      <div className="min-h-screen px-4 text-center">
        <div className="fixed inset-0" onClick={onClose} />
        <div className="inline-block w-full max-w-3xl my-8 text-left align-middle transition-all transform">
          <div className={`rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl bg-white/90 relative z-[51] border ${colors.border}`}>
            {/* Gradient Banner */}
            <div className={`h-4 ${colors.banner}`} />
            
            {/* Header */}
            <div className={`p-6 ${colors.light} border-b ${colors.border}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold text-gray-900">{item.shortTitle}</h2>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
                      ${colors.medium} ${colors.text}`}>
                      {item.theme === 'Quality Assurance' ? 'QA' : item.theme}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
                      bg-gray-100 text-gray-700 shadow-sm border border-gray-200">
                      {item.category}
                    </span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
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
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
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
                    <p className="text-gray-600 text-lg leading-relaxed">{item.shortDescription}</p>
                    
                    {/* Tags Section */}
                    <div className="flex flex-wrap gap-2">
                      {item.availableTags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-white shadow-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Long Description Section */}
                  <div className={`rounded-xl p-6 ${colors.lighter} border ${colors.border}`}>
                    <h3 className="text-gray-900 text-lg font-semibold mb-5 flex items-center">
                      <div className={`w-1 h-5 ${colors.button} rounded-full mr-2`}></div>
                      Detailed Description
                    </h3>
                    
                    {detailedDescription ? (
                      <StructuredContent blocks={detailedDescription.blocks} themeColors={colors} />
                    ) : (
                      <div className="prose prose-gray max-w-none">
                        {/* Fallback to original rendering if no structured content is available */}
                        {item.longDescription.split('\n\n').map((paragraph, index) => (
                          <p key={index} className="mb-4 text-gray-700">{paragraph}</p>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Business Value Section */}
                  <div className={`rounded-xl p-6 ${colors.lighter} border ${colors.border}`}>
                    <h3 className="text-gray-900 text-lg font-semibold mb-5 flex items-center">
                      <div className={`w-1 h-5 ${colors.button} rounded-full mr-2`}></div>
                      Business Value
                    </h3>
                    <div className="prose prose-gray max-w-none">
                      {item.businessValue.split('\n\n').map((paragraph, index) => {
                        // Check if this paragraph is a header (ends with ":")
                        if (paragraph.trim().endsWith(':')) {
                          return (
                            <p key={index} className={`font-medium ${colors.text} mb-3`}>
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
                                <p className="mb-3 text-gray-700">{headerPart}</p>
                              )}
                              <ul className="space-y-2 pl-2">
                                {bulletPoints.map((point, idx) => (
                                  <li key={idx} className="flex items-start gap-3 group">
                                    <div className={`flex-shrink-0 w-5 h-5 rounded-full ${colors.medium} flex items-center justify-center mt-0.5`}>
                                      <div className={`w-1.5 h-1.5 rounded-full ${colors.button}`}></div>
                                    </div>
                                    <span className="text-gray-700 flex-1">{point}</span>
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
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full ${colors.button} flex items-center justify-center shadow-sm`}>
                                  <span className="text-sm font-bold text-white">{number}</span>
                                </div>
                                <div className="text-gray-700 flex-1 pt-1.5 font-medium">
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
                              <div key={index} className="mb-4 ml-11 pl-0 border-l-2 border-gray-200">
                                <p className="text-gray-600 pl-4 py-1">{paragraph}</p>
                              </div>
                            );
                          }
                        }

                        // Regular paragraph
                        return (
                          <p key={index} className="mb-4 text-gray-700">{paragraph}</p>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Key Capabilities Section */}
                  <div className={`rounded-xl p-6 ${colors.lighter} border ${colors.border}`}>
                    <h3 className="text-gray-900 text-lg font-semibold mb-5 flex items-center">
                      <div className={`w-1 h-5 ${colors.button} rounded-full mr-2`}></div>
                      Key Capabilities
                    </h3>
                    <div className="prose prose-gray max-w-none">
                      {item.keyCapabilities.split('\n').length > 1 || item.keyCapabilities.includes('• ') ? (
                        // For structured content with bullet points or multiple lines
                        <div>
                          {/* Extract any header/intro text before bullet points */}
                          {item.keyCapabilities.includes(':') && (
                            <p className={`font-medium ${colors.text} mb-4`}>
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
                                    <span className="text-gray-700 flex-1">{point.trim()}</span>
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
                                        <div className="text-gray-700 flex-1 pt-1.5">
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
                                      <span className="text-gray-700 flex-1">{content}</span>
                                    </li>
                                  );
                                })
                            }
                          </ul>
                        </div>
                      ) : (
                        // If it's just a single paragraph without bullet points
                        <p className="text-gray-700">{item.keyCapabilities}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Materials Tab */}
              {activeTab === 'Materials' && (
                <div className="space-y-6">
                  <p className="text-gray-600">All resources and materials available for this toolkit item.</p>
                  
                  <div className={`rounded-xl p-6 ${colors.lighter} border ${colors.border}`}>
                    <h3 className="text-gray-900 text-lg font-semibold mb-5 flex items-center">
                      <div className={`w-1 h-5 ${colors.button} rounded-full mr-2`}></div>
                      Available Materials
                    </h3>
                    <div className="space-y-3">
                      {item.materials.map((material, index) => (
                        <div 
                          key={index} 
                          className="flex items-center gap-3 p-3 bg-white/80 rounded-lg border border-gray-100 hover:bg-white/95 transition-colors"
                        >
                          {material.type === 'pdf' && <FileText className="w-5 h-5 text-red-500" />}
                          {material.type === 'zip' && <Archive className="w-5 h-5 text-yellow-500" />}
                          {material.type === 'xls' && <Table className="w-5 h-5 text-green-500" />}
                          {material.type === 'docx' && <FileText className="w-5 h-5 text-blue-500" />}
                          {material.type === 'ppt' && <Presentation className="w-5 h-5 text-orange-500" />}
                          {material.type === 'yaml' && <Code className="w-5 h-5 text-purple-500" />}
                          {material.type === 'json' && <Code className="w-5 h-5 text-gray-500" />}
                          {material.type === 'html' && <Globe className="w-5 h-5 text-blue-400" />}
                          <span className="text-sm text-gray-900 font-medium flex-grow">{material.title}</span>
                          <span className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-600">
                            {material.type.toUpperCase()}
                          </span>
                          <button 
                            onClick={() => handleDownload(material.url)}
                            className="text-gray-500 hover:text-blue-500 transition-colors"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Code Examples Tab */}
              {activeTab === 'Code Examples' && (
                <div className="space-y-6">
                  <p className="text-gray-600">Code examples and implementation guides.</p>
                  
                  <div className={`rounded-xl p-6 ${colors.lighter} border ${colors.border}`}>
                    <h3 className="text-gray-900 text-lg font-semibold mb-5 flex items-center">
                      <div className={`w-1 h-5 ${colors.button} rounded-full mr-2`}></div>
                      Sample Usage
                    </h3>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-700">{item.selectedTools}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Tab */}
              {activeTab === 'Contact' && (
                <div className="space-y-6">
                  <p className="text-gray-600">Get in touch for more information about this toolkit item.</p>
                  
                  <div className={`rounded-xl p-6 ${colors.lighter} border ${colors.border}`}>
                    <h3 className="text-gray-900 text-lg font-semibold mb-5 flex items-center">
                      <div className={`w-1 h-5 ${colors.button} rounded-full mr-2`}></div>
                      Contact Information
                    </h3>
                    <div className="space-y-3">
                      <p className="text-gray-700">For more information about this toolkit item, please contact the responsible team.</p>
                      <div className="mt-4">
                        <button className={`px-4 py-2 rounded-lg text-white ${colors.button} transition-all duration-200 shadow-sm hover:shadow-md`}>
                          Request Information
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className={`px-6 py-3 border-t ${colors.border} flex justify-between items-center`}>
              <span className="text-sm text-gray-500">
                Last updated: {item.lastUpdated} • Version {item.version}
              </span>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedCard;