//retrieve user data based on email
function getUserDataByEmail(email) {
    return fetch('http://localhost:3000/getUserByEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // Send the email in the request body
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Retrieve email from local storage
const userEmail = localStorage.getItem('email');

// Call function to get user data using the retrieved email
getUserDataByEmail(userEmail)
.then(userData => {
    // Extract user's first name
    const firstName = userData.name.firstName;
    const welcomeMessage = document.createElement('h2');
    welcomeMessage.textContent = `Welcome Back, ${firstName}!`;
    document.getElementById('main').insertBefore(welcomeMessage, document.querySelector('.heading1'));
});


function CreateOrder() {
    const form = document.getElementById('createOrderForm');
    const formData = new FormData(form); // Gather form data

    fetch('http://localhost:3000/createOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData)), // Convert FormData to JSON
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    })
    .then(orderData => {
        console.log('Order created:', orderData);
        // Handle success, maybe show a confirmation message or redirect
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle error, maybe show an error message to the user
    });
}


function searchRestaurant(event) {
    event.preventDefault();
    // Get the user input from the search form
    const userInput = document.getElementById('searchForm');
    const userInputData = new FormData(userInput);

    // Extract the restaurant name entered by the user
    const restaurantName = userInputData.get('search'); // Corrected to 'search'

    // Perform a search request to your server
    fetch('http://localhost:3000/searchRestaurant', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: restaurantName })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Restaurant not found');
    })
    .then(data => {
        // Display the restaurant data to the user
        console.log(data); 
    })
    .catch(error => {
        console.error(error);

    });
}