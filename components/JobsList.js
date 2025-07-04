import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { JobsContext } from './JobsProvider';

export default function JobsList() {
  const { jobs, deleteJob } = useContext(JobsContext);

  const renderJob = ({ item }) => (
    <View style={styles.jobCard}>
      <Text style={styles.jobTitle}>{item.title}</Text>
      <Text style={styles.company}>{item.company}</Text>
      <Text style={styles.location}>{item.location}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.salary}>{item.salary}</Text>
      {item.link && (
        <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
          <Text style={styles.link}>View Details</Text>
        </TouchableOpacity>
      )}
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
    paddingTop: 80,
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
    fontSize: 20,
    color: '#2c3e50',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#7f8c8d',
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