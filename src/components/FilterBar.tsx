import React, { useState } from 'react';
import { X, Filter, Search } from 'lucide-react';

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
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm mb-4 border-b border-gray-200 dark:border-gray-700 sticky top-[4.5rem] z-20">
      <div className="w-full max-w-screen-xl mx-auto px-6">
        {/* Main filter bar with search and filter button */}
        <div className="flex items-center gap-4 py-3">
          {/* Search Bar */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 sm:text-sm text-gray-900 dark:text-gray-100"
              placeholder="Search for tools, resources, materials..."
            />
          </div>
          
          {/* Filter Button */}
          <button
            onClick={() => setShowFiltersPanel(!showFiltersPanel)}
            className={`inline-flex items-center px-4 py-2 border ${activeFiltersCount > 0 ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-400 dark:bg-indigo-900 dark:bg-opacity-20 dark:text-indigo-300' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'} rounded-md shadow-sm text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none whitespace-nowrap`}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filter
            {activeFiltersCount > 0 && (
              <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-indigo-600 dark:bg-indigo-500 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </button>
        
          {/* Tools count */}
          <div className="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
            {totalToolsCount} {totalToolsCount === 1 ? 'tool' : 'tools'} found
          </div>
        </div>
        
        {/* Expandable Filters Panel */}
        {showFiltersPanel && (
          <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter By</h3>
              {activeFiltersCount > 0 && (
                <button
                  onClick={onClearFilters}
                  className="text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 flex items-center"
                >
                  Clear All
                  <X className="ml-1 h-3 w-3" />
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Theme Filter Section */}
              <div>
                <h4 className="font-medium text-xs uppercase text-gray-500 dark:text-gray-400 mb-2">Themes</h4>
                <div className="space-y-1">
                  {filters.themes.map((theme) => (
                    <div
                      key={theme}
                      className="flex items-center"
                    >
                      <input
                        type="checkbox"
                        id={`theme-${theme}`}
                        checked={selectedFilters.themes.includes(theme)}
                        onChange={() => onFilterChange('themes', theme)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label 
                        htmlFor={`theme-${theme}`}
                        className="ml-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                      >
                        {theme}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Category Filter Section */}
              <div>
                <h4 className="font-medium text-xs uppercase text-gray-500 dark:text-gray-400 mb-2">Categories</h4>
                <div className="space-y-1">
                  {filters.categories.map((category) => (
                    <div
                      key={category}
                      className="flex items-center"
                    >
                      <input
                        type="checkbox"
                        id={`category-${category}`}
                        checked={selectedFilters.categories.includes(category)}
                        onChange={() => onFilterChange('categories', category)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label 
                        htmlFor={`category-${category}`}
                        className="ml-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Material Type Filter Section */}
              <div>
                <h4 className="font-medium text-xs uppercase text-gray-500 dark:text-gray-400 mb-2">Material Types</h4>
                <div className="space-y-1">
                  {filters.materialTypes.map((type) => (
                    <div
                      key={type}
                      className="flex items-center"
                    >
                      <input
                        type="checkbox"
                        id={`material-${type}`}
                        checked={selectedFilters.materialTypes.includes(type)}
                        onChange={() => onFilterChange('materialTypes', type)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label 
                        htmlFor={`material-${type}`}
                        className="ml-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                      >
                        {type.toUpperCase()}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mt-2 pb-2">
            {selectedFilters.themes.map((theme) => (
              <div
                key={theme}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
              >
                {theme}
                <button
                  onClick={() => onFilterChange('themes', theme)}
                  className="ml-1 h-4 w-4 rounded-full flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {selectedFilters.categories.map((category) => (
              <div
                key={category}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100"
              >
                {category}
                <button
                  onClick={() => onFilterChange('categories', category)}
                  className="ml-1 h-4 w-4 rounded-full flex items-center justify-center hover:bg-purple-200 dark:hover:bg-purple-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {selectedFilters.materialTypes.map((type) => (
              <div
                key={type}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
              >
                {type.toUpperCase()}
                <button
                  onClick={() => onFilterChange('materialTypes', type)}
                  className="ml-1 h-4 w-4 rounded-full flex items-center justify-center hover:bg-green-200 dark:hover:bg-green-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;