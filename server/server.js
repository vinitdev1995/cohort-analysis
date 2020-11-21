/*Define dependencies.*/

var express=require("express");
var multer  = require('multer');
var app=express();

var upload = multer({ dest: 'uploads/' });

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next()
});


app.post('/api/upload', upload.single('file'), function(req,res){
    console.log("req.file",req)
    res.end("File uploaded.");
});

app.listen(3002,function(){
    console.log("Working on port 3002");
});
