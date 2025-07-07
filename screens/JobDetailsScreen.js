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
      <Text style={styles.company}>{job.company}</Text>
      <Text style={styles.title}>{job.title}</Text>
       <Text style={styles.location}>{job.location}</Text>
         <Text style={styles.type}>{job.type}</Text>
           <Text style={styles.date}>{job.date}</Text>
      <Text style={styles.description}>{job.description}</Text>
       <Text style={styles.salary}>{job.salary}</Text>
       <Text style={styles.benefits}>{job.benefits}</Text>
      {job.link ? (
        <TouchableOpacity onPress={() => Linking.openURL(job.link)}>
          <Text style={styles.link}>Proceed to apply</Text>
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
    padding: 40,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
  },
  company: {
    fontSize: 24,
    color: '#34495e',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
   benefits: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 10,
    textAlign: 'center',
  },
   location: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 10,
    textAlign: 'center',
  },
   type: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 10,
    textAlign: 'center',
  },
   date: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 10,
    textAlign: 'center',
  },
  salary: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 10,
    textAlign: 'center',
  },
  link: {
    color: '#3498db',
    fontSize: 16,
    textDecorationLine: 'underline',
    paddingBottom: 10,
    alignSelf: 'center',
  },
  backButton: {
    backgroundColor: '#e0e0e0',
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