import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

// Separate the FeedbackPopup component definition
const FeedbackPopup: React.FC = () => {
  const [countdown, setCountdown] = useState(3);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Use a separate effect for the progress bar to update more frequently
  useEffect(() => {
    const startTime = Date.now();
    const duration = 3000; // 3 seconds
    
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
  
  // Update countdown timer
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
            {/* Heart animation at the top */}
            <div className="mb-5">
              <div className="feedback-circle">
                <div className="feedback-heart"></div>
              </div>
            </div>
            
            {/* Content with proper spacing */}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Thank You for Your Feedback!
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We appreciate your input to help improve our toolkit.
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
};

// Create a function to show the feedback notification
export function showFeedbackNotice(): Promise<void> {
  return new Promise((resolve) => {
    // Create a container element for the portal
    const container = document.createElement('div');
    container.id = 'feedback-notice-container';
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
    root.render(<FeedbackPopup />);
    
    // Set a timeout to automatically close after 3 seconds
    setTimeout(cleanUp, 3000);
  });
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

    /* Feedback circle with heart animation */
    .feedback-circle {
      width: 60px;
      height: 60px;
      background-color: #10B981;
      border-radius: 50%;
      position: relative;
      transform: scale(0);
      animation: feedback-circle-animation 0.5s ease-in-out forwards;
    }
    
    @keyframes feedback-circle-animation {
      0% { transform: scale(0); }
      50% { transform: scale(1.1); }
      60% { transform: scale(0.9); }
      100% { transform: scale(1); }
    }
    
    /* Heart shape using CSS */
    .feedback-heart {
      background-color: white;
      display: inline-block;
      height: 22px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0) rotate(45deg);
      width: 22px;
      animation: feedback-heart-animation 0.5s ease-in-out 0.3s forwards;
    }
    
    .feedback-heart:before,
    .feedback-heart:after {
      content: "";
      background-color: white;
      border-radius: 50%;
      height: 22px;
      position: absolute;
      width: 22px;
    }
    
    .feedback-heart:before {
      top: -11px;
      left: 0;
    }
    
    .feedback-heart:after {
      left: -11px;
      top: 0;
    }
    
    @keyframes feedback-heart-animation {
      0% { transform: translate(-50%, -50%) scale(0) rotate(45deg); }
      50% { transform: translate(-50%, -50%) scale(1.1) rotate(45deg); }
      100% { transform: translate(-50%, -50%) scale(1) rotate(45deg); }
    }
  `;
  document.head.appendChild(style);
}

// Also export the component for potential direct usage
export { FeedbackPopup }; 