<?php
date_default_timezone_set('UTC');
error_reporting(E_ALL);
ini_set('display_errors', 1);
include 'db.php';

header('Content-Type: application/json'); 
$data = json_decode(file_get_contents("php://input"), true);

// Vérifie si les données sont présentes
if (!isset($data['email'], $data['token'], $data['password'])) {
    echo json_encode(["success" => false, "message" => "Données manquantes"]);
    exit;
}

$email = $data['email'];
$token = $data['token'];
$password = password_hash($data['password'], PASSWORD_DEFAULT);

// Vérifie si le token est valide et non expiré
$stmt = $conn->prepare("SELECT * FROM password_resets WHERE email = ? AND token = ? AND expires_at > NOW()");
$stmt->bind_param("ss", $email, $token);
$stmt->execute();
$result = $stmt->get_result();

if (!$result || $result->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "Code invalide ou expiré"]);
    exit;
}

// Insère l'utilisateur
$insert = $conn->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
$insert->bind_param("ss", $email, $password);

if ($insert->execute()) {
    // Supprime le token après succès
    $delete = $conn->prepare("DELETE FROM password_resets WHERE email = ?");
    $delete->bind_param("s", $email);
    $delete->execute();

    echo json_encode(["success" => true, "message" => "Compte créé avec succès"]);
} else {
    // Gestion d'erreur : email déjà utilisé
    if ($conn->errno === 1062) {
        echo json_encode(["success" => false, "message" => "Email déjà utilisé"]);
    } else {
        echo json_encode(["success" => false, "message" => "Erreur lors de la création du compte : " . $conn->error]);
    }
}
?>
 