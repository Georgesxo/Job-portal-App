import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MessagesScreen() {
  return (
     <SafeAreaView edges={['top']} style={styles.safeArea}>
              <SafeAreaView edges={['bottom']} style={styles.safeArea}>
    <View style={styles.container}>
      <Text style={styles.title}>Your Messages</Text>
      <Text style={styles.subtitle}>You have no new messages.</Text>
    </View>
    </SafeAreaView>
   </SafeAreaView>
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