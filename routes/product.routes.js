const { Router } = require("express");
const { validateJWT } = require("../middlewares");
const productCtrl = require("../controllers/product.controller");
const router = Router();

router.get("/", productCtrl.getProducts);

router.get("/:id", productCtrl.getProduct);

router.post("/", validateJWT, productCtrl.createProduct);

router.get("/:Categories", productCtrl.getProductCategories);

module.exports = router;
