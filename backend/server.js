const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Sabse upar .env file ko load karein taake uski values mil sakein
require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// --- Database Connection ---
// Ab URI direct code mein likhne ke bajaye .env file se aayega
const uri = process.env.MONGO_URI;

mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});
// -------------------------

// --- API Routes ---
const usersRouter = require('./routes/auth');
const cartRouter = require('./routes/cart');

app.use('/api/users', usersRouter);
app.use('/api/cart', cartRouter);
// ------------------

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
