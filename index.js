const express = require('express');
require("dotenv").config();
const memberRouter = require('./routes/member')

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Middleware
app.use('/members', memberRouter);



// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});