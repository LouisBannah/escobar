import React, { useState } from 'react';
import { UserProvider, useUser } from './contexts/UserContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toolkit } from './components/Toolkit';
import ToolkitItemDetail from './components/ToolkitItemDetail';
import LoginScreen from './components/LoginScreen';
import ThemeToggle from './components/ThemeToggle';

const AppContent: React.FC = () => {
  const { user } = useUser();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  if (!user?.isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen">
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
    <ThemeProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;