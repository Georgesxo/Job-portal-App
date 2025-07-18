import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AppliedScreen() {
  return (
     
    <View style={styles.container}>
      <Text style={styles.title}>Your Applied Jobs</Text>
      <Text style={styles.subtitle}>You haven't applied to any jobs yet.</Text>
    </View>
  

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f9f9f9',
  },
   safeArea: {
    backgroundColor: 'grey', 
    paddingBottom: 10,
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#34495e',
    textAlign: 'center',
     },
});