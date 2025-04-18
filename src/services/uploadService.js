import axios from 'axios';

const API_URL = 'https://3617-35-245-170-136.ngrok-free.app'; // Remplacer par ton lien ngrok

export async function uploadImage(uri) {
  const formData = new FormData();
  formData.append('image', {
    uri,
    type: 'image/jpeg',
    name: 'image.jpg',
  });

  const { data } = await axios.post(`${API_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 30000,
  });

  return {
    time: data.processing_time,
    texts: data.detections.flatMap(d => d.texts.map(t => t.text)),
  };
}