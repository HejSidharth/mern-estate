import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import  jwt  from 'jsonwebtoken';

export const signup = async (req, res, next) => {


    const {username, email, password} = req.body; // Get username, email and password from request body
    const hashedPassword = await bcryptjs.hash(password, 10); // Hash the password with a salt of 10 rounds
    const newUser = new User({username, email, password:hashedPassword}); // Create a new user with the hashed password
    try {
        await newUser.save(); // Save the user
        res.status(201).json("User created successfully!");// Send a 201 response
    } catch (error) {
        next(error); // Pass error to the next middleware
    }
    
};


export const signin = async (req, res, next) => {
    const {email, password} = req.body; // Get email and password from request body
    try {
        const validUser = await User.findOne({email}); // Find the user with the email
        if (!validUser) {
            return next(errorHandler(401, "User not found!")); // If no user is found, send a 401 response
        }
        const validPassword = await bcryptjs.compare(password, validUser.password); // Compare the password with the hashed password
        if (!validPassword) {
            return next(errorHandler(401, "Invalid email or password!")); // If the password is invalid, send a 401 response
        }
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET); // Create a token with the user id and a secret key
        const {password: pass, ...rest} = validUser._doc; // Destructure the user object to get all the properties except password
        res.cookie("access_token", token, {httpOnly: true}).status(200).json(validUser) // Send the token in a cookie
    } catch (error) {
        next(error); // Pass error to the next middleware
    }
}