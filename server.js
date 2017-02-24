  var express = require('express');
  var app = express();
  var fs = require('fs');
  var ejs = require('ejs');

  app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
  });

  app.get('/products', function(req,res) {
    //read in products
    fs.readFile('products.json', 'utf8', function(error, data) {
      var products = JSON.parse(data);
      res.locals = { products: products }
      res.render('products.ejs');
    });
  });


  app.get('/products/:id', function(request, response) {
    fs.readFile('products.json', 'utf8' , function(err, data) {
        var productsParsed = JSON.parse(data);
        var product = productsParsed.filter( function(obj) {
          return obj.id === parseInt(request.params.id);
        });
        if (product.length)
          product = product[0]
        else
          product = null;

        response.locals = { product: product };
        response.render('product.ejs');
  });
});

  app.listen(8000);
