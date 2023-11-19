import mongoose from "mongoose";

// Create a schema for the user
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true, // Required field
            unique: true, // No two users can have the same username
        },
        email: {
            type: String,
            required: true, // Required field
            unique: true, // No two users can have the same username
        },
        password: {
            type: String,
            required: true, // Required field
        },
    }, {timestamps: true} // Adds createdAt and updatedAt timestamps
);

const User = mongoose.model("User", userSchema); // Create a model from the schema

export default User; // Export the model