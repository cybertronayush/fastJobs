require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

const connectDB = require('./config/db');
connectDB();

app.use(express.json());

//routes setup
app.use('/api', require('./routes/files'));
app.use('/api', require('./routes/pets'));

app.listen(PORT, console.log(`Listening on port ${PORT}.`));