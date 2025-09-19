const express = require('express');
const {getAllProducts, createProduct} = require('../controllers/product.controllers');
const productRouter = express.Router();

productRouter.get('/', getAllProducts);
productRouter.post('/', createProduct);

module.exports = productRouter;