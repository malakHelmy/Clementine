require("dotenv").config();

var express = require('express');
const session = require("express-session");
var ejs = require('ejs');
var bodyparser=require('body-parser');
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 8080;

mongoose.connect(process.env.DB_URL, {useNewURLParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected to database"));

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.listen(port);
app.use(bodyparser.urlencoded({extended:true}));

app.get('/',function(req,res){
res.render('pages/index');

});