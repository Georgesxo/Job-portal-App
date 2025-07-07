import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Add this import
import { JobsContext } from './JobsProvider';

export default function JobsList() {
  const { jobs } = useContext(JobsContext);
  const navigation = useNavigation(); // Add this line

  const renderJob = ({ item }) => (
    <View style={styles.jobCard}>
      <Text style={styles.company}>{item.company}</Text>
      <Text style={styles.jobTitle}>{item.title}</Text>
      <Text style={styles.location}>{item.location}</Text>
      <Text style={styles.type}>{item.type}</Text>
        <Text style={styles.salary}>{item.salary}</Text>
          <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.description}>
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
    <FlatList
      data={jobs}
      keyExtractor={(item, idx) => item.id?.toString() || idx.toString()}
      renderItem={renderJob}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
    paddingTop: 40,
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
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 5,
   
  },
  company: {
    fontSize: 20,
    color: '#34495e',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  salary: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  type: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  benefits: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 8,
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