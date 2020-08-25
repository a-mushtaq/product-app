var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer(); 
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors')

app.use(cors())

app.set('view engine', 'pug');
app.set('views','./views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array());
app.use(cookieParser());
app.use(session({secret: "Your secret key"}));


let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_db');

let products = require('./products.js');
let person = require('./person.js'); 

//Use the Router on the sub route /movies
app.use('/products', products);
app.use('/admin',person);

app.listen(3000);














