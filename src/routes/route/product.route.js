const router = require("express").Router();
//validation and auth middleware called here
const {validateProduct,validationStatus} = require("../../middlewares/validation.middleware");

const productController = require('../../controllers/product.controller');


router.post("/",validateProduct(),validationStatus,productController.addProduct); 

router.get("/",productController.getProducts); 
router.get("/:productName",productController.getProductByName); 


router.delete("/:itemCode/delete",productController.deleteItemByItemCode);

router.delete("/:productId",productController.deleteProduct)

module.exports = router;