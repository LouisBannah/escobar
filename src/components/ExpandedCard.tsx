import React, { useState } from 'react';
import { X, Download, Eye, FileText, Archive, Table, Presentation, Code, Globe } from 'lucide-react';

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
  onViewPdf: (name: string, url: string) => void;
}

const ExpandedCard: React.FC<ExpandedCardProps> = ({ item, onClose, onViewPdf }) => {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Documentation' | 'Examples'>('Overview');

  const getThemeColors = (theme: string) => {
    switch (theme) {
      case 'Sales':
        return {
          light: 'bg-gradient-to-br from-emerald-50/90 to-teal-50/90 backdrop-blur-sm',
          medium: 'bg-gradient-to-br from-emerald-100 to-teal-100',
          text: 'text-emerald-700',
          border: 'border-emerald-200',
          button: 'bg-emerald-600 hover:bg-emerald-700',
          tab: 'bg-emerald-600',
          success: 'bg-emerald-50',
          banner: 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-300 via-teal-400 to-emerald-500 animate-gradient'
        };
      case 'Delivery':
        return {
          light: 'bg-gradient-to-br from-blue-50/90 to-indigo-50/90 backdrop-blur-sm',
          medium: 'bg-gradient-to-br from-blue-100 to-indigo-100',
          text: 'text-blue-700',
          border: 'border-blue-200',
          button: 'bg-blue-600 hover:bg-blue-700',
          tab: 'bg-blue-600',
          success: 'bg-blue-50',
          banner: 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-300 via-indigo-400 to-blue-500 animate-gradient'
        };
      default: // Quality Assurance
        return {
          light: 'bg-gradient-to-br from-purple-50/90 to-fuchsia-50/90 backdrop-blur-sm',
          medium: 'bg-gradient-to-br from-purple-100 to-fuchsia-100',
          text: 'text-purple-700',
          border: 'border-purple-200',
          button: 'bg-purple-600 hover:bg-purple-700',
          tab: 'bg-purple-600',
          success: 'bg-purple-50',
          banner: 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-300 via-fuchsia-400 to-purple-500 animate-gradient'
        };
    }
  };

  const colors = getThemeColors(item.theme);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm bg-black/30">
      <div className="min-h-screen px-4 text-center">
        <div className="fixed inset-0" onClick={onClose} />
        <div className="inline-block w-full max-w-6xl my-8 text-left align-middle transition-all transform">
          <div className={`rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl bg-white/90 relative z-[51] border ${colors.border}`}>
            {/* Gradient Banner */}
            <div className={`h-4 ${colors.banner} transition-all duration-500 ease-in-out hover:h-5`} />
            
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

              {/* Tabs */}
              <div className="flex space-x-1 mt-6">
                {(['Overview', 'Documentation', 'Examples'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeTab === tab
                        ? `${colors.tab} text-white shadow-sm`
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {activeTab === 'Overview' && (
                <>
                  {/* Tags Section - Add directly after the tabs but before the content grid */}
                  <div className="flex flex-wrap gap-2 py-2">
                    {item.availableTags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium 
                          bg-white shadow-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Hero Section */}
                  <div className={`rounded-xl p-8 ${colors.light} border ${colors.border} relative overflow-hidden group hover:shadow-md transition-all duration-300`}>
                    <div className={`absolute inset-x-0 top-0 h-1 ${colors.banner} rounded-t-xl`} />
                    {/* Decorative Elements */}
                    <div className={`absolute top-0 right-0 w-64 h-64 -mr-32 -mt-32 rounded-full ${colors.medium} opacity-20 blur-3xl`} />
                    <div className={`absolute bottom-0 left-0 w-48 h-48 -ml-24 -mb-24 rounded-full ${colors.medium} opacity-20 blur-3xl`} />
                    
                    {/* Content */}
                    <div className="relative">
                      <p className="text-gray-600 text-xl leading-relaxed mb-6">{item.shortDescription}</p>
                      
                      {/* Tags with enhanced styling */}
                      <div className="flex flex-wrap gap-2">
                        {item.availableTags.map((tag) => (
                          <span
                            key={tag}
                            className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium 
                              ${colors.medium} ${colors.text} ring-1 ring-gray-200/50 shadow-sm 
                              hover:scale-105 transition-all duration-200 cursor-default`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Main Content Grid */}
                  <div className="grid grid-cols-12 gap-8">
                    {/* Left Column - 7 columns wide */}
                    <div className="col-span-7 space-y-8">
                      {/* Long Description */}
                      <div className={`rounded-xl p-8 ${colors.light} border ${colors.border} relative overflow-hidden group hover:shadow-md transition-all duration-300`}>
                        <div className={`absolute inset-x-0 top-0 h-1 ${colors.banner} rounded-t-xl`} />
                        {/* Decorative Elements */}
                        <div className={`absolute top-0 right-0 w-64 h-64 -mr-32 -mt-32 rounded-full ${colors.medium} opacity-20 blur-3xl`} />
                        <div className={`absolute bottom-0 left-0 w-48 h-48 -ml-24 -mb-24 rounded-full ${colors.medium} opacity-20 blur-3xl`} />
                        
                        <div className="relative">
                          <h3 className={`text-lg font-semibold mb-6 ${colors.text} flex items-center gap-2`}>
                            Description
                          </h3>
                          <div className="prose prose-gray max-w-none">
                            {item.longDescription.split('\n\n').map((paragraph, index) => {
                              // Check if this is a section header (e.g., "Architectural Components:")
                              if (paragraph.endsWith(':')) {
                                return (
                                  <div key={index} className="mt-8 mb-4">
                                    <h4 className={`text-lg font-medium ${colors.text}`}>
                                      {paragraph.slice(0, -1)}
                                    </h4>
                                  </div>
                                );
                              }

                              // Check if this is a numbered section (e.g., "1. API Gateway Layer")
                              const numberedSectionMatch = paragraph.match(/^(\d+)\.\s+(.+)$/);
                              if (numberedSectionMatch) {
                                return (
                                  <div key={index} className="ml-4 mt-6">
                                    <h5 className="text-gray-900 font-medium flex items-center gap-3 mb-2">
                                      <span className={`flex-shrink-0 w-7 h-7 rounded-full ${colors.medium} 
                                        flex items-center justify-center text-sm font-semibold ${colors.text}`}
                                      >
                                        {numberedSectionMatch[1]}
                                      </span>
                                      {numberedSectionMatch[2]}
                                    </h5>
                                  </div>
                                );
                              }

                              // Check if this is a bullet point
                              const isBulletPoint = paragraph.trim().startsWith('•');
                              if (isBulletPoint) {
                                const points = paragraph
                                  .split('\n')
                                  .map(line => line.trim())
                                  .filter(line => line.length > 0)
                                  .map(line => line.replace(/^[•\-*]\s*/, ''));

                                return (
                                  <div key={index} className="ml-10 space-y-2 my-2">
                                    {points.map((point, idx) => (
                                      <div key={idx} 
                                        className={`flex items-start gap-3 p-2 rounded-lg group/item
                                          hover:bg-gray-50 transition-all duration-200`}
                                      >
                                        <div className={`flex-shrink-0 w-5 h-5 rounded-full ${colors.medium} 
                                          flex items-center justify-center mt-1
                                          group-hover/item:scale-110 transition-transform duration-200`}
                                        >
                                          <div className={`w-1.5 h-1.5 rounded-full ${colors.button}`} />
                                        </div>
                                        <p className="text-gray-700 flex-1 leading-relaxed">
                                          {point}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                );
                              }

                              // Regular paragraph
                              return (
                                <p key={index} className="text-gray-600 mb-4 last:mb-0 leading-relaxed">
                                  {paragraph}
                                </p>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Key Capabilities */}
                      <div className={`rounded-xl p-8 ${colors.light} border ${colors.border} relative overflow-hidden group hover:shadow-md transition-all duration-300`}>
                        <div className={`absolute inset-x-0 top-0 h-1 ${colors.banner} rounded-t-xl`} />
                        {/* Decorative Elements */}
                        <div className={`absolute top-0 right-0 w-64 h-64 -mr-32 -mt-32 rounded-full ${colors.medium} opacity-20 blur-3xl`} />
                        <div className={`absolute bottom-0 left-0 w-48 h-48 -ml-24 -mb-24 rounded-full ${colors.medium} opacity-20 blur-3xl`} />
                        
                        <div className="relative">
                          <h3 className={`text-lg font-semibold mb-6 ${colors.text} flex items-center gap-2`}>
                            Key Capabilities
                          </h3>
                          <div className="grid grid-cols-1 gap-3">
                            {item.keyCapabilities.split('\n')
                              .map(cap => cap.trim())
                              .filter(cap => cap.length > 0)
                              .map((capability, index) => (
                              <div key={index} 
                                className={`flex items-start gap-4 p-3 rounded-lg bg-gray-50/50 
                                  hover:bg-gray-50 transition-all duration-200 group/item
                                  border border-gray-100/50 hover:border-gray-200`}
                              >
                                <div className={`flex-shrink-0 w-6 h-6 rounded-full ${colors.medium} 
                                  flex items-center justify-center mt-1
                                  group-hover/item:scale-110 transition-transform duration-200`}
                                >
                                  <div className={`w-1.5 h-1.5 rounded-full ${colors.button}`} />
                                </div>
                                <p className="text-gray-700 flex-1 leading-relaxed">
                                  {capability.replace(/^[•\-*]\s*/, '')}
                                </p>
                              </div>
                          ))}
                          </div>
                        </div>
                      </div>

                      {/* Business Value */}
                      <div className={`rounded-xl p-8 ${colors.light} border ${colors.border} relative overflow-hidden group hover:shadow-md transition-all duration-300`}>
                        <div className={`absolute inset-x-0 top-0 h-1 ${colors.banner} rounded-t-xl`} />
                        {/* Decorative Elements */}
                        <div className={`absolute top-0 right-0 w-64 h-64 -mr-32 -mt-32 rounded-full ${colors.medium} opacity-20 blur-3xl`} />
                        <div className={`absolute bottom-0 left-0 w-48 h-48 -ml-24 -mb-24 rounded-full ${colors.medium} opacity-20 blur-3xl`} />
                        
                        <div className="relative">
                          <h3 className={`text-lg font-semibold mb-6 ${colors.text} flex items-center gap-2`}>
                            Business Value
                          </h3>
                          <div className="space-y-4">
                            {item.businessValue.split('\n\n').map((paragraph, index) => {
                              // Check if this is a section header
                              if (paragraph.endsWith(':')) {
                                return (
                                  <div key={index} className="mt-6 mb-2">
                                    <h4 className={`text-base font-medium ${colors.text}`}>
                                      {paragraph.slice(0, -1)}
                                    </h4>
                                  </div>
                                );
                              }

                              // Check if this is a numbered section
                              const numberedSectionMatch = paragraph.match(/^(\d+)\.\s+(.+)$/);
                              if (numberedSectionMatch) {
                                return (
                                  <div key={index} className="ml-4 mt-4">
                                    <h5 className="text-gray-900 font-medium flex items-center gap-3 mb-2">
                                      <span className={`flex-shrink-0 w-6 h-6 rounded-full ${colors.medium} 
                                        flex items-center justify-center text-sm font-semibold ${colors.text}`}
                                      >
                                        {numberedSectionMatch[1]}
                                      </span>
                                      {numberedSectionMatch[2]}
                                    </h5>
                                  </div>
                                );
                              }

                              // Check if this is a bullet point list
                              const isBulletList = paragraph.trim().startsWith('•');
                              if (isBulletList) {
                                const points = paragraph
                                  .split('\n')
                                  .map(line => line.trim())
                                  .filter(line => line.length > 0)
                                  .map(line => line.replace(/^[•\-*]\s*/, ''));

                                return (
                                  <div key={index} className="ml-8 space-y-2">
                                    {points.map((point, idx) => (
                                      <div key={idx} 
                                        className={`flex items-start gap-3 p-2 rounded-lg group/item
                                          hover:bg-gray-50 transition-all duration-200`}
                                      >
                                        <div className={`flex-shrink-0 w-5 h-5 rounded-full ${colors.medium} 
                                          flex items-center justify-center mt-1
                                          group-hover/item:scale-110 transition-transform duration-200`}
                                        >
                                          <div className={`w-1.5 h-1.5 rounded-full ${colors.button}`} />
                                        </div>
                                        <p className="text-gray-700 flex-1 leading-relaxed">
                                          {point}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                );
                              }

                              // Regular paragraph
                              return (
                                <p key={index} className="text-gray-600 mb-4 last:mb-0 leading-relaxed">
                                  {paragraph}
                                </p>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedCard;