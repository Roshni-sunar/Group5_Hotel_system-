<?php
// payment.php
include 'db.php';

$reservation_id = $_POST['reservation_id'];
$amount = $_POST['amount'];
$method = $_POST['method'];
$payment_date = date('Y-m-d');

// Insert payment into the database
$payment_sql = "INSERT INTO payments (reservation_id, amount, payment_date, method) 
                VALUES ('$reservation_id', '$amount', '$payment_date', '$method')";

if ($conn->query($payment_sql) === TRUE) {
    echo "Payment successful!";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>
