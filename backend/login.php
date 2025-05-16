<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'];
$password = $data['password'];

$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

$response = [];

if ($user && password_verify($password, $user['password'])) {
  $response['success'] = true;
  $response['message'] = "Connexion réussie";
  $response['role'] = $user['role'];
  $response['etat'] = $user['etat'];
  $response['exp'] = $user['exp'];
} 
else {
  $response['success'] = false;
  $response['message'] = "Email ou mot de passe incorrect";
}

echo json_encode($response);
?>
