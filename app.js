require('dotenv').config();
const express = require('express');
const { swaggerUi, swaggerSpec } = require('./swagger/swagger');
const productRouter = require('./routes/product.route');
const mongoose = require('mongoose');

const app = express()
const PORT = process.env.PORT || 3000;

// swagger middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/products', productRouter);

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Successfuly connected to database.')
    app.listen(PORT, () => {
        console.log("Server has successfuly started working...");
    });
})
.catch(() => {
    console.log('Connection failed.');
})

