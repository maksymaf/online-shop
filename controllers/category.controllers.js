const Category = require('../models/category.model');

const newCategory = async (req, res) => {
    try{
        const { name } = req.body;

        let category = await Category.findOne({name});

        if (category){
            res.status(403).json({message: 'This category already exists'});
        }

        category = new Category({name});
        await category.save();

        res.status(201).json({message: 'Category has been succeessfuly created'});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const getAllCategories = async (req, res) => {
    try{
        const categories = await Category.find({});

        res.status(200).json(categories);
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const getCategoryById = async (req, res) => {
    try{
        const { id } = req.params;
        const category = await Category.findById(id);

        if (!category){
            res.status(404).json({message: 'Category with this id does not exist'});
        }

        res.status(200).json(category);
    }catch(error){
        res.status(500).json({message: error.message})
    } 
}

const updateCategoryById = async (req, res) => {
    try{
        const { id } = req.params;
        const { name } = req.body;


        const category = await Category.findByIdAndUpdate(id, {name}, {new: true});

        if (!category){
            return res.status(400).json({message: 'Category with this id does not exist'});
        }

        res.status(200).json(category);
    }catch(error){
        res.status(500).json({message: error.message})
    } 
}

const deleteCategoryById = async (req, res) => {
    try{
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);

        if (!category){
            return res.status(400).json({message: 'Category with this id does not exist'});
        }

        res.status(200).json(category);
    }catch(error){
        res.status(500).json({message: error.message})
    } 
}

module.exports = {
    newCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
}