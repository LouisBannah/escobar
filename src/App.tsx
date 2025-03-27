import React, { useState } from 'react';
import Toolkit from './components/Toolkit';
import ToolkitItemDetail from './components/ToolkitItemDetail';
import LoginScreen from './components/LoginScreen';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleItemSelect = (itemId: string) => {
    setSelectedItemId(itemId);
  };

  const handleBack = () => {
    setSelectedItemId(null);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedItemId(null);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {selectedItemId ? (
        <ToolkitItemDetail itemId={selectedItemId} onBack={handleBack} onLogout={handleLogout} />
      ) : (
        <Toolkit onItemSelect={handleItemSelect} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;