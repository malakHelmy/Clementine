/*for every model, there are routers. 
routers are responsible for creating/ storing/ Importing and exporting APIs between the files
*/
const express = require('express');
const { Order } = require('../models/order');
const { OrderItem } = require('../models/order-items');
const router = express.Router();

router.get(`/`, async function (req, res) {
    const ordersList = await Order.find().populate('userID');

    if (!ordersList) {
        res.status(500).json({ success: false });
    }
    res.status(200).send(ordersList);
});

//to display a specific object (order id, etc) from db:

router.get('/:id', async (req, res) => {
    const ordersList = await Order.findById(req.params.order_id);

    if (!ordersList) {
        return res.status(500).json({
            message: 'The order with the given ID was not found.',
        });
    }

    res.status(200).send(ordersList);
});

//adding a new object to the schema
router.post(`/`, async (req, res) => {
    const orderItemsIds = Promise.all(
        req.body.orderItems.map(async (orderItem) => {
            let newOrderItem = new OrderItem({
                quantity: orderItem.quantity,
                product: orderItem.product,
            });
            newOrderItem = await newOrderItem.save();
            return newOrderItem._id;
        })
    );

    const orderItemIdsresolved = await orderItemsIds;

    let add_order = new Order({
        order_id: req.body.order_id,
        userID: req.body.userID,
        userName: req.body.userName,
        orderItems: orderItemIdsresolved,
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
    add_order = await add_order.save();
    if (!add_order) {
        return res.status(404).send('The order cannot be added');
    }

    res.status(200).send(add_order);
});

//editing and updating objects
router.patch('/:id', async (req, res) => {
    const order = await Order.findByIdAndUpdate(
        req.params.order_id,
        {
            id: req.body.order_id,
        },
        {
            new: true, //returns updated data
        }
    );

    if (!order) {
        return res.status(404).send('The order cannot be updated');
    }

    res.status(200).send(order);
});

/* router.post(`/`, function (req, res) {
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
*/
router.delete('/:id', function (req, res) {
    Order.findByIdAndRemove(req.params.order_id)
        .then((order) => {
            if (order) {
                return res.status(200).json({
                    success: true,
                    message: 'the order has been deleted',
                });
            } else {
                return res.status(404).json({
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