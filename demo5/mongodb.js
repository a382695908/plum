var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var targetUrl = "mongodb://localhost:27017/test";
var mongodb = {};
mongodb.insert = function(jobs){
	MongoClient.connect(targetUrl,function(err,db){
		assert.equal(null,err);
		console.log("Connected correctly to server.");
		db.collection("jobs").insertMany(jobs,function(err,result){
			assert.equal(null,err);
			db.close();
		})
	});
}
module.exports = mongodb;
