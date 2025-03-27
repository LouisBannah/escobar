import React, { useState } from 'react';
import { X, FileText, Archive, Table, Presentation, Code, Globe, Lock, CheckCircle } from 'lucide-react';

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
  const [requestSent, setRequestSent] = useState(false);

  const handleRequestAccess = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setRequestSent(true);
    onRequestAccess(item.id);
  };

  const getThemeColors = (theme: string) => {
    switch (theme) {
      case 'Sales':
        return {
          light: 'bg-gradient-to-br from-emerald-50 to-teal-50',
          medium: 'bg-emerald-100',
          text: 'text-emerald-700',
          border: 'border-emerald-200',
          button: 'bg-emerald-600 hover:bg-emerald-700',
          success: 'bg-emerald-50',
          banner: 'bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400'
        };
      case 'Delivery':
        return {
          light: 'bg-gradient-to-br from-blue-50 to-indigo-50',
          medium: 'bg-blue-100',
          text: 'text-blue-700',
          border: 'border-blue-200',
          button: 'bg-blue-600 hover:bg-blue-700',
          success: 'bg-blue-50',
          banner: 'bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-400'
        };
      default: // Quality Assurance
        return {
          light: 'bg-gradient-to-br from-purple-50 to-fuchsia-50',
          medium: 'bg-purple-100',
          text: 'text-purple-700',
          border: 'border-purple-200',
          button: 'bg-purple-600 hover:bg-purple-700',
          success: 'bg-purple-50',
          banner: 'bg-gradient-to-r from-purple-400 via-fuchsia-500 to-purple-400'
        };
    }
  };

  const colors = getThemeColors(item.theme);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm bg-black/30">
      <div className="min-h-screen px-4 text-center">
        <div className="fixed inset-0" onClick={onClose} />
        <div className="inline-block w-full max-w-3xl my-8 text-left align-middle transition-all transform">
          <div className={`rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl bg-white/90 relative z-[51] border ${colors.border}`}>
            {/* Gradient Banner */}
            <div className={`h-3 ${colors.banner}`} />
            
            {/* Header */}
            <div className={`p-6 ${colors.light} border-b ${colors.border}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold text-gray-800">{item.shortTitle}</h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors.medium} ${colors.text}`}>
                      {item.theme === 'Quality Assurance' ? 'QA' : item.theme}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-700 shadow-sm border border-gray-300">
                      {item.category}
                    </span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-black/5 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {!requestSent ? (
              <div className="p-6 space-y-6">
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

                {/* Materials Section */}
                <div className={`rounded-xl p-6 ${colors.light}`}>
                  <h3 className="text-gray-900 font-medium mb-4">Available Materials</h3>
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
                        <Lock className="w-4 h-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Access Restricted Notice */}
                <div className={`rounded-xl p-6 bg-amber-50/50 border border-amber-200/70 backdrop-blur-sm`}>
                  <div className="flex items-start gap-4">
                    <Lock className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                    <div className="flex-grow">
                      <h3 className="text-lg font-medium text-amber-800 mb-2">
                        Access Restricted
                      </h3>
                      <p className="text-amber-700 mb-4">
                        You currently have Level 1 access which provides limited information.
                        To view comprehensive details, documentation, and download materials,
                        please request Level 2 access.
                      </p>
                      <button
                        onClick={handleRequestAccess}
                        className={`px-4 py-2 ${colors.button} text-white rounded-lg shadow-sm hover:shadow-md 
                          transition-all duration-200 flex items-center text-sm font-medium relative z-[52]`}
                      >
                        Request Access
                      </button>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className={`flex items-center gap-2 text-sm text-gray-500
                    group cursor-default hover:text-gray-700 transition-colors duration-200`}>
                    <svg 
                      className="w-4 h-4 group-hover:text-gray-700 transition-colors duration-200" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1.5} 
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                    <span>Last updated {item.lastUpdated}</span>
                    <div className={`ml-auto px-3 py-1 rounded-full text-xs font-medium
                      bg-gray-50 text-gray-600 group-hover:bg-gray-100 transition-colors duration-200`}>
                      Version {item.version}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="max-w-md mx-auto">
                  <div className="mb-6 flex justify-center">
                    <div className={`w-20 h-20 ${colors.success} rounded-full flex items-center justify-center`}>
                      <CheckCircle className={`w-10 h-10 ${colors.text}`} />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    Access Request Sent
                  </h3>
                  
                  <p className="text-gray-600 text-lg mb-6">
                    Your request for Level 2 access to "{item.shortTitle}" has been submitted.
                    You will receive a notification once your request has been approved.
                  </p>
                  
                  <div className="text-sm text-gray-500 animate-pulse">
                    Closing automatically...
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedCard; 