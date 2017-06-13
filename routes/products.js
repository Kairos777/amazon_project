var express = require('express');
var router = express.Router();
var Product = require('../models/product');


// Login
router.get('/', function (req, res) {
    res.render('products');
});

router.post('/', function (req, res) {
    var newProduct = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        amazonLink: req.body.link,
        category: req.body.category
    });

    Product.createProduct(newProduct);
});

module.exports = router;