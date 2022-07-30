const router = require("express").Router();

router.get("/",(req,res)=>{
    
    res.render('products', {});
})

router.get("/add-product",(req,res)=>{

    res.render('add-product', {});
})

router.get("/stock",(req,res)=>{

    res.render('stock', {});
})


module.exports = router;