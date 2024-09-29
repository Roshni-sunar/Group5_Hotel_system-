<?php
// book_room.php
include 'db.php';

$customer_name = $_POST['name'];
$customer_email = $_POST['email'];
$customer_phone = $_POST['phone'];
$room_id = $_POST['room_id'];
$checkin = $_POST['checkin'];
$checkout = $_POST['checkout'];

// Insert customer into the database
$customer_sql = "INSERT INTO customers (name, email, phone) VALUES ('$customer_name', '$customer_email', '$customer_phone')";
if ($conn->query($customer_sql) === TRUE) {
    $customer_id = $conn->insert_id; // Get the newly inserted customer ID

    // Insert reservation
    $reservation_sql = "INSERT INTO reservations (customer_id, room_id, checkin, checkout, status) 
                        VALUES ('$customer_id', '$room_id', '$checkin', '$checkout', 'confirmed')";
    
    if ($conn->query($reservation_sql) === TRUE) {
        // Update room status to booked
        $update_room_sql = "UPDATE rooms SET status='booked' WHERE room_id='$room_id'";
        $conn->query($update_room_sql);
        
        // Success message
        echo "Room booked successfully!";
    } else {
        // Error in reservation
        echo "Error in reservation: " . $conn->error;
    }
} else {
    // Error in customer creation
    echo "Error in customer creation: " . $conn->error;
}

$conn->close();
?>
