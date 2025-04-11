import React from "react";
import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { requestGalleryPermission } from "../../utils/permissions";

const GalleryButton = ({ onImagePicked }) => {
  const handleGalleryPress = async () => {
    try {
      const hasPermission = await requestGalleryPermission();
      if (!hasPermission) return;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaType.Images,
        quality: 1,
        allowsEditing: false,
        aspect: [4, 3],
        allowsMultipleSelection: false,
      });

      if (!result.canceled && result.assets?.length > 0) {
        onImagePicked(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Erreur galerie:", error);
      Alert.alert(
        "Erreur", 
        "Impossible d'ouvrir la galerie",
        [
          { text: "OK" }
        ]
      );
    }
  };

  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={handleGalleryPress}
      activeOpacity={0.7}
    >
      <Ionicons name="images" size={20} color="#fff" />
      <Text style={styles.buttonText}>Galerie</Text>
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default GalleryButton;