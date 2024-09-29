<?php
// search_rooms.php
include 'db.php';

$checkin = $_POST['checkin'];
$checkout = $_POST['checkout'];
$room_type = $_POST['roomtype'];

// Search for available rooms
//$sql = "SELECT * FROM rooms WHERE room_type = '$room_type' AND status = 'available'";
$sql = "SELECT * FROM rooms WHERE room_type = 'single' AND status = 'available'";

//$sql = "SELECT * FROM ROOMS";
$result = $conn->query($sql);
echo $result->num_rows;
//echo "s";
echo $room_type;
if ($result->num_rows > 0) {
    $rooms = [];
    while ($row = $result->fetch_assoc()) {
        $rooms[] = $row;
    }
    echo json_encode($rooms);
} else {
    echo json_encode([]);
    echo $_POST['roomtype'];
}
$conn->close();
?>
