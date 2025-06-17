// This file should be the entry point
import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import authRoutes from "./routes/authRoutes";
import problemRoutes from './routes/problemRoutes';
import solutionRoutes from './routes/solutionRoutes';
import summaryRoutes from './routes/summaryRoutes';
import categoryRoutes from './routes/categoryRoutes';
import problemCategoryRoutes from './routes/problemCategoryRoutes';
import mongoose from 'mongoose';


// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB - move it to seperate file with proper error handling
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Base route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Import routes
app.use('/api/auth', authRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/problems/:problemId/solutions',solutionRoutes);
app.use('/api/problems/:problemId/summaries',summaryRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/problems/:problemId/categories', problemCategoryRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});