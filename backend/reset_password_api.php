<?php  
include 'db.php';  
date_default_timezone_set('UTC');

error_reporting(E_ALL);  
ini_set('display_errors', 1);  
header('Content-Type: application/json');  

$data = json_decode(file_get_contents("php://input"), true);  
$token = $data['token'] ?? '';  
$newPassword = $data['password'] ?? '';  

$response = [];  

if (!$token || !$newPassword) {  
  $response['success'] = false;  
  $response['message'] = "Token ou mot de passe manquant";  
  echo json_encode($response);  
  exit;  
}  

// Vérifie le token  
$stmt = $conn->prepare("SELECT * FROM password_resets WHERE token = ? AND expires_at > NOW()"); 
$stmt->bind_param("s", $token);  
$stmt->execute();  
$result = $stmt->get_result();  

if ($result->num_rows === 0) {  
  $response['success'] = false;  
  $response['message'] = "Token invalide ou expiré";  
  echo json_encode($response);  
  exit;  
}  

$user = $result->fetch_assoc();  
$email = $user['email'];  

// Met à jour le mot de passe  
$hashed = password_hash($newPassword, PASSWORD_DEFAULT);  
$stmt = $conn->prepare("UPDATE users SET password = ? WHERE email = ?");  
$stmt->bind_param("ss", $hashed, $email);  
$stmt->execute();  

// Supprime le token  
$stmt = $conn->prepare("DELETE FROM password_resets WHERE email = ?");  
$stmt->bind_param("s", $email);  
$stmt->execute();  

$response['success'] = true;  
$response['message'] = "Mot de passe réinitialisé";  
echo json_encode($response);  
?>