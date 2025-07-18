import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Linking, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const JobCard = ({ job }) => {
  const [showDetails, setShowDetails] = useState(false);


  const handleOpenLink = () => {
    if (job.apply_link) {
      Linking.openURL(job.apply_link);
    }
    setShowDetails(true);
  };

  return (
     <SafeAreaView edges={['top']} style={styles.safeArea}>
              <SafeAreaView edges={['bottom']} style={styles.safeArea}>
    <View style={styles.card}>
      <Text style={styles.company}>Company: {job.company_name}</Text>
      <Text style={styles.title}>Title: {job.job_title}</Text>
      <Text style={styles.detail}>Location: {job.location}</Text>
       <Text style={styles.detail}>Job Type: {job.job_type}</Text>
        <Text style={styles.detail}>Date Posted: {job.date_posted}</Text>
       <Text style={styles.detail}>Description: {job.description}</Text>
      <Text style={styles.detail}>Salary: {job.salary_formatted || 'Not specified'}</Text>
      <Text style={styles.detail}>Description: {job.description}</Text>
     

     

    
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <ScrollView>
            <Text style={styles.company}>Company: {job.company_name}</Text>
                <Text style={styles.modalTitle}>{job.job_title}</Text>
              <Text style={styles.detail}>Job Type: {job.job_type}</Text>
              <Text style={styles.detail}>Location: {job.location}</Text>
               <Text style={styles.detail}>Date Posted: {job.date_posted}</Text>
                <Text style={styles.detail}>Description: {job.description_text}</Text>
               <Text style={styles.detail}>Salary: {job.salary_formatted || 'Not specified'}</Text>
              <Text style={styles.detail}>Benefits: {job.benefits}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleOpenLink} style={styles.applyButton}>
                  <Text style={styles.buttonText}>Proceed to Apply</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
    </View>
    </SafeAreaView>
     </SafeAreaView>
  );
};

export default JobCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginVertical: 12,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  safeArea: {
    backgroundColor: 'grey', 
    paddingBottom: 10,
    paddingTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  company: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  detail: {
    fontSize: 15,
    marginBottom: 2,
  },
  applyLink: {
    color: '#007BFF',
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  applyButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
