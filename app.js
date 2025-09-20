require('dotenv').config();
const express = require('express');
const { swaggerUi, swaggerSpec } = require('./swagger/swagger');
const productRouter = require('./routes/product.route');
const categoryRouter = require('./routes/category.route');
const userRouter = require('./routes/user.route');
const authRouter = require('./routes/auth.route');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongo');

const app = express()
const PORT = process.env.PORT || 3000;

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 2
    },
    store: MongoDBStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: 'sessions'
    })
})); 
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);

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

