const statusCodes = require("../util/status-codes");
const response = require("../models/api/response.model");
const writeLog = require("../util/functions/write-log");
const getErrorLine = require("../util/functions/get-error-line");

const {sequelize,db} = require("../models/db");
const Product = db.products;
const Stocks = db.stocks;


exports.addStock = async  (req,res)=>{
    
    try{ 

        let {productId,status,quantity} = req.body;
        
        let product = await Product.findOne({where:{id:productId}});

        if(status == "OUT"){
            if(product.quantity < quantity)
            return  res.status(statusCodes.NOT_ACCEPTABLE)
                       .json(response("success","product is not available in this much quantity "));

            await Product.update({
                quantity:(parseInt(product.quantity) - parseInt(quantity))},
                {where:{id:productId}});
        }

        if(status == "IN"){

            await Product.update({
                quantity:(parseInt(product.quantity) + parseInt(quantity))},
                {where:{id:productId}});
        }
        
        
        await Stocks.create({product_id:productId,
                            quantity:quantity,
                            status:status})
        
        res.status(statusCodes.OK)
           .json(response("success","new stock entry added"));
           
     }catch(error){
 
         writeLog(__filename,getErrorLine(),error.message);
         res.status(statusCodes.INTERNAL_SERVER_ERROR)
            .json(response("error",error.message));
     }
}



