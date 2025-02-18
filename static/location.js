// Function to get the user's current location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Function to display the user's location
function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // You can use a reverse geocoding API to get the address from latitude and longitude
    // For simplicity, we'll just display the coordinates

    // Optionally, you can use a geocoding service to convert coordinates to a human-readable address
    // Example: Fetching address using a geocoding API (like OpenCage, Google Maps, etc.)
    // Uncomment the following lines and replace 'YOUR_API_KEY' with your actual API key

    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=b4dceffac0ea4833b0c9552ddbeaf2c2`)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                const address = data.results[0].formatted;
                document.getElementById('location-output').innerText = `Location: ${address}`;
            } else {
                document.getElementById('location-output').innerText = "No address found.";
            }
        })
        .catch(error => {
            console.error('Error fetching address:', error);
            document.getElementById('location-output').innerText = "Error fetching address.";
        });
}

// Function to handle errors
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User  denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

// Event listener for the "Use My Location" button
document.getElementById('locate-btn').addEventListener('click', getLocation);

// Event listener for the "Search" button
document.getElementById('search-btn').addEventListener('click', function() {
    const locationInput = document.getElementById('location').value;
    if (locationInput) {
        document.getElementById('location-output').innerText = `Searching for: ${locationInput}`;
        // Here you can implement a search function based on the entered location
        // For example, you could fetch restaurants or food options based on the location
    } else {
        alert("Please enter a location.");
    }
});
// Function to display the entered location
function displayLocation() {
    const locationInput = document.getElementById('location').value;
    const outputDiv = document.getElementById('location-output');

    if (locationInput) {
        // Clear previous output
        outputDiv.innerText = '';

        // Fetch location data from OpenCage API
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(locationInput)}&key=b4dceffac0ea4833b0c9552ddbeaf2c2`)
            .then(response => response.json())
            .then(data => {
                if (data.results.length > 0) {
                    const locationName = data.results[0].formatted_address; // Get the formatted address
                    outputDiv.innerText = `Location: ${locationName}`; // Display the location name
                } else {
                    outputDiv.innerText = "No results found.";
                }
            })
            .catch(error => {
                console.error('Error fetching location data:', error);
                outputDiv.innerText = "Error fetching location data.";
            });
    } else {
        alert("Please enter a location.");
    }
}

// Event listener for the "Search" button
document.getElementById('search-btn').addEventListener('click', displayLocation);
document.getElementById('search-btn').addEventListener('click',showPosition);