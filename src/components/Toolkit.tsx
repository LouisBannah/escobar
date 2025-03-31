import React, { useState, useEffect } from 'react';
import { Search, X, FileText, Archive, Table, Presentation, Code, Globe, ChevronDown, Bell, LogOut } from 'lucide-react';
import DetailedCard from './DetailedCard';
import ExpandedCard from './ExpandedCard';
import FeedbackModal from './FeedbackModal';
import PDFViewer from './PDFViewer';
import ThemeToggle from './ThemeToggle';
import BaseCard from './BaseCard';
import ToolkitHeader from './ToolkitHeader';
import FilterBar from './FilterBar';
import CardGrid from './CardGrid';
import { toolkitItems as importedToolkitItems } from '../data/toolkitItems';
import { useUser } from '../contexts/UserContext';
import { ToolkitItem, DetailedCardItem, ExpandedCardItem, Filters } from '../types';

export const Toolkit: React.FC = () => {
  // Use the User context
  const { user, logout } = useUser();

  // Toolkit items
  const [toolkitItems, setToolkitItems] = useState<ToolkitItem[]>(importedToolkitItems || []);

  // State for search and filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({
    themes: [],
    categories: [],
    materialTypes: []
  });
  const [availableFilters, setAvailableFilters] = useState<Filters>({
    themes: ['Sales', 'Delivery', 'Quality Assurance'],
    categories: ['Client Success', 'API', 'Integration', 'Monitoring', 'Deployment', 'Documentation'],
    materialTypes: ['pdf', 'docx', 'ppt', 'xls', 'zip']
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

  // Handle PDF viewer
  const handleViewPDF = (url: string, title: string) => {
    setSelectedPDF({ url, title });
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative">
      {/* Background pattern or image */}
      <div className="absolute inset-0 bg-pattern opacity-5 dark:opacity-10 z-0"></div>

      <div className="relative z-10">
        {/* Header with search and profile */}
        <ToolkitHeader 
          user={user}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onLogout={handleLogout}
        />

        {/* Filter bar */}
        <FilterBar 
          filters={availableFilters}
          selectedFilters={filters}
          activeFiltersCount={activeFiltersCount}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
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