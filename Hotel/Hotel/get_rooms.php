<?php
// get_rooms.php
include 'db.php';

// Fetch all rooms from the database
#$sql = "SELECT * FROM rooms";
$sql = "SELECT room_id, room_type, price, status, image_url FROM rooms";

$result = $conn->query($sql);

// Create an array to store room data
$rooms = [];

if ($result->num_rows > 0) {
    // Fetch all rooms and store them in the array
    while ($row = $result->fetch_assoc()) {
        $rooms[] = $row;
    }
    // Convert the array into JSON format and return it
    echo json_encode($rooms);
} else {
    echo json_encode([]);
}

$conn->close();
?>
