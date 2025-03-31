import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

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
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  selectedFilters,
  activeFiltersCount,
  onFilterChange,
  onClearFilters
}) => {
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showMaterialDropdown, setShowMaterialDropdown] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm mb-4 border-b border-gray-200 dark:border-gray-700 sticky top-[4.5rem] z-20">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-wrap items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white py-2">
            All Resources
          </h2>

          <div className="flex flex-wrap items-center gap-2">
            {/* Theme Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowThemeDropdown(!showThemeDropdown);
                  setShowCategoryDropdown(false);
                  setShowMaterialDropdown(false);
                }}
                className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none"
              >
                Theme
                <ChevronDown className="ml-2 h-4 w-4" />
              </button>
              {showThemeDropdown && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {filters.themes.map((theme) => (
                      <div
                        key={theme}
                        className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                        onClick={() => {
                          onFilterChange('themes', theme);
                          setShowThemeDropdown(false);
                        }}
                      >
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={selectedFilters.themes.includes(theme)}
                          readOnly
                        />
                        <span className={`${selectedFilters.themes.includes(theme) ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                          {theme}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Category Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowCategoryDropdown(!showCategoryDropdown);
                  setShowThemeDropdown(false);
                  setShowMaterialDropdown(false);
                }}
                className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none"
              >
                Category
                <ChevronDown className="ml-2 h-4 w-4" />
              </button>
              {showCategoryDropdown && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {filters.categories.map((category) => (
                      <div
                        key={category}
                        className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                        onClick={() => {
                          onFilterChange('categories', category);
                          setShowCategoryDropdown(false);
                        }}
                      >
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={selectedFilters.categories.includes(category)}
                          readOnly
                        />
                        <span className={`${selectedFilters.categories.includes(category) ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                          {category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Material Type Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowMaterialDropdown(!showMaterialDropdown);
                  setShowThemeDropdown(false);
                  setShowCategoryDropdown(false);
                }}
                className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none"
              >
                Material Type
                <ChevronDown className="ml-2 h-4 w-4" />
              </button>
              {showMaterialDropdown && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {filters.materialTypes.map((type) => (
                      <div
                        key={type}
                        className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                        onClick={() => {
                          onFilterChange('materialTypes', type);
                          setShowMaterialDropdown(false);
                        }}
                      >
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={selectedFilters.materialTypes.includes(type)}
                          readOnly
                        />
                        <span className={`${selectedFilters.materialTypes.includes(type) ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                          {type.toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Clear Filters Button - Only show if there are active filters */}
            {activeFiltersCount > 0 && (
              <button
                onClick={onClearFilters}
                className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none"
              >
                Clear All
                <X className="ml-2 h-4 w-4" />
              </button>
            )}
          </div>
        </div>

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