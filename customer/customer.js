
let currentRestaurantId = null
let restaurantAddress = null

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
            return response.json()
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
    })
    .catch(error => {
        console.error('Error:', error)
    })
}

// Retrieve email from local storage
const userEmail = localStorage.getItem('email')
// Call function to get user data using the retrieved email
getUserDataByEmail(userEmail)
.then(userData => {
       // Create a welcome message
       const welcomeMessage = document.createElement('h2')
       welcomeMessage.textContent = `Welcome Back, ${userData.name.firstName}!`
       
       // Insert the welcome message into the main section of dashboard.html
       document.getElementById('main').insertBefore(welcomeMessage, document.querySelector('.heading1'))
    // Extract user's first name and other data
    document.getElementById('firstName').textContent = userData.name.firstName
    document.getElementById('lastName').textContent = userData.name.lastName
    document.getElementById('phoneNumber').textContent = userData.phoneNum
    document.getElementById('address').textContent = userData.address
    document.getElementById('userAllergies').textContent = userData.Allergies
})




function searchRestaurant(event) {
    event.preventDefault()
    // Get the user input from the search form
    const userInput = document.getElementById('searchForm')
    const userInputData = new FormData(userInput)

    // Extract the restaurant name entered by the user
    const restaurantName = userInputData.get('search')

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
            return response.json()
        }
        throw new Error('Restaurant not found')
    })
    .then(data => {
        // Display restaurant information
        console.log(data)
        const restaurantContainer = document.getElementById('restaurantContainer')
        restaurantContainer.innerHTML = "" // Clear previous content
        currentRestaurantId = data._id
        restaurantAddress = data.address
        const restaurantHeading = document.createElement('h2')
        restaurantHeading.textContent = data.name
        restaurantContainer.appendChild(restaurantHeading)
        console.log("Address: " + restaurantAddress)
        const addressParagraph = document.createElement('p')
        addressParagraph.textContent = `Address: ${data.address}`
        restaurantContainer.appendChild(addressParagraph)

        const cuisineParagraph = document.createElement('p')
        cuisineParagraph.textContent = `Cuisine: ${data.cuisine}`
        restaurantContainer.appendChild(cuisineParagraph)

        const menuHoursParagraph = document.createElement('p')
        menuHoursParagraph.textContent = `Menu Hours: ${data.menuHours}`
        restaurantContainer.appendChild(menuHoursParagraph)

        // Display menu items with plus and minus buttons
        const menuItemsContainer = document.getElementById('menuItems')
        menuItemsContainer.innerHTML = "" // Clear previous content

        data.menu.forEach(item => {
            const menuItem = document.createElement('div')
            menuItem.classList.add('menu-item')

            const itemName = document.createElement('span')
            itemName.textContent = `${item.itemName}: $${item.price}`
            menuItem.appendChild(itemName)

            const plusButton = document.createElement('button')
            plusButton.textContent = '+'
            plusButton.onclick = () => addToCart(item)
            menuItem.appendChild(plusButton)

            const minusButton = document.createElement('button')
            minusButton.textContent = '-'
            minusButton.onclick = () => removeFromCart(item)
            menuItem.appendChild(minusButton)

            menuItemsContainer.appendChild(menuItem)
        })

        // Show the order form
        document.getElementById('orderFormContainer').style.display = 'block'
    })
    .catch(error => {
        console.error(error)
        // Display a message to the user indicating that the restaurant was not found
        alert('Restaurant not found')
    })
}
function CreateOrder() {
    const userEmail = localStorage.getItem('email');
    if (!userEmail) {
        console.error('Error: Invalid or missing email in localStorage');
        return;
    }

    getUserDataByEmail(userEmail)
    .then(userData => {
        console.log("RestaurantID Corresponding to searched Restaurant: " + currentRestaurantId);
        
        const userId = userData._id;
        const userAllergies = userData.Allergies;
        const userName = userData.name.firstName;
        const totalPrice = cart.reduce((total, item) => total + (item.quantity * item.price), 0);
        const customerAddress = userData.address;
        const orderType = "delivery";
        let specialInstructions = "None";

        // Fetch allergy-ingredient mapping from backend
        fetch('http://localhost:3000/getAllergyIngredientMapping', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ allergies: userAllergies })  // Send user allergies as a JSON array
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        })
        .then(mapping => {
            // Process allergy-ingredient mapping
            let allergiesFound = false;
            let allergyMessage = '';

            // Check for allergies in the cart items
            for (const item of cart) {
                for (const ingredient of item.ingredients) {
                    // Iterate through the mapping to find any matches with the item's ingredients
                    for (const [allergy, ingredientsSet] of Object.entries(mapping)) {
                        if (ingredientsSet.includes(ingredient)) {
                            allergiesFound = true;
                            allergyMessage += `Please remove ${ingredient} from ${item.itemName}. `;
                        }
                    }
                }
            }

            // If allergies were found, set specialInstructions
            if (allergiesFound) {
                specialInstructions = allergyMessage;
            }

            // Proceed with creating the order
            const orderData = {
                userId: userId,
                items: cart.map(item => ({
                    name: item.itemName,
                    quantity: item.quantity,
                    price: item.price
                })),
                name: userName,
                total: totalPrice,
                type: orderType,
                restaurantId: currentRestaurantId,
                customerAddress: customerAddress,
                restaurantAddress: restaurantAddress,
                specialInstructions: specialInstructions
            };
            
            console.log('orderData:', orderData);
            fetch('http://localhost:3000/createOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            })
            .then(orderResponse => {
                console.log('Order created:', orderResponse);
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
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle error, maybe show an error message to the user
    });
}

// Global variable to store the cart items
let cart = []

// Function to add an item to the cart
function addToCart(item) {
    console.log(`Adding ${item.itemName} to cart`)
    
    // Check if the item is already in the cart
    const existingItemIndex = cart.findIndex(cartItem => cartItem._id === item._id)
    if (existingItemIndex !== -1) {
        // If item already exists in cart, increase its quantity
        cart[existingItemIndex].quantity++
    } else {
        // If item doesn't exist in cart, add it with quantity 1
        cart.push({ ...item, quantity: 1 })
    }
       // Calculate and log the total price of items in the cart
       const totalPrice = cart.reduce((total, item) => total + (item.quantity * item.price), 0)
       console.log("Total Price:", totalPrice)
       
       // Log the updated cart items to the console
       console.log("Updated Cart:", cart)
   }

// Function to remove an item from the cart
function removeFromCart(item) {
    console.log(`Removing ${item.itemName} from cart`)

    // Check if the item is in the cart
    const existingItemIndex = cart.findIndex(cartItem => cartItem._id === item._id)
    if (existingItemIndex !== -1) {
        // If item exists in cart, decrease its quantity
        cart[existingItemIndex].quantity--
        // If quantity becomes zero, remove the item from the cart
        if (cart[existingItemIndex].quantity === 0) {
            cart.splice(existingItemIndex, 1)
        }
    }

    // Log the updated cart items to the console
    console.log("Updated Cart:", cart)
}


const TrackOrder = () => {
   
    const userEmail = localStorage.getItem('email')
    if (!userEmail) {
        console.error('Error: Invalid or missing email in localStorage')
        return
    }

    getUserDataByEmail(userEmail)
    .then(userData => {
        // get user's ID
        const userId = userData._id
        console.log(userId)
        fetch(`http://localhost:3000/trackOrder/${userId}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
    
            const orderStatusElement = document.getElementById('orderStatus')
            orderStatusElement.textContent = `Order Status: No Order Found`
            throw new Error('Failed to track order')
        })
        .then(orderDetails => {
            // Display order details to the user
            console.log("Order Details:", orderDetails)
            
            // Check if orderDetails is not empty and has at least one order
            if (orderDetails.length > 0) {
                // Get the status of the first order
                const orderStatus = orderDetails[0].status
                
                // Update order status message
                const orderStatusElement = document.getElementById('orderStatus')
                orderStatusElement.textContent = `Order Status: ${orderStatus}`
            } else {
                console.log("No orders found.")
            }
        })
        .catch(error => {
            console.error(error)
            
        })
    })
    .catch(error => {
        console.error(error)
        
    })
}



const CancelOrder = () => {
    console.log("Cancelling Order...")
    
    const userEmail = localStorage.getItem('email')
    if (!userEmail) {
        console.error('Error: Invalid or missing email in localStorage')
        return
    }

    // Call function to get user data using the retrieved email
    getUserDataByEmail(userEmail)
    .then(userData => {
        // Extract user's ID
        const userId = userData._id
        console.log(userId)

        // Send request to cancel order based on userId
        fetch(`http://localhost:3000/cancelOrder/${userId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                console.log("Order cancelled successfully")
                // Handle success, maybe show a confirmation message to the user
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
        })
        .catch(error => {
            console.error('Error:', error)
            // Handle error, maybe show an error message to the user
        })
    })
    .catch(error => {
        console.error('Error:', error)
        // Handle error, maybe show an error message to the user
    })
}

// Initialize an array to store selected allergies
const selectedAllergies = [];

// Function to fetch allergies and display them in the UI
async function fetchAllergies() {
    try {
        const response = await fetch('http://localhost:3000/displayAllergies');
        if (response.ok) {
            const allergies = await response.json();
            // Display the allergies in the UI
            const allergiesContainer = document.getElementById('allergiesList');
            allergiesContainer.innerHTML = ''; // Clear existing list

            allergies.forEach(allergy => {
                const listItem = document.createElement('li');
                listItem.textContent = allergy.Allergy;

                // Add a click event listener to each allergy item
                listItem.addEventListener('click', () => {
                    // Check if the allergy is already selected
                    if (!selectedAllergies.includes(allergy.Allergy)) {
                        // Add the allergy to the selected allergies array
                        selectedAllergies.push(allergy.Allergy);
                        // Provide visual feedback for selection (e.g., change background color)
                        listItem.style.backgroundColor = 'lightgreen';
                    } else {
                        // If the allergy is already in the array, remove it
                        const index = selectedAllergies.indexOf(allergy.Allergy);
                        if (index > -1) {
                            selectedAllergies.splice(index, 1);
                            // Reset the background color
                            listItem.style.backgroundColor = '';
                        }
                    }
                    
                    // Log the array of selected allergies
                    console.log('Selected Allergies:', selectedAllergies);
                });

                allergiesContainer.appendChild(listItem);
            });

            // Show the "Hide Allergies" button when allergies are displayed
            hideAllergiesButton.style.display = 'inline-block';
        } else {
            console.error('Failed to fetch allergies:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching allergies:', error);
    }
}

// Add event listeners for the "Show Allergies" and "Hide Allergies" buttons
const showAllergiesButton = document.getElementById('showAllergiesButton');
const hideAllergiesButton = document.getElementById('hideAllergiesButton');

// Add event listener to the "Show Allergies" button
showAllergiesButton.addEventListener('click', fetchAllergies);

// Add event listener to the "Hide Allergies" button
hideAllergiesButton.addEventListener('click', () => {
    // Hide the allergies list
    const allergiesContainer = document.getElementById('allergiesList');
    allergiesContainer.innerHTML = ''; // Clear the list content

    // Hide the "Hide Allergies" button
    hideAllergiesButton.style.display = 'none';
});

// Add event listener to the "Add Allergy" button
const addAllergyButton = document.getElementById('addAllergyButton');
addAllergyButton.addEventListener('click', () => {
    // Call the updateAllergies function with the selectedAllergies array
    updateAllergies(selectedAllergies);
});

function updateAllergies(selectedAllergies) {
    // Retrieve the user email from local storage
    const userEmail = localStorage.getItem('email');
    if (!userEmail) {
        console.error('Error: Invalid or missing email in local storage');
        return;
    }

    // Prepare the data to be sent in the request body
    const requestData = {
        email: userEmail,
        newAllergies: selectedAllergies
    };

    // Log the request data for debugging purposes
    console.log('Sending request data:', requestData);

    // Send a POST request to the server to update the user's allergies
    fetch('http://localhost:3000/updateAllergies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),  // Convert data to JSON
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    })
    .then(data => {
        console.log('Allergies updated successfully:', data);
        alert('Allergies updated successfully!');
    })
    .catch(error => {
        console.error('Error updating allergies:', error);
        alert('Error updating allergies. Please try again.');
    });
}



async function updateAddress(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Retrieve the address input value and the user's email from local storage
    const addressInput = document.getElementById('addressInput');
    const address = addressInput.value;

    const userEmail = localStorage.getItem('email');
    if (!userEmail) {
        console.error('Error: Invalid or missing email in local storage');
        return;
    }

    // Prepare the data to be sent in the request body
    const requestData = {
        email: userEmail,
        newAddress: address
    };

    // Send a POST request to the server to update the user's address
    fetch('http://localhost:3000/addAddress', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData), // Convert data to JSON
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    })
    .then(data => {
        console.log('Address added successfully:', data);
        alert('Address added successfully!');
        // Optionally, you may want to refresh the page or update the address in the UI
        document.getElementById('address').textContent = address;
    })
    .catch(error => {
        console.error('Error updating address:', error);
        alert('Error updating address. Please try again.');
    });

    // Clear the address input field after submission
    addressInput.value = '';
}

// Add an event listener to the form to handle form submission
document.getElementById('addAddressForm').addEventListener('submit', updateAddress);
