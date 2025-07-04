import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';

export default function JobDetailsScreen({ route, navigation }) {
  const { job } = route.params || {};

  if (!job) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Job not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.company}>{job.company}</Text>
      <Text style={styles.description}>{job.description}</Text>
      {job.link ? (
        <TouchableOpacity onPress={() => Linking.openURL(job.link)}>
          <Text style={styles.link}>Apply / View More</Text>
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Jobs</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#2c3e50',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  company: {
    fontSize: 18,
    color: '#34495e',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 20,
    textAlign: 'center',
  },
  link: {
    color: '#3498db',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginBottom: 20,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#2c3e50',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 10,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
     },
});