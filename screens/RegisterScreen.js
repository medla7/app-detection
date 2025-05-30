import React, { useState } from "react";
import {
  View,
  TextInput,
  Alert,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import styles from "./../styles/appStyles";
import { registerRequest } from "../services/AuthService";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const data = await registerRequest(email, password);
      console.log("Réponse complète :", data);
      if (data.success) {
        Alert.alert("Vérification", "Un code vous a été envoyé par mail.");
        navigation.replace("ConfirmRegisterScreen", { email, password });
      } else {
        Alert.alert("Erreur", data.message);
        
      }
    } catch (err) {
      Alert.alert("Erreur", "Impossible d’envoyer le code");
      console.log(err);
    }
  };

  return (
    <View style={styles.background}>
      <View style={[styles.container, { paddingTop: 120 }]}>
        <Text style={styles.title}>Créer un compte</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity style={customStyles.button} onPress={handleRegister}>
          <Text style={customStyles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={{ color: "#6E58F5", marginTop: 15, textAlign: "center" }}>
            Se connecter
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const customStyles = StyleSheet.create({
  button: {
    flexDirection: "row",
    backgroundColor: "#6A1B9A",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
  },
});
