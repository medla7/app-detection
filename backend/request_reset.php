<?php  
include 'db.php';  
require 'vendor/autoload.php'; // PHPMailer  
date_default_timezone_set('UTC');

header('Content-Type: application/json');  

use PHPMailer\PHPMailer\PHPMailer;  

// Récupération des données JSON  
$data = json_decode(file_get_contents("php://input"), true);  
$email = $data['email'] ?? '';  

$response = [];  

if (empty($email)) {  
  $response['success'] = false;  
  $response['message'] = "Email manquant";  
  echo json_encode($response);  
  exit;  
}  

// Vérifie si l'utilisateur existe  
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");  
$stmt->bind_param("s", $email);  
$stmt->execute();  
$userResult = $stmt->get_result();  

if ($userResult->num_rows === 0) {  
  $response['success'] = false;  
  $response['message'] = "Aucun compte associé à cet email";  
  echo json_encode($response);  
  exit;  
}  

// Génère un token unique  
$token = str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT);  
$expires = date("Y-m-d H:i:s", strtotime('+2 hour'));  

// Enregistre dans password_resets  
$stmt = $conn->prepare("INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)");  
$stmt->bind_param("sss", $email, $token, $expires);  
$stmt->execute();  

// Envoi mail  
$mail = new PHPMailer(true);  
try {  
  $mail->isSMTP();  
  $mail->Host = 'smtp.gmail.com';  
  $mail->SMTPAuth = true;  
  $mail->Username = 'mohamed.lahiani2003@gmail.com';  
  $mail->Password = 'bvts lijw gqma hzlb'; // À changer avec ton mot de passe  
  $mail->SMTPSecure = 'tls';  
  $mail->Port = 587;  

  $mail->setFrom('mohamed.lahiani2003@gmail.com', 'Support App');  
  $mail->addAddress($email);  
  $mail->isHTML(true);  
  $mail->Subject = 'Réinitialisation du mot de passe';  
  $mail->Body = "Ccoller ce token dans la formulaire pour réinitialiser ton mot de passe : $token";  

  $mail->send();  

  $response['success'] = true;  
  $response['message'] = "Email envoyé";  
} catch (Exception $e) {  
  $response['success'] = false;  
  $response['message'] = "Erreur d'envoi : " . $mail->ErrorInfo;  
}  

echo json_encode($response);  
?>