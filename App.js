import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {StyleSheet}  from 'react-native';
import JobsProvider from './components/JobsProvider';
import AuthProvider, { AuthContext } from './components/AuthContext';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import HomeScreen from './screens/HomeScreen';
import JobsList from './components/JobsList';
import PostJob from './components/PostJob';
import ProfileScreen from './screens/ProfileScreen';
import AppliedScreen from './screens/AppliedScreen';
import MessagesScreen from './screens/MessagesScreen';
import JobDetailsScreen from './screens/JobDetailsScreen';
import JobProviderScreen from './screens/JobProviderScreen';
import AdminLoginScreen from './screens/AdminLoginScreen';

const Stack = createStackNavigator();
 const Tab = createBottomTabNavigator();
// --- Stack for logged-in users ---
function  RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Jobs" component={JobsList} />
      <Stack.Screen name="Applied" component={AppliedScreen} />
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
      <Stack.Screen name="PostJob" component={PostJob} />
      <Stack.Screen name="JobProvider" component={JobProviderScreen} />
      <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
    </Stack.Navigator>
  );
}

// --- Auth Stack ---
function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  );
}

// --- Main App ---
export default function App() {
  return (
    
      <AuthProvider>
        <JobsProvider>
        <NavigationContainer>
          <AuthContext.Consumer>
            {({ token }) => token ? < RootStack /> : <AuthNavigator />}
          </AuthContext.Consumer>
        </NavigationContainer>
         </JobsProvider>
      </AuthProvider>
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