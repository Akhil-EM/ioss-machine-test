const fs = require("fs");
const path = require("path");

module.exports = (file=__filename,line=0,errorMessage="")=>{
    let time = Date(Date.now());
    let log =`=>${time} \n  file= ${file}  \n  line= ${line} \n  error= ${errorMessage}\n\n`;

    let logFile = path.join(__dirname,"../../../","public","logs","app.log.txt");

    fs.appendFile(logFile,log,(error)=>{
      if(error) console.log("error in writing log")
    })
}