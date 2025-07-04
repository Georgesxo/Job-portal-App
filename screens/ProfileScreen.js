import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Switch, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';


export default function ProfileScreen() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [program, setProgram] = useState('');
  const [yourName, setYourName] = useState('');
  const [yourEmail, setYourEmail] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');
  const [jobType, setJobType] = useState('');
  const [socialHandles, setSocialHandles] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    LinkedIn: '',
    Website: '',
    github: '',
  });

  // For simplicity, experience and education are not fully implemented here.
  // You can expand with FlatList or custom components as needed.

   const [isProfilePage, setIsProfilePage] = useState(false);
  const [_isEditingExperience, _setIsEditingExperience] = useState(false);
  const [_isEditingEducation, _setIsEditingEducation] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };
  const handleSocialHandleChange = (platform, value) => {
    setSocialHandles((prev) => ({ ...prev, [platform]: value }));
  };

  const handleSaveProfile = () => {
    const profileData = {
      profilePicture,
      program,
      yourName,
      yourEmail,
      bio,
      skills,
      experience,
      education,
      jobType,
      socialHandles,
    };
    console.log("Profile data:", profileData);
    alert("Profile saved successfully!");
    setIsProfilePage(false);
  };

  const addExperienceSection = () => {
    const newId = experienceSections.length;
    setExperienceSections([
      ...experienceSections, 
      { id: newId, isEditing: true, savedData: null, isExpanded: false }
    ]);
  };
const [experienceSections, setExperienceSections] = useState([
  {
    id: 0,
    isEditing: true,
    savedData: {}, // <-- savedData is null here
    isExpanded: false,
  },
]);

  const handleSave = (id, e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const savedData = {
      company: formData.get('company'),
      title: formData.get('title'),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      currentWork: formData.get('currentWork') === 'on',
      description: formData.get('description')
    };

    setExperienceSections(experienceSections.map(section => 
      section.id === id 
        ? { ...section, isEditing: false, savedData } 
        : section
    ));
  };

  const handleRemove = (id) => {
    setExperienceSections(experienceSections.filter(section => section.id !== id));
  };

  const handleEdit = (id) => {
    setExperienceSections(experienceSections.map(section => 
      section.id === id 
        ? { ...section, isEditing: true } 
        : section
    ));
  };

  const handleCancel = (id) => {
    setExperienceSections(experienceSections.map(section => 
      section.id === id 
        ? { ...section, isEditing: false } 
        : section
    ));
  };
  
  
  const getTruncatedContent = (content, isExpanded) => {
    if (isExpanded || content.length <= 50) {
      return content;
    }
    return content.substring(0, 50) + '...';
  };

  const toggleExpand = (id) => {
    setExperienceSections(experienceSections.map(section => 
      section.id === id 
        ? { ...section, isExpanded: !section.isExpanded } 
        : section
    ));

    // Ensure the container expands by dynamically adding/removing a CSS class
    const container = document.querySelector(`.experience-section[data-id='${id}'] .description-container`);
    if (container) {
      container.classList.toggle('expanded');
    }
  };
const handleFieldChange = (id, field, value) => {
  setExperienceSections(prev =>
    prev.map(section =>
      section.id === id
        ? {
            ...section,
            savedData: {
              ...section.savedData,
              [field]: value,
            },
          }
        : section
    )
  );
};


 
 
  const addEducationSection = () => {
    const newId = educationSections.length;
    setEducationSections([
      ...educationSections, 
      { id: newId, isEditing: true, savedData: null, isExpanded: false }
    ]);
  };
const [educationSections, setEducationSections] = useState([
  {
    id: 0,
    isEditing: true,
    savedData: {}, // <-- savedData is null here
    isExpanded: false,
  },
]);

  const handleEducationSave = (id, e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const savedData = {
      institution: formData.get('Institution'),
      degree: formData.get('Degree'),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      currentStudy: formData.get('currentWork') === 'on',
      description: formData.get('description')
    };
     setEducationSections(educationSections.map(section => 
      section.id === id 
        ? { ...section, isEditing: false, savedData } 
        : section
    ));
  };

  const handleEducationRemove = (id) => {
    setEducationSections(educationSections.filter(section => section.id !== id));
  };

  const handleEducationEdit = (id) => {
    setEducationSections(educationSections.map(section => 
      section.id === id 
        ? { ...section, isEditing: true } 
        : section
    ));
  };

  const handleEducationCancel = (id) => {
    setEducationSections(educationSections.map(section => 
      section.id === id 
        ? { ...section, isEditing: false } 
        : section
    ));
  };
  
  
  const getTruncatedEducationContent = (content, isExpanded) => {
    if (isExpanded || content.length <= 50) {
      return content;
    }
    return content.substring(0, 50) + '...';
  };

  const toggleEducationExpand = (id) => {
    setEducationSections(educationSections.map(section => 
      section.id === id 
        ? { ...section, isExpanded: !section.isExpanded } 
        : section
    ));

    // Ensure the container expands by dynamically adding/removing a CSS class
    const container = document.querySelector(`.education-section[data-id='${id}'] .description-container`);
    if (container) {
      container.classList.toggle('expanded');
    }
  };
const handleEducationFieldChange = (id, field, value) => {
  setEducationSections(prev =>
    prev.map(section =>
      section.id === id
        ? {
            ...section,
            savedData: {
              ...section.savedData,
              [field]: value,
            },
          }
        : section
    )
  );
};
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Edit your Professional Profile</Text>
      <TouchableOpacity style={styles.profilePictureUpload} onPress={pickImage}>
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.profilePictureImage} />
        ) : (
          <FontAwesome name="user-circle" style={styles.profilePictureIcon} />
        )}
        <Text style={styles.uploadText}>Upload Profile Picture</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Select Program of Study</Text>
      <View style={styles.pickerWrapper}>
      <Picker
        selectedValue={program}
        onValueChange={(itemValue) => setProgram(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="--Select--" value="" />
        <Picker.Item label="Computer Science" value="Computer Science" />
        <Picker.Item label="Marketing" value="Marketing" />
        <Picker.Item label="Mechanical Engineering" value="Mechanical Engineering" />
        <Picker.Item label="Building & Construction" value="Building & Construction" />
      </Picker>
    </View>
      <Text style={styles.label}>Your Name</Text>
      <TextInput
        style={styles.input}
        value={yourName}
        onChangeText={setYourName}
        placeholder="Add your name"
      />

      <Text style={styles.label}>Your Email</Text>
      <TextInput
        style={styles.input}
        value={yourEmail}
        onChangeText={setYourEmail}
        placeholder="Add your email"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Bio</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        value={bio}
        onChangeText={setBio}
        placeholder="Add a short bio..."
        multiline
      />

      <Text style={styles.label}>Skills</Text>
      <TextInput
        style={styles.input}
        value={skills}
        onChangeText={setSkills}
        placeholder="Add your skills..."
      />

      <Text style={styles.label}>Preferred Job Type</Text>
      <TextInput
        style={styles.input}
        value={jobType}
        onChangeText={setJobType}
        placeholder="e.g., Full-time, Part-time..."
      />

      <Text style={styles.label}>Facebook</Text>
      <TextInput
        style={styles.input}
        value={socialHandles.facebook}
        onChangeText={(text) => handleSocialHandleChange('facebook', text)}
        placeholder="Facebook handle"
      />

      <Text style={styles.label}>Twitter</Text>
      <TextInput
        style={styles.input}
        value={socialHandles.twitter}
        onChangeText={(text) => handleSocialHandleChange('twitter', text)}
        placeholder="Twitter handle"
      />

      <Text style={styles.label}>Instagram</Text>
      <TextInput
        style={styles.input}
        value={socialHandles.instagram}
        onChangeText={(text) => handleSocialHandleChange('instagram', text)}
        placeholder="Instagram handle"
      />

      <Text style={styles.label}>LinkedIn</Text>
      <TextInput
        style={styles.input}
        value={socialHandles.LinkedIn}
        onChangeText={(text) => handleSocialHandleChange('LinkedIn', text)}
        placeholder="LinkedIn URL"
      />

      <Text style={styles.label}>Website</Text>
      <TextInput
        style={styles.input}
        value={socialHandles.Website}
        onChangeText={(text) => handleSocialHandleChange('Website', text)}
        placeholder="Personal website"
      />

      <Text style={styles.label}>GitHub</Text>
      <TextInput
        style={styles.input}
        value={socialHandles.github}
        onChangeText={(text) => handleSocialHandleChange('github', text)}
        placeholder="GitHub username"
      />
      <View style={styles.experienceWrapper}>
  {experienceSections.map((section) => (
    <View key={section.id} style={styles.experienceSection}>
      <View style={styles.experienceLabel}>
        <Text style={styles.labelText}>Experience</Text>
      </View>

      <View style={styles.experienceContentWrapper}>
        {section.isEditing ? (
          <View style={styles.experienceEditForm}>
            <Text style={styles.labelText}>Company</Text>
            <TextInput
              style={styles.input}
              placeholder="Company name"
              value={section.savedData?.company || ''}
              onChangeText={(text) =>
                handleFieldChange(section.id, 'company', text)
              }
            />

            <Text style={styles.labelText}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Job title"
              value={section.savedData?.title || ''}
              onChangeText={(text) =>
                handleFieldChange(section.id, 'title', text)
              }
            />

            <Text style={styles.labelText}>Start Date</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={section.savedData?.startDate || ''}
              onChangeText={(text) =>
                handleFieldChange(section.id, 'startDate', text)
              }
            />

            <Text style={styles.labelText}>End Date</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={section.savedData?.endDate || ''}
              onChangeText={(text) =>
                handleFieldChange(section.id, 'endDate', text)
              }
              editable={!section.savedData?.currentWork}
            />

            <View style={styles.checkboxLabel}>
            <Switch
            value={section.savedData?.currentWork || false}
            onValueChange={(val) => handleFieldChange(section.id, 'currentWork', val)}
          />
            <Text>I currently work here</Text>
          </View>


            <Text style={styles.labelText}>Description</Text>
            <TextInput
              style={styles.textarea}
              multiline
              placeholder="Describe your role"
              value={section.savedData?.description || ''}
              onChangeText={(text) =>
                handleFieldChange(section.id, 'description', text)
              }
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => handleSave(section.id)}>
                <Text style={styles.saveButton}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleRemove(section.id)}>
                <Text style={styles.removeButton}>Remove</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleCancel(section.id)}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : section.savedData ? (
          <View style={styles.savedExperience}>
            <TouchableOpacity onPress={() => handleEdit(section.id)}>
              <Text style={styles.editBox}>Edit</Text>
            </TouchableOpacity>

            <Text style={styles.companyTitle}>
              {section.savedData.company || 'Untitled Experience'}
            </Text>
            <Text>
              <Text style={styles.labelText}>Title: </Text>
              {section.savedData.title || 'Not specified'}
            </Text>
            <Text>
              <Text style={styles.labelText}>Dates: </Text>
              {section.savedData.startDate || 'No start date'} to{' '}
              {section.savedData.currentWork
                ? 'Present'
                : section.savedData.endDate || 'No end date'}
            </Text>
            <Text>
              <Text style={styles.labelText}>Description: </Text>
              {getTruncatedContent(
                section.savedData.description || 'No description provided',
                section.isExpanded
              )}
            </Text>
            {section.savedData.description &&
              section.savedData.description.length > 50 && (
                <TouchableOpacity
                  onPress={() => toggleExpand(section.id)}
                >
                  <Text style={styles.readMore}>
                    {section.isExpanded ? 'Show less' : 'Read more'}
                  </Text>
                </TouchableOpacity>
              )}
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addExperiencePrompt}
            onPress={() => handleEdit(section.id)}
          >
            <Text style={styles.editBox}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  ))}

  <TouchableOpacity onPress={addExperienceSection}>
    <Text style={styles.addWorkExperience}>Add work experience +</Text>
  </TouchableOpacity>
</View>

     



 <View style={styles.educationWrapper}>
  {educationSections.map((section) => (
    <View key={section.id} style={styles.educationSection}>
      <View style={styles.educationLabel}>
        <Text style={styles.labelText}>Education</Text>
      </View>

      <View style={styles.educationContentWrapper}>
        {section.isEditing ? (
          <View style={styles.educationEditForm}>
            <Text style={styles.labelText}>Institution</Text>
            <TextInput
              style={styles.input}
              placeholder="Company name"
              value={section.savedData?.Institution || ''}
              onChangeText={(text) =>
                handleEducationFieldChange(section.id, 'institution', text)
              }
            />

            <Text style={styles.labelText}>Degree</Text>
            <TextInput
              style={styles.input}
              placeholder="Job title"
              value={section.savedData?.Degree || ''}
              onChangeText={(text) =>
                handleEducationFieldChange(section.id, 'degree', text)
              }
            />

            <Text style={styles.labelText}>Start Date</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={section.savedData?.startDate || ''}
              onChangeText={(text) =>
                handleEducationFieldChange(section.id, 'startDate', text)
              }
            />

            <Text style={styles.labelText}>End Date</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={section.savedData?.endDate || ''}
              onChangeText={(text) =>
                handleEducationFieldChange(section.id, 'endDate', text)
              }
              editable={!section.savedData?.currentSchool}
            />

            <View style={styles.checkboxLabel}>
            <Switch
            value={section.savedData?.currentSchool || false}
            onValueChange={(val) => handleEducationFieldChange(section.id, 'currentSchool', val)}
          />
            <Text>I currently study here</Text>
          </View>


            <Text style={styles.labelText}>Description</Text>
            <TextInput
              style={styles.textarea}
              multiline
              placeholder="Describe your education"
              value={section.savedData?.description || ''}
              onChangeText={(text) =>
                handleEducationFieldChange(section.id, 'description', text)
              }
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => handleEducationSave(section.id)}>
                <Text style={styles.saveButton}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleEducationRemove(section.id)}>
                <Text style={styles.removeButton}>Remove</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleEducationCancel(section.id)}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : section.savedData ? (
          <View style={styles.savedEducation}>
            <TouchableOpacity onPress={() => handleEducationEdit(section.id)}>
              <Text style={styles.editBox}>Edit</Text>
            </TouchableOpacity>

            <Text style={styles.institutionDegree}>
              {section.savedData.institution || 'Untitled Experience'}
            </Text>
            <Text>
              <Text style={styles.labelText}>Degree: </Text>
              {section.savedData.degree || 'Not specified'}
            </Text>
            <Text>
              <Text style={styles.labelText}>Dates: </Text>
              {section.savedData.startDate || 'No start date'} to{' '}
              {section.savedData.currentSchool
                ? 'Present'
                : section.savedData.endDate || 'No end date'}
            </Text>
            <Text>
              <Text style={styles.labelText}>Description: </Text>
              {getTruncatedEducationContent(
                section.savedData.description || 'No description provided',
                section.isExpanded
              )}
            </Text>
            {section.savedData.description &&
              section.savedData.description.length > 50 && (
                <TouchableOpacity
                  onPress={() => toggleEducationExpand(section.id)}
                >
                  <Text style={styles.readMore}>
                    {section.isExpanded ? 'Show less' : 'Read more'}
                  </Text>
                </TouchableOpacity>
              )}
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addEducationPrompt}
            onPress={() => handleEducationEdit(section.id)}
          >
            <Text style={styles.editBox}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  ))}

  <TouchableOpacity onPress={addEducationSection}>
    <Text style={styles.addEducation}>Add education +</Text>
  </TouchableOpacity>
</View>

      <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 18,
    textAlign: 'center',
  },
  profilePictureUpload: {
    alignItems: 'center',
    marginBottom: 18,
  },
  profilePictureIcon: {
    fontSize: 100,
    color: '#ccc',
  },
  profilePictureImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  uploadText: {
    color: '#3498db',
    marginTop: 4,
    fontSize: 14,
  },
  label: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 4,
    color: '#2c3e50',
    marginLeft: 20,
  },
  input: {
    width: 320,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 4,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  textarea: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  pickerWrapper: {
    width: 365,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 4,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  experienceWrapper: {
    width: '105%',
    maxWidth: 1200,
    marginTop: 2,
    marginBottom: 2,
    padding: 10,
    alignSelf: 'center',
  },
  experienceSection: {
    marginBottom: 5,
  },
  experienceLabel: {
    marginBottom: 5,
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  experienceContentWrapper: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  experienceEditForm: {
    flexDirection: 'column',
    gap: 15,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    fontSize: 14,
    width: '100%',
    marginBottom: 10,
  },
  textarea: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    fontSize: 14,
    width: '100%',
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  checkboxLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    textAlign: 'center',
    marginRight: 8,
  },
  removeButton: {
    backgroundColor: '#f44336',
    color: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    textAlign: 'center',
    marginRight: 8,
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
    color: '#333',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    textAlign: 'center',
  },
  savedExperience: {
    lineHeight: 24,
  },
  companyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  editBox: {
    color: '#2196F3',
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    fontSize: 14,
    marginBottom: 8,
  },
  readMore: {
    color: '#2196F3',
    fontWeight: 'bold',
    marginTop: 5,
  },
  addExperiencePrompt: {
    color: '#2196F3',
    textAlign: 'left',
    padding: 20,
    borderRadius: 4,
  },
  addWorkExperience: {
    color: '#2196F3',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 30,
    textAlign: 'Right',
    marginLeft: 25,
  },



   educationWrapper: {
    width: '105%',
    maxWidth: 1200,
    marginTop: 1,
    marginBottom: 2,
    padding: 10,
    alignSelf: 'center',
  },
  educationSection: {
    marginBottom: 1,
    marginTop: -36,
  },
  educationLabel: {
    marginBottom: 10,
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  educationContentWrapper: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  educationEditForm: {
    flexDirection: 'column',
    gap: 15,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    fontSize: 14,
    width: '100%',
    marginBottom: 10,
  },
  textarea: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    fontSize: 14,
    width: '100%',
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  checkboxLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    textAlign: 'center',
    marginRight: 8,
  },
  removeButton: {
    backgroundColor: '#f44336',
    color: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    textAlign: 'center',
    marginRight: 8,
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
    color: '#333',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    textAlign: 'center',
  },
  savedEducation: {
    lineHeight: 24,
  },
  educationDegree: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  editBox: {
    color: '#2196F3',
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    fontSize: 14,
    marginBottom: 8,
  },
  readMore: {
    color: '#2196F3',
    fontWeight: 'bold',
    marginTop: 5,
  },
  addEducationPrompt: {
    color: '#2196F3',
    textAlign: 'left',
    padding: 20,
    borderRadius: 4,
  },
  addEducation: {
    color: '#2196F3',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 30,
    textAlign: 'Right',
    marginLeft: 25,
  },
});