import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import styles from "./../styles/appStyles";
import { validateRegisterToken } from "../services/AuthService";

export default function ConfirmRegisterScreen({ route, navigation }) {
  const { email, password } = route.params;
  const [token, setToken] = useState("");

  const handleValidate = async () => {
    try {
      const data = await validateRegisterToken(email, password, token);
      console.log("Réponse brute :", data.success);
      if (data.success) {
        Alert.alert("Succès", "Compte créé avec succès !");
        navigation.replace("LoginScreen");
      } else {
        Alert.alert("Erreur", data.message);
      }
    } catch (err) {
      Alert.alert("Erreur", "Impossible de valider le code");
      console.log(err);
    }
  };

  return (
    <View style={styles.background}>
      <View style={[styles.container, { paddingTop: 120 }]}>
        <Text style={styles.title}>Confirmer le code</Text>

        <Text style={{ color: "#aaa", textAlign: "center", marginBottom: 20 }}>
          Entrez le code reçu par mail
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Code"
          value={token}
          onChangeText={setToken}
          placeholderTextColor="#aaa"
          keyboardType="numeric"
        />

        <TouchableOpacity style={customStyles.button} onPress={handleValidate}>
          <Text style={customStyles.buttonText}>Valider</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.replace("RegisterScreen")}>
                  <Text style={{ color: "#6E58F5", marginTop: 15, textAlign: "center" }}>
                    annuler
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
