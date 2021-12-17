const { Router } = require("express");
const {
  getCatalog,
  putCatalog,
  getBrands } = require("../controllers/product.controller");

const router = Router();

router.get('/catalog', getCatalog)

router.put('/catalog', putCatalog)

router.get('/brands', getBrands)


module.exports = router;
