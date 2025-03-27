import React, { useState, useEffect } from 'react';
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
  };
  onClose: () => void;
  onRequestAccess: (itemId: string) => void;
}

const DetailedCard: React.FC<DetailedCardProps> = ({ item, onClose, onRequestAccess }) => {
  const [requestSent, setRequestSent] = useState(false);

  const handleRequestAccess = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // First show the success state
    setRequestSent(true);
    
    // Then notify the parent component
    onRequestAccess(item.id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="min-h-screen px-4 text-center">
        <div className="fixed inset-0" onClick={onClose} />
        <div className="inline-block w-full max-w-xl my-8 text-left align-middle bg-white rounded-xl shadow-xl transition-all relative z-[51]">
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

          {!requestSent ? (
            <div className="p-6">
              <div className="max-w-2xl mx-auto">
                <p className="text-gray-600 mb-6">{item.shortDescription}</p>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="mt-4 mb-6">
                    <div className="text-sm text-gray-500 mb-2">Available Materials:</div>
                    <div className="space-y-2">
                      {item.materials.map((material, index) => (
                        <div key={index} className="flex items-center gap-2">
                          {material.type === 'pdf' && <FileText className="w-4 h-4 text-gray-600 flex-shrink-0" />}
                          {material.type === 'zip' && <Archive className="w-4 h-4 text-gray-600 flex-shrink-0" />}
                          {material.type === 'xls' && <Table className="w-4 h-4 text-gray-600 flex-shrink-0" />}
                          {material.type === 'docx' && <FileText className="w-4 h-4 text-gray-600 flex-shrink-0" />}
                          {material.type === 'ppt' && <Presentation className="w-4 h-4 text-gray-600 flex-shrink-0" />}
                          {material.type === 'yaml' && <Code className="w-4 h-4 text-gray-600 flex-shrink-0" />}
                          {material.type === 'json' && <Code className="w-4 h-4 text-gray-600 flex-shrink-0" />}
                          {material.type === 'html' && <Globe className="w-4 h-4 text-gray-600 flex-shrink-0" />}
                          <span className="text-sm text-gray-900 flex-grow">{material.title}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 flex-shrink-0">
                            {material.type.toUpperCase()}
                          </span>
                          <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags Section */}
                  <div className="flex flex-wrap gap-2 pt-4 mt-auto border-t">
                    {item.availableTags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Access Restricted Notice */}
                <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
                  <div className="flex items-start">
                    <Lock className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-medium text-amber-800">
                        Access Restricted
                      </h3>
                      <p className="mt-2 text-sm text-amber-700">
                        You currently have Level 1 access which provides limited information.
                        To view comprehensive details, documentation, and download materials,
                        please request Level 2 access.
                      </p>
                      <button
                        onClick={handleRequestAccess}
                        className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 flex items-center text-sm font-medium relative z-[52]"
                      >
                        Request Access
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 mt-6 border-t text-sm text-gray-500">
                  <span>Last updated: {item.lastUpdated}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center">
              <div className="max-w-md mx-auto">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Access Request Sent
                </h3>
                
                <p className="text-gray-600 mb-6">
                  Your request for Level 2 access to "{item.shortTitle}" has been submitted.
                  You will receive a notification once your request has been approved.
                </p>
                
                <div className="text-sm text-gray-500">
                  Closing automatically...
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailedCard; 