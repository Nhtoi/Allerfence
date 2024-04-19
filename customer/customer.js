function getUserDataByEmail(email) { //retrieve user data based on email
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
    const userEmail = localStorage.getItem('email');
    if (!userEmail) {
        console.error('Error: Invalid or missing email in localStorage');
        return;
    }

    // Call function to get user data using the retrieved email
    getUserDataByEmail(userEmail)
    .then(userData => {
        // Extract user's ID
        const userId = userData._id;
        const totalPrice = cart.reduce((total, item) => total + (item.quantity * item.price), 0);
        // Construct order data object
        const orderData = {
                userId: userId,
                items: cart.map(item => ({
                name: item.itemName,
                quantity: item.quantity,
                price: item.price, 
            })),
                total: totalPrice, 
                
        };
        
        console.log(orderData)
        fetch('http://localhost:3000/createOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData), 
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
    const restaurantName = userInputData.get('search');

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
        // Display restaurant information
        const restaurantContainer = document.getElementById('restaurantContainer');
        restaurantContainer.innerHTML = ""; // Clear previous content

        const restaurantHeading = document.createElement('h2');
        restaurantHeading.textContent = data.name;
        restaurantContainer.appendChild(restaurantHeading);

        const addressParagraph = document.createElement('p');
        addressParagraph.textContent = `Address: ${data.address}`;
        restaurantContainer.appendChild(addressParagraph);

        const cuisineParagraph = document.createElement('p');
        cuisineParagraph.textContent = `Cuisine: ${data.cuisine}`;
        restaurantContainer.appendChild(cuisineParagraph);

        const menuHoursParagraph = document.createElement('p');
        menuHoursParagraph.textContent = `Menu Hours: ${data.menuHours}`;
        restaurantContainer.appendChild(menuHoursParagraph);

        // Display menu items with plus and minus buttons
        const menuItemsContainer = document.getElementById('menuItems');
        menuItemsContainer.innerHTML = ""; // Clear previous content

        data.menu.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.classList.add('menu-item');

            const itemName = document.createElement('span');
            itemName.textContent = `${item.itemName}: $${item.price}`;
            menuItem.appendChild(itemName);

            const plusButton = document.createElement('button');
            plusButton.textContent = '+';
            plusButton.onclick = () => addToCart(item);
            menuItem.appendChild(plusButton);

            const minusButton = document.createElement('button');
            minusButton.textContent = '-';
            minusButton.onclick = () => removeFromCart(item);
            menuItem.appendChild(minusButton);

            menuItemsContainer.appendChild(menuItem);
        });

        // Show the order form
        document.getElementById('orderFormContainer').style.display = 'block';
    })
    .catch(error => {
        console.error(error);
        // Display a message to the user indicating that the restaurant was not found
        alert('Restaurant not found');
    });
}

// Global variable to store the cart items
let cart = [];

// Function to add an item to the cart
function addToCart(item) {
    console.log(`Adding ${item.itemName} to cart`);
    
    // Check if the item is already in the cart
    const existingItemIndex = cart.findIndex(cartItem => cartItem._id === item._id);
    if (existingItemIndex !== -1) {
        // If item already exists in cart, increase its quantity
        cart[existingItemIndex].quantity++;
    } else {
        // If item doesn't exist in cart, add it with quantity 1
        cart.push({ ...item, quantity: 1 });
    }
       // Calculate and log the total price of items in the cart
       const totalPrice = cart.reduce((total, item) => total + (item.quantity * item.price), 0);
       console.log("Total Price:", totalPrice);
       
       // Log the updated cart items to the console
       console.log("Updated Cart:", cart);
   }

// Function to remove an item from the cart
function removeFromCart(item) {
    console.log(`Removing ${item.itemName} from cart`);

    // Check if the item is in the cart
    const existingItemIndex = cart.findIndex(cartItem => cartItem._id === item._id);
    if (existingItemIndex !== -1) {
        // If item exists in cart, decrease its quantity
        cart[existingItemIndex].quantity--;
        // If quantity becomes zero, remove the item from the cart
        if (cart[existingItemIndex].quantity === 0) {
            cart.splice(existingItemIndex, 1);
        }
    }

    // Log the updated cart items to the console
    console.log("Updated Cart:", cart);
}


const TrackOrder = () => {
   
    const userEmail = localStorage.getItem('email');
    if (!userEmail) {
        console.error('Error: Invalid or missing email in localStorage');
        return;
    }

    getUserDataByEmail(userEmail)
    .then(userData => {
        // get user's ID
        const userId = userData._id;
        console.log(userId)
        fetch(`http://localhost:3000/trackOrder/${userId}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
    
            const orderStatusElement = document.getElementById('orderStatus');
            orderStatusElement.textContent = `Order Status: No Order Found`;
            throw new Error('Failed to track order');
        })
        .then(orderDetails => {
            // Display order details to the user
            console.log("Order Details:", orderDetails);
            
            // Check if orderDetails is not empty and has at least one order
            if (orderDetails.length > 0) {
                // Get the status of the first order
                const orderStatus = orderDetails[0].status;
                
                // Update order status message
                const orderStatusElement = document.getElementById('orderStatus');
                orderStatusElement.textContent = `Order Status: ${orderStatus}`;
            } else {
                console.log("No orders found.");
            }
        })
        .catch(error => {
            console.error(error);
            
        });
    })
    .catch(error => {
        console.error(error);
        
    });
};



const CancelOrder = () => {
    console.log("Cancelling Order...");
    
    const userEmail = localStorage.getItem('email');
    if (!userEmail) {
        console.error('Error: Invalid or missing email in localStorage');
        return;
    }

    // Call function to get user data using the retrieved email
    getUserDataByEmail(userEmail)
    .then(userData => {
        // Extract user's ID
        const userId = userData._id;
        console.log(userId);

        // Send request to cancel order based on userId
        fetch(`http://localhost:3000/cancelOrder/${userId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                console.log("Order cancelled successfully");
                // Handle success, maybe show a confirmation message to the user
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error, maybe show an error message to the user
        });
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle error, maybe show an error message to the user
    });
};
