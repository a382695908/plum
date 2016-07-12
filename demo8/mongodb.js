var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
//var targetUrl = "mongodb://isghost2:1q1q1q@ds064718.mlab.com:64718/badamdb";
//mongod --dbpath=D:\ProgramFiles\MongoDB\Data
var targetUrl = "mongodb://localhost:27017/test";
var mongodb = {};
var insertQueue = [];
var dbInstance = null;
mongodb.insert = function(jobs){
	
}

mongodb.connect = function(){
  if(dbInstance != null){
    reutrn ;
  }
  MongoClient.connect(targetUrl,{
    uri_decode_auth:false
  },function(err,db){
    assert.equal(null,err);
    console.log("Connected correctly to server.");
    dbInstance = db;
    for(var i=0;i<insertQueue.length;i++){
      console.log("insert");
      mongodb.insert(insertQueue[i]);
    }
  });
}

mongodb.close = function(){
  dbInstance.close();
  dbInstance = null;
}

mongodb.insert = function(collection){
  if(dbInstance == null){
    console.log("should connect to db before insert");
    insertQueue.push(collection);
    return ;
  }
  dbInstance.collection("image").insertMany(collection,function(err,result){
    assert.equal(null,err);
    console.log("insert success");
  })
}

mongodb.find = function(condition,callback){
  dbInstance.collection("image").find(condition).toArray().then(callback);
}
module.exports = mongodb;

mongodb.connect();
//mongodb.insert([{_id:15},{_id:16,name:"fuck"}])