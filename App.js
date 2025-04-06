import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const API_URL = "https://54c9-34-106-164-187.ngrok-free.app"; // Remplacez par votre URL Ngrok

const App = () => {
  const [imageUri, setImageUri] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Demander les permissions
  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (cameraStatus !== 'granted' || galleryStatus !== 'granted') {
      Alert.alert('Permissions requises', 'Vous devez autoriser l\'accès à la caméra et à la galerie');
      return false;
    }
    return true;
  };

  // Prendre une photo
  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      await uploadImage(result.assets[0].uri);
    }
  };

  // Choisir depuis la galerie
  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      await uploadImage(result.assets[0].uri);
    }
  };

  // Envoyer l'image à Flask
  const uploadImage = async (uri) => {
    setLoading(true);
    setProcessedImage(null);
    
    try {
      const formData = new FormData();
      formData.append('image', {
        uri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });

      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setProcessedImage(response.data.processed_url);
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Échec du traitement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Traitement d'Images</Text>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Utiliser Camera" 
          onPress={takePhoto} 
          color="#6200ee"
        />
        <View style={styles.buttonSpacer} />
        <Button 
          title="Choisir Image" 
          onPress={pickImage} 
          color="#6200ee"
        />
      </View>

      {loading && <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />}

      {imageUri && (
        <Image 
          source={{ uri: imageUri }} 
          style={styles.image} 
          resizeMode="contain"
        />
      )}

      {processedImage && (
        <>
          <Text style={styles.subtitle}>Image Traitée:</Text>
          <Image 
            source={{ uri: processedImage }} 
            style={styles.image}
            resizeMode="contain"
            onError={() => Alert.alert('Erreur', 'Impossible de charger l\'image traitée')}
          />
        </>
      )}

      {!imageUri && !loading && (
        <Text style={styles.placeholderText}>Aucune image sélectionnée</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    color: '#6200ee',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  buttonSpacer: {
    width: 15,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  placeholderText: {
    marginTop: 20,
    color: '#888',
    fontStyle: 'italic',
  },
  loader: {
    marginVertical: 20,
  },
});

export default App;