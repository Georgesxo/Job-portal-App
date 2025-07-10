import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MainLayout from '../components/MainLayout';

export default function HomeScreen() {
  return (
      <MainLayout>
   <Text style={styles.title}>Welcome to Job Board</Text>
      <Text style={styles.subtitle}>
      </Text>
      </MainLayout>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#34495e',
    textAlign: 'center',
  },
});