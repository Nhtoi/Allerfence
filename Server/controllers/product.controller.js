const Product = require("../models/product.model.js")

const getProducts = async(req, res) =>{
    try{
        const products =  await Product.find({})
        res.status(200).json(products)
     } catch(error){
         res.status(500).json({message: error.message})
     }
 
}
  
const getProduct = async(req, res) =>{
    try{
        const { name } = req.query;
        let products;

        if (name) {
            // If a name is provided, filter products by name
            products = await Product.find({ name: { $regex: new RegExp(name, "i") } });
        } else {
            // If no name is provided, return all products
            products = await Product.find({});
        }
        
        res.status(200).json(products);
    } catch(error){
        res.status(500).json({message: error.message});
    }
}

const createProduct = async(req, res)=>{
    try{
        const product =  await Product.create(req.body)
        res.status(200).json(product)
     } catch(error){
         res.status(500).json({message: error.message})
     }
 
}

const updateProduct = async(req, res) =>{
    try{
        const { name } = req.params;
        const { quantity, price } = req.body;
        
        const product = await Product.findOneAndUpdate({ name }, { quantity, price }, { new: true });

        if(!product){
            return res.status(404).json({ message: "Product not found" });
        } 

        res.status(200).json(product);
    } catch(error){
        res.status(500).json({ message: error.message });
    }
}

const deleteProduct = async(req, res)=>{
    try{
        const { name } = req.params;
        const product = await Product.findOneAndDelete({ name });

        if(!product){
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch(error){
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}