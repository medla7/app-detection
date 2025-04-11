import React, { useState } from 'react';
import { View, Image, ActivityIndicator, ScrollView, Alert, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ImageButton from './src/components/ImageButton';
import ResultDisplay from './src/components/ResultDisplay';
import useImageHandler from './src/hooks/useImageHandler';
import { uploadImage } from './src/services/uploadService';
import styles from './src/styles/appStyles';

export default function App() {
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
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Détection de date</Text>
        <View style={styles.buttonContainer}>
          <ImageButton icon="camera" text="Caméra" onPress={takePhoto} />
          <ImageButton icon="images" text="Galerie" onPress={pickImage} />
        </View>

        {loading && <ActivityIndicator size="large" color="#fff" />}
        
        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
        )}
        {results && <ResultDisplay results={results} />}
      </ScrollView>
    </View>
  );
}