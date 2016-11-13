//search example

// var Search = require('bing.search');
// var util = require('util');
//
// search = new Search('apikey_123');
//
// search.web('Tutta Bella Neapolitan Pizzeria',
//   {top: 5},
//   function(err, results) {
//     console.log(util.inspect(results,
//       {colors: true, depth: null}));
//   }
// );

require('dotenv').config();
var express = require('express')
var jade = require('jade')

var app = express()

app.get("/search/:query", function(req, res) {
  var query = req.params.query

}

app.get("/", function(req, res){
  app.set('views', "views")
  app.set('view engine', 'jade')
  res.render('main')
})
