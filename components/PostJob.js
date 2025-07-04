import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { JobsContext } from './JobsProvider';



export default function PostJob({ navigation }) {
  const { addJob } = useContext(JobsContext);

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
   const [location, setLocation] = useState('');
      const [type, setType] = useState('');
  const [description, setDescription] = useState('');
   const [salary, setSalary] = useState('');
   const [benefits, setBenefits] = useState('');
    const [date, setDate] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = () => {
    if (!title || !company || !location || !type || !description || !salary || !benefits || !date || !link) {
      Alert.alert('Please fill in all required fields.');
      return;
    }
    addJob({ title, company,location, type, description, salary, benefits, date, link });
    Alert.alert('Job posted successfully!');
    setTitle('');
    setCompany('');
    setLocation('');
    setType('');
    setDescription('');
    setSalary('');
    setBenefits('');
    Date(new Date().toLocaleDateString());
    setLink('');
    if (navigation) navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Post a New Job</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Job Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter job title"
        />
        <Text style={styles.label}>Company</Text>
        <TextInput
          style={styles.input}
          value={company}
          onChangeText={setCompany}
          placeholder="Enter company name"
        />
         <Text style={styles.label}>Job Location</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="Enter job location"
        />
         <Text style={styles.label}>Job Type</Text>
          <TextInput
          style={styles.input}
          value={type}
          onChangeText={setType}
          placeholder="Enter job Type (e.g., Full-time, Part-time, Contract)"
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter job description"
          multiline
          numberOfLines={100}
        />
         <Text style={styles.label}>Job Salary</Text>
        <TextInput
          style={styles.input}
          value={salary}
          onChangeText={setSalary}
          placeholder="Enter salary"
        />
         <Text style={styles.label}>Job Benefits</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          value={salary}
          onChangeText={setBenefits}
          placeholder="Enter Job Benefits"
          multiline
          numberOfLines={100}
        />
          <Text style={styles.label}>Date Posted</Text>
        <TextInput
          style={styles.input}
          value={salary}
          onChangeText={setDate}
          placeholder="Enter Date Posted"
        />
        
        <Text style={styles.label}>Link (optional)</Text>
        <TextInput
          style={styles.input}
          value={link}
          onChangeText={setLink}
          placeholder="Enter application link"
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Post Job</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
     marginBottom: 80,
    backgroundColor: '#f9f9f9',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    color: '#2c3e50',
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: '#2c3e50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    fontSize: 14,
    marginBottom: 14,
    backgroundColor: '#f9f9f9',
  },
  textarea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 4,
    paddingVertical: 12,
    alignSelf: 'center',
    marginTop: 8,
    width:150,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
     alignSelf: 'center',
  },
});