let selectedRoomId = null;
let selectedRoomType = null;
let selectedRoomImage = null;
// Room Search - AJAX Call
document.getElementById('search-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const checkin = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;
  const roomtype = document.getElementById('roomtype').value;

  fetch('search_rooms2.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `checkin=${checkin}&checkout=${checkout}&roomtype=${roomtype}`
  })
  .then(response => response.json())
  .then(rooms => {
    const results = document.getElementById('results');
    results.innerHTML = rooms.length ? `<h3>
          <font color="#333">Available Rooms</font><br></h3><p> ` : '<p>No rooms available</p>';
    rooms.forEach(room => {
      results.innerHTML += ` <img src="${room.image_url}" alt="Room Image" style="width:200px; height:auto; border-radius: 8px;">
           <font color="#333">Room ID: ${room.room_id} | Type: ${room.room_type} | Price: $${room.price}</font> <button onclick="selectRoom(${room.room_id}, '${room.room_type}')">Select</button></p>`;
    });
  });
});

// Room Selection
function selectRoom(roomId, roomType) {
  selectedRoomId = roomId;
  selectedRoomType = roomType;
  
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

    // Store booking details in localStorage
    localStorage.setItem('checkin', checkin);
    localStorage.setItem('checkout', checkout);
    localStorage.setItem('roomtype', selectedRoomType);

    // Redirect to the confirmation page
    window.location.href = 'confirmation.html';
  })
  .catch(error => {
    console.error('Error:', error);
    alert('There was an error processing your booking.');
  });
});
// Fetch and display room data for the staff management page
document.addEventListener('DOMContentLoaded', function() {
    console.log("Fetching room data...");

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
            <p>Room ID: ${room.room_id}</p>
            <p>Type: ${room.room_type}</p>
            <p>Price: $${room.price}</p>
            <p>Status: <span class="${room.status === 'booked' ? 'booked' : 'available'}">${room.status}</span></p>
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