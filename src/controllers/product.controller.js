const statusCodes = require("../util/status-codes");
const response = require("../models/api/response.model");
const writeLog = require("../util/functions/write-log");
const getErrorLine = require("../util/functions/get-error-line");

const {sequelize,db} = require("../models/db");
const Product = db.products;
const Stocks = db.stocks;


exports.addProduct = async  (req,res)=>{
    
    try{

        let {name,quantity,itemCode} = req.body;
        
        await Product.create({
            item_code:itemCode,
            name:name,
            quantity:quantity})
        
        res.status(statusCodes.OK)
           .json(response("success","product added"))
     }catch(error){
 
         writeLog(__filename,getErrorLine(),error.message);
         res.status(statusCodes.INTERNAL_SERVER_ERROR)
            .json(response("error",error.message));
     }
}

exports.deleteItemByItemCode = async  (req,res)=>{
    
    try{

        let itemCode = req.params.itemCode;
        
        let result = await Product.findAll({where:{item_code:itemCode}})
        
        if(result.length == 0) return res.status(statusCodes.NOT_FOUND)
                                        .json(response("failed","product not found"));

        await Product.destroy({where:{item_code:itemCode}})

        res.status(statusCodes.OK)
           .json(response("success","product deleted"))
     }catch(error){
 
         writeLog(__filename,getErrorLine(),error.message);
         res.status(statusCodes.INTERNAL_SERVER_ERROR)
            .json(response("error",error.message));
     }
}

exports.deleteProduct= async  (req,res)=>{
    
    try{

        let productId = req.params.productId;
        console.log(productId);
        
        let result = await Product.findAll({where:{id:productId}})
        
        if(result.length == 0) return res.status(statusCodes.NOT_FOUND)
                                        .json(response("failed","product not found"));
        
        await Product.destroy({where:{id:productId}})

        res.status(statusCodes.OK)
           .json(response("success","product deleted"));

     }catch(error){
 
         writeLog(__filename,getErrorLine(),error.message);
         res.status(statusCodes.INTERNAL_SERVER_ERROR)
            .json(response("error",error.message));
     }
}


exports.getProducts = async  (req,res)=>{
    
    try{
        
        let products = await Product.findAll({where:{}})
        


        res.status(statusCodes.OK)
           .json(response("success","products",{products:products}));

     }catch(error){
 
         writeLog(__filename,getErrorLine(),error.message);
         res.status(statusCodes.INTERNAL_SERVER_ERROR)
            .json(response("error",error.message));
     }
}

exports.getProductByName = async  (req,res)=>{
    
    try{

        let name = req.params.productName;
        
        let [products,meta] = await sequelize.query(`SELECT * FROM products WHERE name LIKE "%${name}%";`);
        


        res.status(statusCodes.OK)
           .json(response("success","products",{products:products}));
           
     }catch(error){
 
         writeLog(__filename,getErrorLine(),error.message);
         res.status(statusCodes.INTERNAL_SERVER_ERROR)
            .json(response("error",error.message));
     }
}

