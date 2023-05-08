require('dotenv/config');

var express = require('express');
const session = require('express-session');
const ejs = require('ejs');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');



// http://localhost:8080/api/v1/products
const api = process.env.API_URL;
const app = express();
const port = process.env.PORT || 8080;

// middleware
app.use(bodyparser.json());

mongoose.connect(process.env.DB_URL, {
    useNewURLParser: true,
    useUnifiedTopology: true,
})
// const db = mongoose.connection;

// db.on('error', (error) => console.log(error))
// db.once('open', () => console.log('connected to database'))

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.listen(port, () => {
    console.log(api);
})
app.use(bodyparser.urlencoded({ extended: true }))

app.get(`${api}/products`, function (req, res) {

    const product = {
        id: "1",
        name: "example",
    }
    res.send(product);
})
app.post(`${api}/products`, function (req, res) {

    const newprod = req.body;
    console.log(newprod);
    res.send(newprod);
})
