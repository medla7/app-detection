import axios from 'axios';

const API_URL = 'https://6706-34-126-134-136.ngrok-free.app'; // Remplacer si le lien change

export async function uploadImage(uri) {
  const formData = new FormData();
  formData.append('image', {
    uri,
    type: 'image/jpeg',
    name: 'image.jpg',
  });
console.log("Sending image:", {
  uri,
  type: 'image/jpeg',
  name: 'image.jpg',
});

  try {
    const { data } = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000,
    });

    return {
      time: data.time,       // <-- correspond à Flask
      texts: data.texts,     // <-- correspond à Flask
    };
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'image :", error.message);
    return {
      time: 0,
      texts: [],
      error: error.message,
    };
  }
}
