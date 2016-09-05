// MEAN Stack RESTful API Tutorial - Contact List App

var express = require('express');
var app = express();
// var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host:'125.209.193.18',
//     user:'root',
//     password:'clgh878787',
//     database:'user'
// });

var mongojs = require('mongojs');
var db = mongojs('125.209.193.18:27017/project', ['contactlist', 'education', 'environment', 'ifrastructure']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/contactlist', function (req, res) {
  console.log('I received a GET request');
  db.education.find({"Country Code":"KOR", "2000":{$nin:[""]}, "2010":{$nin:[""]}
  }).sort({
    "2010":-1
  }, function (err, docs) {
    res.json(docs);});
});

app.get('/contactlist1/:indicator', function (req, res) {
  var indicator = req.params.indicator;
  console.log("ind1:"+req.params.indicator);
  db.education.find({"Indicator Code": indicator, "2000":{$nin:[""]}, "2010":{$nin:[""]}
  }).sort({
    "2010":-1
  }, function (err, docs) {
    res.json(docs);});
});


// app.get('/login/list', function(req, res){
//   connection.query('select * from user', function(err, rows){
//     if (err) console.error("err : " + err);
//     console.log(JSON.stringify(rows));
//     res.json(rows);
//   });
// })

app.post('/contactlist', function (req, res) {
  console.log(req.body);
  db.education.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.education.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.education.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.education.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {"Country Name": req.body["Country Name"], 2000: req.body["2000"], 2010: req.body["2010"]}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");