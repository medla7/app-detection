<?php
include 'db.php';
$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];
$sql = "DELETE FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

$response = [];

if ($stmt->execute()) {
  $response['success'] = true;
  $response['message'] = "Utilisateur supprimé avec succès";
} else {
  $response['success'] = false;
  $response['message'] = "Erreur : " . $stmt->error;
}

echo json_encode($response);
?>
