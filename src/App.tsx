import React, { useState } from 'react';
import { UserProvider, useUser } from './contexts/UserContext';
import { Toolkit } from './components/Toolkit';
import ToolkitItemDetail from './components/ToolkitItemDetail';
import LoginScreen from './components/LoginScreen';

const AppContent: React.FC = () => {
  const { user } = useUser();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  if (!user?.isAuthenticated) {
    return <LoginScreen />;
  }

  return (
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
  );
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
};

export default App;