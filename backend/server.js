const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// --- Database Connection ---
const uri =
  'mongodb+srv://malaikatayyab:123456mt@cluster0.21x5t.mongodb.net/ShoppingCart?retryWrites=true&w=majority&appName=Cluster0'; // Aapka local MongoDB connection string
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});
// -------------------------

// --- API Routes ---
const usersRouter = require('./routes/auth');
const cartRouter = require('./routes/cart');
app.use('/api/cart', cartRouter);
app.use('/api/users', usersRouter);
// ------------------

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
