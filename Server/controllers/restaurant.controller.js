const Restaurant = require('../models/restaurant.model');
const Order = require('../models/orders.model')

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
    console.log('Received request body:', req.body);
    const { email, itemName, price, ingredients, allergens, restaurantId } = req.body;
    
    console.log("What type is restaurantID: " + typeof req.body.restaurantId)

    console.error(email, restaurantId);
        if(!email || !restaurantId){
            console.error(email, restaurantId)
            return res.status(400).json({error: "Missing email and resId"})
        }
        try {
            // Find the restaurant with the given email and restaurantId
            const restaurant = await Restaurant.findOne({ email, _id: restaurantId });
    
            if (!restaurant) {
                console.error(`No restaurant found with email: ${email} and restaurantId: ${restaurantId}`);
                return res.status(404).json({ error: "Restaurant not found." });
            }
    
            // Create the new menu item
            const newMenuItem = {
                itemName,
                price,
                ingredients,
                allergens
            };
            restaurant.menu.push(newMenuItem);
    
            // Save the updated restaurant
            await restaurant.save();
    
            // Return the new menu item as a response
            res.status(201).json(newMenuItem);
        } catch (error) {
            console.error('Error adding menu item:', error);
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


async function getOrdersByRestaurantId(req, res) {
    const { restaurantId } = req.params;

    try {
        const orders = await Order.find({ restaurantId });
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error retrieving orders:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    getOrdersByRestaurantId,
};


module.exports = {
    getRestaurantByEmail,
    createRestaurant,
    searchRestaurant,
    addMenuItem,
    getOrdersByRestaurantId
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
