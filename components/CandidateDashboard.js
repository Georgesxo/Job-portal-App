import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet } from 'react-native';

const CandidateDashboard = ({ data, onEdit }) => {
  return (
    <View style={styles.dashboardContainer}>
      <Image
        source={{ uri: data?.profileImageUrl }}
        style={styles.profileImage}
      />

      <Text style={styles.dashboardLabel}>Full Name:</Text>
      <Text style={styles.dashboardValue}>{data?.fullName}</Text>

      <Text style={styles.dashboardLabel}>Email:</Text>
      <Text style={styles.dashboardValue}>{data?.email}</Text>

      <Text style={styles.dashboardLabel}>Bio:</Text>
      <Text style={styles.dashboardValue}>{data?.bio}</Text>

      <Text style={styles.dashboardLabel}>Skills:</Text>
      <Text style={styles.dashboardValue}>{data?.skills?.join(', ')}</Text>

      <Text style={styles.dashboardLabel}>Resume:</Text>
      <TouchableOpacity onPress={() => Linking.openURL(data?.resumeUrl)}>
        <Text style={styles.resumeLink}>📄 View CV</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.editButton} onPress={onEdit}>
        <Text style={styles.editButtonText}>✏️ Edit My Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CandidateDashboard;

const styles = StyleSheet.create({
  dashboardContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  dashboardLabel: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  dashboardValue: {
    marginBottom: 10,
  },
  resumeLink: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  editButton: {
    backgroundColor: '#eee',
    padding: 10,
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 6,
  },
  editButtonText: {
    color: '#333',
  },
});
