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
