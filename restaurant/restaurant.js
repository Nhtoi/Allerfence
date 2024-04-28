function getUserDataByEmail(email) { //retrieve user data based on email
    return fetch('http://localhost:3000/getRestaurantByEmail', {
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

function addMenuItem(event) {
    event.preventDefault();
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
            // Extract restaurant ID from the response
            const restaurantId = restaurantData._id;

            // Construct menu item data
            const itemName = document.getElementById('itemName').value;
            const price = parseFloat(document.getElementById('price').value);
            const ingredients = document.getElementById('ingredients').value.split(',');
            const allergens = document.getElementById('allergens').value.split(',');

            const menuItemData = {
                restaurantId, // Include the restaurantId in the request
                itemName,
                price,
                ingredients,
                allergens
            };

            console.log('Sending request with data:', menuItemData);
            // Fetch request to add a menu item
            return fetch('http://localhost:3000/restaurant/addMenuItem', {
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
// Retrieve email from local storage
const userEmail = localStorage.getItem('email');



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

    fetch('http://localhost:3000/createRestaurant', {
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

            alert("Creating your Restaurant was successful!");
            window.location.href = "/restaurant/restaurantProfile.html";
        })
        .catch(error => {
            console.error('Error:', error.message);
            alert("There was an error creating your restaurant.");
        });
}

// Have yet to implement the following:
// - updateMenuItem()
// - deleteMenuItem()
// - fetchMenuItems() thinking about making this to display existing menu items


// //This is a harded coded restaurant for testing purposes
// async function createTestRestaurant() {
//     try {
//         // Create a test restaurant
//         const testRestaurant = await Restaurant.create({
//             name: 'Restaurant1',
//             email: 'restaurant1@email.com',
//             address: '777 Main St, Cityville',
//             cuisine: 'Italian',
//             restHours: 'Mon-Sat: 11am-10pm',
//             menu: [
//                 { itemName: 'Spaghetti', price: 12.99, allergen: 'egg' },
//                 { itemName: 'Margherita Pizza', price: 10.99, allergen: 'gluten' },
//                 { itemName: 'Tiramisu', price: 6.99, allergen: 'dairy'}
//             ],
//         });
//         console.log('Test restaurant created:', testRestaurant);
//     } catch (error) {
//         console.error('Error creating test restaurant:', error);
//     }
// }
