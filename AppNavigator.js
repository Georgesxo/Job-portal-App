import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';
import SideMenuBar from '../components/SideMenuBar';
import HomeScreen from '../screens/HomeScreen';
import JobsList from '../components/JobsList';
import PostJob from '../components/PostJob';
import ProfileScreen from '../screens/ProfileScreen';
import AppliedScreen from '../screens/AppliedScreen';
import MessagesScreen from '../screens/MessagesScreen';
import JobDetailsScreen from '../screens/JobDetailsScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const [activePage, setActivePage] = useState('home');
  const [isProfilePage, setIsProfilePage] = useState(false);

  // Navigation logic for SideMenuBar and Header
  const renderMainContent = (navigation) => {
    if (isProfilePage) return <ProfileScreen />;
    if (activePage === 'jobs') return <JobsList navigation={navigation} />;
    if (activePage === 'applied') return <AppliedScreen />;
    if (activePage === 'messages') return <MessagesScreen />;
    return <HomeScreen />;
  };

  return (
    <View style={styles.container}>
      <SideMenuBar
        activePage={activePage}
        setActivePage={setActivePage}
        setIsProfilePage={setIsProfilePage}
      />
      <View style={styles.mainContent}>
        <Header
          onEditProfile={() => {
            setIsProfilePage(true);
            setActivePage('profile');
          }}
          onPostJob={() => setActivePage('post-job')}
        />
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Main"
        >
          <Stack.Screen name="Main">
            {({ navigation }) =>
              activePage === 'post-job' ? (
                <PostJob navigation={navigation} />
              ) : activePage === 'job-details' ? (
                <JobDetailsScreen navigation={navigation} />
              ) : (
                renderMainContent(navigation)
              )
            }
          </Stack.Screen>
          <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
        </Stack.Navigator>
      </View>
    </View>
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
    marginLeft: 90, 
  },
});