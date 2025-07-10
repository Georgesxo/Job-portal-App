import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SystemUI from 'expo-system-ui';
SystemUI.setBackgroundColorAsync('#ffffff'); // Set the status bar color

import JobsProvider from './components/JobsProvider';
import Header from './components/Header';
import BottomMenuBar from './components/BottomMenuBar';
import HomeScreen from './screens/HomeScreen';
import JobsList from './components/JobsList';
import PostJob from './components/PostJob';
import ProfileScreen from './screens/ProfileScreen';
import AppliedScreen from './screens/AppliedScreen';
import MessagesScreen from './screens/MessagesScreen';
import JobDetailsScreen from './screens/JobDetailsScreen';
import JobProviderScreen from './screens/JobProviderScreen';
import AdminLoginScreen from './screens/AdminLoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import AuthProvider, { AuthContext } from './components/AuthContext';

const Stack = createStackNavigator();

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [isProfilePage, setIsProfilePage] = useState(false);

  return (
    <JobsProvider>
      <AuthProvider>
        <NavigationContainer>
          <AuthContext.Consumer>
            {({ token }) => (
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/* Authentication Screens */}
                {!token && (
                  <>
                    <Stack.Screen name="SignUp" component={SignUpScreen} />
                    <Stack.Screen name="SignIn" component={SignInScreen} />
                  </>
                )}

                {/* Protected Screens */}
                {token && (
                  <>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="JobsList" component={JobsList} />
                    <Stack.Screen name="Applied" component={AppliedScreen} />
                    <Stack.Screen name="Messages" component={MessagesScreen} />
                    <Stack.Screen name="PostJob" component={PostJob} />
                    <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                    <Stack.Screen name="JobProvider" component={JobProviderScreen} />
                    <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
                  </>
                )}
              </Stack.Navigator>
            )}
          </AuthContext.Consumer>
        </NavigationContainer>
      </AuthProvider>
    </JobsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
  },
  mainContent: {
    flex: 1,
    paddingBottom: 90,
  },
});