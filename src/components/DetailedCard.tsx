import React, { useState, useEffect, useRef } from 'react';
import { X, FileText, Archive, Table, Presentation, Code, Globe, Lock, Shield } from 'lucide-react';
import { showSubmissionNotice } from './SubmissionPopup';
import { getThemeColors } from '../utils/themeUtils';
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

  // Use the centralized theme utility - focus on light mode for redesign
  const colors = getThemeColors(item.theme, false);

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
          </div>
        </div>
        
        {/* Scrollable Content */}
        <div 
          className="flex-1 overflow-y-scroll" 
          style={{ 
            height: `calc(100vh - 40px - ${headerHeight}px - 56px)`, // 56px is the footer height
            scrollbarGutter: 'stable',
            scrollbarWidth: 'thin'
          }}
        >
          <div className="p-6" style={{ paddingLeft: '40px', paddingRight: '40px' }}>
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

            {/* Materials Section */}
            <div className="mt-6 rounded-xl p-6 bg-white border border-gray-200 shadow-sm">
              <h3 className="text-gray-800 text-lg font-semibold mb-5 flex items-center">
                <div className={`w-1 h-5 ${colors.button} rounded-full mr-2`}></div>
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
                      className="bg-white rounded-lg border border-gray-200 shadow-sm transition-all duration-200"
                    >
                      <div className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors">
                        <Icon className={`w-5 h-5 ${
                          material.type === 'pdf' ? 'text-red-500' :
                          material.type === 'zip' ? 'text-yellow-500' :
                          material.type === 'xls' ? 'text-green-500' :
                          material.type === 'docx' ? 'text-blue-500' :
                          material.type === 'ppt' ? 'text-orange-500' :
                          material.type === 'yaml' ? 'text-purple-500' :
                          material.type === 'json' ? 'text-gray-500' :
                          'text-blue-400'
                        }`} />
                        <span className="text-sm text-gray-900 font-medium flex-grow">{material.title}</span>
                        <span className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-600">
                          {material.type.toUpperCase()}
                        </span>
                        <Lock className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Access Restricted Notice */}
            <div className="mt-6 rounded-xl overflow-hidden shadow-sm relative">
              <div className={`absolute inset-0 ${colors.lightBg} opacity-40 backdrop-blur-sm rounded-xl`}></div>
              <div className="relative p-6 border border-gray-200 rounded-xl">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colors.button} flex-shrink-0`}>
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Access Restricted
                    </h3>
                    <p className="text-gray-600 mb-4">
                      You currently have Level 1 access which provides limited information.
                      To view comprehensive details, documentation, and download materials,
                      please request Level 2 access.
                    </p>
                    <button
                      onClick={handleRequestAccess}
                      className={`px-4 py-2 ${colors.button} text-white rounded-lg shadow-sm hover:shadow-md 
                        transition-all duration-200 flex items-center text-sm font-medium`}
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Request Access
                    </button>
                  </div>
                </div>
              </div>
            </div>
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

export default DetailedCard;