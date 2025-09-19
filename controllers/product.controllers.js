const Product = require('../models/product.model');

const getAllProducts = async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const createProduct = async (req, res) => {
    try{
        const {name, price} = req.body;
        const product = new Product({name, price});

        await product.save();
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getAllProducts,
    createProduct
}