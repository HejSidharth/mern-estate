import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {


    const {username, email, password} = req.body; // Get username, email and password from request body
    const hashedPassword = await bcryptjs.hash(password, 10); // Hash the password with a salt of 10 rounds
    const newUser = new User({username, email, password:hashedPassword}); // Create a new user with the hashed password
    try {
        await newUser.save(); // Save the user
        res.status(201).json("User created successfully!");// Send a 201 response
    } catch (error) {
        res.status(500).json(error.message);// Send a 500 response if an error occurred
    }
    
};