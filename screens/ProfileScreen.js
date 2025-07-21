import React, { useState, useEffect  } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Switch, Alert, Button} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import mime from 'mime';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CandidateDashboard from '../components/CandidateDashboard';


export default function ProfileScreen() {
  const [profileImageUri, setProfileImageUri] = useState(null);
   const [profilePicture, setProfilePicture] = useState('');
  const [resumeUri, setResumeUri] = useState(null);
  const [resumeName, setResumeName] = useState(null);
  const [program, setProgram] = useState('');
  const [yourName, setYourName] = useState('');
  const [yourEmail, setYourEmail] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');
  const [jobType, setJobType] = useState('');
  const { token, user } = useContext(AuthContext);
  const [showDashboard, setShowDashboard] = useState(false);
const [candidateData, setCandidateData] = useState(null);
  const [socialHandles, setSocialHandles] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    LinkedIn: '',
    Website: '',
    github: '',
  });
const handleSocialHandleChange = (platform, value) => {
  setSocialHandles((prevHandles) => ({
    ...prevHandles,
    [platform]: value,
  }));
};

  const [_isEditingExperience, _setIsEditingExperience] = useState(false);
  const [_isEditingEducation, _setIsEditingEducation] = useState(false);

// ✅ Load saved data on mount
useEffect(() => {
  const loadData = async () => {
    try {
      const savedProfileImage = await AsyncStorage.getItem('profileImageUri');
      const savedResumeUri = await AsyncStorage.getItem('resumeUri');
      const savedResumeName = await AsyncStorage.getItem('resumeName');
      const savedProgram = await AsyncStorage.getItem('program');
      const savedName = await AsyncStorage.getItem('yourName');
      const savedEmail = await AsyncStorage.getItem('yourEmail');
      const savedBio = await AsyncStorage.getItem('bio');
      const savedSkills = await AsyncStorage.getItem('skills');
      const savedJobType = await AsyncStorage.getItem('jobType');
      const savedSocialHandles = await AsyncStorage.getItem('socialHandles');
      const savedExperience = await AsyncStorage.getItem('experienceSections');
      const savedEducation = await AsyncStorage.getItem('educationSections');

      if (savedProfileImage) setProfileImageUri(savedProfileImage);
      if (savedResumeUri) setResumeUri(savedResumeUri);
      if (savedResumeName) setResumeName(savedResumeName);
      if (savedProgram) setProgram(savedProgram);
      if (savedName) setYourName(savedName);
      if (savedEmail) setYourEmail(savedEmail);
      if (savedBio) setBio(savedBio);
      if (savedSkills) setSkills(savedSkills);
      if (savedJobType) setJobType(savedJobType);
      if (savedSocialHandles) setSocialHandles(JSON.parse(savedSocialHandles));
      if (savedExperience) setExperienceSections(JSON.parse(savedExperience));
      if (savedEducation) setEducationSections(JSON.parse(savedEducation));
    } catch (error) {
      console.error('Failed to load saved data:', error);
    }
  };

  loadData();
}, []);

// ✅ Save data when it changes
useEffect(() => {
  const saveData = async () => {
    try {
      await AsyncStorage.setItem('profileImageUri', profileImageUri || '');
      await AsyncStorage.setItem('resumeUri', resumeUri || '');
      await AsyncStorage.setItem('resumeName', resumeName || '');
      await AsyncStorage.setItem('program', program || '');
      await AsyncStorage.setItem('yourName', yourName || '');
      await AsyncStorage.setItem('yourEmail', yourEmail || '');
      await AsyncStorage.setItem('bio', bio || '');
      await AsyncStorage.setItem('skills', skills || '');
      await AsyncStorage.setItem('jobType', jobType || '');
      await AsyncStorage.setItem('socialHandles', JSON.stringify(socialHandles));
      await AsyncStorage.setItem('experienceSections', JSON.stringify(experienceSections));
      await AsyncStorage.setItem('educationSections', JSON.stringify(educationSections));
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  };

  saveData();
}, [
  profileImageUri,
  resumeUri,
  resumeName,
  program,
  yourName,
  yourEmail,
  bio,
  skills,
  jobType,
  socialHandles,
  experienceSections,
  educationSections,
]);
const handleProfilePictureChange = async () => {
    try {
     await ImagePicker.requestMediaLibraryPermissionsAsync();
const result = await ImagePicker.launchImageLibraryAsync({
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  base64: true,
  quality: 1,
});

    if (!result.canceled) {
      const imageAsset = result.assets[0];
      setProfileImageUri(imageAsset.uri);
    }
  } catch (error) {
    console.error('Image picker error:', error);
  }
};

// Pick resume (PDF or DOCX)
const handleResumeUpload = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const file = result.assets[0];
      setResumeUri(file.uri); 
      setResumeName(file.name);
      Alert.alert('Success', `File "${file.name}" selected successfully!`);
    } else {
      Alert.alert('Cancelled', 'No file was selected.');
    }
  } catch (error) {
    console.error('Document Picker Error:', error);
    Alert.alert('Error', 'Something went wrong while picking the file.');
  }
};
// Upload form data to your backend (which will forward to Cloudinary)
const handleSaveProfile = async () => {
  if (!profileImageUri || !resumeUri) {
    Alert.alert('Missing Data', 'Please select both a profile image and a resume file.');
    return;
  }

  const formData = new FormData();

  formData.append('profileImage', {
    uri: profileImageUri,
    type: mime.getType(profileImageUri),
    name: `profile.${mime.getExtension(mime.getType(profileImageUri))}`,
  });

  // Add other form fields (adjust as needed)
  formData.append('yourName', yourName);
  formData.append('yourEmail', yourEmail);
  formData.append('bio', bio);
  formData.append('skills', skills);
  formData.append('jobType', jobType);
  formData.append('socialHandles', socialHandles);
  formData.append('program', program);

  formData.append('experiences', JSON.stringify(experienceSections.map(sec => sec.savedData)));
  formData.append('education', JSON.stringify(educationSections.map(sec => sec.savedData)));

  try {
    const response = await fetch('http://10.0.2.2:5000/api/profile', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, // If you're using auth
      },
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      Alert.alert('Success', 'Profile saved successfully!');
      await fetchCandidateProfile(); 
       await AsyncStorage.clear();
    } else {
      Alert.alert('Error', result.message || 'Upload failed');
    }
  } catch (error) {
    console.error('Upload error:', error);
    Alert.alert('Error', 'An error occurred during upload');
  }
};
const isValidJson = (text) => {
  try {
    JSON.parse(text);
    return true;
  } catch (error) {
    return false;
  }
};

const fetchCandidateProfile = async () => {
  try {
    const url = `http://10.0.2.2:5000/api/candidates/${user._id}`;
    console.log("📡 Fetching from:", url);

    const response = await fetch(url);

    console.log("📶 Response status:", response.status);

    if (!response.ok) {
      const text = await response.text(); // Read raw text to inspect it
      console.error("❌ Server responded with error:", text);
      throw new Error("Network response was not ok");
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("❌ Invalid content type. Got:", contentType, "Response:", text);
      throw new Error("Expected JSON, got something else");
    }

    const text = await response.text(); // Read as text first

    if (isValidJson(text)) {
      const data = JSON.parse(text);
      console.log("✅ Received profile:", data);
      setCandidateData(data);
      setShowDashboard(true);
    } else {
      console.error("❌ Response is not valid JSON:", text);
      setShowDashboard(false);
    }

  } catch (error) {
    console.error("Fetch error:", error);
    setShowDashboard(false);
  }
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
    savedData: {}, 
    isExpanded: false,
  },
]);

 const handleSave = (id) => {
  const section = experienceSections.find(sec => sec.id === id);
  const savedData = section.savedData || {};

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
    savedData: {}, 
    isExpanded: false,
  },
]);

 const handleEducationSave = (id) => {
  const section = educationSections.find(sec => sec.id === id);
  const savedData = section.savedData || {};

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
    const container = document.querySelector(`.education-section[data-id='${id}'] .description-container`);
    if (container) {
      container.classList.toggle('expanded');
    }
  };
const handleEducationFieldChange = (id, field, value) => {
  setEducationSections((prev) =>
    prev.map((section) =>
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
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <SafeAreaView edges={['bottom']} style={styles.safeArea}>
    <ScrollView contentContainerStyle={styles.container}>
      {showDashboard ? (
      <CandidateDashboard
        data={candidateData}
        onEdit={() => setShowDashboard(false)}
      />
    ) : (
      <>
      <Text style={styles.heading}>Edit your Professional Profile</Text>
      <TouchableOpacity style={styles.profilePictureUpload} onPress={handleProfilePictureChange}>
        {profileImageUri ? (
          <Image source={{ uri: profileImageUri }} style={styles.profilePictureImage} />
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
          multiline
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
              {section.savedData.company || 'Not specified'}
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
              placeholder="Institution name"
              value={section.savedData?.institution || ''}
              onChangeText={(text) =>
                handleEducationFieldChange(section.id, 'institution', text)
              }
            />

            <Text style={styles.labelText}>Degree</Text>
            <TextInput
              style={styles.input}
              placeholder="Degree or Program"
              value={section.savedData?.degree || ''}
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
                onValueChange={(val) =>
                  handleEducationFieldChange(section.id, 'currentSchool', val)
                }
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

            <Text style={styles.institutionTitle}>
              {section.savedData.institution || 'Not specified'}
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
                <TouchableOpacity onPress={() => toggleEducationExpand(section.id)}>
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
   <Text style={styles.resume}>Upload your Resume/CV</Text>
     <TouchableOpacity style={styles.SelectFileButton} onPress={handleResumeUpload}>
  <Text style={styles.uploadButtonText}> {resumeName ? resumeName : 'No CV selected'}
  </Text>
</TouchableOpacity>
{resumeName && (
  <Text style={{ color: 'green', marginTop: 2 }}>
    ✅ {resumeName} selected
  </Text>
)}
      <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      </>
      )}
    </ScrollView>
    </SafeAreaView>
    </SafeAreaView>
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
    fontSize: 15,
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
  institutionTitle: {
    fontSize: 15,
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
  SelectFileButton: {
    alignSelf: "flex-start",
    backgroundColor: "hsla(0, 0%, 88%, 1.00)", // `color` is for text, not buttons
    width: 350,
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
    marginBottom: 30,
    marginTop: 15,
    },
  uploadButtonText: {
    color: "#2196F3",
    marginLeft: 5,
  },
  resume: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
     marginLeft: 30,
     paddingDown: 80,
    marginTop: -20,
  },
}); 