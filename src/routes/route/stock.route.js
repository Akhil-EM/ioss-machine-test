const router = require("express").Router();
//validation and auth middleware called here
const {validateStock,validationStatus} = require("../../middlewares/validation.middleware");

const stockController = require('../../controllers/stock.controller');

router.post("/",validateStock(),validationStatus,stockController.addStock);

module.exports = router;