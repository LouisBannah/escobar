import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface SubmissionNoticeProps {
  theme: 'Sales' | 'Delivery' | 'Quality Assurance';
  onClose: () => void;
}

const SubmissionNotice: React.FC<SubmissionNoticeProps> = ({ theme, onClose }) => {
  // Fixed state that won't change during component lifecycle
  const [countdown, setCountdown] = useState(5);
  
  // Simple useEffect with a single purpose - close after 5 seconds
  useEffect(() => {
    console.log('[SubmissionNotice] Component mounted, starting 5 second timer');
    
    // Set up a timer for each second to update countdown
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        const next = prev - 1;
        console.log(`[SubmissionNotice] Countdown: ${next} seconds remaining`);
        return next;
      });
    }, 1000);
    
    // Set up the final timeout to close
    const closeTimer = setTimeout(() => {
      console.log('[SubmissionNotice] 5 seconds elapsed, closing');
      onClose();
    }, 5000);
    
    // Clear timers on unmount
    return () => {
      console.log('[SubmissionNotice] Cleaning up timers');
      clearInterval(countdownInterval);
      clearTimeout(closeTimer);
    };
  }, []); // Empty dependency array - run once only

  const getThemeColors = (theme: string) => {
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

  // Calculate progress percentage (0 to 100) based on countdown
  const progressPercent = ((5 - countdown) / 5) * 100;

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto backdrop-blur-sm bg-black/30 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className={`rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl bg-white/90 relative z-[61] border ${colors.border}`}>
          {/* Request Submitted Notice */}
          <div className={`p-6 ${colors.lighter} relative overflow-hidden`}>
            {/* Simple progress bar */}
            <div 
              className={`absolute bottom-0 left-0 h-1 ${colors.button} transition-all duration-1000`}
              style={{ width: `${progressPercent}%` }} 
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
};

export default SubmissionNotice; 