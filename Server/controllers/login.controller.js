const User = require('../models/customer.model')
const userType = require('../models/roles.model')
const bcrypt = require('bcrypt')

const login = async (req, res) =>{
    try {
        const check = await User.findOne({ email: req.body.email }).populate('userType');
        
        if (!check || check.userType.userType !== req.body.userType) {
            return res.status(400).json({ error: "User does not exist, or wrong user type" });
        } else{
            const isPasswordCheck = await bcrypt.compare(req.body.password, check.password)
            if(isPasswordCheck){
                res.status(200).json({ success: true });
            } else{
                res.send("Password is incorrect")
            }
        }

    } catch(error){
        res.send({error: error.message})
    }
}



const signup = async (req, res) => {
    console.log(req.body);
    const data = {
        name: {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        },
        phoneNum: req.body.phoneNum,
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType
    };

    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
        res.send("User Already Exists");
    } else {
        try {
            // Check if the provided userType is valid (Customer, Driver, Vendor)
            const validUserTypes = ['Customer', 'Driver', 'Vendor'];
            if (!validUserTypes.includes(data.userType)) {
                return res.status(400).send("Invalid userType");
            }

            // Create user type if it doesn't exist
            let userTypeObj = await userType.findOne({ userType: data.userType });
            if (!userTypeObj) {
                userTypeObj = await userType.create({ userType: data.userType });
            }

            // Hash the password
            const salt = 10;
            const hashedPassword = await bcrypt.hash(data.password, salt);

            // Associate user type with the user
            const userData = await User.create({
                name: data.name,
                phoneNum: data.phoneNum,
                email: data.email,
                password: hashedPassword,
                userType: userTypeObj._id
            });

            console.log(userData);
            res.status(200).json({ success: true });
        } catch (error) {
            console.error(error);
            if (error.name === 'ValidationError') {
                const validationErrors = Object.values(error.errors).map(err => err.message);
                res.status(400).json({ errors: validationErrors });
            } else {
                res.status(500).send("Internal Server Error");
            }
        }
    }
};

module.exports = {
    login,
    signup
}