// components/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true); // Critical!

  // Restore auth state on app start
  useEffect(() => {
    const restoreAuth = async () => {
      try {
        const savedToken = await AsyncStorage.getItem('authToken');
        const savedUser = await AsyncStorage.getItem('userData');

        if (savedToken && savedUser) {
          setToken(savedToken);
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Failed to restore auth', error);
      } finally {
        setIsLoadingAuth(false); // Always stop loading
      }
    };

    restoreAuth();
  }, []);

  // Dummy admin login — keep for testing
  const login = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    signOut();
  };

  // Real user sign in (from /signin response)
  const signIn = async (token, userData) => {
    setToken(token);
    setUser(userData);

    // Save to device
    await AsyncStorage.setItem('authToken', token);
    await AsyncStorage.setItem('userData', JSON.stringify(userData));

    setIsLoadingAuth(false);
  };

  const signUp = async (token, userData) => {
    console.log("Signing up user:", userData);
    signIn(token, userData); // Same logic
  };

  const signOut = async () => {
    setToken(null);
    setUser(null);
    setIsLoadingAuth(false);

    // Clear storage
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userData');
  };

  const authValues = {
    isAdmin,
    login,
    logout,
    user,
    token,
    signIn,
    signOut,
    signUp,
    isLoadingAuth, // ✅ Expose so screens can wait
  };

  return (
    <AuthContext.Provider value={authValues}>
      {!isLoadingAuth ? children : null}
    </AuthContext.Provider>
  );
}