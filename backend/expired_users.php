<?php
include 'db.php';

$today = date('Y-m-d');

$sql = "SELECT id, email, exp FROM users WHERE etat = 1 AND exp < ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $today);
$stmt->execute();
$result = $stmt->get_result();

$users = [];
while ($row = $result->fetch_assoc()) {
  $users[] = $row;
}

echo json_encode(["users" => $users]);
?>
