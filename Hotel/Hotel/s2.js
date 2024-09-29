document.addEventListener('DOMContentLoaded', function() {
  console.log("Fetching room data...");

  // Fetch and display room data for the staff management page
  fetch('get_rooms.php')
    .then(response => {
      console.log("Response status: ", response.status);
      return response.json();
    })
    .then(rooms => {
      console.log("Rooms data received:", rooms);
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
