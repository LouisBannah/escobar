import React, { createContext, useContext, useState } from 'react';

interface User {
  accessLevel: 1 | 2;
  email: string;
  isAuthenticated: boolean;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string) => {
    setUser({
      accessLevel: 1,
      email,
      isAuthenticated: true
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 