import * as ImagePicker from 'expo-image-picker';
import { Alert, Linking, Platform } from 'react-native';

export const requestGalleryPermission = async () => {
  try {
    // Vérifier l'état actuel de la permission
    const { status, canAskAgain } = await ImagePicker.getMediaLibraryPermissionsAsync();
    
    if (status === 'granted') {
      return true;
    }

    // Si on ne peut plus demander (utilisateur a cliqué "Ne plus demander")
    if (!canAskAgain) {
      Alert.alert(
        'Permission requise',
        'Veuillez autoriser l\'accès à la galerie dans les paramètres',
        [
          { text: 'Annuler', style: 'cancel' },
          { 
            text: 'Ouvrir Paramètres', 
            onPress: () => Linking.openSettings() 
          }
        ]
      );
      return false;
    }

    // Demander la permission
    const { status: newStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (newStatus !== 'granted') {
      Alert.alert(
        'Permission refusée', 
        'La fonctionnalité galerie ne peut pas fonctionner sans cette permission'
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erreur de permission:", error);
    Alert.alert("Erreur", "Un problème est survenu lors de la demande de permission");
    return false;
  }
};