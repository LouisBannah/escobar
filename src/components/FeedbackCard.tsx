import React, { useState, useEffect, useRef } from 'react';
import { X, Star } from 'lucide-react';
import { showFeedbackNotice } from './FeedbackPopup';
import { useTheme } from '../contexts/ThemeContext';
import { getTheme } from '../utils/themeUtils';

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
  const { theme: currentMode } = useTheme();
  
  // Directly get neutral theme values without affecting global theme
  const getNeutralThemeValue = (path: string) => {
    return getTheme(currentMode, 'neutral', path);
  };
  
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

  // Add useEffect to handle body scroll locking
  useEffect(() => {
    // Add class to both html and body
    document.documentElement.classList.add('overflow-hidden');
    document.body.classList.add('overflow-hidden');
    // Set fixed position to prevent iOS Safari bounce
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${window.scrollY}px`;

    return () => {
      // Cleanup
      document.documentElement.classList.remove('overflow-hidden');
      document.body.classList.remove('overflow-hidden');
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(document.body.style.top || '0', 10) * -1);
    };
  }, []);
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [title, setTitle] = useState(item.shortTitle);
  
  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
  };
  
  const handleMouseEnter = (starRating: number) => {
    setHoverRating(starRating);
  };
  
  const handleMouseLeave = () => {
    setHoverRating(0);
  };
  
  const handleClose = () => {
    onClose();
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Log the feedback submission
    console.log(`Feedback submitted for item ${item.id}: Title "${title}", Rating ${rating}, Comment: ${feedback}`);
    
    // Close the feedback card
    handleClose();
    
    // Show the feedback notice using the portal
    try {
      await showFeedbackNotice();
    } catch (error) {
      console.error('Error showing feedback notice:', error);
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 backdrop-blur-md bg-black/30 flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl flex flex-col bg-white rounded-xl shadow-2xl overflow-hidden"
        style={{
          maxHeight: 'calc(100vh - 80px)',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Floating Header - Always visible */}
        <div 
          ref={headerRef}
          className="sticky top-0 z-10 border-b"
          style={{ 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            background: getNeutralThemeValue('colors.background')
          }}
        >
          {/* Gradient Banner */}
          <div className="h-2" style={{ background: getNeutralThemeValue('colors.gradients.banner') }} />
          
          {/* Main Header */}
          <div className="p-6" style={{ background: getNeutralThemeValue('colors.gradients.header') }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold" style={{ color: getNeutralThemeValue('colors.text.primary') }}>Provide Feedback</h2>
              </div>
              <button
                onClick={handleClose}
                className="transition-colors duration-200 rounded-full p-1"
                style={{ 
                  color: getNeutralThemeValue('components.cardComponents.header.closeButtonColor'),
                  background: getNeutralThemeValue('components.cardComponents.header.closeButtonBg'),
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = getNeutralThemeValue('components.cardComponents.header.closeButtonColorHover');
                  e.currentTarget.style.background = getNeutralThemeValue('components.cardComponents.header.closeButtonBgHover');
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = getNeutralThemeValue('components.cardComponents.header.closeButtonColor');
                  e.currentTarget.style.background = getNeutralThemeValue('components.cardComponents.header.closeButtonBg');
                }}
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
            height: 'auto',
            maxHeight: 'calc(100vh - 200px)',
            scrollbarGutter: 'stable',
            scrollbarWidth: 'thin',
            background: getNeutralThemeValue('colors.surface'),
            color: getNeutralThemeValue('colors.text.primary')
          }}
        >
          <div className="p-6" style={{ paddingLeft: '28px', paddingRight: '20px' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <label className="block text-sm font-medium" style={{ color: getNeutralThemeValue('components.feedbackCard.form.labelText') }}>
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-4 border rounded-lg shadow-sm
                    focus:ring-2 focus:ring-offset-2 focus:outline-none focus:border-transparent"
                  style={{ 
                    background: getNeutralThemeValue('components.feedbackCard.form.fieldBg'),
                    borderColor: getNeutralThemeValue('components.feedbackCard.form.fieldBorder'),
                    color: getNeutralThemeValue('components.feedbackCard.form.fieldText')
                  }}
                  placeholder="Enter a title for your feedback..."
                />
              </div>
              
              {/* Rating */}
              <div className="space-y-2">
                <label className="block text-sm font-medium" style={{ color: getNeutralThemeValue('components.feedbackCard.form.labelText') }}>
                  How would you rate your experience?
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingClick(star)}
                        onMouseEnter={() => handleMouseEnter(star)}
                        onMouseLeave={handleMouseLeave}
                        className="focus:outline-none transition-transform duration-150 hover:scale-110"
                        style={{ 
                          color: (hoverRating || rating) >= star 
                            ? getNeutralThemeValue('components.feedbackCard.starRating.filledColor')
                            : getNeutralThemeValue('components.feedbackCard.starRating.emptyColor'),
                          fontSize: getNeutralThemeValue('components.feedbackCard.starRating.size')
                        }}
                      >
                        <Star className="w-8 h-8 fill-current" />
                      </button>
                    ))}
                  </div>
                  <p className="text-sm" style={{ color: getNeutralThemeValue('colors.text.secondary') }}>
                    {rating === 1 && "Poor - Does not meet expectations"}
                    {rating === 2 && "Fair - Needs improvement"}
                    {rating === 3 && "Average - Meets basic requirements"}
                    {rating === 4 && "Good - Exceeds expectations"}
                    {rating === 5 && "Excellent - Outstanding quality"}
                  </p>
                </div>
              </div>
              
              {/* Comments */}
              <div className="space-y-2">
                <label className="block text-sm font-medium" style={{ color: getNeutralThemeValue('components.feedbackCard.form.labelText') }}>
                  Comments (optional)
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full p-4 border rounded-lg shadow-sm min-h-[120px]
                    focus:ring-2 focus:ring-offset-2 focus:outline-none focus:border-transparent"
                  style={{ 
                    background: getNeutralThemeValue('components.feedbackCard.form.fieldBg'),
                    borderColor: getNeutralThemeValue('components.feedbackCard.form.fieldBorder'),
                    color: getNeutralThemeValue('components.feedbackCard.form.fieldText')
                  }}
                  placeholder="Please share your thoughts on this item..."
                />
              </div>
            </form>
          </div>
        </div>
        
        {/* Footer */}
        <div className="border-t border-gray-200 bg-gray-50 p-4 flex justify-between items-center text-xs text-gray-500 h-[56px]">
          <div className="text-xs" style={{ color: getNeutralThemeValue('colors.text.tertiary') }}>
            Your feedback helps us improve our offerings
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={rating === 0}
            className="px-6 py-2 rounded-lg shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md flex items-center text-sm font-medium"
            style={{ 
              background: rating === 0 
                ? getNeutralThemeValue('components.feedbackCard.submitButton.disabledBg')
                : getNeutralThemeValue('components.feedbackCard.submitButton.bg'),
              color: rating === 0
                ? getNeutralThemeValue('components.feedbackCard.submitButton.disabledText')
                : getNeutralThemeValue('components.feedbackCard.submitButton.text')
            }}
            onMouseOver={(e) => {
              if (rating > 0) {
                e.currentTarget.style.background = getNeutralThemeValue('components.feedbackCard.submitButton.bgHover');
              }
            }}
            onMouseOut={(e) => {
              if (rating > 0) {
                e.currentTarget.style.background = getNeutralThemeValue('components.feedbackCard.submitButton.bg');
              }
            }}
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard; 