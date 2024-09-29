CREATE DATABASE hotel_management_system;

USE hotel_management_system;

-- Table for rooms
CREATE TABLE rooms (
  room_id INT AUTO_INCREMENT PRIMARY KEY,
  room_type VARCHAR(50),
  price DECIMAL(10, 2),
  status VARCHAR(20) DEFAULT 'available'
);

-- Table for customers
CREATE TABLE customers (
  customer_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(15)
);

-- Table for reservations
CREATE TABLE reservations (
  reservation_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  room_id INT,
  checkin DATE,
  checkout DATE,
  status VARCHAR(20) DEFAULT 'pending',
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
  FOREIGN KEY (room_id) REFERENCES rooms(room_id)
);

-- Table for payments
CREATE TABLE payments (
  payment_id INT AUTO_INCREMENT PRIMARY KEY,
  reservation_id INT,
  amount DECIMAL(10, 2),
  payment_date DATE,
  method VARCHAR(50),
  FOREIGN KEY (reservation_id) REFERENCES reservations(reservation_id)
);
