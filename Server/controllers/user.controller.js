const Customer = require('../models/customer.model');

async function getUserByEmail(req, res) {
    const { email } = req.body;
    try {
        const user = await Customer.findOne({ email });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { getUserByEmail };
