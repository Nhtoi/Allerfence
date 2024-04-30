function getUserDataByEmail(email) { //retrieve user data based on email
    return fetch('http://localhost:3003/getRestaurantByEmail', {
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
const addButton = document.getElementById('submit')
addButton.addEventListener('click', addMenuItem)
function addMenuItem() {
 
    const userEmail = localStorage.getItem('email');

    // Ensure userEmail is retrieved from localStorage
    if (!userEmail) {
        console.error('Error: No email found in localStorage.');
        return;
    }

    getUserDataByEmail(userEmail)
        .then(restaurantData => {
            if (!restaurantData) {
                throw new Error('No restaurant data returned.');
            }
            const restaurantId = restaurantData._id;
            console.log('Email:', userEmail);
            console.log('Restaurant ID:', restaurantId);
        
            // Construct menu item data
            const itemName = document.getElementById('itemName').value;
            const price = parseFloat(document.getElementById('price').value);
            const ingredients = document.getElementById('ingredients').value.split(',');
            const allergens = document.getElementById('allergens').value.split(',');
        
            const menuItemData = {
                email: userEmail, // Include the restaurantId in the request
                itemName: itemName,   
                price: price,
                ingredients: ingredients ,
                allergens: allergens,
                restaurantId: restaurantId    
            };

            console.log('Sending request with data:', menuItemData);
            // Fetch request to add a menu item
            return fetch('http://localhost:3003/addMenuItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(menuItemData)
            });
        })
        .then(response => {
            console.log('Response:', response);
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        })
        .then(data => {
            document.getElementById('message').textContent = 'Menu item added successfully!';
            console.log('Menu item added:', data);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('message').textContent = 'Error adding menu item.';
        });
}

function createRestaurant(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const cuisine = document.getElementById("cuisine").value;
    const restHours = document.getElementById("restHours").value;
    const email = document.getElementById("email").value;

    if (!name || !address || !cuisine || !restHours || !email) {
        alert("Please fill in all required fields");
        return;
    }

    const restaurantData = {
        name,
        address,
        cuisine,
        restHours,
        email
    };

    fetch('http://localhost:3003/createRestaurant', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(restaurantData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            alert("Creating your Restaurant was successful!"); //5:37 pm changed redirection page
            window.location.href = "../account_handeling/login.html";
        })
        .catch(error => {
            console.error('Error:', error.message);
            alert("There was an error creating your restaurant.");
        });
}
//Now able to dynamically display user's menu items
function displayRestaurantMenu() {
    const userEmail = localStorage.getItem('email');
    
    // Ensure userEmail is retrieved from localStorage
    if (!userEmail) {
        console.error('Error: No email found in localStorage.');
        return;
    }

    getUserDataByEmail(userEmail)
        .then(restaurantData => {
            const menuItems = restaurantData.menu; // Assuming 'menu' is part of the restaurantData
            const menuContainer = document.getElementById('Menu');

            // Clear the menu container before adding new items
            menuContainer.innerHTML = '';

            // Dynamically create menu item elements
            menuItems.forEach(item => {
                const menuItemElement = document.createElement('div');
                menuItemElement.className = 'menuItem';

                menuItemElement.innerHTML = `
                    <h4>${item.itemName}</h4>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <p>Ingredients: ${item.ingredients.join(', ')}</p>
                    <p>Allergens: ${item.allergens.join(', ')}</p>
                `;

                // Append the menu item to the menu container
                menuContainer.appendChild(menuItemElement);
            });
        })
        .catch(error => {
            console.error('Error fetching menu:', error);
        });
}

// Call this function when the page loads to display the menu
window.addEventListener('DOMContentLoaded', (event) => {
    displayRestaurantMenu();
});

//display user information
function displayRestaurantInformation() {
    const userEmail = localStorage.getItem('email');

    // Ensure userEmail is retrieved from localStorage
    if (!userEmail) {
        console.error('Error: No email found in localStorage.');
        return;
    }

    getUserDataByEmail(userEmail)
        .then(restaurantData => {
            if (!restaurantData) {
                throw new Error('No restaurant data returned.');
            }

            // Update restaurant information on the profile page
            document.getElementById('name').textContent = `Restaurant Name: ${restaurantData.name}`;
            document.getElementById('address').textContent = `Address: ${restaurantData.address}`;
            document.getElementById('cuisine').textContent = `Cuisine: ${restaurantData.cuisine}`;
            document.getElementById('restHours').textContent = `Hours: ${restaurantData.restHours}`;
        })
        .catch(error => {
            console.error('Error fetching restaurant information:', error);
        });
}

function displayOrders(event) {
    event.preventDefault();
    const userEmail = localStorage.getItem('email');

    // Ensure userEmail is retrieved from localStorage
    if (!userEmail) {
        console.error('Error: No email found in localStorage.');
        return;
    }

    // Fetch user data by email to get the restaurantId
    getUserDataByEmail(userEmail)
        .then(restaurantData => {
            if (!restaurantData) {
                throw new Error('No restaurant data returned.');
            }

            // Get restaurantId
            const restaurantId = restaurantData._id;

            // Fetch orders for the restaurant
            return fetch(`http://localhost:3003/orders/${restaurantId}`);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(orders => {
            // Display the orders in the appropriate section
            const ordersContainer = document.getElementById('incomingOrders');
            ordersContainer.innerHTML = ''; // Clear the existing content

            orders.forEach(order => {
                // Create a div element for each order
                const orderElement = document.createElement('div');
                orderElement.className = 'menu-item';
                
                // Extract and display order details
                const customerName = order.customerName; // Accessing customer name
                
                const total = (order.total && typeof order.total === 'number') ? order.total.toFixed(2) : 'N/A';
                const specialInstructions = order.specialInstructions
                const itemsList = order.items.map(items => `<li>${items.name} (${items.quantity}) $${items.price}</li>`).join('');
                
                orderElement.innerHTML = `
                    <p>Order #${order._id}</p>
                    <p>Total: $${total}</p>
                    <p>Customer: ${customerName}</p>
                    <p>Items:</p>
                    <ul>${itemsList}</ul>
                    <p>Status: ${order.status}</p>
                    <p>Special Instructions: ${specialInstructions}</p>
                    <button>Accept Order</button>
                `;

                // Append the order element to the orders container
                ordersContainer.appendChild(orderElement);
            });
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
        });
}

// Call the function when the page loads
window.addEventListener('DOMContentLoaded', (event) => {
    displayRestaurantInformation();
    displayRestaurantMenu(); // This function should already be defined to display the menu
});
