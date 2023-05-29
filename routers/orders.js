const express = require('express');
const { Order } = require('../models/order');
const { User } = require('../models/user');
const { OrderItem } = require('../models/order-items');
const router = express.Router();




router.get(`/`, async (req, res) => {

    Order.find()
    .then(async (orderslist) => {          
    res.render('pages/ordersdash', {
      order: orderslist
    })

    })
    .catch((err) => {
        
      console.log(err);
    });
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
        
        orderItems: orderItemIdsresolved,
        order_id: req.body.order_id,
        userID: req.body.userID,
        shippingAddress1: req.body.shippingAddress1,
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


  /* router.get(`/`, async (req, res) => {
 //.populate -> if i want to know the user who ordered
    //displays the first and last name for the user + sort by date from newest to oldest
    const ordersList = await Order.find()
        .populate('userID', 'firstname + lastname')
        .sort({ dateOrdered: -1 })
    .then(async (ordersList) => {          
    res.render('pages/editcustdash', {
      order: ordersList
    })

    })
    .catch((err) => {
        
      console.log(err);
    });
  
  });




//to display a specific object (order id, etc) from db:

/* router.get('/:id', async (req, res) => {
    //populate to see order details
    const orders = await Order.findById(req.params.id).populate({
        path: 'orderItems',

        //populate will be an object to get all info about product items
        populate: {
            path: 'product',
            populate: 'category',
        },
    });

    if (!orders) {
        return res.status(500).json({
            message: 'The order with the given ID was not found.',
        });
    }

    res.status(200).send(orders);
});


//editing and updating status
router.put('/:id', async (req, res) => {
    let order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            //i only need to update the status of the order
            status: req.body.status,
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
/* router.delete('/:id', function (req, res) {
    Order.findByIdAndRemove(req.params.id)
        .then(async (order) => {
            if (order) {
                //will use map to get every order item and find it and delete it
                await order.orderItems.map(async (orderItem) => {
                    await OrderItem.findByIdAndRemove(orderItem);
                });
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
            return res.status(500).json({ success: false, error: err });
        });
});
*/
//exporting method #2

module.exports = router;
