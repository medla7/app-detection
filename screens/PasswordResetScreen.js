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

export default function PasswordResetScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleReset = async () => {
    if (!email) {
      Alert.alert('Erreur', 'Veuillez entrer votre adresse email');
      return;
    }

    try {
      const data = await requestPasswordReset(email);
      if (data.success) {
        Alert.alert('Succès', 'Vérifiez votre boîte mail pour réinitialiser votre mot de passe');
        setEmail('');
      } else {
        Alert.alert('Erreur', data.message);
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de contacter le serveur');
    }
  };

  return (
    <View style={styles.background}>
      <View style={[styles.container, { paddingTop: 100 }]}>
        <Text style={styles.title}>Réinitialiser le mot de passe</Text>

        <TextInput
          style={styles.input}
          placeholder="Votre email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity style={custom.button} onPress={handleReset}>
          <Text style={custom.buttonText}>Envoyer le lien</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
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
