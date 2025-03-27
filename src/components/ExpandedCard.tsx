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
          light: 'bg-gradient-to-br from-emerald-50 to-teal-50',
          medium: 'bg-emerald-100',
          text: 'text-emerald-700',
          border: 'border-emerald-200',
          button: 'bg-emerald-600 hover:bg-emerald-700',
          tab: 'bg-emerald-600',
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
          tab: 'bg-blue-600',
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
          tab: 'bg-purple-600',
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
        <div className="inline-block w-full max-w-6xl my-8 text-left align-middle transition-all transform">
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
                  <div className={`rounded-xl p-8 ${colors.light} border ${colors.border} relative overflow-hidden`}>
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
                      <div className={`rounded-xl p-8 bg-white shadow-sm border border-gray-100 relative group 
                        hover:shadow-md transition-all duration-300`}>
                        <div className={`absolute inset-x-0 top-0 h-1 ${colors.banner} rounded-t-xl`} />
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
                                      className={`flex items-start gap-4 p-2 rounded-lg group/item
                                        hover:bg-gray-50/80 transition-all duration-200`}
                                    >
                                      <div className={`flex-shrink-0 w-5 h-5 rounded-full ${colors.medium} 
                                        flex items-center justify-center mt-1
                                        group-hover/item:scale-110 transition-transform duration-200`}
                                      >
                                        <div className={`w-1.5 h-1.5 rounded-full ${colors.button}`} />
                                      </div>
                                      <p className="text-gray-600 flex-1 leading-relaxed">
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

                      {/* Key Capabilities */}
                      <div className={`rounded-xl p-8 bg-white shadow-sm border border-gray-100 relative group 
                        hover:shadow-md transition-all duration-300`}>
                        <div className={`absolute inset-x-0 top-0 h-1 ${colors.banner} rounded-t-xl`} />
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

                    {/* Right Column - 5 columns wide */}
                    <div className="col-span-5 space-y-8">
                      {/* Business Value */}
                      <div className={`rounded-xl p-8 bg-white shadow-sm border border-gray-100 relative group 
                        hover:shadow-md transition-all duration-300`}>
                        <div className={`absolute inset-x-0 top-0 h-1 ${colors.banner} rounded-t-xl`} />
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
                              <p key={index} className="text-gray-600 leading-relaxed">
                                {paragraph}
                              </p>
                            );
                          })}
                        </div>
                      </div>

                      {/* Selected Tools */}
                      <div className={`rounded-xl p-8 bg-white shadow-sm border border-gray-100 relative group 
                        hover:shadow-md transition-all duration-300`}>
                        <div className={`absolute inset-x-0 top-0 h-1 ${colors.banner} rounded-t-xl`} />
                        <h3 className={`text-lg font-semibold mb-6 ${colors.text} flex items-center gap-2`}>
                          Selected Tools
                        </h3>
                        <div className="space-y-4">
                          {item.selectedTools.split('\n\n').map((paragraph, index) => {
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

                            // Check if this is a bullet point list
                            const points = paragraph
                              .split('\n')
                              .map(line => line.trim())
                              .filter(line => line.length > 0)
                              .map(line => line.replace(/^[•\-*]\s*/, ''));

                            return (
                              <div key={index} className="ml-4 space-y-2">
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
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'Documentation' && (
                <div className="space-y-4">
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
                          <div className="flex items-center gap-2">
                            {material.type === 'pdf' && (
                              <button
                                onClick={() => onViewPdf(material.title, material.url)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                title="View PDF"
                              >
                                <Eye className="w-4 h-4 text-gray-500" />
                              </button>
                            )}
                            <a
                              href={material.url}
                              download
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Download"
                            >
                              <Download className="w-4 h-4 text-gray-500" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Examples' && (
                <div className="space-y-4">
                  <p className="text-gray-600">Example content and use cases will be displayed here.</p>
                </div>
              )}

              {/* Footer with last updated */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedCard; 