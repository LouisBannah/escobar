import React from 'react';
import { X, Download } from 'lucide-react';

interface PDFViewerProps {
  url: string;
  title: string;
  onClose: () => void;
  onDownload: () => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ url, title, onClose, onDownload }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden backdrop-blur-sm bg-black/30">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0" onClick={onClose} />
        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
          <div className="w-screen max-w-4xl">
            <div className="h-full flex flex-col bg-white shadow-xl">
              {/* Header */}
              <div className="px-4 py-6 sm:px-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">{title}</h2>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={onDownload}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </button>
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>

              {/* PDF Viewer */}
              <div className="flex-1 overflow-hidden">
                <iframe
                  src={`${url}#toolbar=0`}
                  className="w-full h-full"
                  title={title}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer; 