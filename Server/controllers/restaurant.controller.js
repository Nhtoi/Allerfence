const Customer = require('../models/customer.model');
const Restaurant = require('../models/restaurant.model');

async function getRestaurantByEmail(req, res) {
    const { email } = req.body;
    try {
        const user = await Restaurant.findOne({ email });
        if (user) {
            res.status(200).json({ userId: user._id, ...user.toObject() });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
//add menu item
async function addMenuItem(req, res) {
    const { email, itemName, price, ingredients, allergens } = req.body;

    try {
        // trying to find the restaurant with the given email
        const restaurant = await Restaurant.findOne({ 'email': email });
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }

        const newMenuItem = { itemName, price, ingredients, allergens };
        restaurant.menu.push(newMenuItem);

        await restaurant.save();
        res.status(201).json(newMenuItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


async function createRestaurant(req, res) {
    try {
        const { name, address, cuisine, restHours, email } = req.body;

        // Basic validation
        if (!name || !address || !cuisine || !restHours ||!email) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newRestaurant = new Restaurant({
            name,
            address,
            cuisine,
            restHours,
            email,
            menu: [] // Starts with an empty menu
        });

        await newRestaurant.save();
        res.status(201).json(newRestaurant);
    } catch (error) {
        console.error(error);
        // Detailed error handling
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
}


async function searchRestaurant(req, res) {
    const { name } = req.body;

    try {
        const restaurant = await Restaurant.findOne({ name });
        if (restaurant) {
            res.status(200).json(restaurant);
        } else {
            res.status(404).json({ error: "Restaurant not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    getRestaurantByEmail,
    createRestaurant,
    searchRestaurant,
    addMenuItem
}
// //delete menu Item
// async function deleteMenuItem(req, res) {
//     const { restaurantId, menuItemId } = req.body;

//     try {
//         const restaurant = await Restaurant.findById(restaurantId);
//         if (!restaurant) {
//             return res.status(404).json({ error: "Restaurant not found" });
//         }

//         restaurant.menu = restaurant.menu.filter(item => item._id.toString() !== menuItemId);

//         await restaurant.save();
//         res.status(200).json({ message: "Menu item deleted successfully" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }
// //update menu item
// async function updateMenuItem(req, res) {
//     const { restaurantId, menuItemId, updates } = req.body;

//     try {
//         const restaurant = await Restaurant.findById(restaurantId);
//         if (!restaurant) {
//             return res.status(404).json({ error: "Restaurant not found" });
//         }

//         const menuItem = restaurant.menu.id(menuItemId);
//         if (!menuItem) {
//             return res.status(404).json({ error: "Menu item not found" });
//         }

//         menuItem.set(updates);
//         await restaurant.save();
//         res.status(200).json(menuItem);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }
