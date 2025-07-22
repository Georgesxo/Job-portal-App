import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
     <SafeAreaView edges={['top']} style={styles.safeArea}>
              <SafeAreaView edges={['bottom']} style={styles.safeArea}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.company}>Company: {job.company}</Text>
      <Text style={styles.title}>Title: {job.title}</Text>
       <Text style={styles.location}>Location: {job.location}</Text>
         <Text style={styles.type}> Type: {job.type}</Text>
           <Text style={styles.date}>Date Posted: {job.date}</Text>
      <Text style={styles.description} multiline>Job Description: {job.description}</Text>
       <Text style={styles.salary}>Salary: {job.salary}</Text>
       <Text style={styles.benefits}>Benefits: {job.benefits}</Text>
      {job.link ? (
        <TouchableOpacity onPress={() => Linking.openURL(job.link)}>
          <Text style={styles.link}>Proceed to apply</Text>
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Jobs</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
        </SafeAreaView>

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
    color: '#7f8c8d',
     marginTop: -10,
    textAlign: 'center',
  },
  company: {
    fontSize: 24,
    color: '#7f8c8d',
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
   benefits: {
    fontSize: 16,
    color: '#7f8c8d',
  marginBottom: 5,
    paddingTop: -20,
    marginTop: -15,
    textAlign: 'center',
  },
   location: {
    fontSize: 16,
    color: '#7f8c8d',
   marginBottom: 5,
    paddingTop: -20,
    marginTop: -15,
    textAlign: 'center',
    paddingTop:-50,
  },
   type: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 5,
    paddingTop: -20,
    marginTop: -15,
    textAlign: 'center',
  },
   date: {
    fontSize: 16,
    color: '#7f8c8d',
   marginBottom: 5,
    paddingTop: -20,
    marginTop: -15,
    textAlign: 'center',
  },
  description: {
     fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 5,
    paddingTop: -20,
    marginTop: -15,
    textAlign: 'center',
  },
  salary: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 5,
    paddingTop: -20,
    marginTop: -15,
    textAlign: 'center',
  },
  link: {
    color: '#3498db',
    fontSize: 16,
    textDecorationLine: 'underline',
   marginBottom: 5,
    paddingTop: -20,
    marginTop: -15,
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