import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CheckCircle } from 'lucide-react';

type Theme = 'Sales' | 'Delivery' | 'Quality Assurance';

// Create a function to show the notification
export function showSubmissionNotice(theme: Theme): Promise<void> {
  return new Promise((resolve) => {
    // Create a container element for the portal
    const container = document.createElement('div');
    container.id = 'submission-notice-container';
    document.body.appendChild(container);
    
    // Create a root using the modern createRoot API
    const root = createRoot(container);
    
    // Function to clean up the portal
    const cleanUp = () => {
      // Remove the portal container after animation
      const unmountDelay = 500; // short delay to allow exit animation
      setTimeout(() => {
        // Unmount using the modern API
        root.unmount();
        
        // Remove the container from the DOM
        if (document.body.contains(container)) {
          document.body.removeChild(container);
        }
        resolve();
      }, unmountDelay);
    };
    
    // Render the notification in the portal using the modern API
    root.render(<SubmissionPopup theme={theme} />);
    
    // Set a timeout to automatically close after 5 seconds
    setTimeout(cleanUp, 5000);
  });
}

interface SubmissionPopupProps {
  theme: Theme;
}

function SubmissionPopup({ theme }: SubmissionPopupProps) {
  const [countdown, setCountdown] = useState(5);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Use a separate effect for the progress bar to update more frequently
  useEffect(() => {
    const startTime = Date.now();
    const duration = 5000; // 5 seconds
    
    // Update progress more frequently than the countdown
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
    }, 50); // Update every 50ms for smoother animation
    
    return () => {
      clearInterval(progressInterval);
    };
  }, []);
  
  // Log when the component is mounted
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Set the exit animation when countdown reaches 0
  useEffect(() => {
    if (countdown <= 0) {
      setIsExiting(true);
    }
  }, [countdown]);

  const getThemeColors = (theme: Theme): ThemeColors => {
    switch (theme) {
      case 'Sales':
        return {
          lighter: 'bg-gradient-to-r from-emerald-50/40 to-teal-50/40 backdrop-blur-sm',
          text: 'text-emerald-800',
          border: 'border-emerald-200',
          button: 'bg-emerald-600'
        };
      case 'Delivery':
        return {
          lighter: 'bg-gradient-to-r from-blue-50/40 to-indigo-50/40 backdrop-blur-sm',
          text: 'text-blue-800',
          border: 'border-blue-200',
          button: 'bg-blue-600'
        };
      default: // Quality Assurance
        return {
          lighter: 'bg-gradient-to-r from-purple-50/40 to-fuchsia-50/40 backdrop-blur-sm',
          text: 'text-purple-800',
          border: 'border-purple-200',
          button: 'bg-purple-600'
        };
    }
  };

  const colors = getThemeColors(theme);

  return (
    <div className="fixed inset-0 z-[999] overflow-y-auto backdrop-blur-sm bg-black/30 flex items-center justify-center"
         style={{ 
           animation: isExiting ? 'fadeOut 0.5s forwards' : 'fadeIn 0.3s forwards',
         }}>
      <div className="max-w-md w-full mx-auto">
        <div className={`rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl bg-white/90 relative z-[1000] border ${colors.border}`}
             style={{ 
               animation: isExiting ? 'scaleOut 0.5s forwards' : 'scaleIn 0.3s forwards',
             }}>
          {/* Request Submitted Notice */}
          <div className={`p-6 ${colors.lighter} relative overflow-hidden`}>
            {/* Progress bar */}
            <div 
              className={`absolute bottom-0 left-0 h-1 ${colors.button}`}
              style={{ 
                width: `${progress}%`,
                transition: 'width 50ms linear'
              }} 
            />
            
            <div className="relative flex items-start gap-4">
              <CheckCircle className={`w-5 h-5 ${colors.text} mt-1 flex-shrink-0`} />
              <div className="flex-grow">
                <h3 className={`text-lg font-medium ${colors.text} mb-2`}>
                  Request Submitted
                </h3>
                <p className="text-gray-700 mb-4">
                  Your request for Level 2 access has been submitted. You will be notified once your request has been reviewed.
                </p>
                <p className="text-sm text-gray-500">
                  This window will close automatically in {Math.max(countdown, 0)} second{countdown !== 1 ? 's' : ''}...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ThemeColors {
  lighter: string;
  text: string;
  border: string;
  button: string;
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
  `;
  document.head.appendChild(style);
} 