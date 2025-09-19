const express = require('express');
const categoryRouter = express.Router();
const { newCategory, getAllCategories, getCategoryById, updateCategoryById, deleteCategoryById } = require('../controllers/category.controllers');

categoryRouter.get('/', getAllCategories);
categoryRouter.post('/', newCategory);
categoryRouter.get('/:id', getCategoryById);
categoryRouter.put('/:id', updateCategoryById);
categoryRouter.delete('/:id', deleteCategoryById);

module.exports = categoryRouter;
