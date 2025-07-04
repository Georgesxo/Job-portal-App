import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import { JobsContext } from '../components/JobsProvider';
import { AuthContext } from '../components/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function JobProviderScreen(){
  const { jobs, deleteJob } = useContext(JobsContext);
   const { isAdmin, logout } = useContext(AuthContext);
   const navigation = useNavigation();
  if (!isAdmin) {
    navigation.replace('AdminLogin');
    return null;
  }
   const handleLogout = () => {
 if (logout) {
      navigation.replace('AdminLogin');
 }
};

return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Admin: Manage Jobs</Text>
      {jobs.map(job => (
        <View key={job.id} style={styles.jobCard}>
          <Text style={styles.title}>{job.title}</Text>
         <Text style={styles.company}>{job.company}</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteJob(job.id)}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
          <AuthContext.Provider value={{logout }}>
              </AuthContext.Provider>
        </View>
      ))}
       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
  <Text style={styles.logoutText}>Logout</Text>
</TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20,},
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  jobCard: { marginBottom: 16, padding: 12, backgroundColor: '#f9f9f9', borderRadius: 6 },
  title: { fontWeight: 'bold', fontSize: 17 },
  company: { fontSize: 15, fontWeight: 'bold'  },
  deleteButton: { marginTop: 8, backgroundColor: '#f44336', padding: 2, width:100, borderRadius: 4 },
  deleteText: { color: 'white', textAlign: 'center' },
  logoutButton: {backgroundColor: '#3498db',marginTop: 100, alignSelf: "center", paddingBottom: 4, width:120, padding: 2, borderRadius: 4,},
 logoutText: { color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 18},
}); 