import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Add this import
import { JobsContext } from './JobsProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainLayout from '../components/MainLayout';
export default function JobsList() {
  const { jobs } = useContext(JobsContext);
  const navigation = useNavigation(); // Add this line

  const renderJob = ({ item }) => (
    <View style={styles.jobCard}>
      <Text style={styles.company}>Company: {item.company}</Text>
      <Text style={styles.jobTitle}>Title: {item.title}</Text>
      <Text style={styles.location}>Location: {item.location}</Text>
      <Text style={styles.type}>Type: {item.type}</Text>
        <Text style={styles.salary}>Salary: {item.salary}</Text>
          <Text style={styles.date}>Date: {item.date}</Text>
      <Text style={styles.description} multiline>Description: 
        {item.description && item.description.length > 80
          ? item.description.substring(0, 80) + '...'
          : item.description}
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('JobDetails', { job: item })}>
        <Text style={styles.link}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  if (!jobs || jobs.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No jobs available.</Text>
      </View>
    );
  }

  return ( 
      <MainLayout>
    <FlatList
      data={jobs}
      keyExtractor={(item, idx) => item.id?.toString() || idx.toString()}
      renderItem={renderJob}
      contentContainerStyle={styles.listContent}
    />
    </MainLayout>   
  );
}
const styles = StyleSheet.create({
  listContent: {
    padding: 16,
    paddingTop: 30,
  },
  safeArea: {
    backgroundColor: 'grey', 
    paddingBottom: 10,
    paddingTop: 10,
  },
  jobCard: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  jobTitle: {
    fontSize: 15,
    color: '#7f8c8d',
    marginBottom: -1,
   
  },
  company: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 15,
    color: '#7f8c8d',
    marginBottom: 5,
    paddingTop: -20,
    marginTop: -15,
  },
  salary: {
    fontSize: 15,
    color: '#7f8c8d',
    marginBottom: 5,
    paddingTop: -20,
    marginTop: -15,
  },
  type: {
    fontSize: 15,
    color: '#7f8c8d',
    marginBottom: 5,
    paddingTop: -20,
    marginTop: -15,
  },
  date: {
    fontSize: 15,
    color: '#7f8c8d',
     marginBottom: 5,
    paddingTop: -20,
    marginTop: -15,  },
  benefits: {
    fontSize: 15,
    color: '#7f8c8d',
    marginBottom: 5,
    paddingTop: -20,
    marginTop: -15,
  },
  description: {
    fontSize: 15,
    color: '#7f8c8d',
    marginBottom: 5,
    paddingTop: -20,
    marginTop: -15,
  },
  link: {
    color: '#3498db',
    textDecorationLine: 'underline',
    fontSize: 15,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: '#7f8c8d',
  },
});