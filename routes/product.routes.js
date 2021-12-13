const { Router } = require("express");
const {
  getCatalog,
  putCatalog, } = require("../controllers/product.controller");

const router = Router();

router.get('/catalog', getCatalog)

router.put('/catalog', putCatalog)


module.exports = router;
