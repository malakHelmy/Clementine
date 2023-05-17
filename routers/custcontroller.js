const  UserDB  = require('../models/user');

//create and save new user
exports.create = (re,res) => {
    //validate req
    if(!req.body){
        res.status(400).send({message: "Content cannot be empty."});
        return
    }

    //new user
    const user = new UserDB({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
    })
}