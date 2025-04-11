import { useState } from 'react';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

const useImageUpload = () => {
  const [imageUri, setImageUri] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImage = async (imagePickerResult) => {
    try {
      if (!imagePickerResult?.assets || imagePickerResult.canceled) {
        throw new Error('No image selected');
      }

      const uri = imagePickerResult.assets[0].uri;
      console.log('Selected image URI:', uri);
      setImageUri(uri);
      setLoading(true);
      setError(null);

      // Read the file data
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (!fileInfo.exists) {
        throw new Error('File does not exist');
      }

      const formData = new FormData();
      formData.append('image', {
        uri,
        name: 'image.jpg',
        type: 'image/jpeg',
      });

      const endpoint = 'https://e63f-34-125-202-244.ngrok-free.app/upload'; // REPLACE THIS
      console.log('Uploading to:', endpoint);

      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: (data) => data, // Important for FormData
      });

      console.log('Server response:', response.data);
      setResults(response.data?.results || []);
    } catch (error) {
      console.error('Upload error:', error);
      setError(error.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    imageUri,
    results,
    loading,
    error,
    uploadImage,
  };
};

export default useImageUpload;