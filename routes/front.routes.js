const { Router } = require('express');
const { validateJWT, validateFields } = require("../middlewares");
const frontCtrl = require('./../controllers/front.controller');
const router = Router();

router.get('/', frontCtrl.getProducts);

router.get('/:id', frontCtrl.getProduct);


router.post('/',[ validateJWT, validateFields ], frontCtrl.createProduct);


router.get('/:Categories', frontCtrl.getProductCategories);


module.exports = router
