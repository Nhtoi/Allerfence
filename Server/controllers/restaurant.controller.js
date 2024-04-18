const Restaurant = require('../models/restaurant.model.js');

// async function createRestaurant(req, res) {
//     const { name, address, cuisine, restHours } = req.body;

//     try {
//         // Check if the restaurant already exists
//         const existingRestaurant = await Restaurant.findOne({ name });
//         if (existingRestaurant) {
//             return res.status(400).json({ error: "Restaurant already exists" });
//         }
        
//         // Create a new restaurant
//         const newRestaurant = new Restaurant({
//             name,
//             address,
//             cuisine,
//             restHours,
//         });
        
//         // Save the new restaurant to the database
//         await newRestaurant.save();
        
//         res.status(201).json(newRestaurant);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }

// async function searchRestaurant(req, res) {
//     const { name } = req.body; 

//     try {
//         const restaurant = await Restaurant.findOne({ name });
//         if (restaurant) {
//             res.status(200).json(restaurant);
//         } else {
//             res.status(404).json({ error: "Restaurant not found" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }

//add menu item
async function addMenuItem(req, res) {
    const { restaurantId, itemName, price, ingredients, allergens } = req.body;

    // Validation
    if (!itemName || !price || !ingredients || !allergens) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const restaurant = await Restaurant.findById(restaurantId);
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

module.exports = {  
    //createRestaurant, 
    //searchRestaurant,
    addMenuItem,
};
