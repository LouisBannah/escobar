import React, { useState, useEffect, useRef } from 'react';
import { X, FileText, Archive, Table, Presentation, Code, Globe, Download, Eye, ChevronDown, ChevronUp, Bookmark, Mail, Phone, MessageSquare } from 'lucide-react';
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

  // Refs for header height calculation
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  
  // Update header height on resize
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    
    // Set initial height
    updateHeaderHeight();
    
    // Add resize listener
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  // Prevent scrolling of the background when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Use the centralized theme utility - focus on light mode for redesign
  const colors = getThemeColors(item.theme, false);
  
  // Get the detailed description for this item
  const detailedDescription = detailedDescriptionsMap[item.id];
  
  // Get the code examples for this item
  const codeExamples = codeExamplesMap[item.id] || [];

  const handleDownload = (url: string) => {
    // Always use the sample PDF for downloads
    window.open('/documents/10-page-sample.pdf', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-md bg-black/30 flex items-center justify-center">
      <div className="relative w-full max-w-3xl max-h-[calc(100vh-40px)] flex flex-col bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Floating Header - Always visible */}
        <div 
          ref={headerRef}
          className="sticky top-0 z-10 border-b"
          style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)' }}
        >
          {/* Gradient Banner */}
          <div className={`h-2 ${colors.banner}`} />
          
          {/* Main Header */}
          <div className={`${colors.header} p-6`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-gray-800">{item.shortTitle}</h2>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colors.themeLabel}`}>
                    {item.theme === 'Quality Assurance' ? 'QA' : item.theme}
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colors.tagBackground} ${colors.tagText} border ${colors.tagBorder}`}>
                    {item.category}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200 rounded-full p-1 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex space-x-4 mt-4">
              {(['Overview', 'Materials', 'Code Examples', 'Contact'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? `${colors.button} text-white shadow-sm`
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scrollable Content */}
        <div 
          className="flex-1 overflow-y-auto" 
          style={{ 
            height: `calc(100vh - 40px - ${headerHeight}px - 56px)`, // 56px is the footer height
            scrollbarGutter: 'stable',
            scrollbarWidth: 'thin'
          }}
        >
          <div className="p-6" style={{ paddingLeft: '28px', paddingRight: '20px' }}>
            {/* Overview Tab */}
            {activeTab === 'Overview' && (
              <div className="space-y-6">
                {/* Description */}
                <div className="space-y-6">
                  <p className="text-gray-700 text-lg leading-relaxed">{item.shortDescription}</p>
                  
                  {/* Tags Section */}
                  <div className="flex flex-wrap gap-2">
                    {item.availableTags.map((tag) => (
                      <span
                        key={tag}
                        className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium ${colors.tagBackground} ${colors.tagText} border ${colors.tagBorder} hover:opacity-90 transition-colors`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Long Description Section */}
                <div className="rounded-xl p-6 bg-white border border-gray-200 shadow-sm">
                  <h3 className="text-gray-800 text-lg font-semibold mb-5 flex items-center">
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
                <div className="rounded-xl p-6 bg-white border border-gray-200 shadow-sm">
                  <h3 className="text-gray-800 text-lg font-semibold mb-5 flex items-center">
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
                                  <div className={`flex-shrink-0 w-5 h-5 rounded-full ${colors.bulletBackground} flex items-center justify-center mt-0.5`}>
                                    <div className={`w-1.5 h-1.5 rounded-full ${colors.numberBackground}`}></div>
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
                              <div className={`flex-shrink-0 w-8 h-8 rounded-full ${colors.numberBackground} flex items-center justify-center shadow-sm`}>
                                <span className="text-sm font-bold text-white">{number}</span>
                              </div>
                              <div className="text-gray-700 flex-1 pt-1.5">
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
                <div className="rounded-xl p-6 bg-white border border-gray-200 shadow-sm">
                  <h3 className="text-gray-800 text-lg font-semibold mb-5 flex items-center">
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
                                  <div className={`flex-shrink-0 w-5 h-5 rounded-full ${colors.bulletBackground} flex items-center justify-center mt-0.5`}>
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
                                    <div className={`flex-shrink-0 w-5 h-5 rounded-full ${colors.bulletBackground} flex items-center justify-center mt-0.5`}>
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
                      // For simple text content
                      <p className="text-gray-700">{item.keyCapabilities}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Materials Tab */}
            {activeTab === 'Materials' && (
              <div className="space-y-6">
                {item.materials.length > 0 ? (
                  <div className="rounded-xl p-6 bg-white border border-gray-200 shadow-sm">
                    <h3 className="text-gray-800 text-lg font-semibold mb-5 flex items-center">
                      <div className={`w-1 h-5 ${colors.button} rounded-full mr-2`}></div>
                      Available Materials
                    </h3>
                    <div className="space-y-3">
                      {item.materials.map((material, index) => {
                        const Icon = 
                          material.type === 'Document' ? FileText : 
                          material.type === 'Guide' ? Archive :
                          material.type === 'Template' ? Table :
                          material.type === 'Presentation' ? Presentation :
                          material.type === 'Code' ? Code : 
                          Globe;
                          
                        const isSelected = expandedPDF?.title === material.title;

                        return (
                          <div key={index} className="transition-all duration-200">
                            <div 
                              className={`bg-white rounded-lg border ${
                                isSelected ? `border-${colors.primary} shadow-md` : 'border-gray-200'
                              }`}
                            >
                              <div className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors">
                                <Icon className={`w-5 h-5 ${
                                  material.type === 'Document' ? 'text-red-500' :
                                  material.type === 'Guide' ? 'text-yellow-500' :
                                  material.type === 'Template' ? 'text-green-500' :
                                  material.type === 'Presentation' ? 'text-orange-500' :
                                  material.type === 'Code' ? 'text-purple-500' :
                                  'text-blue-500'
                                }`} />
                                <span className="text-sm text-gray-900 font-medium flex-grow">{material.title}</span>
                                <span className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-600">
                                  {material.type.toUpperCase()}
                                </span>
                                
                                {material.type === 'Document' && (
                                  <>
                                    <button 
                                      onClick={() => {
                                        if (isSelected) {
                                          setExpandedPDF(null);
                                        } else {
                                          setExpandedPDF({ 
                                            url: '/documents/10-page-sample.pdf',
                                            title: material.title 
                                          });
                                        }
                                      }}
                                      className={`p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-500 ${
                                        isSelected ? 'bg-gray-100' : ''
                                      }`}
                                    >
                                      {isSelected ? (
                                        <ChevronUp className="w-4 h-4" />
                                      ) : (
                                        <Eye className="w-4 h-4" />
                                      )}
                                    </button>
                                    <button 
                                      onClick={() => handleDownload(material.url)}
                                      className="p-2 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
                                    >
                                      <Download className="w-4 h-4" />
                                    </button>
                                  </>
                                )}
                              </div>
                              
                              {/* Embedded PDF Viewer */}
                              {material.type === 'Document' && isSelected && (
                                <div className="border-t border-gray-200">
                                  <div className="p-4">
                                    <iframe
                                      src={`${expandedPDF.url}#toolbar=0`}
                                      className="w-full h-[600px] rounded-md border border-gray-200"
                                      title={expandedPDF.title}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl p-6 bg-white border border-gray-200 shadow-sm text-center">
                    <h3 className="text-gray-800 text-lg font-semibold mb-3">No Materials Available</h3>
                    <p className="text-gray-600">There are no materials available for this item yet.</p>
                  </div>
                )}
              </div>
            )}

            {/* Code Examples Tab */}
            {activeTab === 'Code Examples' && (
              <div className="space-y-6">
                {codeExamples.length > 0 ? (
                  <div className="rounded-xl p-6 bg-white border border-gray-200 shadow-sm">
                    <h3 className="text-gray-800 text-lg font-semibold mb-5 flex items-center">
                      <div className={`w-1 h-5 ${colors.button} rounded-full mr-2`}></div>
                      Code Examples
                    </h3>
                    <div className="space-y-4">
                      {codeExamples.map((example, index) => (
                        <div key={index} className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                          <CodeExampleViewer example={example} themeColors={colors} />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl p-6 bg-white border border-gray-200 shadow-sm text-center">
                    <h3 className="text-gray-800 text-lg font-semibold mb-3">No Code Examples Available</h3>
                    <p className="text-gray-600">There are no code examples available for this item yet.</p>
                  </div>
                )}
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === 'Contact' && (
              <div className="space-y-6">
                <div className="rounded-xl p-6 bg-white border border-gray-200 shadow-sm">
                  <h3 className="text-gray-800 text-lg font-semibold mb-5 flex items-center">
                    <div className={`w-1 h-5 ${colors.button} rounded-full mr-2`}></div>
                    Contact Information
                  </h3>
                  
                  <div className="space-y-6">
                    <p className="text-gray-700">
                      For more information about {item.shortTitle}, please reach out to our team using the contact details below.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className={`p-4 rounded-lg border ${colors.border} ${colors.lightBg}`}>
                        <h4 className="flex items-center gap-2 text-gray-800 font-medium mb-3">
                          <MessageSquare className="w-4 h-4" />
                          <span>Support Team</span>
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-600">
                            <Mail className="w-4 h-4 mr-2" />
                            <span>support@example.com</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Phone className="w-4 h-4 mr-2" />
                            <span>+1 (555) 123-4567</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`p-4 rounded-lg border ${colors.border} ${colors.lightBg}`}>
                        <h4 className="flex items-center gap-2 text-gray-800 font-medium mb-3">
                          <Bookmark className="w-4 h-4" />
                          <span>Documentation Team</span>
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-600">
                            <Mail className="w-4 h-4 mr-2" />
                            <span>docs@example.com</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Globe className="w-4 h-4 mr-2" />
                            <span>docs.example.com/support</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <button className={`mt-4 px-4 py-2 rounded-lg text-white ${colors.button} hover:${colors.buttonHover} transition-all duration-200 shadow-sm hover:shadow-md flex items-center`}>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      <span>Request More Information</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="border-t border-gray-200 bg-gray-50 p-4 flex justify-between items-center text-xs text-gray-500 h-[56px]">
          <div>
            Last updated: <span className="font-medium">{new Date(item.lastUpdated).toLocaleDateString('en-AU', { 
              day: '2-digit', 
              month: '2-digit', 
              year: 'numeric' 
            })}</span>
          </div>
          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
            bg-white shadow-sm border border-gray-200 text-gray-700">
            Version {item.version}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedCard;