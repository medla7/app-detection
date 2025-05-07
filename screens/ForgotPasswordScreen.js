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
import { requestPasswordReset } from '../services/AuthService';  

export default function ForgotPasswordScreen({ navigation }) {  
  const [email, setEmail] = useState('');  

  const handleRequestReset = async () => {  
    if (!email) {  
      Alert.alert('Erreur', 'Veuillez entrer votre email');  
      return;  
    }  

    try {  
      const response = await requestPasswordReset(email);  
      if (response.success) {  
        Alert.alert('Succès', 'Vérifiez votre email pour continuer');  
        setEmail('');  
        navigation.replace("ResetPasswordScreen");
        // navigation.navigate('ResetPasswordScreen'); // optionnel  
      } else {  
        Alert.alert('Erreur', response.message);  
      }  
    } catch (error) {  
      console.log(error);  
      Alert.alert('Erreur', 'Impossible de contacter le serveur');  
    }  
  };  

  return (  
    <View style={styles.background}>  
      <View style={[styles.container, { paddingTop: 100 }]}>  
        <Text style={styles.title}>Mot de passe oublié ?</Text>  
        <TextInput  
          style={styles.input}  
          placeholder="Votre email"  
          placeholderTextColor="#aaa"  
          value={email}  
          onChangeText={setEmail}  
        />  

        <TouchableOpacity style={custom.button} onPress={handleRequestReset}>  
          <Text style={custom.buttonText}>Envoyer le lien</Text>  
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