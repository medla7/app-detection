import React from "react";
import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { requestPermissions } from "../../utils/permissions";

const CameraButton = ({ onImagePicked }) => {
  const handleCameraPress = async () => {
    try {
      await requestPermissions();

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Updated line
        quality: 1,
        allowsEditing: false,
        aspect: [4, 3],
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        onImagePicked(uri);
      }
    } catch (error) {
      console.error("Camera error:", error);
      Alert.alert("Erreur", "Impossible d'ouvrir la caméra.");
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleCameraPress}>
      <Ionicons name="camera" size={20} color="#fff" />
      <Text style={styles.buttonText}>Caméra</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#6A1B9A",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
  },
});

export default CameraButton;
