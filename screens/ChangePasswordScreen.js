import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { changePassword } from "../services/authService";

export default function ChangePasswordScreen() {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchEmail = async () => {
      const storedEmail = await AsyncStorage.getItem("userEmail");
      if (storedEmail) setEmail(storedEmail);
    };
    fetchEmail();
  }, []);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires");
      return;
    }

    try {
      const data = await changePassword(email, currentPassword, newPassword);
      if (data.success) {
        Alert.alert("Succès", "Mot de passe modifié avec succès");
        setCurrentPassword("");
        setNewPassword("");
      } else {
        Alert.alert("Erreur", data.message);
      }
    } catch (err) {
      Alert.alert("Erreur", "Problème de connexion");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Changer le mot de passe</Text>

      <TextInput
        placeholder="Mot de passe actuel"
        secureTextEntry
        style={styles.input}
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />

      <TextInput
        placeholder="Nouveau mot de passe"
        secureTextEntry
        style={styles.input}
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Changer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 100 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#6A1B9A",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
