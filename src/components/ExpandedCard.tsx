import React, { useState } from 'react';
import { X, Download, Eye } from 'lucide-react';

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
  };
  onClose: () => void;
  onViewPdf: (name: string, url: string) => void;
}

const ExpandedCard: React.FC<ExpandedCardProps> = ({ item, onClose, onViewPdf }) => {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Documentation' | 'Examples'>('Overview');
  const [pdfViewer, setPdfViewer] = useState<{ isOpen: boolean; materialName: string | null }>({
    isOpen: false,
    materialName: null
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="min-h-screen px-4 text-center">
        <div className="fixed inset-0" onClick={onClose} />
        <div className="inline-block w-full max-w-5xl my-8 text-left align-middle bg-white rounded-xl shadow-xl transition-all">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-3">
              <h2 className="text-xl font-semibold text-gray-900">{item.shortTitle}</h2>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                item.theme === 'Sales' 
                  ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20' 
                  : item.theme === 'Delivery'
                  ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20'
                  : 'bg-purple-50 text-purple-700 ring-1 ring-purple-600/20'
              }`}>
                {item.theme === 'Quality Assurance' ? 'QA' : item.theme}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="p-6">
            <div className="flex space-x-4 border-b mb-6">
              {['Overview', 'Documentation', 'Examples'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as 'Overview' | 'Documentation' | 'Examples')}
                  className={`pb-3 px-2 text-sm font-medium ${
                    activeTab === tab
                      ? 'text-emerald-600 border-b-2 border-emerald-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {activeTab === 'Overview' && (
                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-600 whitespace-pre-wrap">{item.longDescription}</p>
                  </section>

                  <section>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Business Value</h3>
                    <p className="text-gray-600 whitespace-pre-wrap">{item.businessValue}</p>
                  </section>

                  <section>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Key Capabilities</h3>
                    <p className="text-gray-600 whitespace-pre-wrap">{item.keyCapabilities}</p>
                  </section>

                  <div className="flex items-center justify-between pt-4 mt-6 border-t text-sm text-gray-500">
                    <span>Last updated: {item.lastUpdated}</span>
                  </div>
                </div>
              )}

              {activeTab === 'Documentation' && (
                <div className="space-y-8">
                  <section className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Available Documents</h3>
                    <div className="divide-y divide-gray-100">
                      {item.materials.map((material, index) => (
                        <div key={index} className="py-4 first:pt-0 last:pb-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-lg ${
                                item.theme === 'Sales' ? 'bg-emerald-50' 
                                : item.theme === 'Delivery' ? 'bg-blue-50' 
                                : 'bg-purple-50'
                              }`}>
                                {material.type === 'pdf' && <Eye className="w-5 h-5 text-gray-600" />}
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-gray-900">{material.title}</h4>
                                <p className="text-xs text-gray-500 mt-1">{material.type.toUpperCase()} Document</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                item.theme === 'Sales' ? 'bg-emerald-50 text-emerald-700'
                                : item.theme === 'Delivery' ? 'bg-blue-50 text-blue-700'
                                : 'bg-purple-50 text-purple-700'
                              }`}>
                                {material.type.toUpperCase()}
                              </span>
                              <div className="flex items-center space-x-2">
                                {material.type === 'pdf' && (
                                  <button
                                    onClick={() => setPdfViewer({ isOpen: true, materialName: material.title })}
                                    className={`inline-flex items-center px-3 py-1.5 border rounded-lg text-sm font-medium transition-colors ${
                                      item.theme === 'Sales' ? 'text-emerald-600 border-emerald-200 hover:bg-emerald-50'
                                      : item.theme === 'Delivery' ? 'text-blue-600 border-blue-200 hover:bg-blue-50'
                                      : 'text-purple-600 border-purple-200 hover:bg-purple-50'
                                    }`}
                                  >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View
                                  </button>
                                )}
                                <a
                                  href={material.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`inline-flex items-center px-3 py-1.5 border rounded-lg text-sm font-medium transition-colors ${
                                    item.theme === 'Sales' ? 'text-emerald-600 border-emerald-200 hover:bg-emerald-50'
                                    : item.theme === 'Delivery' ? 'text-blue-600 border-blue-200 hover:bg-blue-50'
                                    : 'text-purple-600 border-purple-200 hover:bg-purple-50'
                                  }`}
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {activeTab === 'Examples' && (
                <div className="text-center py-12">
                  <p className="text-gray-600">No examples available yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {pdfViewer.isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="min-h-screen px-4 text-center">
            <div className="fixed inset-0" onClick={() => setPdfViewer({ isOpen: false, materialName: null })} />
            <div className="inline-block w-full max-w-5xl my-8 text-left align-middle bg-white rounded-xl shadow-xl transition-all">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-medium text-gray-900">
                  {pdfViewer.materialName}
                </h3>
                <button
                  onClick={() => setPdfViewer({ isOpen: false, materialName: null })}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="h-[80vh] bg-gray-100">
                <iframe
                  src="/documents/10-page-sample.pdf"
                  className="w-full h-full rounded-b-xl"
                  title="PDF Viewer"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpandedCard; 