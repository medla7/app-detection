import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export default function useImageHandler(setUri, onPickCallback) {
  const requestPermissions = async () => {
    const { status: cameraStatus } =
      await ImagePicker.requestCameraPermissionsAsync();
    const { status: galleryStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (cameraStatus !== "granted" || galleryStatus !== "granted") {
      Alert.alert(
        "Permissions requises",
        "Autorise l’accès à la caméra et à la galerie"
      );
      return false;
    }
    return true;
  };

  const handleImage = async (result) => {
    if (!result.canceled && result.assets?.length > 0) {
      const uri = result.assets[0].uri;
      setUri(uri);
      await onPickCallback(uri);
    }
  };

  const takePhoto = async () => {
    console.log("clicked");
    const ok = await requestPermissions();
    if (!ok) return;
    console.log("granted");
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    await handleImage(result);
  };

  const pickImage = async () => {
    console.log("pressed");
    const ok = await requestPermissions();
    if (!ok) {
      console.log("Permissions not granted");
      return;
    }
    console.log("Opening camera...");
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    await handleImage(result);
  };

  return { takePhoto, pickImage };
}
