<?php
require 'vendor/autoload.php';
include 'db.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


header('Content-Type: application/json');

function sendTokenMail($email, $token) {
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'mohamed.lahiani2003@gmail.com';
        $mail->Password = 'bvts lijw gqma hzlb'; // ⚠️ à sécuriser !
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('mohamed.lahiani2003@gmail.com', 'MonApp');
        $mail->addAddress($email);

        $mail->isHTML(true);
        $mail->Subject = 'Code de confirmation de création de compte';
        $mail->Body = "<p>Voici votre code de confirmation : <strong>$token</strong></p>";
        $mail->AltBody = "Voici votre code de confirmation : $token";

        $mail->send();
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => "Erreur d'envoi du mail : " . $mail->ErrorInfo]);
        exit;
    }
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['email']) || !isset($data['password'])) {
    echo json_encode(["success" => false, "message" => "Email ou mot de passe manquant"]);
    exit;
}

$email = $data['email'];
$password = $data['password'];

$check = $conn->prepare("SELECT id FROM users WHERE email = ?");
$check->bind_param("s", $email);
$check->execute();
$result = $check->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Cet email est déjà utilisé"]);
    exit;
}

$token = str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT);  

$expires_at = date("Y-m-d H:i:s", strtotime("+2 hour"));

$delete = $conn->prepare("DELETE FROM password_resets WHERE email = ?");
$delete->bind_param("s", $email);
$delete->execute();

$stmt = $conn->prepare("INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $email, $token, $expires_at);
$stmt->execute();

sendTokenMail($email, $token);

echo json_encode(["success" => true, "message" => "Un code de vérification a été envoyé par email."]);
?>