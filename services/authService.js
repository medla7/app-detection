const API_URL = "http://192.168.1.13/auth"; 

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/login.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  return data;
};

export const registerRequest = async (email, password) => {
  const response = await fetch(`${API_URL}/register.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  return data;
};

export async function validateRegisterToken(email, password, token) {
  const response = await fetch(`${API_URL}/validateRegisterToken.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, token }),
  });

  const text = await response.text(); // Affiche tout
  console.log("Réponse texte brute :", text); // Important pour le débogage

  try {
    const data = JSON.parse(text);
    return data;
  } catch (e) {
    console.error("Erreur de parsing JSON :", e);
    throw new Error("Réponse invalide du serveur");
  }
}



export const getPendingUsers = async () => {
  const response = await fetch(`${API_URL}/pending_users.php`);
  const data = await response.json();
  return data;
};

export const validateUser = async (userId, exp) => {
  const response = await fetch(`${API_URL}/validate_user.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: userId, exp: exp }),
  });

  const data = await response.json();
  return data;
};

export const deleteUser = async (userId) => {
  const response = await fetch(`${API_URL}/delete_user.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: userId }),
  });

  const data = await response.json();
  return data;
};

export const getExpiredUsers = async () => {
  const response = await fetch(`${API_URL}/expired_users.php`);
  const data = await response.json();
  return data;
};

export const getValidUsers = async () => {
  const response = await fetch(`${API_URL}/valid_users.php`);
  const data = await response.json();
  return data;
};
export const changePassword = async (email, currentPassword, newPassword) => {
  const response = await fetch(`${API_URL}/change_password.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      currentPassword,
      newPassword,
    }),
  });

  const data = await response.json();
  return data;
};

export const requestPasswordReset = async (email) => {  
  const response = await fetch(`${API_URL}/request_reset.php`, {  
    method: "POST",  
    headers: { "Content-Type": "application/json" },  
    body: JSON.stringify({ email }),  
  });  

  const text = await response.text(); // récupère toute la réponse brute  
  console.log('Réponse brute:', text); // affiche dans la console  
  try {  
    const data = JSON.parse(text);  
    return data;  
  } catch (e) {  
    console.error('Erreur JSON:', e);  
    return { success: false, message: 'Réponse non JSON', raw: text };  
  }  
};
export const resetPassword = async (token, password) => {
  const response = await fetch(`${API_URL}/reset_password_api.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, password }),
  });
  return await response.json();
};
