var mongoClient = require('mongodb').MongoClient;
// var assert = require('assert');

var url = 'mongodb://125.209.193.18:27017/company';
mongoClient.connect(url, function(err, db){
	console.log("err="+err);
	var collection = db.collection('emp');
		collection.find({}).toArray(function(err, docs){
			console.log("err:"+err);
			console.log("docs:"+docs);
		});
	db.close();
});
