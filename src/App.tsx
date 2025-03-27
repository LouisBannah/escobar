import React, { useState } from 'react';
import { UserProvider } from './contexts/UserContext';
import Toolkit from './components/Toolkit';
import ToolkitItemDetail from './components/ToolkitItemDetail';

const App: React.FC = () => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleItemSelect = (itemId: string) => {
    setSelectedItemId(itemId);
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
  };

  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-50">
        {selectedItemId ? (
          <ToolkitItemDetail
            itemId={selectedItemId}
            onBack={() => setSelectedItemId(null)}
          />
        ) : (
          <Toolkit />
        )}
      </div>
    </UserProvider>
  );
};

export default App;