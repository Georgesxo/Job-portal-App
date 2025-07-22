// components/CandidateDashboard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet,} from 'react-native';

const CandidateDashboard = ({ data, onEdit }) => {
  return (
    <View style={styles.dashboardContainer}>
      {data?.profilePictureUrl && (
        <Image source={{ uri: data.profilePictureUrl }} style={styles.profileImage} />
      )}

      <Text style={styles.dashboardLabel}>Program of Study:</Text>
      <Text style={styles.dashboardValue}>{data?.program}</Text>

      <Text style={styles.dashboardLabel}>Full Name:</Text>
      <Text style={styles.dashboardValue}>{data?.yourName}</Text>

      <Text style={styles.dashboardLabel}>Email:</Text>
      <Text style={styles.dashboardValue}>{data?.yourEmail}</Text>

      <Text style={styles.dashboardLabel}>Bio:</Text>
      <Text style={styles.dashboardValue}>{data?.bio}</Text>

      <Text style={styles.dashboardLabel}>Skills:</Text>
      <Text style={styles.dashboardValue}>{data?.skills}</Text>

      {/* Experience */}
      <Text style={styles.dashboardLabel}>Experience:</Text>
      {data?.experiences?.map((exp, i) => (
        <Text key={i} style={styles.dashboardValue}>
          {exp.title} at {exp.company} ({exp.startDate} - {exp.currentWork ? 'Present' : exp.endDate})
        </Text>
      ))}

      {/* Education */}
      <Text style={styles.dashboardLabel}>Education:</Text>
      {data?.education?.map((edu, i) => (
        <Text key={i} style={styles.dashboardValue}>
          {edu.degree} at {edu.institution} ({edu.startDate} - {edu.currentSchool ? 'Present' : edu.endDate})
        </Text>
      ))}

      <Text style={styles.dashboardLabel}>Resume:</Text>
      <TouchableOpacity onPress={() => Linking.openURL(data?.cvFileUrl)}>
        <Text style={styles.resumeLink}>📄 view Resume</Text>
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