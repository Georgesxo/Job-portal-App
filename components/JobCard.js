import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Linking, ScrollView } from 'react-native';

const JobCard = ({ job }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleApplyClick = () => {
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  const handleOpenLink = () => {
    if (job.apply_link) {
      Linking.openURL(job.apply_link);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Title: {job.job_title}</Text>
      <Text style={styles.company}>Company: {job.company_name}</Text>
      <Text style={styles.detail}>Location: {job.location}</Text>
       <Text style={styles.detail}>Job Type: {job.job_type}</Text>
       <Text style={styles.detail}>Description: {job.description}</Text>
      <Text style={styles.detail}>Salary: {job.salary_formatted || 'Not specified'}</Text>
      <Text style={styles.detail}>Description: {job.description}</Text>
      <Text style={styles.detail}>Date Posted: {job.date_posted}</Text>

      <TouchableOpacity onPress={handleApplyClick}>
        <Text style={styles.applyLink}>Apply Here</Text>
      </TouchableOpacity>

      <Modal
        visible={showDetails}
        animationType="slide"
        transparent
        onRequestClose={handleCloseDetails}
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <ScrollView>
              <Text style={styles.modalTitle}>{job.job_title}</Text>
              <Text style={styles.company}>Company: {job.company_name}</Text>
              <Text style={styles.detail}>Job Type: {job.job_type}</Text>
              <Text style={styles.detail}>Location: {job.location}</Text>
                <Text style={styles.detail}>Description: {job.description_text}</Text>
               <Text style={styles.detail}>Salary: {job.salary_formatted || 'Not specified'}</Text>
              <Text style={styles.detail}>Date Posted: {job.date_posted}</Text>
              <Text style={styles.detail}>Benefits: {job.benefits}</Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleOpenLink} style={styles.applyButton}>
                  <Text style={styles.buttonText}>Proceed to Apply</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCloseDetails} style={styles.closeButton}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
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
    fontSize: 14,
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
  closeButton: {
    backgroundColor: '#FF0000',
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
