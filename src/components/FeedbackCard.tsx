import React, { useState, useEffect, useRef } from 'react';
import { X, Star } from 'lucide-react';
import { showFeedbackNotice } from './FeedbackPopup';
import { useTheme } from '../contexts/ThemeContext';

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
  const { getThemeValue, setThemeCategory } = useTheme();
  
  // Set the theme category based on the item's theme
  useEffect(() => {
    // For QA theme, we need to map "Quality Assurance" to "qualityAssurance"
    if (item.theme === 'Quality Assurance') {
      setThemeCategory('Quality Assurance');
    } else {
      setThemeCategory(item.theme);
    }
  }, [item.theme, setThemeCategory]);
  
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
          <div className="h-2" style={{ background: getThemeValue('colors.gradients.banner') }} />
          
          {/* Main Header */}
          <div className="p-6" style={{ background: getThemeValue('colors.gradients.header') }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold" style={{ color: getThemeValue('colors.text.primary') }}>Provide Feedback</h2>
              </div>
              <button
                onClick={onClose}
                className="transition-colors duration-200 rounded-full p-1"
                style={{ 
                  color: getThemeValue('components.cardComponents.header.closeButtonColor'),
                  background: getThemeValue('components.cardComponents.header.closeButtonBg'),
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = getThemeValue('components.cardComponents.header.closeButtonColorHover');
                  e.currentTarget.style.background = getThemeValue('components.cardComponents.header.closeButtonBgHover');
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = getThemeValue('components.cardComponents.header.closeButtonColor');
                  e.currentTarget.style.background = getThemeValue('components.cardComponents.header.closeButtonBg');
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
            height: `calc(100vh - 40px - ${headerHeight}px - 56px)`, // 56px is the footer height
            scrollbarGutter: 'stable',
            scrollbarWidth: 'thin',
            background: getThemeValue('colors.surface'),
            color: getThemeValue('colors.text.primary')
          }}
        >
          <div className="p-6" style={{ paddingLeft: '28px', paddingRight: '20px' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Item Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium" style={{ color: getThemeValue('components.feedbackCard.form.labelText') }}>
                  Item Name
                </label>
                <div className="p-4 rounded-lg border" 
                  style={{ 
                    background: getThemeValue('components.feedbackCard.form.fieldBg'),
                    borderColor: getThemeValue('components.feedbackCard.form.fieldBorder'),
                    color: getThemeValue('components.feedbackCard.form.fieldText')
                  }}
                >
                  {item.shortTitle}
                </div>
              </div>
              
              {/* Rating */}
              <div className="space-y-2">
                <label className="block text-sm font-medium" style={{ color: getThemeValue('components.feedbackCard.form.labelText') }}>
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
                      className="focus:outline-none transition-transform duration-150 hover:scale-110"
                      style={{ 
                        color: (hoverRating || rating) >= star 
                          ? getThemeValue('components.feedbackCard.starRating.filledColor')
                          : getThemeValue('components.feedbackCard.starRating.emptyColor'),
                        fontSize: getThemeValue('components.feedbackCard.starRating.size')
                      }}
                    >
                      <Star className="w-8 h-8 fill-current" />
                    </button>
                  ))}
                </div>
                <p className="text-sm mt-1" style={{ color: getThemeValue('colors.text.secondary') }}>
                  {rating === 1 && "Poor - Does not meet expectations"}
                  {rating === 2 && "Fair - Needs improvement"}
                  {rating === 3 && "Average - Meets basic requirements"}
                  {rating === 4 && "Good - Exceeds expectations"}
                  {rating === 5 && "Excellent - Outstanding quality"}
                </p>
              </div>
              
              {/* Comments */}
              <div className="space-y-2">
                <label className="block text-sm font-medium" style={{ color: getThemeValue('components.feedbackCard.form.labelText') }}>
                  Comments (optional)
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full p-4 border rounded-lg shadow-sm min-h-[120px]
                    focus:ring-2 focus:ring-offset-2 focus:outline-none focus:border-transparent"
                  style={{ 
                    background: getThemeValue('components.feedbackCard.form.fieldBg'),
                    borderColor: getThemeValue('components.feedbackCard.form.fieldBorder'),
                    color: getThemeValue('components.feedbackCard.form.fieldText')
                  }}
                  placeholder="Please share your thoughts on this item..."
                />
              </div>
            </form>
          </div>
        </div>
        
        {/* Footer with Submit Button */}
        <div className="p-4 flex justify-between items-center h-[56px] border-t"
          style={{ 
            background: getThemeValue('components.cardComponents.footer.bg'),
            borderColor: getThemeValue('components.cardComponents.footer.border'),
            color: getThemeValue('components.cardComponents.footer.text')
          }}
        >
          <div className="text-xs" style={{ color: getThemeValue('colors.text.tertiary') }}>
            Your feedback helps us improve our offerings
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={rating === 0}
            className="px-6 py-2 rounded-lg shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md flex items-center text-sm font-medium"
            style={{ 
              background: rating === 0 
                ? getThemeValue('components.feedbackCard.submitButton.disabledBg')
                : getThemeValue('components.feedbackCard.submitButton.bg'),
              color: rating === 0
                ? getThemeValue('components.feedbackCard.submitButton.disabledText')
                : getThemeValue('components.feedbackCard.submitButton.text')
            }}
            onMouseOver={(e) => {
              if (rating > 0) {
                e.currentTarget.style.background = getThemeValue('components.feedbackCard.submitButton.bgHover');
              }
            }}
            onMouseOut={(e) => {
              if (rating > 0) {
                e.currentTarget.style.background = getThemeValue('components.feedbackCard.submitButton.bg');
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