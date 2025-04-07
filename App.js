import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const API_URL = "https://fdc8-34-85-137-113.ngrok-free.app"; // Remplace avec ton URL ngrok

export default function App() {
  const [imageUri, setImageUri] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (cameraStatus !== 'granted' || galleryStatus !== 'granted') {
      Alert.alert('Permissions requises', 'Autorise l’accès à la caméra et à la galerie');
      return false;
    }
    return true;
  };

  const handleImage = async (result) => {
    if (!result.canceled && result.assets?.length > 0) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      await uploadImage(uri);
    }
  };

  const takePhoto = async () => {
    const ok = await requestPermissions();
    if (!ok) return;
    const result = await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 1 });
    await handleImage(result);
  };

  const pickImage = async () => {
    const ok = await requestPermissions();
    if (!ok) return;
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 1 });
    await handleImage(result);
  };

  const uploadImage = async (uri) => {
    try {
      setLoading(true);
      setResults(null);
      const formData = new FormData();
      formData.append('image', {
        uri,
        type: 'image/jpeg',
        name: 'image.jpg',
      });

      const { data } = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000,
      });

      setResults({
        time: data.processing_time,
        texts: data.detections.flatMap(d => d.texts.map(t => t.text)),
      });
    } catch (err) {
      console.log("Erreur:", err);
      Alert.alert("Erreur", err.response?.data?.error || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Détection d'Expiration</Text>

      <View style={styles.buttonContainer}>
        <Button title="📷 Caméra" onPress={takePhoto} color="#1976D2" />
        <View style={styles.buttonSpacer} />
        <Button title="🖼 Galerie" onPress={pickImage} color="#1976D2" />
      </View>

      {loading && <ActivityIndicator size="large" color="#1976D2" />}

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
      )}

      {results && (
        <View style={styles.resultsContainer}>
          <View style={styles.statusRow}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            <Text style={styles.statusText}>Temps: {results.time.toFixed(2)}s</Text>
          </View>
          <Text style={styles.sectionTitle}>Texte détecté :</Text>
          {results.texts.length > 0 ? results.texts.map((text, i) => (
            <Text key={i}>• {text}</Text>
          )) : <Text>Aucun texte détecté</Text>}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
  buttonSpacer: { width: 15 },
  image: { width: '100%', height: 300, marginBottom: 20, borderRadius: 10 },
  resultsContainer: { padding: 15, backgroundColor: '#f0f0f0', borderRadius: 10 },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  statusText: { marginLeft: 8, fontSize: 16 },
  sectionTitle: { fontWeight: 'bold', marginBottom: 5 },
});
