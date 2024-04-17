// Retrieve user data based on email
function getUserDataByEmail(email) {
    return fetch('http://localhost:3000/getUserByEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
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
    if (userData) {
        // Assuming user's name is stored directly in `name` property.
        const firstName = userData.name.split(' ')[0]; // Adjust if name format differs
        const welcomeMessage = document.createElement('h2');
        welcomeMessage.textContent = `Welcome Back, ${firstName}!`;
        document.getElementById('main').insertBefore(welcomeMessage, document.querySelector('.heading1'));
    }
});

// Function to add a menu item
document.getElementById('addMenuItemForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const itemName = document.getElementById('itemName').value;
    const price = parseFloat(document.getElementById('price').value);
    const ingredients = document.getElementById('ingredients').value.split(',');
    const allergens = document.getElementById('allergens').value.split(',');

    const menuItemData = {
        itemName,
        price,
        ingredients,
        allergens
    };

    fetch('http://localhost:3000/restaurant/addMenuItem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(menuItemData)
    })
    .then(response => {
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
});
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
//             address: '123 Main St, Cityville',
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
