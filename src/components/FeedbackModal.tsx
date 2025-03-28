import React, { useState } from 'react';
import { X, Send, MessageSquare } from 'lucide-react';
import { showFeedbackNotice } from './FeedbackNotice';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, title = "Toolkit Feedback" }) => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the feedback to your backend
      console.log('Feedback submitted:', { feedback, rating });
      
      // Close the modal first
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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm bg-black/30 flex items-center justify-center">
      <div className="w-full max-w-4xl px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          {/* Gradient Banner */}
          <div className="h-4 bg-gradient-to-r from-zinc-300 via-zinc-200 to-zinc-300"></div>
          
          {/* Header with lighter bluish-gray gradient background */}
          <div className="flex items-center justify-between p-4 px-6 bg-gradient-to-r from-slate-100 via-white to-slate-100 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-medium text-gray-900">{title}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How would you rate your experience?
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`w-10 h-10 flex items-center justify-center rounded-md ${
                      rating >= star 
                        ? 'bg-emerald-100 text-emerald-600 border border-emerald-200' 
                        : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100'
                    } transition-colors`}
                    aria-label={`${star} stars`}
                  >
                    {star}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Feedback Text */}
            <div className="rounded-lg p-4 bg-gray-50/80 border border-gray-200">
              <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                Your Feedback
              </label>
              <textarea
                id="feedback"
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us what you think about the toolkit..."
                className="w-full px-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 resize-none bg-white"
                required
              />
            </div>
            
            {/* Footer with action buttons */}
            <div className="border-t border-gray-200 pt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors border border-gray-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 text-sm text-white bg-emerald-600 hover:bg-emerald-700 rounded-md flex items-center gap-2 transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Feedback</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal; 