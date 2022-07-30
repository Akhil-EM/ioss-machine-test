require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgen = require("morgan");
const path = require("path");
//other packages goes here

const app = express();
const port = process.env.PORT;
const projectName = require("./src/config/app.config").program;

// view engine setup
app.set('views', path.join(__dirname,"src",'views'));
app.set('view engine', 'ejs');


//route
const route = require("./src/routes");

//configure app
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(morgen('tiny'));//logs of request and response
app.use(express.static("public"))//share the public files

//call routes
route.initializeBaseRoutes(app);
route.initializeApplicationRoute(app);
route.initializeErrorCatchingRoute(app);//always call at the bottom of routes


app.listen(port,console.log(`${projectName} running on ${port}`))
