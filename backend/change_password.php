<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'];
$currentPassword = $data['currentPassword'];
$newPassword = password_hash($data['newPassword'], PASSWORD_DEFAULT);

$response = [];

// Récupérer l'utilisateur
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if (!$user || !password_verify($currentPassword, $user['password'])) {
  $response['success'] = false;
  $response['message'] = "Mot de passe actuel incorrect";
  echo json_encode($response);
  exit;
}

// Mise à jour
$stmt = $conn->prepare("UPDATE users SET password = ? WHERE email = ?");
$stmt->bind_param("ss", $newPassword, $email);

if ($stmt->execute()) {
  $response['success'] = true;
  $response['message'] = "Mot de passe mis à jour";
} else {
  $response['success'] = false;
  $response['message'] = "Erreur lors de la mise à jour";
}

echo json_encode($response);
?>