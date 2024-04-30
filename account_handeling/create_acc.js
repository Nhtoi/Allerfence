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
        userType
    };
    fetch('http://localhost:3003/signup', {
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
            return response.json();
        })
        .then(data => {
            console.log(data);
    
            if (data.success) {
                alert("Sign-up successful!");
                redirectBasedOnUserType(userType); // Redirect based on userType
            } else {
                console.error('Sign-up failed:', data.error);
                alert("Sign-up failed. Please try again.");
            }
        })
        .catch(error => console.error('Error:', error.message));
}

function redirectBasedOnUserType(userType) {
    let loginUrl = "";

    switch (userType) {
        case "Vendor":
            loginUrl = "createRestaurant.html";
            break;
        case "Customer":
            loginUrl = "login.html";
            break;
        case "Driver":
            loginUrl = "login.html";
            break;
        default:
            break;
    }

    // Redirect to the constructed URL
    window.location.href = loginUrl;
}