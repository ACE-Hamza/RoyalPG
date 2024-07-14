document.getElementById('filter-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const location = document.getElementById('location').value;
    const beds = document.getElementById('beds').value;
    fetch(`/filter_rooms?location=${location}&beds=${beds}`)
        .then(response => response.json())
        .then(data => {
            const roomsContainer = document.getElementById('rooms-container');
            roomsContainer.innerHTML = '';
            data.forEach(room => {
                const roomCard = document.createElement('div');
                roomCard.className = 'room-card';
                roomCard.innerHTML = `<h2>${room.name}</h2>
                    <p>Location: ${room.location}</p>
                    <p>Beds: ${room.beds}</p>
                    <p>Price: ${room.price}</p>`;
                roomsContainer.appendChild(roomCard);
            });
        });
});
