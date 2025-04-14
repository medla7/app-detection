import React, { useState } from "react";
import {
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import ImageButton from "./../src/components/ImageButton";
import ResultDisplay from "./../src/components/ResultDisplay";
import useImageHandler from "./../src/hooks/useImageHandler";
import { uploadImage } from "./../src/services/uploadService";
import styles from "./../src/styles/appStyles";
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
      <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text
            style={{ color: "#6E58F5", textAlign: "right", }}
          >
            log out
          </Text>
        </TouchableOpacity>
        <Text style={styles.title}>Détection de date</Text>
        
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
