const Customer = require('../models/customer.model')
const Allergy = require ('../models/allergies.model')

async function getUserByEmail(req, res) {
    const { email } = req.body
    try {
        const user = await Customer.findOne({ email })
        if (user) {
            res.status(200).json({ userId: user._id, ...user.toObject() })
        } else {
            res.status(404).json({ error: "User not found" })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

async function addAddress(req, res) {
    const { email, newAddress: address } = req.body


    console.log('Incoming request data:', { email, address })

    try {
        // Find the user by email
        const user = await Customer.findOne({ email })

        if (!user) {
            console.error('User not found')
            return res.status(404).json({ error: "User not found" })
        }

        // Update the user's address
        user.address = address
        
        console.log('User before save:', user)

        // Save the user
        await user.save()

        console.log('User updated:', user)

        // Respond with a success message and the updated user data
        res.status(200).json({ message: "Address added successfully!", user })
    } catch (error) {
        // Log the error and respond with an error message
        console.error('Error updating address:', error)
        res.status(500).json({ message: error.message })
    }
}

async function updateAllergies(req, res) {
    const { email, newAllergies } = req.body // Extract email and new allergies from the request body

    try {
        // Find the user by email
        const user = await Customer.findOne({ email })

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        // Retrieve existing allergies and ensure it is an array
        let existingAllergies = user.Allergies
        if (!Array.isArray(existingAllergies)) {
            existingAllergies = []
        }

        // Ensure the new allergies are arrays (if a single allergy is passed, convert it to an array)
        const newAllergiesArray = Array.isArray(newAllergies) ? newAllergies : [newAllergies]

        // Add new allergies to the existing allergies array if they do not already exist
        newAllergiesArray.forEach((allergy) => {
            if (!existingAllergies.includes(allergy)) {
                existingAllergies.push(allergy)
            }
        })

        // Update the user's allergies field with the updated array
        user.Allergies = existingAllergies

        // Save the updated user document to the database
        await user.save()
        res.status(200).json({ message: 'Allergies updated successfully', user })
    } catch (error) {
        console.error('Error updating allergies:', error.message)
        res.status(500).json({ message: 'Error updating allergies. Please try again.', error: error.message })
    }
}


const displayAllergies = async (req, res) => {
    try {
        const allergies = await Allergy.find({})
        console.log('Allergies fetched:', allergies) // Log the fetched allergies
        res.status(200).json(allergies)
    } catch (error) {
        console.error('Error fetching allergies:', error) // Log the error
        res.status(500).json({ message: error.message })
    }
}

// Function to get allergy-ingredient mapping
const getAllergyIngredientMapping = async (req, res) => {
    try {
        // Get the list of allergies from the request body
        const { allergies } = req.body

        // Validate that allergies is an array
        if (!Array.isArray(allergies)) {
            return res.status(400).json({ error: 'Invalid input: allergies should be an array' })
        }

        // Query the database for each allergy in the list
        const allergyData = await Allergy.find({ Allergy: { $in: allergies } })

        // Create a mapping of allergies to their associated ingredients
        const allergyIngredientMap = {}

        allergyData.forEach(allergy => {
            const allergyName = allergy.Allergy
            const ingredients = allergy.Foods
            allergyIngredientMap[allergyName] = ingredients
        })

        // Send the mapping as a JSON response
        res.status(200).json(allergyIngredientMap)
    } catch (error) {
        console.error('Error fetching allergy-ingredient mapping:', error)
        res.status(500).json({ error: 'Server error' })
    }
}



module.exports = { getUserByEmail, updateAllergies, addAddress, displayAllergies, getAllergyIngredientMapping }
