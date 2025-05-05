const API_URL = "http://192.168.1.18/auth"; // Ton URL locale avec Laragon

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/login.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  return data;
};

export const registerUser = async (email, password) => {
  const response = await fetch(`${API_URL}/register.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  return data;
};

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

  const data = await response.json();
  return data;
};
