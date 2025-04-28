import React, { useState } from "react";
import {
  View,
  TextInput,
  Alert,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import styles from "../styles/appStyles";
import { loginUser } from "../services/authService"; // <-- appel du service

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isAccountActive = (date1) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    let currentDate = `${year}-${month}-${day}`;
    return date1 > currentDate;
  };


  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password); // <-- appel du service

      if (data.success && data.role == "admin") {
        navigation.replace("AdminScreen");
      } else if (data.success && data.etat === 1 && isAccountActive(data.exp)) {
        navigation.replace("HomeScreen");
      } else if (data.success && data.etat === 0) {
        Alert.alert("Erreur", "attendre que l admin valide voter compte");
      } else if ( data.success && data.etat === 1 && !isAccountActive(data.exp)) {
        Alert.alert("Erreur", "vous devez renouveller votre abonnement");
      } else {
        Alert.alert("Erreur", data.message);
      }
    } catch (err) {
      Alert.alert("Erreur", "Impossible de se connecter");
      console.error(err);
    }
  };

  return (
    <View style={styles.background}>
      <View style={[styles.container, { paddingTop: 120 }]}>
        <Text style={styles.title}>S'inscrire </Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#aaa"
        />
        <TextInput
          placeholder="Mot de passe"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={customStyles.button} onPress={handleLogin}>
          <Text style={customStyles.buttonText}>Se connecter</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.replace("RegisterScreen")}>
          <Text
            style={{ color: "#6E58F5", textAlign: "center", marginTop: 15 }}
          >
            Créer un compte
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
