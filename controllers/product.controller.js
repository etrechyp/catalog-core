//TODO get products from SC api

const productCtrl = {}

const product = require('../models/product.model')

productCtrl.getProducts = async (req, res) => {
    const products = await product.find()
    res.json(products)
}
productCtrl.getProduct = async (req, res) => {
    const Product = await product.findById(req.params.id)
    res.send(Product);
}

productCtrl.getProductCategories = async (req, res) => {
    const Product = await product.find({Categories: req.params.Categories})
    res.send(Product);
}

productCtrl.createProduct = async (req, res) => {
    const newProduct = new product(req.body)
    await newProduct.save()
    res.send({message: 'product created'});
}


module.exports = productCtrl;