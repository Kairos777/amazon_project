var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var session = require('express-session');
var mongo = require('mongo');
var mongoose = require('mongoose');
mongoose.connect('mongodb://zeus_dima:s2p6d10f14@ds029446.mlab.com:29446/amazon_project'); // @TODO replace to config
var db = mongoose.connection;


//var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
//var LocalStrategy = require('passport-local').Strategy;


var routes = require('./routes/index');
var users = require('./routes/users');
var products = require('./routes/products');

// Init App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');






// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());






// Set Static Folder
app.use(express.static(path.join(__dirname, 'static')));

// Express Session
//app.use(session({
//    secret: 'secret',
//    saveUninitialized: true,
//    resave: true
//}));

// Passport init
//app.use(passport.initialize());
//app.use(passport.session());

// Express validator
//app.use(expressValidator({
//    errorFromatter: function(param, msg, value) {
//        var namespace = param.split('.');
//        var root = namespace.shift();
//        var formParam = root;
//
//        while(namespace.length) {
//            formParam += '[' + namespace.shift() + ']';
//        }
//        return {
//            parm: formParam,
//            msg: msg,
//            value: value
//        }
//    }
//}));

// Connect Flash
//app.use(flash());

// Global Vars
//app.use(function (req, res, next) {
//   res.locals.success_msg = req.flash('success_msg');
//   res.locals.error_msg = req.flash('error_msg');
//   res.locals.error = req.flash('error');
//   res.locals.user = req.user || null;
//   next();
//});

app.use('/', routes);
app.use('/users', users);
app.use('/products', products);

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
    console.log('Server started on port ' + app.get('port'));
});