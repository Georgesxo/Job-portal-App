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
import AuthProvider from './components/AuthContext';
import AdminLoginScreen from './screens/AdminLoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import { AuthContext } from './components/AuthContext';
const Stack = createStackNavigator();

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [isProfilePage, setIsProfilePage] = useState(false);

  // Navigation logic for BottomMenuBar and Header
  const renderMainContent = (navigation) => {
    if (isProfilePage) return <ProfileScreen />;
    if (activePage === 'jobs') return <JobsList navigation={navigation} />;
    if (activePage === 'applied') return <AppliedScreen />;
    if (activePage === 'messages') return <MessagesScreen />;
    return <HomeScreen />;
  };


// In your return statement:
return (
  <JobsProvider>
     <AuthProvider>
    <NavigationContainer>
       <AuthContext.Consumer>
      <View style={styles.container}>
        <View style={styles.mainContent}>
          <Header
            onEditProfile={() => {
              setIsProfilePage(true);
              setActivePage('profile');
            }}
            onPostJob={() => setActivePage('post-job')}
          />
         
           {({ token, signOut }) => (
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!token ? (
                  <>
                    <Stack.Screen name="SignUp" component={SignUpScreen} />
                    <Stack.Screen name="SignIn" component={SignInScreen} />
                  </>
                ) : (
                  <>
                    <Stack.Screen name="Home" component={HomeScreen} />
              {({ navigation }) =>
                activePage === 'post-job' ? (
                  <PostJob navigation={navigation} />
                ) : activePage === 'job-details' ? (
                  <JobDetailsScreen navigation={navigation} />
                ) : (
                  renderMainContent(navigation)
                )
              }
            
            <Stack.Screen name="JobProvider" component={JobProviderScreen} />
            <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
            <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
             </>
                )}
          </Stack.Navigator>
           )}
        </View>
        <BottomMenuBar
          activePage={activePage}
          setActivePage={setActivePage}
          setIsProfilePage={setIsProfilePage}
        />
      </View>
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
