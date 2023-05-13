/*for every model, there are routers. 
routers are responsible for creating/ storing/ Importing and exporting APIs between the files
*/
const express = require('express');
const { Order } = require('../models/order');
const router = express.Router();

router.get(`/`, async function (req, res) {
    /*sending an object from backend to API/Postman
    const order = {
        id: '1',
        name: 'example',
    };
    res.send(order);*/

    /*read objects from database and display them in the front-end,
    async + await are required since the database wasn't ready when it was called for
    , these keywords urge the system to wait til the database is ready*/
    const ordersList = await Order.find();

    //catching errors method #1
    if (!ordersList) {
        res.status(500).json({ success: false });
    }
    res.send(ordersList);
});
router.post(`/`, function (req, res) {
    const order = new Order({
        order_id: req.body.order_id,
        userID: req.body.userID,
        userName: req.body.userName,
        orderitems: req.body.orderitems,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        status: req.body.status,
        totalAmount: req.body.totalAmount,
        phone_num: req.body.phone_num,
        dateOrdered: req.body.dateOrdered,
    });
    //catching errors method #2
    order
        .save()
        .then((createdOrder) => {
            res.status(201).json(createdOrder);
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                success: false,
            });
        });
});

router.delete('/:id', function (req, res) {
    Order.findByIdAndRemove(req.params.id)
        .then((order) => {
            if (order) {
                return res
                    .status(200)
                    .json({
                        success: true,
                        message: 'the order has been deleted',
                    });
            } else {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message: 'the order was not found',
                    });
            }
        })
        .catch((err) => {
            return res.status(400).json({ success: false, error: err });
        });
});

//exporting method #2
module.exports = router;
