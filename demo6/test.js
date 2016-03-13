var express = require("express");
var app = express();

app.get('/',function(req,res){
  console.log("get request");
  res.send('<form method = "POST"><input type = "password" name = "pass"><input id = "fuck" type = "submit" value = "sub"></form>');
});

app.post('/',function(req,res){
  console.log("post request");
  res.send("Hello World",req.body);
});

app.listen(3000);