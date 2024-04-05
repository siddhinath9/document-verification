//Basic node backend server

const express = require('express');
const app = express();
const cors = require('cors');
const AuthRoutes = require('./src/routes/auth.js');
const BlockchainRoutes = require('./src/routes/blockchain.js');
const connectDatabase = require('./src/config/database.js');
require('dotenv').config();
const port = 5000;

app.use(cors());
app.use(express.json());

//link mongodb database
connectDatabase()

app.use('/api', AuthRoutes);

app.use('/api/blockchain', BlockchainRoutes);

app.listen(port, () => console.log(`App listening on port ${port}!`));

// Path: frontend/index.html