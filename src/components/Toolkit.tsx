import React, { useState, useRef, useEffect } from 'react';
import { toolkitItems } from '../data/toolkitItems';
import { VALID_CATEGORIES } from '../data/constants';
import { Search, Filter, X, MessageSquare, User, Settings, LogOut, FileText, Archive, Table, Presentation, Code, Globe } from 'lucide-react';
import FeedbackModal from './FeedbackModal';
import ExpandedCard from './ExpandedCard';
import DetailedCard from './DetailedCard';
import { useUser } from '../contexts/UserContext';
import PDFViewer from './PDFViewer';
import ThemeToggle from './ThemeToggle';

interface Filters {
  category: string[];
  materials: string[];
  theme: string[];
  [key: string]: string[]; // Add index signature to allow string indexing
}

export const Toolkit: React.FC = () => {
  const { user, setUser, logout } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showMaterialDropdown, setShowMaterialDropdown] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Filters>({
    category: [],
    materials: [],
    theme: []
  });
  const [currentItemId, setCurrentItemId] = useState<string | null>(null);
  const [selectedPDF, setSelectedPDF] = useState<{ url: string; title: string } | null>(null);
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
      // Apply theme filters
      if (activeFilters.theme.length > 0 && !activeFilters.theme.includes(item.theme)) {
        return false;
      }

      // Apply category filters
      if (activeFilters.category.length > 0 && !activeFilters.category.includes(item.category)) {
        return false;
      }

      // Apply materials filters (this is more complex as we need to check array elements)
      if (activeFilters.materials.length > 0) {
        // Check if any of the item's materials match any of the filtered materials
        const materialTypes = item.materials.map(m => m.type);
        return activeFilters.materials.some(type => materialTypes.includes(type));
      }

      // Apply search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          item.shortTitle.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.availableTags.some(tag => tag.toLowerCase().includes(query)) ||
          item.materials.some(material => material.type.toLowerCase().includes(query))
        );
      }

      return true;
    });
  }, [activeFilters, searchQuery]);

  const handleRequestAccess = (itemId: string) => {
    // Here you would typically make an API call to submit the access request
    console.log(`Access requested for item: ${itemId}`);
    
    // Auto-close the card after 2 seconds
    setTimeout(() => {
      handleCloseCard();
    }, 2000);
  };

  const handleCloseCard = () => {
    setCurrentItemId(null);
  };

  const handleClosePDF = () => {
    setSelectedPDF(null);
  };

  const handleDownload = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Content overlay */}
      <div className="relative z-10 min-h-screen">
        <header className="sticky top-0 bg-white/95 border-b shadow-sm backdrop-blur-sm z-30">
          <div className="container mx-auto px-4 pt-6 pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <h1 className="text-2xl tracking-tight font-['Open_Sans']">
                  <span className="font-bold bg-gradient-to-r from-[#079669] to-[#0fb37f] text-transparent bg-clip-text">Converge</span>
                  <span className="font-light text-gray-800">Toolkit</span>
                </h1>
              </div>
              
              <nav className="flex space-x-4 absolute left-1/2 transform -translate-x-1/2">
                {(['Sales', 'Delivery', 'Quality Assurance'] as const).map((theme) => (
                  <button
                    key={theme}
                    onClick={() => handleFilterChange('theme', theme)}
                    className={`px-6 py-2 rounded-lg transition-all duration-300 font-medium relative overflow-hidden ${
                      activeFilters.theme.includes(theme)
                        ? 'text-white shadow-lg border-none transform scale-105' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 shadow-sm hover:shadow-inner border border-gray-200 hover:border-gray-300'
                    }`}
                    style={
                      activeFilters.theme.includes(theme)
                        ? theme === 'Sales'
                          ? { 
                              background: 'linear-gradient(135deg, #05ED04, #24920D)',
                              boxShadow: '0 8px 16px -2px rgba(5, 237, 4, 0.15), 0 3px 6px -2px rgba(36, 146, 13, 0.1)',
                            }
                          : theme === 'Delivery'
                          ? { 
                              background: 'linear-gradient(135deg, #36DAB3, #00A0DE)',
                              boxShadow: '0 8px 16px -2px rgba(54, 218, 179, 0.15), 0 3px 6px -2px rgba(0, 160, 222, 0.1)',
                            }
                          : { 
                              background: 'linear-gradient(135deg, #D41EDE, #B38EEF)',
                              boxShadow: '0 8px 16px -2px rgba(212, 30, 222, 0.15), 0 3px 6px -2px rgba(179, 142, 239, 0.1)',
                            }
                        : {}
                    }
                  >
                    {activeFilters.theme.includes(theme) && (
                      <>
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-b from-white/30 to-transparent top-0 left-0" style={{ height: '50%' }}></span>
                        <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10"></span>
                      </>
                    )}
                    <span className="relative z-10 font-semibold">{theme}</span>
                  </button>
                ))}
              </nav>

              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <button
                  onClick={() => setShowFeedback(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 hover:border-emerald-200 hover:bg-emerald-50 rounded-md text-gray-600 hover:text-emerald-600 text-sm transition-colors"
                  title="Provide Feedback"
                >
                  <MessageSquare size={14} className="flex-shrink-0" />
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
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-1 border z-[200]">
                      <div className="px-4 py-3 border-b">
                        <div className="text-sm font-medium text-gray-900">Joep Arends</div>
                        <div className="text-xs text-gray-500">{user?.email || 'joep.arends@deloitte.nl'}</div>
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
                              if (user) {
                                setUser({
                                  ...user,
                                  accessLevel: e.target.checked ? 2 : 1
                                });
                              }
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
                          onClick={() => logout()}
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

            <div className="flex items-center justify-between mt-4 mb-4">
              <div className="flex items-center flex-1">
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
                <div className="pl-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center px-3 py-2 rounded-lg border ${
                      showFilters || Object.values(activeFilters).some(arr => arr.length > 0)
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Filter className="h-5 w-5 mr-1.5" />
                    <span>Filters</span>
                    {Object.values(activeFilters).some(arr => arr.length > 0) && (
                      <span className="ml-1.5 bg-emerald-100 text-emerald-600 rounded-full px-1.5 py-0.5 text-xs font-medium">
                        {Object.values(activeFilters).reduce((acc, curr) => acc + curr.length, 0)}
                      </span>
                    )}
                  </button>
                </div>
                <div className="pl-4">
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
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border relative z-40">
                <div className="flex flex-wrap gap-4">
                  {/* Theme Filter */}
                  <div className="flex-1 min-w-[200px]">
                    <div className="relative z-40">
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent flex items-center justify-between"
                        >
                          <span className="text-sm text-gray-700">Themes</span>
                          <svg className={`w-4 h-4 text-gray-400 transform transition-transform ${showThemeDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {showThemeDropdown && (
                          <div className="absolute z-[200] w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                            <div className="p-2">
                              {['Sales', 'Delivery', 'Quality Assurance'].map(theme => (
                                <label key={theme} className="flex items-center px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={activeFilters.theme.includes(theme)}
                                    onChange={() => handleFilterChange('theme', theme)}
                                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                  />
                                  <span className="ml-2 text-sm text-gray-700">
                                    {theme}
                                    <span className="ml-1 text-gray-400">
                                      ({toolkitItems.filter(item => item.theme === theme).length})
                                    </span>
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div className="flex-1 min-w-[200px]">
                    <div className="relative z-40">
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent flex items-center justify-between"
                        >
                          <span className="text-sm text-gray-700">Categories</span>
                          <svg className={`w-4 h-4 text-gray-400 transform transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {showCategoryDropdown && (
                          <div className="absolute z-[200] w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                            <div className="p-2">
                              {VALID_CATEGORIES.map(category => (
                                <label key={category} className="flex items-center px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={activeFilters.category.includes(category)}
                                    onChange={() => handleFilterChange('category', category)}
                                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                  />
                                  <span className="ml-2 text-sm text-gray-700">
                                    {category}
                                    <span className="ml-1 text-gray-400">
                                      ({toolkitItems.filter(item => item.category === category).length})
                                    </span>
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Material Types Filter */}
                  <div className="flex-1 min-w-[200px]">
                    <div className="relative z-40">
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowMaterialDropdown(!showMaterialDropdown)}
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent flex items-center justify-between"
                        >
                          <span className="text-sm text-gray-700">Material Types</span>
                          <svg className={`w-4 h-4 text-gray-400 transform transition-transform ${showMaterialDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {showMaterialDropdown && (
                          <div className="absolute z-[200] w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                            <div className="p-2">
                              {materialTypes.map(type => (
                                <label key={type} className="flex items-center px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={activeFilters.materials.includes(type)}
                                    onChange={() => handleFilterChange('materials', type)}
                                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                  />
                                  <span className="ml-2 text-sm text-gray-700">
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
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Selected Filters Display */}
                {(activeFilters.theme.length > 0 || activeFilters.category.length > 0 || activeFilters.materials.length > 0) && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {activeFilters.theme.map(theme => (
                      <span key={theme} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                        {theme}
                        <button
                          onClick={() => handleFilterChange('theme', theme)}
                          className="ml-1 text-emerald-600 hover:text-emerald-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {activeFilters.category.map(category => (
                      <span key={category} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {category}
                        <button
                          onClick={() => handleFilterChange('category', category)}
                          className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {activeFilters.materials.map(type => (
                      <span key={type} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                        {type.toUpperCase()}
                        <button
                          onClick={() => handleFilterChange('materials', type)}
                          className="ml-1 text-purple-600 hover:text-purple-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}

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

        <main className="container mx-auto px-4 py-8 relative z-10">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentItemId(item.id)}
                  className="text-left card rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow flex flex-col relative z-20"
                >
                  {/* Theme Badge */}
                  <div className="absolute top-4 right-4">
                    <span 
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border`}
                      style={
                        item.theme === 'Sales'
                          ? { 
                              background: 'linear-gradient(135deg, rgba(5, 237, 4, 0.1), rgba(36, 146, 13, 0.15))',
                              color: '#1A7309',
                              borderColor: 'rgba(36, 146, 13, 0.2)'
                            }
                          : item.theme === 'Delivery'
                          ? { 
                              background: 'linear-gradient(135deg, rgba(54, 218, 179, 0.1), rgba(0, 160, 222, 0.15))',
                              color: '#0078A8',
                              borderColor: 'rgba(0, 160, 222, 0.2)'
                            }
                          : { 
                              background: 'linear-gradient(135deg, rgba(212, 30, 222, 0.1), rgba(179, 142, 239, 0.15))',
                              color: '#9061E5',
                              borderColor: 'rgba(179, 142, 239, 0.2)'
                            }
                      }
                    >
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

        {/* PDF Viewer Modal */}
        {selectedPDF && (
          <PDFViewer
            url={selectedPDF.url}
            title={selectedPDF.title}
            onClose={handleClosePDF}
            onDownload={() => handleDownload(selectedPDF.url)}
          />
        )}
      </div>
    </div>
  );
}; 