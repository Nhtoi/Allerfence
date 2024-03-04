function signUp(event) {
    event.preventDefault(); // Prevent the default form submission

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const phoneNum = document.getElementById("phoneNum").value;
    const email = document.getElementById("email").value;
    const confirmPassword = document.getElementById("conf-password").value;
    const password = document.getElementById("password").value;
    const userType = document.getElementById("userType").value;

    // Validate form fields (you may add more validation)
    if (!firstName || !lastName || !phoneNum || !email || !password || !confirmPassword) {
        alert("Please fill in all required fields");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    const signUpData = {
        firstName,
        lastName,
        phoneNum,
        email,
        password,
        userType,
    };

    fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(signUpData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Read the response as JSON
    })
    .then(data => {
        // Handle the response from the server
        console.log(data);

        // Assuming your server sends a success status or token upon successful sign-up
        if (data.success) {
            // Redirect or show success message
            alert("Sign-up successful!");
            window.location.href = "login.html"; // Redirect to login page
        } else {
            // Handle sign-up failure (show error message, etc.)
            console.error('Sign-up failed:', data.error);
            alert("Sign-up failed. Please try again.");
        }
    })
    .catch(error => console.error('Error:', error.message));
}

// Add an event listener to the form
document.querySelector("form").addEventListener("submit", signUp);