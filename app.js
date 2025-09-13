require('dotenv').config();
const express = require('express');
const { swaggerUi, swaggerSpec } = require('./swagger/swagger');

const app = express()
const PORT = process.env.PORT || 3000;

// swagger middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
    console.log('1')
    console.log("Server has successfuly started working...");
});
