import React, { createContext, useState } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component that wraps the app and provides auth state
export default function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Dummy admin login logic — replace with real API call later
  const login = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAdmin(false);

  // Sign in user with token and user data
  const signIn = (token, user) => {
    setToken(token);
    setUser(user);
  };

  // Sign up user — same as signIn for now (you can customize later)
  const signUp = (token, user) => {
     console.log("Signing up user:", user);
    setToken(token);
    setUser(user);
  };

  const signOut = () => {
    setToken(null);
    setUser(null);
  };

  // Context value passed to consumers
  const authValues = {
    isAdmin,
    login,
    logout,
    user,
    token,
    signIn,
    signOut,
    signUp, // ✅ Now correctly exported
  };

  return (
    <AuthContext.Provider value={authValues}>
      {children}
    </AuthContext.Provider>
  );
}