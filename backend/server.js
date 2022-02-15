const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

//Initialize database
connectDB();

// Initialize express app
const app = express();

//Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));


app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) });