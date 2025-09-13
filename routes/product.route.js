const express = require('express');
const {getAllProducts} = require('../controllers/product.controllers');
const productRouter = express.Router();

productRouter.get('/', getAllProducts);

module.exports = productRouter;