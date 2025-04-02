import React, { useState, useRef, useEffect } from 'react';
import { X, Filter, Search } from 'lucide-react';
import { toolkitItems } from '../data/toolkitItems';
import { useTheme } from '../contexts/ThemeContext';

interface Filters {
  themes: string[];
  categories: string[];
  materialTypes: string[];
}

interface FilterBarProps {
  filters: Filters;
  selectedFilters: Filters;
  activeFiltersCount: number;
  onFilterChange: (filterType: keyof Filters, value: string) => void;
  onClearFilters: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalToolsCount: number;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  selectedFilters,
  activeFiltersCount,
  onFilterChange,
  onClearFilters,
  searchQuery,
  onSearchChange,
  totalToolsCount
}) => {
  const { getThemeValue } = useTheme();
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showMaterialDropdown, setShowMaterialDropdown] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const themeDropdownRef = useRef<HTMLDivElement>(null);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const materialDropdownRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Don't close filter panel if the click was on the filter button
      if (filterButtonRef.current && filterButtonRef.current.contains(event.target as Node)) {
        return;
      }
      
      // Close theme dropdown if clicked outside
      if (
        themeDropdownRef.current && 
        !themeDropdownRef.current.contains(event.target as Node)
      ) {
        setShowThemeDropdown(false);
      }
      
      // Close category dropdown if clicked outside
      if (
        categoryDropdownRef.current && 
        !categoryDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCategoryDropdown(false);
      }
      
      // Close material dropdown if clicked outside
      if (
        materialDropdownRef.current && 
        !materialDropdownRef.current.contains(event.target as Node)
      ) {
        setShowMaterialDropdown(false);
      }
      
      // Close filters panel if clicked outside
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        !themeDropdownRef.current?.contains(event.target as Node) &&
        !categoryDropdownRef.current?.contains(event.target as Node) &&
        !materialDropdownRef.current?.contains(event.target as Node)
      ) {
        setShowFiltersPanel(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Dynamic counts for filter options based on actual data
  const getFilterCounts = (filterType: string, value: string): number => {
    if (filterType === 'themes') {
      return toolkitItems.filter(item => item.theme === value).length;
    } else if (filterType === 'categories') {
      return toolkitItems.filter(item => item.category === value).length;
    } else if (filterType === 'materialTypes') {
      return toolkitItems.filter(item => 
        item.materials.some(material => material.type.toLowerCase() === value.toLowerCase())
      ).length;
    }
    return 0;
  };

  // Simple toggle function for filter panel
  const handleFilterButtonClick = () => {
    // Toggle the filter panel state
    setShowFiltersPanel(prev => {
      // If we're closing the panel, also close all dropdowns
      if (prev) {
        setShowThemeDropdown(false);
        setShowCategoryDropdown(false);
        setShowMaterialDropdown(false);
      }
      return !prev;
    });
  };

  return (
    <div 
      style={{
        background: getThemeValue('components.filterBar.background'),
        borderColor: getThemeValue('colors.border'),
        boxShadow: getThemeValue('shared.boxShadow.sm'),
      }}
      className="mb-4 border-b sticky top-[4.5rem] z-20"
    >
      <div className="w-full max-w-screen-xl mx-auto px-6">
        {/* Main filter bar with search and filter button */}
        <div className="flex items-center gap-4 py-3">
          {/* Search Bar */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search 
                className="h-5 w-5" 
                style={{ color: getThemeValue('colors.text.secondary') }} 
              />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{
                background: getThemeValue('components.filterBar.searchBackground'),
                color: getThemeValue('colors.text.primary'),
                borderColor: getThemeValue('colors.border'),
              }}
              className="block w-full pl-10 pr-3 py-2 border rounded-md leading-5 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-emerald-500 sm:text-sm"
              placeholder="Search for tools, resources, materials..."
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600"
                style={{ color: getThemeValue('colors.text.secondary') }}
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          
          {/* Filter Button - Simple button with standard click handler */}
          <button
            ref={filterButtonRef}
            onClick={handleFilterButtonClick}
            style={{
              background: showFiltersPanel || activeFiltersCount > 0 
                ? getThemeValue('components.filterBar.activeButtonBackground')
                : getThemeValue('components.filterBar.buttonBackground'),
              color: getThemeValue('colors.brand.primary'),
              borderColor: getThemeValue('colors.brand.primary'),
              borderWidth: (showFiltersPanel || activeFiltersCount > 0) ? '1px' : '1px',
            }}
            className="inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none whitespace-nowrap"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <span 
                style={{
                  background: getThemeValue('colors.brand.badge'),
                  color: getThemeValue('colors.text.inverted'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  lineHeight: 1,
                  padding: 0,
                  textAlign: 'center'
                }}
                className="ml-2 text-xs font-bold"
              >
                {activeFiltersCount}
              </span>
            )}
          </button>
        
          {/* Tools count */}
          <div 
            className="text-sm whitespace-nowrap"
            style={{ color: getThemeValue('colors.text.secondary') }}
          >
            {totalToolsCount} {totalToolsCount === 1 ? 'tool' : 'tools'} found
          </div>
        </div>
        
        {/* Enhanced Filter Panel */}
        {showFiltersPanel && (
          <div className="py-3 mb-2" ref={dropdownRef}>
            <div 
              className="mt-4 p-4 rounded-lg border relative z-40"
              style={{
                background: getThemeValue('components.filterBar.panelBackground'),
                borderColor: getThemeValue('colors.border'),
              }}
            >
              <div className="flex flex-wrap gap-4">
                {/* Theme Filter */}
                <div className="flex-1 min-w-[200px]" ref={themeDropdownRef}>
                  <div className="relative z-40">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          setShowThemeDropdown(!showThemeDropdown);
                          setShowCategoryDropdown(false);
                          setShowMaterialDropdown(false);
                        }}
                        style={{
                          background: getThemeValue('components.filterBar.dropdownButtonBackground'),
                          color: getThemeValue('colors.text.primary'),
                          borderColor: getThemeValue('colors.border'),
                        }}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-emerald-500 flex items-center justify-between"
                      >
                        <span className="text-sm">Themes</span>
                        <svg 
                          style={{ color: getThemeValue('colors.text.secondary') }}
                          className={`w-4 h-4 transform transition-transform ${showThemeDropdown ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {showThemeDropdown && (
                        <div 
                          className="absolute z-50 w-full mt-1 border rounded-lg shadow-lg"
                          style={{
                            background: getThemeValue('components.filterBar.dropdownBackground'),
                            borderColor: getThemeValue('colors.border'),
                          }}
                        >
                          <div className="p-2">
                            {filters.themes.map(theme => (
                              <label 
                                key={theme} 
                                className="flex items-center px-2 py-1.5 rounded cursor-pointer"
                                style={{ color: getThemeValue('colors.text.primary') }}
                                onMouseOver={(e) => {
                                  e.currentTarget.style.backgroundColor = getThemeValue('colors.surfaceHover');
                                }}
                                onMouseOut={(e) => {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedFilters.themes.includes(theme)}
                                  onChange={() => onFilterChange('themes', theme)}
                                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm" style={{ color: getThemeValue('colors.text.primary') }}>
                                  {theme}
                                  <span className="ml-1" style={{ color: getThemeValue('colors.text.tertiary') }}>
                                    ({getFilterCounts('themes', theme)})
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
                <div className="flex-1 min-w-[200px]" ref={categoryDropdownRef}>
                  <div className="relative z-40">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          setShowCategoryDropdown(!showCategoryDropdown);
                          setShowThemeDropdown(false);
                          setShowMaterialDropdown(false);
                        }}
                        style={{
                          background: getThemeValue('components.filterBar.dropdownButtonBackground'),
                          color: getThemeValue('colors.text.primary'),
                          borderColor: getThemeValue('colors.border'),
                        }}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-emerald-500 flex items-center justify-between"
                      >
                        <span className="text-sm">Categories</span>
                        <svg 
                          style={{ color: getThemeValue('colors.text.secondary') }}
                          className={`w-4 h-4 transform transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {showCategoryDropdown && (
                        <div 
                          className="absolute z-50 w-full mt-1 border rounded-lg shadow-lg"
                          style={{
                            background: getThemeValue('components.filterBar.dropdownBackground'),
                            borderColor: getThemeValue('colors.border'),
                          }}
                        >
                          <div className="p-2">
                            {filters.categories.map(category => (
                              <label 
                                key={category} 
                                className="flex items-center px-2 py-1.5 rounded cursor-pointer"
                                style={{ color: getThemeValue('colors.text.primary') }}
                                onMouseOver={(e) => {
                                  e.currentTarget.style.backgroundColor = getThemeValue('colors.surfaceHover');
                                }}
                                onMouseOut={(e) => {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedFilters.categories.includes(category)}
                                  onChange={() => onFilterChange('categories', category)}
                                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm" style={{ color: getThemeValue('colors.text.primary') }}>
                                  {category}
                                  <span className="ml-1" style={{ color: getThemeValue('colors.text.tertiary') }}>
                                    ({getFilterCounts('categories', category)})
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
                <div className="flex-1 min-w-[200px]" ref={materialDropdownRef}>
                  <div className="relative z-40">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          setShowMaterialDropdown(!showMaterialDropdown);
                          setShowThemeDropdown(false);
                          setShowCategoryDropdown(false);
                        }}
                        style={{
                          background: getThemeValue('components.filterBar.dropdownButtonBackground'),
                          color: getThemeValue('colors.text.primary'),
                          borderColor: getThemeValue('colors.border'),
                        }}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-emerald-500 flex items-center justify-between"
                      >
                        <span className="text-sm">Material Types</span>
                        <svg 
                          style={{ color: getThemeValue('colors.text.secondary') }}
                          className={`w-4 h-4 transform transition-transform ${showMaterialDropdown ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {showMaterialDropdown && (
                        <div 
                          className="absolute z-50 w-full mt-1 border rounded-lg shadow-lg"
                          style={{
                            background: getThemeValue('components.filterBar.dropdownBackground'),
                            borderColor: getThemeValue('colors.border'),
                          }}
                        >
                          <div className="p-2">
                            {filters.materialTypes.map(type => (
                              <label 
                                key={type} 
                                className="flex items-center px-2 py-1.5 rounded cursor-pointer"
                                style={{ color: getThemeValue('colors.text.primary') }}
                                onMouseOver={(e) => {
                                  e.currentTarget.style.backgroundColor = getThemeValue('colors.surfaceHover');
                                }}
                                onMouseOut={(e) => {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedFilters.materialTypes.includes(type)}
                                  onChange={() => onFilterChange('materialTypes', type)}
                                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm" style={{ color: getThemeValue('colors.text.primary') }}>
                                  {type.toUpperCase()}
                                  <span className="ml-1" style={{ color: getThemeValue('colors.text.tertiary') }}>
                                    ({getFilterCounts('materialTypes', type)})
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
              {activeFiltersCount > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedFilters.themes.map(theme => (
                    <span 
                      key={theme} 
                      style={{
                        backgroundColor: getThemeValue('colors.brand.avatar'),
                        color: getThemeValue('colors.brand.primary')
                      }}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                    >
                      {theme}
                      <button
                        onClick={() => onFilterChange('themes', theme)}
                        style={{ color: getThemeValue('colors.brand.primary') }}
                        className="ml-1 hover:opacity-80"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  {selectedFilters.categories.map(category => (
                    <span 
                      key={category} 
                      style={{
                        backgroundColor: getThemeValue('colors.brand.avatar'),
                        color: getThemeValue('colors.brand.primary')
                      }}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                    >
                      {category}
                      <button
                        onClick={() => onFilterChange('categories', category)}
                        style={{ color: getThemeValue('colors.brand.primary') }}
                        className="ml-1 hover:opacity-80"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  {selectedFilters.materialTypes.map(type => (
                    <span 
                      key={type} 
                      style={{
                        backgroundColor: getThemeValue('colors.brand.avatar'),
                        color: getThemeValue('colors.brand.primary')
                      }}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                    >
                      {type.toUpperCase()}
                      <button
                        onClick={() => onFilterChange('materialTypes', type)}
                        style={{ color: getThemeValue('colors.brand.primary') }}
                        className="ml-1 hover:opacity-80"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {activeFiltersCount > 0 && (
                <div className="mt-4 pt-4 border-t flex justify-end">
                  <button
                    onClick={onClearFilters}
                    style={{ color: getThemeValue('colors.brand.primary') }}
                    className="text-sm hover:opacity-80"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;