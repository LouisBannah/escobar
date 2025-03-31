import React, { useState, useEffect, useRef } from 'react';
import { X, Star } from 'lucide-react';
import { showFeedbackNotice } from './FeedbackPopup';
import { getThemeColors } from '../utils/themeUtils';

interface FeedbackCardProps {
  item: {
    id: string;
    theme: 'Sales' | 'Delivery' | 'Quality Assurance';
    category: string;
    shortTitle: string;
  };
  onClose: () => void;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ item, onClose }) => {
  // Refs for header height calculation
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  
  // Update header height on resize
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    
    // Set initial height
    updateHeaderHeight();
    
    // Add resize listener
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  // Prevent scrolling of the background when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  
  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
  };
  
  const handleMouseEnter = (starRating: number) => {
    setHoverRating(starRating);
  };
  
  const handleMouseLeave = () => {
    setHoverRating(0);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Log the feedback submission
    console.log(`Feedback submitted for item ${item.id}: Rating ${rating}, Comment: ${feedback}`);
    
    // Close the feedback card immediately
    onClose();
    
    // Show the feedback notice using the portal
    try {
      await showFeedbackNotice();
    } catch (error) {
      console.error('Error showing feedback notice:', error);
    }
  };
  
  // Use the centralized theme utility - focus on light mode for redesign
  const colors = getThemeColors(item.theme, false);
  
  return (
    <div className="fixed inset-0 z-50 backdrop-blur-md bg-black/30 flex items-center justify-center">
      <div className="relative w-full max-w-2xl max-h-[calc(100vh-40px)] flex flex-col bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Floating Header - Always visible */}
        <div 
          ref={headerRef}
          className="sticky top-0 z-10 border-b"
          style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)' }}
        >
          {/* Gradient Banner */}
          <div className={`h-2 ${colors.banner}`} />
          
          {/* Main Header */}
          <div className={`${colors.header} p-6`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-gray-800">Provide Feedback</h2>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colors.themeLabel}`}>
                    {item.theme === 'Quality Assurance' ? 'QA' : item.theme}
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colors.tagBackground} ${colors.tagText} border ${colors.tagBorder}`}>
                    {item.category}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200 rounded-full p-1 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Scrollable Content */}
        <div 
          className="flex-1 overflow-y-auto" 
          style={{ 
            height: `calc(100vh - 40px - ${headerHeight}px - 56px)`, // 56px is the footer height
            scrollbarGutter: 'stable',
            scrollbarWidth: 'thin'
          }}
        >
          <div className="p-6" style={{ paddingLeft: '28px', paddingRight: '20px' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Item Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Item Name
                </label>
                <div className="p-4 rounded-lg border border-gray-200 bg-gray-50 text-gray-800">
                  {item.shortTitle}
                </div>
              </div>
              
              {/* Rating */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Rate this item
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      onMouseEnter={() => handleMouseEnter(star)}
                      onMouseLeave={handleMouseLeave}
                      className={`focus:outline-none transition-transform duration-150 hover:scale-110 ${
                        (hoverRating || rating) >= star 
                          ? 'text-yellow-400' 
                          : 'text-gray-300'
                      }`}
                    >
                      <Star className="w-8 h-8 fill-current" />
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {rating === 1 && "Poor - Does not meet expectations"}
                  {rating === 2 && "Fair - Needs improvement"}
                  {rating === 3 && "Average - Meets basic requirements"}
                  {rating === 4 && "Good - Exceeds expectations"}
                  {rating === 5 && "Excellent - Outstanding quality"}
                </p>
              </div>
              
              {/* Comments */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Comments (optional)
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full p-4 border border-gray-200 rounded-lg shadow-sm min-h-[120px]
                    focus:ring-2 focus:ring-offset-2 focus:outline-none focus:border-transparent"
                  placeholder="Please share your thoughts on this item..."
                />
              </div>
            </form>
          </div>
        </div>
        
        {/* Footer with Submit Button */}
        <div className="border-t border-gray-200 bg-gray-50 p-4 flex justify-between items-center h-[56px]">
          <div className="text-xs text-gray-500">
            Your feedback helps us improve our offerings
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={rating === 0}
            className={`px-6 py-2 ${colors.button} text-white rounded-lg shadow-sm 
              transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
              hover:shadow-md flex items-center text-sm font-medium`}
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard; 