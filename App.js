import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons'; // N'oubliez pas cette importation

const API_URL = "https://82a7-35-245-85-138.ngrok-free.app"; // Remplacez par votre URL Ngrok

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

  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;
  
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImageUri(result.assets[0].uri);
        await uploadImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Erreur avec la caméra:", error);
      Alert.alert("Erreur", "Impossible d'accéder à la caméra");
    }
  };
  
  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;
  
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImageUri(result.assets[0].uri);
        await uploadImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Erreur avec la galerie:", error);
      Alert.alert("Erreur", "Impossible d'accéder à la galerie");
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
  
      // Use the actual response structure
      console.log("Full response:", response.data); // Debug log
      setProcessedImage({
        success: response.data.success,
        message: response.data.message,
        result: response.data.result
      });
      
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
    <Text style={styles.subtitle}>Résultat :</Text>
    <View style={styles.resultContainer}>
      <Ionicons 
        name={processedImage.success ? "checkmark-circle" : "close-circle"} 
        size={24} 
        color={processedImage.success ? "green" : "red"} 
      />
      <Text style={[
        styles.resultText,
        processedImage.success ? styles.successText : styles.errorText
      ]}>
        {processedImage.message}
      </Text>
      <Text style={styles.resultValue}>
        Valeur calculée : {processedImage.result}
      </Text>
    </View>
  </>
)}

      {!imageUri && !loading && (
        <Text style={styles.placeholderText}>Aucune image sélectionnée</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  
    resultContainer: {
      backgroundColor: '#f8f9fa',
      padding: 15,
      borderRadius: 8,
      marginVertical: 10
    },
    resultText: {
      fontSize: 16,
      marginTop: 5,
      fontWeight: '500'
    },
    successText: {
      color: '#28a745'
    },
    errorText: {
      color: '#dc3545'
    },
    resultValue: {
      fontSize: 14,
      color: '#6c757d',
      marginTop: 5,
      fontStyle: 'italic'
    }
  ,
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