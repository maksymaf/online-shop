const Product = require('../models/product.model');
const Category = require('../models/category.model');
const isObjectEmpty = require('../isObjectEmpty');

const getAllProducts = async (req, res) => {
    try{

        if (isObjectEmpty(req.query)){
            const products = await Product.find({});
            return res.status(200).json(products);
        }

    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const createProduct = async (req, res) => {
    try{
        const {name, price} = req.body;
        const product = new Product({name, price});

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

        console.log(product);
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    getProductById
}