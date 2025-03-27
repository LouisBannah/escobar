import React, { useState } from 'react';
import { X, AlertCircle, CheckCircle } from 'lucide-react';
import { Icon } from '@mdi/react';
import { mdiLockOutline } from '@mdi/js';

interface AccessChallengeProps {
  onClose: () => void;
  onBypass: () => void;
  onRequestAccess: () => void;
}

const AccessChallenge: React.FC<AccessChallengeProps> = ({
  onClose,
  onBypass,
  onRequestAccess,
}) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRequestAccess = () => {
    setShowSuccess(true);
    setTimeout(() => {
      onRequestAccess();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 relative">
        {/* Subtle bypass button with lock icon */}
        <button
          onClick={onBypass}
          className="absolute top-2 right-2 p-1.5 text-gray-300 hover:text-gray-400 transition-colors"
          aria-label="Admin bypass"
        >
          <Icon path={mdiLockOutline} size={0.8} />
        </button>
        
        <div className="p-6">
          {showSuccess ? (
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Access Request Submitted
              </h3>
              <p className="text-gray-600">
                Thank you for your interest. The Converge Team will be in touch shortly.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-6 h-6 text-amber-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Access Required</h3>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  Unfortunately, you don't have the required permissions to access this material. 
                  Please contact the Converge Team for further details on how to gain access.
                </p>
                <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                  <p className="text-sm text-amber-800">
                    This content contains sensitive information and requires proper authorization.
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Close
                </button>
                <button
                  onClick={handleRequestAccess}
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
                >
                  Request Access
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccessChallenge; 