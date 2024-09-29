<?php
// db.php - Database Connection
$host = "localhost";
$user = "root"; // Your database user
$pass = "";     // Your database password
$dbname = "hotel_management_system";

// Create connection
$conn = new mysqli($host, $user, $pass, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
