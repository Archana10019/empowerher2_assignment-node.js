import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';

// load environment variables
dotenv.config();

const app = express();

// middleware to read JSON body
app.use(express.json());

// connect user routes
app.use('/api', userRoutes);

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
