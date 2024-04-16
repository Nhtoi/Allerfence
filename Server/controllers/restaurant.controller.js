const Restaurant = require('../models/restaurant.model');

async function createRestaurant(req, res) {
    const { name, address, cuisine, menuHours } = req.body;
    
    try {
        // Check if the restaurant already exists
        const existingRestaurant = await Restaurant.findOne({ name });
        if (existingRestaurant) {
            return res.status(400).json({ error: "Restaurant already exists" });
        }
        
        // Create a new restaurant
        const newRestaurant = new Restaurant({
            name,
            address,
            cuisine,
            restHours,
        });
        
        // Save the new restaurant to the database
        await newRestaurant.save();
        
        res.status(201).json(newRestaurant);
    } catch (error) {
        console.error(error);
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

module.exports = {  createRestaurant, 
                    searchRestaurant 
                }
