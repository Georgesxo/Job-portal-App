import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Header';
import BottomMenuBar from './BottomMenuBar';


export default function MainLayout({ children }) {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        {children}
      </View>
      <BottomMenuBar />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', marginBottom:-30,},
  content: { flex: 1 },
});