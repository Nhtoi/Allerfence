
//TODO: fetch`
//see orders
//fetch order with your own restaurant name
//accept
//create items
//delete etcc
//calcuate earnings

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

// Call function to get Restaurants data using the retrieved email
getUserDataByEmail(userEmail)
.then(userData => {
    // Extract user's first name
    const firstName = userData.name.name;
    const welcomeMessage = document.createElement('h2');
    welcomeMessage.textContent = `Welcome Back, ${firstName}!`;
    document.getElementById('main').insertBefore(welcomeMessage, document.querySelector('.heading1'));
});

document.addEventListener('DOMContentLoaded', function() {
    fetchMenuItems();

    const form = document.getElementById('addMenuItemForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            price: parseFloat(document.getElementById('price').value),
            ingredients: document.getElementById('ingredients').value.split(','),
            allergens: document.getElementById('allergens').value.split(',')
        };
        addMenuItem(formData);
    });
    
    async function createTestRestaurant() {
        try {
            // Create a test restaurant
            const testRestaurant = await Restaurant.create({
                name: 'Restaurant1',
                email: 'restaurant1@email.com',
                address: '123 Main St, Cityville',
                cuisine: 'Italian',
                restHours: 'Mon-Sat: 11am-10pm',
                menu: [
                    { itemName: 'Spaghetti', price: 12.99, allergen: 'egg' },
                    { itemName: 'Margherita Pizza', price: 10.99, allergen: 'gluten' },
                    { itemName: 'Tiramisu', price: 6.99, allergen: 'dairy'}
                ],
            });
            console.log('Test restaurant created:', testRestaurant);
        } catch (error) {
            console.error('Error creating test restaurant:', error);
        }
    }
    
});

function fetchMenuItems() {
    fetch('/menuItems')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('menuItemsContainer');
            container.innerHTML = ''; // Clear existing items
            data.forEach(item => {
                const menuItemDiv = document.createElement('div');
                menuItemDiv.className = 'menu-item';
                menuItemDiv.innerHTML = `<p>${item.name}</p><p>$${item.price.toFixed(2)}</p>`;
                container.appendChild(menuItemDiv);
            });
        })
        .catch(error => console.error('Error loading menu items:', error));
}

function addMenuItem(itemData) {
    fetch('/menuItems', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        fetchMenuItems(); // Reload menu items
    })
    .catch(error => console.error('Error:', error));
}

async function createTestRestaurant() {
    try {
        // Create a test restaurant
        const testRestaurant = await Restaurant.create({
            name: 'Restaurant1',
            email: 'restaurant1@email.com',
            address: '123 Main St, Cityville',
            cuisine: 'Italian',
            restHours: 'Mon-Sat: 11am-10pm',
            menu: [
                { itemName: 'Spaghetti', price: 12.99, allergen: 'egg' },
                { itemName: 'Margherita Pizza', price: 10.99, allergen: 'gluten' },
                { itemName: 'Tiramisu', price: 6.99, allergen: 'dairy'}
            ],
        });
        console.log('Test restaurant created:', testRestaurant);
    } catch (error) {
        console.error('Error creating test restaurant:', error);
    }
}
