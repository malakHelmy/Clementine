require('dotenv/config')

var express = require('express')
const session = require('express-session')
const ejs = require('ejs')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')

// http://localhost:8080/api/v1/products
const api = process.env.API_URL
const app = express()
const port = process.env.PORT || 8080

// middleware
app.use(bodyparser.json())
app.use(morgan('tiny')) //displays log requests

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(bodyparser.urlencoded({ extended: true }))

app.get(`${api}/products`, function (req, res) {
    const product = {
        id: '1',
        name: 'example',
    }
    res.send(product)
})
app.post(`${api}/products`, function (req, res) {
    const newprod = req.body
    console.log(newprod)
    res.send(newprod)
})

mongoose
    .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'clementine',
    })
    .then(() => {
        console.log('database connection succeeded')
    })
    .catch((err) => {
        console.log(err)
    })

app.listen(port, () => {
    console.log(api)
})
