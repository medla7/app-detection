import React, { useState } from 'react';
import { View, TextInput, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './../src/styles/appStyles'; // for general layout

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.1.17/auth/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (data.success) {
        navigation.replace('HomeScreen');
      } else {
        Alert.alert('Erreur', data.message);
      }
    } catch (err) {
      Alert.alert('Erreur', 'Impossible de se connecter');
    }
  };

  return (
    <View style={styles.background}>
      <View style={[styles.container, { paddingTop: 120 }]} >
        <Text style={styles.title}>Connexion</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Mot de passe"
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={customStyles.button} onPress={handleLogin }>
          <Text style={customStyles.buttonText}>Se connecter</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={{ color: '#6E58F5', marginTop: 15 ,textAlign:'center'}}>Créer un compte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const customStyles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: '#6A1B9A',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
});
