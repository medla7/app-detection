<?php
$host = 'localhost';
$db = 'app';
$user = 'root';
$pass = ''; // vide si XAMPP par défaut

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>
