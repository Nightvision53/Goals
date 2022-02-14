const express = require('express');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');

const PORT = process.env.PORT || 5000;
const app = express();

//Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/goals', require('./routes/goalRoutes'));

app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) });