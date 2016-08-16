var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = require('./routes')(app)

var server = app.listen(port, function(){
	console.log("Express server has started on"+port);
});

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
	console.log("connected to mongoDB server");
});
mongoose.connect('mongodb://125.209.193.18:27017/company');