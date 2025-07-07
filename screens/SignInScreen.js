import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../components/AuthContext';

const SignInScreen = () => {
  const navigation = useNavigation();
  const { signIn } = useContext(AuthContext);

  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async () => {
    if (!studentId || !email) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    setIsSigningIn(true);
    try {
      // Replace with your real backend endpoint
      const response = await fetch('https://your-backend.com/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, email }),
      });
      const data = await response.json();
      if (response.ok) {
        signIn(data.token, data.user);
        navigation.replace('Home');
      } else {
        Alert.alert('Sign In Failed', data.message || 'Unknown error');
      }
    } catch (err) {
      Alert.alert('Network Error', 'Could not connect to server');
    }
    setIsSigningIn(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Sign in</Text>
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="ATU Student ID"
            placeholderTextColor="#4574a1"
            style={styles.input}
            value={studentId}
            onChangeText={setStudentId}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#4574a1"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button} onPress={handleSignIn} disabled={isSigningIn}>
            <Text style={styles.buttonText}>{isSigningIn ? 'Signing In...' : 'Sign In'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
            <Text style={styles.footerLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 150,
    paddingBottom: 20,
    backgroundColor: '#f8fafc',
    marginBottom:-50,
  },
  
  headerTitle: {
    flex: 1,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0c151d',
    textAlign: 'center',
    marginRight: 40,
  },
  inputGroup: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 5,
    backgroundColor: '#f8fafc',
  },
  input: {
    height: 56,
    backgroundColor: '#e6edf4',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 18,
    color: '#0c151d',
    marginBottom: -35,
  },
  buttonWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  button: {
    backgroundColor: '#359dff',
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#0c151d',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  
  footer: {
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  footerText: {
    fontSize: 18,
    color: '#4574a1',
  marginTop: 100,
     marginBottom: -100,
  },
  footerLink: {
    fontSize: 18,
    color: '#4574a1',
    textDecorationLine: 'underline',
    marginTop: 100,
    marginBottom: 60,
  
  },
});
