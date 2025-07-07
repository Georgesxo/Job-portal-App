import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = (username, password) => {
    // Replace with real authentication logic
    if (username === 'admin' && password === 'admin123') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAdmin(false);
  const signIn = (token, user) => {
    setToken(token);
    setUser(user);
  };
 const signOut = () => {
    setToken(null);
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
      <AuthContext.Provider value={{ user, token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
    </AuthContext.Provider>
  );
}