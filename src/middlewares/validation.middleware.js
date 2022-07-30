const {body,param,query,validationResult} = require("express-validator");
const statusCodes = require("../util/status-codes");
const response = require("../models/api/response.model");



const validateProduct = ()=>{
    return [body("itemCode", "required").trim().not().isEmpty(),
            body("name", "required").trim().not().isEmpty(),
            body("quantity", "required").trim().not().isEmpty()]
}

const validateStock = ()=>{
    return [body("productId", "required").trim().not().isEmpty(),
            body("quantity", "required").trim().not().isEmpty(),
            body("status", "must be IN or OUT").trim().isIn(['IN', 'OUT'])]
}

const validationStatus = (req,res,next)=>{
    const errors = validationResult(req);
    if(errors.isEmpty()){
        return next();
    }
   
  
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  
    return res.status(statusCodes.UNPROCESSABLE_ENTITY)
              .json(response("failed","validation errors",{ errors: extractedErrors}));
  }


  module.exports = {
        validationStatus,
        validateProduct,
        validateStock}