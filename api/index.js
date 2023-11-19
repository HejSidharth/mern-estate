import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load .env file into process.env


mongoose.connect(process.env.MONGO).then(() => {
  console.log('Connected to MongoDB!');
}).catch(err => {
  console.log(err);
});


const app = express();

app.listen(3000, () => {
  console.log('Server iss running on port 3000');
});