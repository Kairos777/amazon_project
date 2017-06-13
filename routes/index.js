var express = require('express');
var router = express.Router();
var Product = require('../models/product');



// Get Homepage
router.get('/:page?', function(req, res){
   var config = new function() {
      this.limit = 20;
      this.page = req.params.page ? Number(req.params.page) : 1;
      this.skip = (this.page * 20) - 20;
      this.imageSize = '300x250';
   };

   // Get amount of products to display correct number of pagination buttons
   Product.find({}, function(err, data) {
      var pagesAmount = Math.round(data.length/config.limit);
      for (var i = 0, pagination = []; i < pagesAmount; i++) {
         pagination.push({
            number: i + 1,
            active: config.page === i + 1
         });
      }

      renderPage(pagination);
   });
   
   // Reformat image size @TODO change it not every time on fly but in mongoDB one time.
   function reformat(data) {
      return data.map(function(item, index){
         item.image = item.image.replace(/-[0-9]+x[0-9]+/, '-' + config.imageSize);
      });
   }
   
   // Render page
   function renderPage(pages) {
      Product.find({}, function(err, data){
         reformat(data);
         res.render('index', {
            pages: pages,
            products: data
         });
      }).limit(config.limit).skip(config.skip);
   }
});



module.exports = router;