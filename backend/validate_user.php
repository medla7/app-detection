<?php
include 'db.php';
$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];
$exp = $data['exp'];
$sql = "UPDATE users SET etat = 1 , exp = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $exp,$id);

$response = [];

if ($stmt->execute()) {
  $response['success'] = true;
  $response['message'] = "Utilisateur validé avec succès";
} else {
  $response['success'] = false;
  $response['message'] = "Erreur : " . $stmt->error;
}

echo json_encode($response);
?>
