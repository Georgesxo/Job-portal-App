import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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
import AuthProvider, { AuthContext } from './components/AuthContext';
import AdminLoginScreen from './screens/AdminLoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';

const Stack = createStackNavigator();

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [isProfilePage, setIsProfilePage] = useState(false);

  return (
    <JobsProvider>
      <AuthProvider>
        <NavigationContainer>
          <AuthContext.Consumer>
            {({ token, signOut }) => (
              <View style={styles.container}>
                <Header
                  onEditProfile={() => {
                    setIsProfilePage(true);
                    setActivePage('profile');
                  }}
                  onPostJob={() => setActivePage('post-job')}
                />

                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  {!token ? (
                    <>
                      <Stack.Screen name="SignUp" component={SignUpScreen} />
                      <Stack.Screen name="SignIn" component={SignInScreen} />
                    </>
                  ) : (
                    <>
                      {/* Always show Home Screen */}
                      <Stack.Screen name="Home" component={HomeScreen} />

                      {/* Conditionally add extra screens based on activePage */}
                      {activePage === 'jobs' && (
                        <Stack.Screen name="JobsList" component={JobsList} />
                      )}

                      {activePage === 'applied' && (
                        <Stack.Screen name="Applied" component={AppliedScreen} />
                      )}

                      {activePage === 'messages' && (
                        <Stack.Screen name="Messages" component={MessagesScreen} />
                      )}

                      {activePage === 'post-job' && (
                        <Stack.Screen name="PostJob" component={PostJob} />
                      )}

                      {activePage === 'job-details' && (
                        <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
                      )}

                      {isProfilePage && (
                        <Stack.Screen name="Profile" component={ProfileScreen} />
                      )}

                      {/* Static Screens */}
                      <Stack.Screen name="JobProvider" component={JobProviderScreen} />
                      <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
                    </>
                  )}
                </Stack.Navigator>

                <BottomMenuBar
                  activePage={activePage}
                  setActivePage={setActivePage}
                  setIsProfilePage={setIsProfilePage}
                />
              </View>
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
    backgroundColor: '#f9f9f9',
  },
});