import React, { useState } from 'react';
import { X, Send, MessageSquare, ThumbsUp } from 'lucide-react';
import { showFeedbackNotice } from './FeedbackPopup';
import { getThemeColors } from '../utils/themeUtils';
import { useTheme } from '../contexts/ThemeContext';

interface FeedbackCardProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ isOpen, onClose, title = "Toolkit Feedback" }) => {
  const { isDarkMode } = useTheme();
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!isOpen) return null;

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the feedback to your backend
      console.log('Feedback submitted:', { feedback, rating });
      
      // Close the card
      onClose();
      
      // Reset form
      setFeedback('');
      setRating(0);
      
      // Show the success notice
      await showFeedbackNotice();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Use the centralized theme utility - default to 'Delivery' theme colors
  const colors = getThemeColors('Delivery', isDarkMode);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm bg-black/30">
      <div className="min-h-screen px-4 text-center">
        <div className="fixed inset-0" onClick={onClose} />
        <div className="inline-block w-full max-w-3xl my-8 text-left align-middle transition-all transform">
          <div className="card rounded-2xl shadow-2xl overflow-hidden relative z-[51] border bg-white dark:bg-gray-800">
            {/* Gradient Banner */}
            <div className={`h-4 ${colors.banner}`} />
            
            {/* Header */}
            <div className={`p-6 ${colors.header} border-b ${colors.border}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-emerald-500" />
                  <h2 className={`text-xl font-semibold ${colors.titleText}`}>{title}</h2>
                </div>
                <button
                  onClick={onClose}
                  className={`${colors.tabText} hover:opacity-80 transition-colors duration-200`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Description */}
              <div className="space-y-6">
                <p className={`${colors.contentText} text-lg leading-relaxed opacity-80`}>
                  We value your feedback! Please share your thoughts on the Converge Toolkit 
                  to help us improve your experience.
                </p>
              </div>

              {/* Rating */}
              <div className={`rounded-xl p-6 ${colors.contentBox} border ${colors.border}`}>
                <h3 className={`${colors.boxTitle} text-lg font-semibold mb-5 flex items-center`}>
                  <div className={`w-1 h-5 ${colors.button} rounded-full mr-2`}></div>
                  How would you rate your experience?
                </h3>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`w-12 h-12 flex items-center justify-center rounded-md ${
                        rating >= star 
                          ? 'bg-emerald-100 text-emerald-600 border border-emerald-200 dark:bg-emerald-900 dark:bg-opacity-30 dark:text-emerald-400 dark:border-emerald-800' 
                          : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600'
                      } transition-colors`}
                      aria-label={`${star} stars`}
                    >
                      {star}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Feedback Text */}
              <div className={`rounded-xl p-6 ${colors.contentBox} border ${colors.border}`}>
                <h3 className={`${colors.boxTitle} text-lg font-semibold mb-5 flex items-center`}>
                  <div className={`w-1 h-5 ${colors.button} rounded-full mr-2`}></div>
                  Your Feedback
                </h3>
                <textarea
                  id="feedback"
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us what you think about the toolkit..."
                  className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 resize-none bg-white dark:bg-gray-700 dark:text-gray-100"
                  required
                />
              </div>

              {/* Submit Button Section */}
              <div className={`rounded-xl p-6 ${colors.success} border ${colors.border} backdrop-blur-sm relative overflow-hidden group hover:shadow-md transition-all duration-300`}>
                <div className="relative flex items-start gap-4">
                  <ThumbsUp className={`w-5 h-5 ${colors.text} mt-1 flex-shrink-0 opacity-80`} />
                  <div className="flex-grow">
                    <h3 className={`text-lg font-semibold ${colors.text} mb-2`}>
                      Submit Your Feedback
                    </h3>
                    <p className={`${colors.text} opacity-80 mb-4`}>
                      Thank you for taking the time to share your feedback with us. 
                      Your insights help us improve the Converge Toolkit for everyone.
                    </p>
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className={`px-4 py-2 ${colors.tabButton} text-white rounded-lg shadow-sm hover:shadow-md 
                        transition-all duration-200 flex items-center text-sm font-medium relative z-[52]`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          <span>Submit Feedback</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Footer */}
              <div className={`border-t ${colors.border} mt-6 pt-4 px-6 pb-4 flex justify-center items-center text-xs ${colors.text} opacity-70`}>
                <div>
                  Your feedback helps improve the Converge Toolkit experience
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard; 