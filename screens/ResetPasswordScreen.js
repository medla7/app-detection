import React, { useState } from 'react';  
import {  
  View,  
  Text,  
  TextInput,  
  Alert,  
  TouchableOpacity,  
  StyleSheet,  
} from 'react-native';  
import styles from '../styles/appStyles';  
import { resetPassword } from '../services/AuthService';  

export default function ResetPasswordScreen({ navigation }) {  
  const [token, setToken] = useState('');  
  const [password, setPassword] = useState('');  

  const handleReset = async () => {  
    if (!token || !password) {  
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');  
      return;  
    }  

    try {  
      const response = await resetPassword(token, password);  
      if (response.success) {  
        Alert.alert('Succès', 'Mot de passe mis à jour');  
        navigation.replace('LoginScreen');  
      } else {  
        Alert.alert('Erreur', response.message);  
      }  
    } catch (err) {  
      console.log(err);  
      Alert.alert('Erreur', 'Une erreur est survenue');  
    }  
  };  

  return (  
    <View style={styles.background}>  
      <View style={[styles.container, { paddingTop: 100 }]}>  
        <Text style={styles.title}>Changer le mot de passe</Text>  
        <TextInput  
          style={styles.input}  
          placeholder="Code reçu par mail"  
          placeholderTextColor="#aaa"  
          value={token}  
          onChangeText={setToken}  
          keyboardType="numeric"
        />  
        <TextInput  
          style={styles.input}  
          placeholder="Nouveau mot de passe"  
          placeholderTextColor="#aaa"  
          secureTextEntry  
          value={password}  
          onChangeText={setPassword}  
        />  
        <TouchableOpacity style={custom.button} onPress={handleReset}>  
          <Text style={custom.buttonText}>Réinitialiser</Text>  
        </TouchableOpacity>  
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>  
          <Text style={{ color: '#6E58F5', marginTop: 15, textAlign: 'center' }}>  
            Retour  
          </Text>  
        </TouchableOpacity>  
      </View>  
    </View>  
  );  
}  

const custom = StyleSheet.create({  
  button: {  
    backgroundColor: '#6A1B9A',  
    padding: 12,  
    borderRadius: 10,  
    alignItems: 'center',  
    marginTop: 20,  
  },  
  buttonText: {  
    color: '#fff',  
    fontWeight: 'bold',  
    fontSize: 16,  
  },  
});