const frontCtrl = {}

const product = require('../models/front.model')

frontCtrl.getProducts = async (req, res) => {
    const products = await product.find()
    res.json(products)
}
frontCtrl.getProduct = async (req, res) => {
    console.log(req.params)
    const Product = await product.findById(req.params.id)
    res.send(Product);
}

frontCtrl.getProductCategories = async (req, res) => {
    console.log(req.params)
    const Product = await product.find({Categories: req.params.Categories})
    res.send(Product);
}

frontCtrl.createProduct = async (req, res) => {
    const newProduct = new product(req.body)
    console.log(newProduct)
    await newProduct.save()
    res.send({message: 'product created'});
}


module.exports = frontCtrl;