import React, { useState, useRef } from 'react';
import { ChevronLeft, Copy, Download, ExternalLink, User, Settings, LogOut, MessageSquare, Lock, CheckCircle, X } from 'lucide-react';
import { toolkitItems } from '../data/toolkitItems';
import AccessChallenge from './AccessChallenge';
import FeedbackModal from './FeedbackModal';

interface ToolkitItemDetailProps {
  itemId: string;
  onBack: () => void;
  onLogout: () => void;
}

const ToolkitItemDetail: React.FC<ToolkitItemDetailProps> = ({ itemId, onBack, onLogout }) => {
  const [showAccessChallenge, setShowAccessChallenge] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'Overview' | 'Documentation' | 'Examples' | 'Resources'>('Overview');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const item = toolkitItems.find(i => i.id === itemId);
  if (!item) return null;

  if (!hasAccess) {
    return (
      <div className="flex flex-col h-full bg-white">
        <div className="border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft size={20} />
                <span>Back</span>
              </button>
              <button
                onClick={() => setShowFeedback(true)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-emerald-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <MessageSquare size={20} />
                <span>Feedback</span>
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{item.shortTitle}</h1>
            <p className="text-lg text-gray-600 mb-8">{item.shortDescription}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Available Materials</h3>
                <ul className="space-y-4">
                  {item.materials.map((material, index) => {
                    const [name, format] = material.split('(');
                    return (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="px-2 py-1 text-xs rounded bg-emerald-100 text-emerald-700 mt-0.5">
                          {format.replace(')', '')}
                        </span>
                        <span className="text-gray-700 font-medium">
                          {name.trim()}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Access Information</h3>
                <p className="text-gray-600 mb-4">
                  This toolkit provides valuable insights into our banking solutions. 
                  Access is restricted to authorized personnel only.
                </p>
                <button
                  onClick={() => setShowAccessChallenge(true)}
                  className="w-full px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
                >
                  <Lock className="w-4 h-4 inline-block mr-2" />
                  Request Access
                </button>
              </div>
            </div>
          </div>
        </div>

        {showAccessChallenge && (
          <AccessChallenge
            onClose={() => setShowAccessChallenge(false)}
            onBypass={() => setHasAccess(true)}
            onRequestAccess={() => {
              setShowAccessChallenge(false);
              onBack();
            }}
          />
        )}

        <FeedbackModal 
          isOpen={showFeedback}
          onClose={() => setShowFeedback(false)}
          title="Tool Feedback"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft size={20} />
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowFeedback(true)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-emerald-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <MessageSquare size={20} />
                <span>Feedback</span>
              </button>
              <div className="relative" ref={profileMenuRef}>
                <button
                  className="p-2 hover:bg-gray-100 rounded-full relative"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  <img
                    src="/documents/pic.png"
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </button>
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-1 border z-50">
                    <div className="px-4 py-3 border-b">
                      <div className="text-sm font-medium text-gray-900">Joep Arends</div>
                      <div className="text-xs text-gray-500">joep.arends@deloitte.nl</div>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          Level 2 Access
                        </span>
                      </div>
                    </div>
                    <div className="py-1">
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <User className="w-4 h-4 mr-3" />
                        Your Profile
                      </button>
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Settings className="w-4 h-4 mr-3" />
                        Settings
                      </button>
                    </div>
                    <div className="border-t">
                      <button
                        onClick={onLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <nav className="mb-8">
          <ul className="flex space-x-6 text-sm">
            {(['Overview', 'Documentation', 'Examples', 'Resources'] as const).map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`text-gray-600 hover:text-gray-900 hover:underline ${
                    activeTab === tab ? 'font-semibold text-emerald-600' : ''
                  }`}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="max-w-4xl">
          {activeTab === 'Overview' && (
            <div className="prose max-w-none">
              <h1 className="text-3xl font-bold text-gray-900">{item.shortTitle}</h1>
              <p className="text-lg text-gray-600 mb-8">{item.shortDescription}</p>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-gray-800">Description</h2>
                  <div className="mt-4 text-gray-600 space-y-4">
                    {item.longDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-800">Business Value</h2>
                  <div className="mt-4 text-gray-600 space-y-4">
                    {item.businessValue.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-800">Key Capabilities</h2>
                  <div className="mt-4 text-gray-600">
                    {item.keyCapabilities.split('\n').map((capability, index) => (
                      <div key={index} className="flex items-start mb-2">
                        {capability.startsWith('•') ? (
                          <>
                            <span className="text-emerald-500 mr-2">{capability.substring(0, 1)}</span>
                            <span>{capability.substring(2)}</span>
                          </>
                        ) : (
                          <span>{capability}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-800">Available Materials</h2>
                  <div className="mt-4 space-y-4">
                    {item.materials.map((material, index) => {
                      const [name, format] = material.split('(');
                      return (
                        <div 
                          key={index} 
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                              {format.replace(')', '')}
                            </span>
                            <span className="text-gray-900 font-medium">{name.trim()}</span>
                          </div>
                          <div className="flex space-x-2">
                            <button 
                              className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-gray-100 rounded-full"
                              title="Download"
                            >
                              <Download size={20} />
                            </button>
                            <button 
                              className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-gray-100 rounded-full"
                              title="Copy"
                            >
                              <Copy size={20} />
                            </button>
                            <button 
                              className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-gray-100 rounded-full"
                              title="Open"
                            >
                              <ExternalLink size={20} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>
            </div>
          )}
        </div>
      </div>

      <FeedbackModal 
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        title="Tool Feedback"
      />
    </div>
  );
};

export default ToolkitItemDetail; 