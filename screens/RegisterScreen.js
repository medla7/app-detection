import React, { useState } from "react";
import {
  View,
  TextInput,
  Alert,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import styles from "./../src/styles/appStyles";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch("http://192.168.1.17/auth/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        navigation.replace("HomeScreen");
      } else {
        Alert.alert("Erreur", data.message);
      }
    } catch (err) {
      Alert.alert("Erreur", "Impossible de créer un compte");
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
          <Text
            style={{ color: "#6E58F5", marginTop: 15, textAlign: "center" }}
          >
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
