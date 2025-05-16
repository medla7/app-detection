<?php
include 'db.php';

$sql = "SELECT id, email, role, exp FROM users WHERE etat = 0 and role= 'user'";
$result = $conn->query($sql);
$users = [];

while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

echo json_encode([
    "users" => $users
]);
?>
