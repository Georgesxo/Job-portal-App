import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function BottomMenuBar({ activePage }) {
  const navigation = useNavigation();

  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
          <FontAwesome name="home" style={[styles.menuIcon, activePage === 'home' && styles.activeMenuIcon]} />
          <Text style={[styles.menuText, activePage === 'home' && styles.activeMenuText]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Profile')}>
          <FontAwesome name="user" style={[styles.menuIcon, activePage === 'profile' && styles.activeMenuIcon]} />
          <Text style={[styles.menuText, activePage === 'profile' && styles.activeMenuText]}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Jobs')}>
          <MaterialIcons name="work" style={[styles.menuIcon, activePage === 'jobs' && styles.activeMenuIcon]} />
          <Text style={[styles.menuText, activePage === 'jobs' && styles.activeMenuText]}>Jobs</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Applied')}>
          <Ionicons name="clipboard-outline" style={[styles.menuIcon, activePage === 'applied' && styles.activeMenuIcon]} />
          <Text style={[styles.menuText, activePage === 'applied' && styles.activeMenuText]}>Applied</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Messages')}>
          <Entypo name="message" style={[styles.menuIcon, activePage === 'messages' && styles.activeMenuIcon]} />
          <Text style={[styles.menuText, activePage === 'messages' && styles.activeMenuText]}>Messages</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 30,
    backgroundColor:'dark grey',
    zIndex: 90,
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    backgroundColor: '#2c3e50',
    borderTopWidth: 1,
    borderTopColor: '#34495e',
    paddingBottom: 10,
    paddingTop: 12,
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  menuIcon: {
    fontSize: 28,
    color: 'white',
    marginBottom: 4,
  },
  menuText: {
    fontSize: 13,
    color: 'white',
    textAlign: 'center',
  },
  activeMenuIcon: {
    color: '#3498db',
  },
  activeMenuText: {
    color: '#3498db',
    fontWeight: 'bold',
  },
});
