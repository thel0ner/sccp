module.exports = (msg,settings) => {
    let path = settings.fs.logs + "logs.db";
    let data = "";
    const fs = require('fs');
    fs.exists(path,(err,data) => {
        if(err){
            fs.writeFile(path,msg + "\n",(err,success) => {
            })
        }else{
            fs.readFile(path,(err,success) => {
                if(!err){
                    data += success
                    fs.writeFile(path,data,(err,success) => {});
                }
            })
        }
    });
}