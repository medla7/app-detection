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
  getExpiredUsers,
  getValidUsers,
  validateUser,
  deleteUser,
} from "../services/authService";
import styles from "../styles/appStyles";

export default function AdminScreen({ navigation }) {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [expiredUsers, setExpiredUsers] = useState([]);
  const [validUsers, setValidUsers] = useState([]);
  const [expDates, setExpDates] = useState({});

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      const pending = await getPendingUsers();
      const expired = await getExpiredUsers();
      const valid = await getValidUsers();
      setPendingUsers(pending.users || []);
      setExpiredUsers(expired.users || []);
      setValidUsers(valid.users || []);
    } catch (err) {
      Alert.alert("Erreur", "Impossible de charger les données");
    }
  };

  const isValidDateFormat = (date) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
  };

  const handleValidate = async (id) => {
    const exp = expDates[id];
    if (!exp || !isValidDateFormat(exp)) {
      Alert.alert("Erreur", "Date invalide. Utilisez le format YYYY-MM-DD.");
      return;
    }
    const res = await validateUser(id, exp);
    if (res.success) {
      Alert.alert("Succès", "compte activé");
      loadAll();
    } else {
      Alert.alert("Erreur", res.message);
    }
  };

  const handleDelete = async (id) => {
    const res = await deleteUser(id);
    if (res.success) {
      Alert.alert("Supprimé");
      loadAll();
    } else {
      Alert.alert("Erreur", res.message);
    }
  };

  return (
    <View style={styles.background}>
      <ScrollView
        contentContainerStyle={[styles.container, { paddingTop: 80 }]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
            paddingHorizontal: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.replace("ChangePasswordScreen")}
          >
            <Text style={{ color: "#6E58F5" }}>changer mot de passe</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
            <Text style={{ color: "#6E58F5", textAlign: "right" }}>
              Log out
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Comptes en attente</Text>
        {pendingUsers.length === 0 && <Text>Aucun</Text>}
        {pendingUsers.map((user) => (
          <View key={`p-${user.id}`} style={custom.card}>
            <Text style={custom.email}>{user.email}</Text>
            <TextInput
              placeholder="YYYY-MM-DD"
              style={styles.input}
              placeholderTextColor="#aaa"
              value={expDates[user.id] || ""}
              onChangeText={(t) => setExpDates({ ...expDates, [user.id]: t })}
            />
            <TouchableOpacity
              style={custom.button}
              onPress={() => handleValidate(user.id)}
            >
              <Text style={custom.buttonText}>✅ Valider</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[custom.button, { backgroundColor: "red" }]}
              onPress={() => handleDelete(user.id)}
            >
              <Text style={custom.buttonText}>🗑 Supprimer</Text>
            </TouchableOpacity>
          </View>
        ))}

        <Text style={styles.title}>Comptes expirés</Text>
        {expiredUsers.length === 0 && <Text>Aucun</Text>}
        {expiredUsers.map((user) => (
          <View key={`e-${user.id}`} style={custom.card}>
            <Text style={custom.email}>{user.email}</Text>
            <TextInput
              placeholder="YYYY-MM-DD"
              style={styles.input}
              placeholderTextColor="#aaa"
              value={expDates[user.id] || ""}
              onChangeText={(t) => setExpDates({ ...expDates, [user.id]: t })}
            />
            <TouchableOpacity
              style={custom.button}
              onPress={() => handleValidate(user.id)}
            >
              <Text style={custom.buttonText}>🔁 Réactiver</Text>
            </TouchableOpacity>
          </View>
        ))}

        <Text style={styles.title}>Comptes valides</Text>
        {validUsers.length === 0 && <Text>Aucun</Text>}
        {validUsers.map((user) => (
          <View key={`v-${user.id}`} style={custom.card}>
            <Text style={custom.email}>{user.email}</Text>
            <TouchableOpacity
              style={[custom.button, { backgroundColor: "red" }]}
              onPress={() => handleDelete(user.id)}
            >
              <Text style={custom.buttonText}>🗑 Supprimer</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const custom = StyleSheet.create({
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
  button: {
    backgroundColor: "#6A1B9A",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
  },
});
