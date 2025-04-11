import React from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import CameraButton from './buttons/CameraButton';
import GalleryButton from './buttons/GalleryButton';
import useImageUpload from '../hooks/useImageUpload';
import ResultsDisplay from './ResultsDisplay';

const ImageUploader = () => {
  const { imageUri, results, loading, error, uploadImage } = useImageUpload();

  const handleImagePicked = async (imagePickerResult) => {
    await uploadImage(imagePickerResult);
  };

  React.useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  return (
    <>
      <Text style={styles.title}>Détection de date</Text>

      <View style={styles.buttonContainer}>
        <CameraButton onImagePicked={handleImagePicked} />
        <GalleryButton onImagePicked={handleImagePicked} />
      </View>

      {loading && <ActivityIndicator size="large" color="#6A1B9A" style={styles.loadingIndicator} />}
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      {results && results.length > 0 && <ResultsDisplay results={results} />}
    </>
  );
};

// ... keep your existing styles ...
const styles = StyleSheet.create({
  title: {
    paddingTop: 20,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#6E58F5',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#6A1B9A',
  },
  loadingIndicator: {
    marginVertical: 20,
  },
});

export default ImageUploader;
