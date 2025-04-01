import React, { useState, useEffect } from 'react';
import DetailedCard from './DetailedCard';
import ExpandedCard from './ExpandedCard';
import FeedbackCard from './FeedbackCard';
import PDFViewer from './PDFViewer';
import ToolkitHeader from './ToolkitHeader';
import FilterBar from './FilterBar';
import CardGrid from './CardGrid';
import { toolkitItems as importedToolkitItems } from '../data/toolkitItems';
import { useUser } from '../contexts/UserContext';
import { useTheme } from '../contexts/ThemeContext';
import { ToolkitItem, DetailedCardItem, ExpandedCardItem, Filters } from '../types';

export const Toolkit: React.FC = () => {
  // Add debugging
  useEffect(() => {
    console.log('Toolkit component mounted');
    // Check if toolkitItems is loaded
    console.log('Toolkit items count:', importedToolkitItems?.length || 'no items found');
  }, []);

  // Use the User context
  const { user, logout } = useUser();
  const { getThemeValue } = useTheme();

  // Toolkit items - we keep setToolkitItems for future use even though it's not currently used
  const [toolkitItems] = useState<ToolkitItem[]>(importedToolkitItems || []);

  // Get unique categories and material types from the data
  const uniqueCategories = [...new Set(importedToolkitItems.map(item => item.category))];
  const uniqueMaterialTypes = [...new Set(
    importedToolkitItems.flatMap(item => 
      item.materials.map(material => material.type.toLowerCase())
    )
  )];

  // State for search and filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({
    themes: [],
    categories: [],
    materialTypes: []
  });
  const [availableFilters] = useState<Filters>({
    themes: ['Sales', 'Delivery', 'Quality Assurance'],
    categories: uniqueCategories,
    materialTypes: uniqueMaterialTypes
  });

  // UI state
  const [currentItemId, setCurrentItemId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState<{ url: string; title: string } | null>(null);

  // Calculate filtered items based on search and filters
  const filteredItems = toolkitItems.filter(item => {
    // Text search
    const matchesSearch = searchQuery === '' ||
      item.shortTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    // Theme filter
    const matchesTheme = filters.themes.length === 0 ||
      filters.themes.includes(item.theme);

    // Category filter
    const matchesCategory = filters.categories.length === 0 ||
      filters.categories.includes(item.category);

    // Material type filter
    const matchesMaterialType = filters.materialTypes.length === 0 ||
      item.materials.some(material => 
        filters.materialTypes.includes(material.type.toLowerCase())
      );

    return matchesSearch && matchesTheme && matchesCategory && matchesMaterialType;
  });

  // Count active filters
  const activeFiltersCount = 
    filters.themes.length + 
    filters.categories.length + 
    filters.materialTypes.length;

  // Handle filter changes
  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setFilters(prevFilters => {
      // If the value is already in the filter, remove it (toggle behavior)
      if (prevFilters[filterType].includes(value)) {
        return {
          ...prevFilters,
          [filterType]: prevFilters[filterType].filter(item => item !== value)
        };
      } 
      // Otherwise add it to the filter
      else {
        return {
          ...prevFilters,
          [filterType]: [...prevFilters[filterType], value]
        };
      }
    });
  };

  // Handle theme filter change
  const handleThemeFilterChange = (theme: string) => {
    handleFilterChange('themes', theme);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      themes: [],
      categories: [],
      materialTypes: []
    });
  };

  // Handle card close
  const handleCloseCard = () => {
    setCurrentItemId(null);
  };

  // Handle request access
  const handleRequestAccess = (itemId: string) => {
    // Logic for access request
    console.log('Access requested for', itemId);
  };

  // Handle PDF close
  const handleClosePDF = () => {
    setSelectedPDF(null);
  };

  // Handle download
  const handleDownload = (url: string) => {
    window.open(url, '_blank');
  };

  // Handle logout
  const handleLogout = () => {
    // Logout logic
    logout();
  };

  // Get the structure style with fixed background image
  const bgStyle = {
    backgroundImage: "url('/documents/background4.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat"
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: getThemeValue('colors.background'),
      position: 'relative',
      ...bgStyle
    }}>
      {/* Background pattern or image - using opacity for subtle effect */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#000000',
        opacity: getThemeValue('currentMode') === 'light' ? 0.05 : 0.1,
        zIndex: 0
      }}></div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Header with profile and theme buttons */}
        <ToolkitHeader 
          user={user}
          onLogout={handleLogout}
          activeThemeFilters={filters.themes}
          onThemeFilterChange={handleThemeFilterChange}
        />

        {/* Filter bar with search */}
        <FilterBar 
          filters={availableFilters}
          selectedFilters={filters}
          activeFiltersCount={activeFiltersCount}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalToolsCount={filteredItems.length}
        />

        {/* Main grid of cards */}
        <CardGrid 
          items={filteredItems}
          onCardClick={setCurrentItemId}
        />

        {/* Card Modal */}
        {currentItemId && (
          user?.accessLevel === 2 ? (
            <ExpandedCard
              item={toolkitItems.find(item => item.id === currentItemId) as ExpandedCardItem}
              onClose={handleCloseCard}
            />
          ) : (
            <DetailedCard
              item={toolkitItems.find(item => item.id === currentItemId) as DetailedCardItem}
              onClose={handleCloseCard}
              onRequestAccess={handleRequestAccess}
            />
          )
        )}

        {/* Feedback popup */}
        {showFeedback && (
          <FeedbackCard
            onClose={() => setShowFeedback(false)}
            item={toolkitItems.find(item => item.id === currentItemId) as DetailedCardItem}
          />
        )}

        {/* PDF Viewer */}
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