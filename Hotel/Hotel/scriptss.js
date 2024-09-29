// Room Search - AJAX Call
let selectedRoomId = null;

// Room Search - AJAX Call
document.getElementById('search-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const checkin = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;
  const roomtype = document.getElementById('roomtype').value;

  fetch('search_rooms.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `checkin=${checkin}&checkout=${checkout}&roomtype=${roomtype}`
  })
  .then(response => response.json())
  .then(rooms => {
    const results = document.getElementById('results');
    results.innerHTML = rooms.length ? `<h3>Available Rooms</h3>` : '<p>No rooms available</p>';
    rooms.forEach(room => {
      results.innerHTML += `<p>Roomtdrd ID: ${room.room_id} | Price: $${room.price} <button onclick="selectRoom(${room.room_id})">Select</button></p>`;
    });
  });
});

// Room Selection
function selectRoom(roomId) {
  selectedRoomId = roomId;
  document.getElementById('customer-details').style.display = 'block';
}

// Customer Form Submission - AJAX Call for Booking
document.getElementById('customer-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const checkin = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;

  if (!selectedRoomId) {
    alert('Please select a room first.');
    return;
  }

  fetch('book_room.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `name=${name}&email=${email}&phone=${phone}&room_id=${selectedRoomId}&checkin=${checkin}&checkout=${checkout}`
  })
  .then(response => response.text())
  .then(message => {
    alert(message);
    // Optionally redirect or reset forms here
  })
  .catch(error => {
    console.error('Error:', error);
    alert('There was an error processing your booking.');
  });
});

/*document.getElementById('search-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const checkin = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;
  const roomtype = document.getElementById('roomtype').value;

  fetch('search_rooms.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `checkin=${checkin}&checkout=${checkout}&roomtype=${roomtype}`
  })
  .then(response => response.json())
  .then(rooms => {
    const results = document.getElementById('results');
    results.innerHTML = rooms.length ? `<h3>Available Rooms</h3>` : '<p>No rooms available</p>';
    rooms.forEach(room => {
      results.innerHTML += `<p>Room ID: ${room.room_id} | Price: $${room.price} <button onclick="bookRoom(${room.room_id})">Book</button></p>`;
    });
  });
});*/

// Room Booking - AJAX Call
/*function bookRoom(room_id) {
  const name = prompt('Enter your name:');
  const email = prompt('Enter your email:');
  const phone = prompt('Enter your phone number:');
  
  fetch('book_room.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `name=${name}&email=${email}&phone=${phone}&room_id=${room_id}&checkin=${checkin}&checkout=${checkout}`
  })
  .then(response => response.text())
  .then(message => {
    alert(message);
  });
}*/
/*
function bookRoom(room_id) {
  const checkin = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;
  
  const name = prompt('Enter your name:');
  const email = prompt('Enter your email:');
  const phone = prompt('Enter your phone number:');
  
  fetch('book_room.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `name=${name}&email=${email}&phone=${phone}&room_id=${room_id}&checkin=${checkin}&checkout=${checkout}`
  })
  .then(response => response.text())  // Get the response as text
  .then(message => {
    alert(message);  // Show success or error message
  })
  .catch(error => {
    console.error('Error:', error);
    alert('There was an error processing your booking.');
  });
}*/

// Fetch and display room data for the staff management page
document.addEventListener('DOMContentLoaded', function() {
  fetch('get_rooms.php')
    .then(response => response.json())
    .then(rooms => {
      const roomList = document.getElementById('room-list');
      
      // Clear any existing room data
      roomList.innerHTML = '';
      
      if (rooms.length > 0) {
        rooms.forEach(room => {
          // Create list item for each room
          const li = document.createElement('li');
          li.innerHTML = `
            Room ID: ${room.room_id} | 
            Type: ${room.room_type} | 
            Price: $${room.price} | 
            Status: <span class="${room.status === 'booked' ? 'booked' : 'available'}">${room.status}</span>
          `;
          roomList.appendChild(li);
        });
      } else {
        // No rooms found
        roomList.innerHTML = '<li>No rooms found</li>';
      }
    })
    .catch(error => {
      console.error('Error fetching room data:', error);
    });
});

