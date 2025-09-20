const Product = require('../models/product.model');
const Category = require('../models/category.model');
const isObjectEmpty = require('../isObjectEmpty');

const getAllProducts = async (req, res) => {
    try{

        if (isObjectEmpty(req.query)){
            const products = await Product.find({});
            return res.status(200).json(products);
        }

        const {category} = req.query;

        const productCategory = await Category.findOne({name: category});
        const productsWithCategory = await Product.find({category: productCategory._id});
        return res.status(200).json(productsWithCategory);

    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const createProduct = async (req, res) => {
    try{
        const {name, price, categoryName} = req.body;

        const category = await Category.findOne({name: categoryName});

        if (!category){
            return res.status(400).json({message: 'Category with this name does not exist'});
        }

        const product = new Product({name, price, category: category._id});

        await product.save();

        res.status(201).json({message: 'Product has been successfuly created'})
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const getProductById = async (req, res) => {
    try{
        const { id } = req.params;
        const product = await Product.findById(id);

        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const updateProductById = async (req, res) => {
    try{
        const { id } = req.params;
        const updates = {};

        if (req.body.name) updates.name = req.body.name;
        if (req.body.price) updates.price = req.body.price;
        if (req.body.category) {
            // updates.category = req.body.category;

            const category = await Category.findOne({name: req.body.category});

            if (!category){
                return res.status(404).json({message: 'Category with this name does not exist'});
            }

            const categoryID = category._id;
            updates.category = categoryID;
        }

        const product = await Product.findByIdAndUpdate(id, updates, {new: true});
        res.status(200).json(product);

    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const deleteProductById = async (req, res) => {
    try{
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);
        res.status(200).json(product);

    }catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    getProductById,
    updateProductById,
    deleteProductById
}