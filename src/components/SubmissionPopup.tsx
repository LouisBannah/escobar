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
    root.render(<SubmissionPopup />);
    
    // Set a timeout to automatically close after 5 seconds
    setTimeout(cleanUp, 5000);
  });
}

interface SubmissionPopupProps {}

function SubmissionPopup({}: SubmissionPopupProps) {
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

  return (
    <div 
      className="fixed inset-0 z-[999] overflow-y-auto backdrop-blur-sm bg-black/30 flex items-center justify-center"
      style={{ animation: isExiting ? 'fadeOut 0.5s forwards' : 'fadeIn 0.3s forwards' }}
    >
      <div className="max-w-md w-full mx-auto">
        <div 
          className="rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl bg-white relative z-[1000] border border-gray-100 shadow-[0_0_20px_rgba(0,0,0,0.08)]"
          style={{ animation: isExiting ? 'scaleOut 0.5s forwards' : 'scaleIn 0.3s forwards' }}
        >
          <div className="flex flex-col items-center p-6">
            {/* Success animation at the top with proper spacing */}
            <div className="mb-5">
              <div className="success-circle">
                <div className="success-check"></div>
              </div>
            </div>
            
            {/* Content with proper spacing */}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Request Submitted
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Your request for Level 2 access has been submitted. You will be notified once your request has been reviewed.
              </p>
              <p className="text-sm text-gray-500">
                This window will close automatically in {Math.max(countdown, 0)} second{countdown !== 1 ? 's' : ''}
              </p>
            </div>
            
            {/* Progress bar */}
            <div 
              className="absolute bottom-0 left-0 h-1 bg-green-500"
              style={{ 
                width: `${progress}%`,
                transition: 'width 50ms linear'
              }} 
            />
          </div>
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

    /* Success animation */
    .success-circle {
      width: 60px;
      height: 60px;
      background-color: #10B981;
      border-radius: 50%;
      position: relative;
      transform: scale(0);
      animation: success-circle-animation 0.5s ease-in-out forwards;
    }
    
    @keyframes success-circle-animation {
      0% { transform: scale(0); }
      50% { transform: scale(1.1); }
      60% { transform: scale(0.9); }
      100% { transform: scale(1); }
    }
    
    .success-check {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      width: 30px;
      height: 15px;
      border-bottom: 4px solid white;
      border-left: 4px solid white;
      transform-origin: center;
      transform: translate(-50%, -70%) rotate(-45deg) scale(0);
      animation: success-check-animation 0.5s ease-in-out 0.3s forwards;
    }
    
    @keyframes success-check-animation {
      0% { transform: translate(-50%, -70%) rotate(-45deg) scale(0); }
      100% { transform: translate(-50%, -70%) rotate(-45deg) scale(1); }
    }
  `;
  document.head.appendChild(style);
} 