import React, { useState, useEffect, useRef } from 'react';
import { X, FileText, Archive, Table, Presentation, Code, Globe, Lock, Shield } from 'lucide-react';
import { showSubmissionNotice } from './SubmissionPopup';
import { useTheme } from '../contexts/ThemeContext';

interface DetailedCardProps {
  item: {
    id: string;
    theme: 'Sales' | 'Delivery' | 'Quality Assurance';
    category: string;
    shortTitle: string;
    shortDescription: string;
    availableTags: string[];
    materials: {
      type: string;
      url: string;
      title: string;
    }[];
    lastUpdated: string;
    version: string;
  };
  onClose: () => void;
  onRequestAccess: (itemId: string) => void;
}

const DetailedCard: React.FC<DetailedCardProps> = ({ item, onClose, onRequestAccess }) => {
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
  
  const handleRequestAccess = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Log the request and call the onRequestAccess handler
    console.log(`Access requested for item: ${item.id}`);
    onRequestAccess(item.id);
    
    // Close the detailed card immediately
    onClose();
    
    // Show the submission notice using the portal
    try {
      await showSubmissionNotice(item.theme);
    } catch (error) {
      console.error('Error showing submission notice:', error);
    }
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
                      background: getThemeValue('components.expandedCard.themeLabel.bg'),
                      color: getThemeValue('components.expandedCard.themeLabel.text')
                    }}>
                    {item.theme === 'Quality Assurance' ? 'QA' : item.theme}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" 
                    style={{ 
                      background: getThemeValue('components.expandedCard.categoryLabel.bg'),
                      color: getThemeValue('components.expandedCard.categoryLabel.text')
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
          </div>
        </div>
        
        {/* Scrollable Content */}
        <div 
          className="flex-1 overflow-y-scroll" 
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
          <div className="p-6" style={{ paddingLeft: '40px', paddingRight: '40px' }}>
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
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                    style={{ 
                      background: getThemeValue('components.expandedCard.tags.bg'),
                      color: getThemeValue('components.expandedCard.tags.text')
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Materials Section */}
            <div className="mt-6 rounded-xl p-6 shadow-sm"
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
                    material.type === 'pdf' ? FileText : 
                    material.type === 'zip' ? Archive :
                    material.type === 'xls' ? Table :
                    material.type === 'docx' ? FileText :
                    material.type === 'ppt' ? Presentation :
                    material.type === 'yaml' ? Code :
                    material.type === 'json' ? Code : 
                    Globe;
                    
                  return (
                    <div 
                      key={index} 
                      className="transition-all duration-200"
                    >
                      <div 
                        className="rounded-lg border"
                        style={{
                          background: getThemeValue('colors.surface'),
                          borderColor: getThemeValue('colors.border'),
                          boxShadow: getThemeValue('shared.boxShadow.sm')
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
                          <Lock className="w-4 h-4" style={{ color: getThemeValue('colors.text.tertiary') }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Access Restricted Notice */}
            <div className="mt-6 rounded-xl overflow-hidden shadow-sm relative">
              <div className="absolute inset-0 backdrop-blur-sm rounded-xl" 
                style={{ 
                  background: `${getThemeValue('colors.primary.light')}40`,
                  opacity: 0.4
                }}
              ></div>
              <div className="relative p-6 rounded-xl"
                style={{ background: 'transparent' }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: getThemeValue('colors.gradients.button') }}
                  >
                    <Shield className="w-5 h-5" style={{ color: getThemeValue('colors.primary.contrast') }} />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold mb-2" 
                      style={{ color: getThemeValue('components.detailedCard.accessSection.headingText') }}
                    >
                      Access Restricted
                    </h3>
                    <p className="text-gray-600 mb-4" 
                      style={{ color: getThemeValue('components.detailedCard.accessSection.bodyText') }}
                    >
                      This content is restricted. Please request access to view the full details and download materials.
                    </p>
                    <button
                      onClick={handleRequestAccess}
                      className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:shadow-md"
                      style={{ 
                        background: getThemeValue('colors.gradients.button'),
                        color: getThemeValue('colors.primary.contrast'),
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = getThemeValue('colors.gradients.buttonHover');
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = getThemeValue('colors.gradients.button');
                      }}
                    >
                      Request Access
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="border-t p-4 flex justify-between items-center text-xs h-[56px]"
          style={{ 
            background: getThemeValue('components.cardComponents.footer.bg'),
            borderColor: getThemeValue('components.cardComponents.footer.border'),
            color: getThemeValue('components.cardComponents.footer.text')
          }}
        >
          <div>
            Last updated: <span className="font-medium">{new Date(item.lastUpdated).toLocaleDateString('en-AU', { 
              day: '2-digit', 
              month: '2-digit', 
              year: 'numeric' 
            })}</span>
          </div>
          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium shadow-sm border"
            style={{
              background: getThemeValue('components.cardComponents.footer.versionBg'),
              borderColor: getThemeValue('components.cardComponents.footer.versionBorder'),
              color: getThemeValue('components.cardComponents.footer.versionText')
            }}
          >
            Version {item.version}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedCard;