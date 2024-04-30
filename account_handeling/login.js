function login(event) {
    event.preventDefault(); // Prevent the default form submission

    const userType = document.getElementById("dropDownOptions").value;
    const email = document.querySelector(".emailInput").value;
    const password = document.querySelector(".passwordInput").value;
    

    const loginData = {
        userType,
        email,
        password,
    };

    fetch('http://localhost:3003/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    })
    .then(data => {
        // Handle the response from the server
        console.log(data);

        if (data.success) {
            // Save user credentials to localStorage
            localStorage.setItem('userType', userType);
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            // Redirect based on account type
            redirectBasedOnAccountType(userType);
        } else {
            console.error('Login failed:', data.error);
        }
    })
    .catch(error => {
        if (error instanceof TypeError) {
            console.error('Network error or CORS issue:', error);
        } else {
            console.error('Error:', error);
        }
    });
}

function redirectBasedOnAccountType(userType) {
    let loginUrl = "";

    switch (userType) {
        case "Vendor":
            loginUrl = "../restaurant/restaurantProfile.html";
            break;
        case "Customer":
            loginUrl = "../customer/dashboard.html";
            break;
        case "Driver":
            loginUrl = "../driver/Driver.html";
            break;
        default:
            // handle default case or show an error message
            break;
    }

    // Redirect to the constructed URL
    window.location.href = loginUrl;
}