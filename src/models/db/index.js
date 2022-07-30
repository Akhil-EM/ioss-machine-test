require("dotenv").config();
let environment = process.env.ENVIRONMENT;
const dbConfig = require("../../config/db.config")

const {Sequelize,DataTypes} = require("sequelize");
const {writeLog} = require("../../util/functions/write-log");

// new Sequelize('db', 'username', 'password', {
const sequelize = new Sequelize(dbConfig.database,dbConfig.user,dbConfig.password, {
  host:dbConfig.host,
  dialect:"mysql",
  operatorAliases:0,
  pool:{
    max:5,
    min:0,
    acquire:30000,
    idle:10000},
  logging:environment=="development"?false:false
});


sequelize.authenticate()
         .then(()=> console.log("connected to database..."))
         .catch(error =>{
           writeLog(__dirname,error.message)
           console.log(error);

         });

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//models 
db.products = require("./product.model")(sequelize,DataTypes);
db.stocks = require("./stock.model")(sequelize,DataTypes);


//this line is very important because 
//every time the server runs data get lost if it's set 
//to false

db.sequelize.sync({force:false})
            .then(()=>console.log("application re-syncing"))
            .catch(error=>console.log(error));




            
    
module.exports = {db,sequelize};