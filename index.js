require('dotenv').config();
var Search = require('bing.search');
var util = require('util');
var express = require('express')
var jade = require('jade')
var app = express()
var nodemock = require('nodemock')
var History = require('./models/history.js')

app.get("/search/:query", function(req, res) {
  var query = req.params.query
  var search = new Search(process.env.BING_KEY);
  var offset = Number(req.query.offset) || 0
  var imgSearch = search.images

  // save to history
  h = new History({
    query       : query,
    created_at  : new Date
  })

  h.save()

  // real call to the API
  search.images(query,
    {top: 10, skip: offset},
    function(err, results) {
      res.end(JSON.stringify(results.map(cleanResults)))
    }
  );

})

app.get("/history", function(req, res){
  History.find({}).sort('-created_at').exec(function(err, docs){
    res.end(JSON.stringify(docs.slice(0, 10)))
  })
})

app.get("/", function(req, res){
  app.set('views', "views")
  app.set('view engine', 'jade')
  res.render('main')
})

app.listen(process.env.PORT || 3000)

function cleanResults(image){
  // shoves data from one image into the following sructure.
  return {
    "url": image.url,
    "title": image.title,
    "thumbnail": image.thumbnail.url,
    "sourceUrl": image.sourceUrl
  }
}
