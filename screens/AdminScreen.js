import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import {
  getPendingUsers,
  validateUser,
  deleteUser,
} from "../services/authService";
import styles from "../styles/appStyles"; // <-- Ton fichier global de style

export default function AdminScreen({navigation}) {
  const [users, setUsers] = useState([]);
  const [expDates, setExpDates] = useState({});

  useEffect(() => {
    loadPendingUsers();
  }, []);

  const loadPendingUsers = async () => {
    try {
      const data = await getPendingUsers();
      if (data && Array.isArray(data.users)) {
        setUsers(data.users);
      } else {
        setUsers([]);
      }
    } catch (error) {
      Alert.alert("Erreur", "Impossible de charger les comptes.");
      setUsers([]);
    }
  };

  const handleValidate = async (id,exp) => {
    const exp = expDates[id];
    if (!exp) {
      Alert.alert("Erreur", "Veuillez entrer une date de fin.");
      return;
    }

    const response = await validateUser(id, exp);
    if (response.success) {
      Alert.alert("Succès", "Compte validé.");
      loadPendingUsers();
    } else {
      Alert.alert("Erreur", response.message);
    }
  };

  const handleDelete = async (id) => {
    const response = await deleteUser(id);
    if (response.success) {
      Alert.alert("Compte supprimé");
      loadPendingUsers();
    } else {
      Alert.alert("Erreur", response.message);
    }
  };

  return (
    <View style={styles.background}>
      <ScrollView
        contentContainerStyle={[styles.container, { paddingTop: 80 }]}
      >
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={{ color: "#6E58F5", textAlign: "right" }}>Log out</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Validation des comptes</Text>

        {users.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Aucun compte en attente
          </Text>
        ) : null}

        {users.map((user) => (
          <View key={user.id} style={customStyles.card}>
            <Text style={customStyles.email}>{user.email}</Text>

            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#aaa"
              value={expDates[user.id] || ""}
              onChangeText={(text) =>
                setExpDates({ ...expDates, [user.id]: text })
              }
            />

            <View style={customStyles.buttonRow}>
              <TouchableOpacity
                style={customStyles.button}
                onPress={() => handleValidate(user.id)}
              >
                <Text style={customStyles.buttonText}>✅ Valider</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[customStyles.button, { backgroundColor: "red" }]}
                onPress={() => handleDelete(user.id)}
              >
                <Text style={customStyles.buttonText}>🗑 Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const customStyles = StyleSheet.create({
  card: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
  },
  email: {
    fontSize: 16,
    marginBottom: 8,
    color: "#4A148C",
    fontWeight: "600",
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#6A1B9A",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
  },
});
