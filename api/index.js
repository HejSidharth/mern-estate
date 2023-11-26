import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config(); // Load .env file into process.env

// Connect to MongoDB
mongoose.connect(process.env.MONGO).then(() => {
  console.log('Connected to MongoDB!');
}).catch(err => {
  console.log(err);
});


const app = express(); // Create an Express app

app.use(express.json()); // Add middleware for parsing JSON bodies (which are usually sent by API clients)

// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.listen(3000, () => {
  console.log('Server iss running on port 3000');
});


app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});