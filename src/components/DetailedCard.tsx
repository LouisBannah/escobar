import React, { useState } from 'react';
import { X, FileText, Archive, Table, Presentation, Code, Globe, Lock } from 'lucide-react';
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

  // Use the centralized theme utility
  const colors = getThemeColors(item.theme, isDarkMode);

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
            </div>

            <div className="p-6 space-y-6">
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

              {/* Materials Section */}
              <div className={`rounded-xl p-6 ${colors.contentBox} border ${colors.border}`}>
                <h3 className={`${colors.boxTitle} text-lg font-semibold mb-5 flex items-center`}>
                  <div className={`w-1 h-5 ${colors.button} rounded-full mr-2`}></div>
                  Available Materials
                </h3>
                <div className="space-y-3">
                  {item.materials.map((material, index) => (
                    <div 
                      key={index} 
                      className={`${colors.materialBoxBackground} rounded-lg border ${colors.materialBoxBorder} transition-all duration-200`}
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
                        <Lock className={`w-4 h-4 ${colors.materialBoxText} opacity-50`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Access Restricted Notice */}
              <div className={`rounded-xl p-6 ${colors.success} border ${colors.border} backdrop-blur-sm relative overflow-hidden group hover:shadow-md transition-all duration-300`}>
                <div className="relative flex items-start gap-4">
                  <Lock className={`w-5 h-5 ${colors.text} mt-1 flex-shrink-0 opacity-80`} />
                  <div className="flex-grow">
                    <h3 className={`text-lg font-semibold ${colors.text} mb-2`}>
                      Access Restricted
                    </h3>
                    <p className={`${colors.text} opacity-80 mb-4`}>
                      You currently have Level 1 access which provides limited information.
                      To view comprehensive details, documentation, and download materials,
                      please request Level 2 access.
                    </p>
                    <button
                      onClick={handleRequestAccess}
                      className={`px-4 py-2 ${colors.tabButton} text-white rounded-lg shadow-sm hover:shadow-md 
                        transition-all duration-200 flex items-center text-sm font-medium relative z-[52]`}
                    >
                      Request Access
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Footer with Last Updated and Version Information */}
              <div className={`border-t ${colors.border} mt-6 pt-4 px-6 pb-4 flex justify-between items-center text-xs ${colors.text} opacity-70`}>
                <div>
                  Last updated: <span className="font-bold">{new Date(item.lastUpdated).toLocaleDateString('en-AU', { 
                    day: '2-digit', 
                    month: '2-digit', 
                    year: 'numeric' 
                  })}</span>
                </div>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                  ${colors.contentBox} ${colors.text} border ${colors.border} hover:opacity-80 transition-colors`}>
                  Version {item.version}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedCard;