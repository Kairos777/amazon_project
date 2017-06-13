var mongoose = require('mongoose');

// Commentary Schema
var productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    amazonLink: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum : ['toys', 'for-men'],
        required: true
    }
});

var Product = module.exports = mongoose.model('Product', productSchema);

module.exports.createProduct = function (newProduct) {
    newProduct.save();
};


