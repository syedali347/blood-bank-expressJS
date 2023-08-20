// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
// const mysql = require('mysql2/promise');
const Routes = require('./routes/Routes');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const headerMiddleware = require('./headers/middleware'); // Import the middleware

app.use(bodyParser.json());
app.use(cors());
app.use("/api", Routes );

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

