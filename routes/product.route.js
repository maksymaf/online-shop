const express = require('express');
const {getAllProducts, createProduct, getProductById} = require('../controllers/product.controllers');
const productRouter = express.Router();

productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProductById)
productRouter.post('/', createProduct);


module.exports = productRouter;
