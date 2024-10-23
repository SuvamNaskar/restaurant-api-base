const express = require('express');
require("dotenv").config();
const memberRouter = require('./routes/member');
const tableRouter = require('./routes/table');
const basicAuth = require('./middleware/basicAuth');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use('/members', basicAuth, memberRouter);
app.use('/tables', basicAuth, tableRouter);

app.get('/', (req, res) => {
	res.send('<h1>Hello World!</h1>');
});

// Start server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});