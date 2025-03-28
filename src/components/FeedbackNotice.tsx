import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { MessageSquareHeart, CheckCircle } from 'lucide-react';

export function showFeedbackNotice(): Promise<void> {
  return new Promise((resolve) => {
    const container = document.createElement('div');
    container.id = 'feedback-notice-container';
    document.body.appendChild(container);
    
    const root = createRoot(container);
    
    const cleanUp = () => {
      const unmountDelay = 500;
      setTimeout(() => {
        root.unmount();
        if (document.body.contains(container)) {
          document.body.removeChild(container);
        }
        resolve();
      }, unmountDelay);
    };
    
    root.render(<FeedbackNotice />);
    setTimeout(cleanUp, 5000);
  });
}

function FeedbackNotice() {
  const [countdown, setCountdown] = useState(5);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const startTime = Date.now();
    const duration = 5000;
    
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
    }, 50);
    
    return () => clearInterval(progressInterval);
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    if (countdown <= 0) {
      setIsExiting(true);
    }
  }, [countdown]);

  return (
    <div 
      className="fixed inset-0 z-[999] overflow-y-auto backdrop-blur-sm bg-black/30 flex items-center justify-center"
      style={{ animation: isExiting ? 'fadeOut 0.5s forwards' : 'fadeIn 0.3s forwards' }}
    >
      <div className="max-w-md w-full mx-auto px-4">
        <div 
          className="rounded-lg shadow-lg overflow-hidden bg-white relative z-[1000] border border-gray-200"
          style={{ animation: isExiting ? 'scaleOut 0.5s forwards' : 'scaleIn 0.3s forwards' }}
        >
          {/* Gradient Banner */}
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
          
          {/* Content */}
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="success-circle flex-shrink-0 mt-1 bg-emerald-100 text-emerald-600">
                <CheckCircle className="w-5 h-5" />
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Thank You for Your Feedback!
                </h3>
                <p className="text-gray-600 mb-4">
                  We appreciate your input to help improve our toolkit.
                </p>
                <p className="text-sm text-gray-500">
                  This window will close automatically in {Math.max(countdown, 0)} second{countdown !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div 
            className="absolute bottom-0 left-0 h-1 bg-emerald-500"
            style={{ 
              width: `${progress}%`,
              transition: 'width 50ms linear'
            }} 
          />
        </div>
      </div>
    </div>
  );
}

// Add CSS animations
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
    
    @keyframes scaleIn {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    
    @keyframes scaleOut {
      from { transform: scale(1); opacity: 1; }
      to { transform: scale(0.95); opacity: 0; }
    }

    /* Success icon styling */
    .success-circle {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;
  document.head.appendChild(style);
} 