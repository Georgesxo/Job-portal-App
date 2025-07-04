import React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../components/AuthContext';

export default function AdminLoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (login(username, password)) {
      navigation.replace('JobProvider');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
  <Text style={styles.loginText}>Login</Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({ container: 
  { flex: 1,
 justifyContent: 'center',
  padding: 24,
},
title: 
  { fontSize: 24, 
fontWeight: 'bold', 
marginBottom: 24, 
textAlign: 'center' },
input: 
  { borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 4, 
    padding: 10, 
    marginBottom: 18,
 },
  error: { color: 'red', marginBottom: 12, textAlign: 'center' },
  loginText:
   {fontSize: 20, fontWeight: 'bold',alignSelf: 'center', color: 'white' },
   loginButton: {backgroundColor: '#3498db',marginTop: 50, width:120, padding: 2, borderRadius: 4,alignSelf: 'center', },
});