var express = require('express')
var ejs = require('ejs');
var bodyparser=require('body-parser');

var app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.listen(8080);
app.use(bodyparser.urlencoded({extended:true}));

app.get('/',function(req,res){
res.render('pages/index');

});