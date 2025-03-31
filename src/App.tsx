import React, { useState, useEffect } from 'react';
import { UserProvider, useUser } from './contexts/UserContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toolkit } from './components/Toolkit';
import ToolkitItemDetail from './components/ToolkitItemDetail';
import LoginScreen from './components/LoginScreen';

const AppContent: React.FC = () => {
  const { user } = useUser();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  
  useEffect(() => {
    console.log('AppContent rendered, user state:', user);
    if (user?.isAuthenticated) {
      console.log('User is authenticated, should render Toolkit');
    } else {
      console.log('User is not authenticated, should render LoginScreen');
    }
  }, [user]);

  if (!user?.isAuthenticated) {
    return <LoginScreen />;
  }

  // If we get here, we should be rendering the main content
  console.log('Rendering main content');
  
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
  useEffect(() => {
    console.log('App component mounted');
  }, []);
  
  return (
    <ThemeProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;