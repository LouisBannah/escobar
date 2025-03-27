import React, { useState } from 'react';
import { X, FileText, Archive, Table, Presentation, Code, Globe, Download } from 'lucide-react';

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
                    <h3 className="text-gray-900 font-medium mb-4">Detailed Description</h3>
                    <div className="prose prose-gray max-w-none">
                      {item.longDescription.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 text-gray-700">{paragraph}</p>
                      ))}
                    </div>
                  </div>
                  
                  {/* Business Value Section */}
                  <div className={`rounded-xl p-6 ${colors.lighter} border ${colors.border}`}>
                    <h3 className="text-gray-900 font-medium mb-4">Business Value</h3>
                    <div className="prose prose-gray max-w-none">
                      {item.businessValue.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 text-gray-700">{paragraph}</p>
                      ))}
                    </div>
                  </div>
                  
                  {/* Key Capabilities Section */}
                  <div className={`rounded-xl p-6 ${colors.lighter} border ${colors.border}`}>
                    <h3 className="text-gray-900 font-medium mb-4">Key Capabilities</h3>
                    <div className="prose prose-gray max-w-none">
                      {item.keyCapabilities.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 text-gray-700">{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Materials Tab */}
              {activeTab === 'Materials' && (
                <div className="space-y-6">
                  <p className="text-gray-600">All resources and materials available for this toolkit item.</p>
                  
                  <div className={`rounded-xl p-6 ${colors.lighter} border ${colors.border}`}>
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
                    <h3 className="text-gray-900 font-medium mb-4">Sample Usage</h3>
                    <div className="prose prose-gray max-w-none">
                      {item.selectedTools && item.selectedTools.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 text-gray-700">{paragraph}</p>
                      ))}
                      
                      {!item.selectedTools && (
                        <p className="text-gray-500 italic">No code examples available for this item.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Tab */}
              {activeTab === 'Contact' && (
                <div className="space-y-6">
                  <p className="text-gray-600">Contact information for support and questions.</p>
                  
                  <div className={`rounded-xl p-6 ${colors.lighter} border ${colors.border}`}>
                    <h3 className="text-gray-900 font-medium mb-4">Support</h3>
                    <p className="text-gray-700">
                      For questions or support regarding this toolkit item, please contact the team at:
                    </p>
                    <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                      <p className="font-medium text-gray-800">Toolkit Support Team</p>
                      <p className="text-gray-600">Email: toolkit-support@example.com</p>
                      <p className="text-gray-600">Internal Slack: #toolkit-support</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Footer with Last Updated and Version Information */}
              <div className="border-t border-gray-200 mt-6 pt-4 px-6 pb-4 flex justify-between items-center text-xs text-gray-500">
                <div>
                  Last updated: <span className="font-bold">{new Date(item.lastUpdated).toLocaleDateString('en-AU', { 
                    day: '2-digit', 
                    month: '2-digit', 
                    year: 'numeric' 
                  })}</span>
                </div>
                <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                  bg-white shadow-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
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

export default ExpandedCard;