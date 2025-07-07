import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function Header({ onEditProfile, onPostJob }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const navigation = useNavigation();
const { signOut } = useContext(AuthContext);
signOut();
navigation.replace('SignIn');
 
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications" size={30} color="white"  marginRight="30"/>
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            placeholder="Search for jobs, companies..."
            placeholderTextColor="#ccc"
          />
        </View>
      
        <TouchableOpacity style={styles.iconButton} onPress={() => setIsDropdownOpen(true)}>
          <FontAwesome name="user-circle" size={30} color="white" marginLeft='15'/>
        </TouchableOpacity>

        <Modal
          visible={isDropdownOpen}
          transparent
          animationType="fade"
          onRequestClose={() => setIsDropdownOpen(false)}
        >
          <TouchableOpacity style={styles.modalOverlay} onPress={() => setIsDropdownOpen(false)}>
            <View style={styles.dropdownMenu}>
              <TouchableOpacity onPress={() => { setIsDropdownOpen(false); onEditProfile(); }}>
              <Text style={styles.dropdownItem}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setIsDropdownOpen(false); /* settings logic */ }}>
              <Text style={styles.dropdownItem}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setIsDropdownOpen(false); /* logout logic */ }}>
              <Text style={styles.dropdownItem}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setIsDropdownOpen(false); onPostJob(); }}>
              <Text style={styles.dropdownItem}>Post Job</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setIsDropdownOpen(false); navigation.navigate('AdminLogin'); }}>
              <Text style={styles.dropdownItem}>Admin Panel</Text>
            </TouchableOpacity>
                 </View>
              </TouchableOpacity>
               </Modal>
            </View>
    </SafeAreaView>
  );
}
 
const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'grey', 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c3e50', // Only header has background
    height: 80,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignSelf: 'stretch', // Fill width
    marginTop: 20, // No margin at the top
  },
  searchBar: {
    flex: 1,
    marginRight: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 12,
    height: 36,
    fontSize: 16,
  },
  iconButton: {
    marginLeft: 14,
    marginTop: 4,
  },
 
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingTop: 100,
    paddingRight: 1,
  },
  dropdownMenu: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 8,
    width: 150,
    elevation: 15,
  },
  dropdownItem: {
    padding: 12,
    fontSize: 16,
    color: '#2c3e50',
  },
});