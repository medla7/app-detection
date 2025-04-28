import React, { useState } from "react";
import {
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import ImageButton from "./../components/ImageButton";
import ResultDisplay from "./../components/ResultDisplay";
import useImageHandler from "./../hooks/useImageHandler";
import { uploadImage } from "./../services/uploadService";
import styles from "./../styles/appStyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen({ navigation }) {
  const [imageUri, setImageUri] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const onPickCallback = async (uri) => {
    try {
      setLoading(true);
      setResults(null);
      const result = await uploadImage(uri);
      setResults(result);
    } catch (err) {
      Alert.alert("Erreur", err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const { takePhoto, pickImage } = useImageHandler(setImageUri, onPickCallback);

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
            paddingHorizontal: 10,
          }}
        >
          <Image
            source={require("../assets/logo.png")}
            style={{ width: 70, height: 70, resizeMode: "contain" }}
          />
          <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
            <Text style={{ color: "#6E58F5" }}>Log out</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.title, { textAlign: "center", marginBottom: 20 }]}>
          Détection de date d'expiration
        </Text>

        <View style={styles.buttonContainer}>
          <ImageButton icon="camera" text="Caméra" onPress={takePhoto} />
          <ImageButton icon="images" text="Galerie" onPress={pickImage} />
        </View>

        {loading && <ActivityIndicator size="large" color="#fff" />}

        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="contain"
          />
        )}
        {results && <ResultDisplay results={results} />}
      </ScrollView>
    </SafeAreaView>
  );
}
