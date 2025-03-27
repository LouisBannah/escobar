import React, { useState, useRef, useEffect } from 'react';
import { toolkitItems } from '../data/toolkitItems';
import { VALID_CATEGORIES } from '../data/constants';
import { Search, Filter, X, MessageSquare, User, Settings, LogOut, FileText, Archive, Table, Presentation, Code, Globe } from 'lucide-react';
import FeedbackModal from './FeedbackModal';
import ExpandedCard from './ExpandedCard';
import DetailedCard from './DetailedCard';
import { useUser } from '../contexts/UserContext';

interface Filters {
  category: string[];
  materials: string[];
  theme: string[];
}

export const Toolkit: React.FC = () => {
  const { user, setUser } = useUser();
  const [activeTab, setActiveTab] = useState<'Sales' | 'Delivery' | 'Quality Assurance' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Filters>({
    category: [],
    materials: [],
    theme: []
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [currentItemId, setCurrentItemId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Get unique material types from our data
  const materialTypes = Array.from(new Set(toolkitItems.flatMap(item => 
    item.materials.map(material => material.type)
  )));

  const handleFilterChange = (type: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value]
    }));
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredItems = React.useMemo(() => {
    return toolkitItems.filter(item => {
      // Filter by theme if active tab is set
      if (activeTab && item.theme !== activeTab) {
        return false;
      }

      // Apply category filters
      if (activeFilters.category.length > 0 && !activeFilters.category.includes(item.category)) {
        return false;
      }

      // Apply theme filters
      if (activeFilters.theme.length > 0 && !activeFilters.theme.includes(item.theme)) {
        return false;
      }

      // Apply materials filters (this is more complex as we need to check array elements)
      if (activeFilters.materials.length > 0) {
        // Check if any of the item's materials match any of the filtered materials
        const materialTypes = item.materials.map(m => m.type);
        return activeFilters.materials.some(type => materialTypes.includes(type));
      }

      return true;
    });
  }, [activeTab, activeFilters]);

  const handleRequestAccess = (itemId: string) => {
    // Here you would typically make an API call to submit the access request
    console.log(`Access requested for item: ${itemId}`);
    
    // Auto-close the card after 2 seconds
    setTimeout(() => {
      handleCloseCard();
    }, 2000);
  };

  const handleCardClick = (item: any) => {
    setCurrentItemId(item.id);
  };

  const handleCloseCard = () => {
    setCurrentItemId(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-8">
              <div className="text-emerald-600 font-semibold">
                Converge™ <span className="text-gray-700">Toolkit</span>
              </div>
              <nav className="flex space-x-4">
                {(['Sales', 'Delivery', 'Quality Assurance'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(activeTab === tab ? null : tab)}
                    className={`px-6 py-2 rounded-lg transition-all duration-200 font-medium ${
                      activeTab === tab
                        ? tab === 'Sales'
                          ? 'bg-emerald-50 border border-emerald-200 text-gray-900 shadow-sm'
                          : tab === 'Delivery'
                          ? 'bg-blue-50 border border-blue-200 text-gray-900 shadow-sm'
                          : 'bg-purple-50 border border-purple-200 text-gray-900 shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowFeedback(true)}
                className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 rounded-full text-gray-600 hover:text-emerald-600 transition-colors"
                title="Provide Feedback"
              >
                <MessageSquare size={20} />
                <span>Feedback</span>
              </button>
              <div className="relative" ref={profileMenuRef}>
                <button
                  className="p-2 hover:bg-gray-100 rounded-full relative"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  <img
                    src="/documents/pic.png"
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </button>
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-1 border z-50">
                    <div className="px-4 py-3 border-b">
                      <div className="text-sm font-medium text-gray-900">Joep Arends</div>
                      <div className="text-xs text-gray-500">joep.arends@deloitte.nl</div>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          Level {user?.accessLevel} Access
                        </span>
                      </div>
                    </div>
                    <div className="py-1">
                      <label className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={user?.accessLevel === 2}
                          onChange={(e) => {
                            setUser({
                              ...user,
                              accessLevel: e.target.checked ? 2 : 1
                            });
                          }}
                          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded mr-3"
                        />
                        Authorized
                      </label>
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <User className="w-4 h-4 mr-3" />
                        Your Profile
                      </button>
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Settings className="w-4 h-4 mr-3" />
                        Settings
                      </button>
                    </div>
                    <div className="border-t">
                      <button
                        onClick={() => {
                          // Handle logout
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by title, category, tags, or available materials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center px-4 py-2 rounded-lg border ${
                    showFilters || Object.values(activeFilters).some(arr => arr.length > 0)
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                  {Object.values(activeFilters).some(arr => arr.length > 0) && (
                    <span className="ml-2 bg-emerald-100 text-emerald-600 rounded-full px-2 py-0.5 text-xs font-medium">
                      {Object.values(activeFilters).reduce((acc, curr) => acc + curr.length, 0)}
                    </span>
                  )}
                </button>
                {filteredItems.length > 0 && (
                  <div className="text-sm text-gray-500">
                    {filteredItems.length} {filteredItems.length === 1 ? 'tool' : 'tools'} found
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Themes</h3>
                  <div className="space-y-2">
                    {['Sales', 'Delivery', 'Quality Assurance'].map(theme => (
                      <label key={theme} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={activeFilters.theme.includes(theme)}
                          onChange={() => handleFilterChange('theme', theme)}
                          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          {theme}
                          <span className="ml-1 text-gray-400">
                            ({toolkitItems.filter(item => item.theme === theme).length})
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
                  <div className="space-y-2">
                    {VALID_CATEGORIES.map(category => (
                      <label key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={activeFilters.category.includes(category)}
                          onChange={() => handleFilterChange('category', category)}
                          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          {category}
                          <span className="ml-1 text-gray-400">
                            ({toolkitItems.filter(item => item.category === category).length})
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Material Types</h3>
                  <div className="space-y-2">
                    {materialTypes.map(type => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={activeFilters.materials.includes(type)}
                          onChange={() => handleFilterChange('materials', type)}
                          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          {type.toUpperCase()}
                          <span className="ml-1 text-gray-400">
                            ({toolkitItems.filter(item => 
                              item.materials.some(m => m.type === type)
                            ).length})
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {Object.values(activeFilters).some(arr => arr.length > 0) && (
                <div className="mt-4 pt-4 border-t flex justify-end">
                  <button
                    onClick={() => setActiveFilters({ category: [], materials: [], theme: [] })}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentItemId(item.id)}
                className="text-left bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow flex flex-col relative"
              >
                {/* Theme Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.theme === 'Sales' 
                      ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20' 
                      : item.theme === 'Delivery'
                      ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20'
                      : 'bg-purple-50 text-purple-700 ring-1 ring-purple-600/20'
                  }`}>
                    {item.theme === 'Quality Assurance' ? 'QA' : item.theme}
                  </span>
                </div>

                {/* Category Label */}
                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 ring-1 ring-gray-200/50">
                    {item.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3 pr-24">
                  {item.shortTitle}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 mb-4">
                  {item.shortDescription}
                </p>

                {/* Materials Section */}
                <div className="mt-4 mb-6">
                  <div className="text-sm text-gray-500 mb-2">Available Materials:</div>
                  <div className="space-y-2">
                    {item.materials.map((material, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {material.type === 'pdf' && <FileText className="w-4 h-4 text-gray-600 flex-shrink-0" />}
                        {material.type === 'zip' && <Archive className="w-4 h-4 text-gray-600 flex-shrink-0" />}
                        {material.type === 'xls' && <Table className="w-4 h-4 text-gray-600 flex-shrink-0" />}
                        {material.type === 'docx' && <FileText className="w-4 h-4 text-gray-600 flex-shrink-0" />}
                        {material.type === 'ppt' && <Presentation className="w-4 h-4 text-gray-600 flex-shrink-0" />}
                        {material.type === 'yaml' && <Code className="w-4 h-4 text-gray-600 flex-shrink-0" />}
                        {material.type === 'json' && <Code className="w-4 h-4 text-gray-600 flex-shrink-0" />}
                        {material.type === 'html' && <Globe className="w-4 h-4 text-gray-600 flex-shrink-0" />}
                        <span className="text-sm text-gray-900 flex-grow">{material.title}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 flex-shrink-0">
                          {material.type.toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags Section */}
                <div className="flex flex-wrap gap-2 pt-4 mt-auto border-t">
                  {item.availableTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No tools found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </main>

      {/* Card Modal */}
      {currentItemId && (
        user?.accessLevel === 2 ? (
          <ExpandedCard
            item={toolkitItems.find(item => item.id === currentItemId)!}
            onClose={handleCloseCard}
          />
        ) : (
          <DetailedCard
            item={toolkitItems.find(item => item.id === currentItemId)!}
            onClose={handleCloseCard}
            onRequestAccess={handleRequestAccess}
          />
        )
      )}

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
      />
    </div>
  );
}; 