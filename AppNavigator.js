import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';
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

// --- Bottom Tabs Navigator ---
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#3498db',
        tabBarStyle: { backgroundColor: '#2c3e50' },
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') return <FontAwesome name="home" size={size} color={color} />;
          if (route.name === 'Profile') return <FontAwesome name="user" size={size} color={color} />;
          if (route.name === 'Jobs') return <MaterialIcons name="work" size={size} color={color} />;
          if (route.name === 'Applied') return <Ionicons name="clipboard-outline" size={size} color={color} />;
          if (route.name === 'Messages') return <Entypo name="message" size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Jobs" component={JobsList} />
      <Tab.Screen name="Applied" component={AppliedScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
    </Tab.Navigator>
  );
}

// --- Stack for logged-in users ---
function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={MainTabs} />
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
    <JobsProvider>
      <AuthProvider>
        <NavigationContainer>
          <AuthContext.Consumer>
            {({ token }) => token ? <AppNavigator /> : <AuthNavigator />}
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