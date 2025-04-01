import React, { useState, useEffect, useRef } from 'react';
import { X, FileText, Archive, Table, Presentation, Code, Globe, Download, Eye, ChevronDown, ChevronUp, Bookmark, Mail, Phone, MessageSquare } from 'lucide-react';
import StructuredContent from './StructuredContent';
import CodeExampleViewer from './CodeExampleViewer';
import { detailedDescriptionsMap } from '../data/content';
import { codeExamplesMap } from '../data/content/codeExamples';
import { useTheme } from '../contexts/ThemeContext';
import { ContentBlock } from '../data/content';

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
  const { isDarkMode, getThemeValue, setThemeCategory } = useTheme();

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

  // Set the theme category based on the item's theme
  useEffect(() => {
    // For QA theme, we need to map "Quality Assurance" to "qualityAssurance"
    if (item.theme === 'Quality Assurance') {
      setThemeCategory('Quality Assurance');
    } else {
      setThemeCategory(item.theme);
    }
  }, [item.theme, setThemeCategory]);

  // Prevent scrolling of the background when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  // Get the detailed description for this item
  const detailedDescription = detailedDescriptionsMap[item.id];
  
  // Get the code examples for this item
  const codeExamples = codeExamplesMap[item.id] || [];

  // Helper function to convert text with bullet points to ContentBlock[] format
  const convertTextToContentBlocks = (text: string): ContentBlock[] => {
    const blocks: ContentBlock[] = [];
    const paragraphs = text.split('\n\n');
    
    paragraphs.forEach(paragraph => {
      // Check if this paragraph is a header (ends with ":")
      if (paragraph.trim().endsWith(':')) {
        blocks.push({
          type: 'header',
          content: paragraph.trim()
        });
        return;
      }
      
      // Check if this paragraph has bullet points
      if (paragraph.includes('• ')) {
        // Check if there's a header section before bullets
        const headerEndIndex = paragraph.indexOf('• ');
        const headerPart = headerEndIndex > 0 ? paragraph.substring(0, headerEndIndex).trim() : null;
        
        if (headerPart) {
          blocks.push({
            type: 'header',
            content: headerPart
          });
        }
        
        // Extract all bullet points
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
        
        blocks.push({
          type: 'bullet_list',
          items: bulletPoints.map(content => ({ content }))
        });
        return;
      }
      
      // Check if this paragraph starts with a number followed by a dot (like "1. Something")
      const numberedItems: { content: string, sub_bullets?: string[] }[] = [];
      const lines = paragraph.split('\n');
      let currentItem: { content: string, sub_bullets?: string[] } | null = null;
      
      for (const line of lines) {
        const numberedMatch = line.trim().match(/^(\d+)\.\s+(.+)$/);
        if (numberedMatch) {
          // If we already have a current item, add it to the list before creating a new one
          if (currentItem) {
            numberedItems.push(currentItem);
          }
          
          // Create a new numbered item
          currentItem = {
            content: numberedMatch[2],
            sub_bullets: []
          };
        } else if (currentItem && line.trim().length > 0) {
          // If we have a current item and this line isn't empty,
          // treat it as a sub-bullet for the current item
          currentItem.sub_bullets?.push(line.trim());
        }
      }
      
      // Don't forget to add the last item if there is one
      if (currentItem) {
        numberedItems.push(currentItem);
      }
      
      // If we found numbered items, add them as a numbered list
      if (numberedItems.length > 0) {
        blocks.push({
          type: 'numbered_list',
          items: numberedItems
        });
        return;
      }
      
      // If we got here, it's a regular paragraph
      blocks.push({
        type: 'paragraph',
        content: paragraph
      });
    });
    
    return blocks;
  };
  
  // Convert business value and key capabilities to ContentBlock[] format
  const businessValueBlocks = convertTextToContentBlocks(item.businessValue);
  const keyCapabilitiesBlocks = convertTextToContentBlocks(item.keyCapabilities);

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
          <div className="h-2" style={{ background: getThemeValue('colors.gradients.banner') }} />
          
          {/* Main Header */}
          <div className="p-6" style={{ background: getThemeValue('colors.gradients.header') }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold" style={{ color: getThemeValue('colors.text.primary') }}>{item.shortTitle}</h2>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" 
                    style={{ 
                      background: getThemeValue('components.baseCard.themeLabel.bg'),
                      color: getThemeValue('components.baseCard.themeLabel.text')
                    }}>
                    {item.theme === 'Quality Assurance' ? 'QA' : item.theme}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border" 
                    style={{ 
                      background: getThemeValue('components.baseCard.categoryLabel.bg'),
                      color: getThemeValue('components.baseCard.categoryLabel.text'),
                      borderColor: getThemeValue('colors.border')
                    }}>
                    {item.category}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="transition-colors duration-200 rounded-full p-1"
                style={{ 
                  color: getThemeValue('components.cardComponents.header.closeButtonColor'),
                  background: getThemeValue('components.cardComponents.header.closeButtonBg'),
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = getThemeValue('components.cardComponents.header.closeButtonColorHover');
                  e.currentTarget.style.background = getThemeValue('components.cardComponents.header.closeButtonBgHover');
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = getThemeValue('components.cardComponents.header.closeButtonColor');
                  e.currentTarget.style.background = getThemeValue('components.cardComponents.header.closeButtonBg');
                }}
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
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{
                    background: activeTab === tab ? getThemeValue('colors.gradients.button') : 'transparent',
                    color: activeTab === tab ? getThemeValue('colors.primary.contrast') : getThemeValue('components.expandedCard.tabs.inactive.text'),
                    boxShadow: activeTab === tab ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                  onMouseOver={(e) => {
                    if (activeTab !== tab) {
                      e.currentTarget.style.color = getThemeValue('components.expandedCard.tabs.inactive.hover');
                      e.currentTarget.style.background = isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (activeTab !== tab) {
                      e.currentTarget.style.color = getThemeValue('components.expandedCard.tabs.inactive.text');
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
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
            scrollbarWidth: 'thin',
            background: getThemeValue('colors.surface'),
            color: getThemeValue('colors.text.primary'),
            '--scrollbar-thumb': getThemeValue('components.cardComponents.scrollableContent.thumbColor'),
            '--scrollbar-thumb-hover': getThemeValue('components.cardComponents.scrollableContent.thumbHoverColor'),
            '--scrollbar-track': getThemeValue('components.cardComponents.scrollableContent.trackColor')
          } as React.CSSProperties}
        >
          <div className="p-6" style={{ paddingLeft: '28px', paddingRight: '20px' }}>
            {/* Overview Tab */}
            {activeTab === 'Overview' && (
              <div className="space-y-6">
                {/* Description */}
                <div className="space-y-6">
                  <p className="text-lg leading-relaxed" style={{ color: getThemeValue('colors.text.secondary') }}>
                    {item.shortDescription}
                  </p>
                  
                  {/* Tags Section */}
                  <div className="flex flex-wrap gap-2">
                    {item.availableTags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium border hover:opacity-90 transition-colors"
                        style={{ 
                          background: getThemeValue('components.baseCard.tags.bg'),
                          color: getThemeValue('components.baseCard.tags.text'),
                          borderColor: getThemeValue('components.baseCard.tags.border')
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Long Description Section */}
                <div className="rounded-xl p-6 shadow-sm"
                  style={{ 
                    background: getThemeValue('colors.background'),
                    borderColor: getThemeValue('colors.border')
                  }}
                >
                  <h3 className="text-lg font-semibold mb-5 flex items-center"
                    style={{ color: getThemeValue('colors.text.primary') }}
                  >
                    <div className="w-1 h-5 rounded-full mr-2"
                      style={{ background: getThemeValue('colors.primary.main') }}
                    ></div>
                    Detailed Description
                  </h3>
                  
                  {detailedDescription ? (
                    <StructuredContent blocks={detailedDescription.blocks} />
                  ) : (
                    <div className="prose prose-gray max-w-none">
                      {/* Fallback to original rendering if no structured content is available */}
                      {item.longDescription.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4" 
                          style={{ color: getThemeValue('colors.text.secondary') }}
                        >{paragraph}</p>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Business Value Section */}
                <div className="rounded-xl p-6 shadow-sm"
                  style={{ 
                    background: getThemeValue('colors.background'),
                    borderColor: getThemeValue('colors.border')
                  }}
                >
                  <h3 className="text-lg font-semibold mb-5 flex items-center"
                    style={{ color: getThemeValue('colors.text.primary') }}
                  >
                    <div className="w-1 h-5 rounded-full mr-2"
                      style={{ background: getThemeValue('colors.primary.main') }}
                    ></div>
                    Business Value
                  </h3>
                  
                  <StructuredContent blocks={businessValueBlocks} />
                </div>
                
                {/* Key Capabilities Section */}
                <div className="rounded-xl p-6 shadow-sm"
                  style={{ 
                    background: getThemeValue('colors.background'),
                    borderColor: getThemeValue('colors.border')
                  }}
                >
                  <h3 className="text-lg font-semibold mb-5 flex items-center"
                    style={{ color: getThemeValue('colors.text.primary') }}
                  >
                    <div className="w-1 h-5 rounded-full mr-2"
                      style={{ background: getThemeValue('colors.primary.main') }}
                    ></div>
                    Key Capabilities
                  </h3>
                  
                  <StructuredContent blocks={keyCapabilitiesBlocks} />
                </div>
              </div>
            )}

            {/* Materials Tab */}
            {activeTab === 'Materials' && (
              <div className="space-y-6">
                {item.materials.length > 0 ? (
                  <div className="rounded-xl p-6 shadow-sm"
                    style={{ 
                      background: getThemeValue('colors.background'),
                      borderColor: getThemeValue('colors.border')
                    }}
                  >
                    <h3 className="text-lg font-semibold mb-5 flex items-center"
                      style={{ color: getThemeValue('colors.text.primary') }}
                    >
                      <div className="w-1 h-5 rounded-full mr-2"
                        style={{ background: getThemeValue('colors.primary.main') }}
                      ></div>
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
                              className="rounded-lg border"
                              style={{
                                background: getThemeValue('colors.surface'),
                                borderColor: isSelected 
                                  ? getThemeValue('colors.primary.main') 
                                  : getThemeValue('colors.border'),
                                boxShadow: isSelected 
                                  ? getThemeValue('shared.boxShadow.md') 
                                  : getThemeValue('shared.boxShadow.sm')
                              }}
                            >
                              <div className="flex items-center gap-3 p-3 transition-colors hover:bg-gray-50">
                                <Icon style={{ 
                                  width: '1.25rem',
                                  height: '1.25rem',
                                  color: material.type.toLowerCase() in getThemeValue('components.cardComponents.materialsSection.icons')
                                    ? getThemeValue(`components.cardComponents.materialsSection.icons.${material.type.toLowerCase()}`)
                                    : getThemeValue('components.cardComponents.materialsSection.icons.default')
                                }} />
                                <span className="text-sm font-medium flex-grow" 
                                  style={{ color: getThemeValue('colors.text.primary') }}
                                >{material.title}</span>
                                <span className="text-xs px-2 py-1 rounded-md"
                                  style={{ 
                                    background: getThemeValue('components.cardComponents.materialsSection.badgeBg'),
                                    color: getThemeValue('components.cardComponents.materialsSection.badgeText')
                                  }}
                                >
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
                                            url: material.url,
                                            title: material.title
                                          });
                                        }
                                      }}
                                      className="p-2 rounded-full transition-colors"
                                      style={{
                                        background: getThemeValue('colors.surfaceAlt'),
                                        color: getThemeValue('colors.primary.main')
                                      }}
                                    >
                                      {isSelected ? (
                                        <ChevronUp className="w-4 h-4" />
                                      ) : (
                                        <Eye className="w-4 h-4" />
                                      )}
                                    </button>
                                    <button 
                                      onClick={() => handleDownload(material.url)}
                                      className="p-2 rounded-full transition-colors"
                                      style={{
                                        background: getThemeValue('colors.surfaceAlt'),
                                        color: getThemeValue('colors.primary.main')
                                      }}
                                    >
                                      <Download className="w-4 h-4" />
                                    </button>
                                  </>
                                )}
                              </div>
                              
                              {isSelected && expandedPDF && (
                                <div className="border-t" style={{ borderColor: getThemeValue('colors.border') }}>
                                  <iframe 
                                    src="/documents/10-page-sample.pdf" 
                                    className="w-full"
                                    style={{ height: '500px' }}
                                    title={expandedPDF.title}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl p-6 shadow-sm text-center"
                    style={{ 
                      background: getThemeValue('colors.background'),
                      borderColor: getThemeValue('colors.border'),
                      color: getThemeValue('colors.text.secondary')
                    }}
                  >
                    No materials are available for this item.
                  </div>
                )}
              </div>
            )}

            {/* Code Examples Tab */}
            {activeTab === 'Code Examples' && (
              <div className="space-y-6">
                {codeExamples.length > 0 ? (
                  <div className="rounded-xl p-6 shadow-sm"
                    style={{ 
                      background: getThemeValue('colors.background'),
                      borderColor: getThemeValue('colors.border')
                    }}
                  >
                    <h3 className="text-lg font-semibold mb-5 flex items-center"
                      style={{ color: getThemeValue('colors.text.primary') }}
                    >
                      <div className="w-1 h-5 rounded-full mr-2"
                        style={{ background: getThemeValue('colors.primary.main') }}
                      ></div>
                      Code Examples
                    </h3>
                    <div className="space-y-4">
                      {codeExamples.map((example, index) => (
                        <div key={index} className="rounded-xl overflow-hidden shadow-sm">
                          <CodeExampleViewer example={example} />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl p-6 shadow-sm text-center"
                    style={{ 
                      background: getThemeValue('colors.background'),
                      borderColor: getThemeValue('colors.border'),
                      color: getThemeValue('colors.text.secondary')
                    }}
                  >
                    No code examples are available for this item.
                  </div>
                )}
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === 'Contact' && (
              <div className="space-y-6">
                <div className="rounded-xl p-6 shadow-sm"
                  style={{ 
                    background: getThemeValue('colors.background'),
                    borderColor: getThemeValue('colors.border')
                  }}
                >
                  <h3 className="text-lg font-semibold mb-5 flex items-center"
                    style={{ color: getThemeValue('colors.text.primary') }}
                  >
                    <div className="w-1 h-5 rounded-full mr-2"
                      style={{ background: getThemeValue('colors.primary.main') }}
                    ></div>
                    Contact Information
                  </h3>
                  
                  <div className="space-y-6">
                    <p style={{ color: getThemeValue('colors.text.secondary') }}>
                      For more information about {item.shortTitle}, please reach out to our team using the contact details below.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg border"
                        style={{ 
                          borderColor: getThemeValue('colors.border'),
                          background: getThemeValue('colors.surfaceAlt')
                        }}
                      >
                        <h4 className="flex items-center gap-2 font-medium mb-3"
                          style={{ color: getThemeValue('colors.text.primary') }}
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Support Team</span>
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center" style={{ color: getThemeValue('colors.text.secondary') }}>
                            <Mail className="w-4 h-4 mr-2" />
                            <span>support@example.com</span>
                          </div>
                          <div className="flex items-center" style={{ color: getThemeValue('colors.text.secondary') }}>
                            <Phone className="w-4 h-4 mr-2" />
                            <span>+1 (555) 123-4567</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg border"
                        style={{ 
                          borderColor: getThemeValue('colors.border'),
                          background: getThemeValue('colors.surfaceAlt')
                        }}
                      >
                        <h4 className="flex items-center gap-2 font-medium mb-3"
                          style={{ color: getThemeValue('colors.text.primary') }}
                        >
                          <Bookmark className="w-4 h-4" />
                          <span>Documentation Team</span>
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center" style={{ color: getThemeValue('colors.text.secondary') }}>
                            <Mail className="w-4 h-4 mr-2" />
                            <span>docs@example.com</span>
                          </div>
                          <div className="flex items-center" style={{ color: getThemeValue('colors.text.secondary') }}>
                            <Globe className="w-4 h-4 mr-2" />
                            <span>docs.example.com/support</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      className="mt-4 px-4 py-2 rounded-lg text-white flex items-center shadow-sm hover:shadow-md transition-all duration-200"
                      style={{ 
                        background: getThemeValue('colors.gradients.button'),
                        color: getThemeValue('colors.primary.contrast')
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = getThemeValue('colors.gradients.buttonHover');
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = getThemeValue('colors.gradients.button');
                      }}
                    >
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