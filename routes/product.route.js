const express = require('express');
const {getAllProducts, createProduct, getProductById, updateProductById, deleteProductById} = require('../controllers/product.controllers');
const productRouter = express.Router();

productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProductById)
productRouter.post('/', createProduct);
productRouter.put('/:id', updateProductById);
productRouter.delete('/:id', deleteProductById);


module.exports = productRouter;
