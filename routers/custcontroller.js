<<<<<<< Updated upstream
// const  UserDB  = require('../models/user');
// const bcrypt=require('bcrypt')
=======
const  UserDB  = require('../models/user');
const bcrypt=require('bcrypt')

//create and save new user
exports.create = (req,res) => {
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
        password: bcrypt.hash(req.body.password),
        phone: req.body.phone
    })

    //save user in db
    user
    .save(user)
    .then(data => {
       // res.send(data)
       res.redirect("/updatecustdash");
    })
    .catch(err => {
        res.status(500).send({
            message : err.message || "Some errors occured while adding the user."
        })
    })

}

 // retrieve and return all users or a single user

 exports.fine = (req, res) => {
     UserDB.find()
     .then(user => 
        {
            res.send(user)
        })
    .catch(err =>{
        res.status(500).send({
            message : err.message || "Error occured while retrieving user info."
        })
    })

    //update an identified user by user id

    exports.update = (req, res) => {
        if(!req.body) {
            return res.status(400).send({
                message: "Data to be updated cannot be empty."
            })
        }
        const id=req.params.id;
        UserDB.findByIdAndUpdate(id.req.body, {useFineAndModify: false})
        .then(data=> {
            if(!data) {
                res.status(400).send({message: `Cannot update user with $(id). User may not be found`})
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({message: "Error updating user information."})
        })
    }
>>>>>>> Stashed changes



//     //new user
//     const user = new UserDB({
//         firstname: req.body.firstname,
//         lastname: req.body.lastname,
//         email: req.body.email,
//         password: bcrypt.hash(req.body.password),
//         phone: req.body.phone
//     })

//     //save user in db
//     user
//     .save(user)
//     .then(data => {
//        // res.send(data)
//        res.redirect("/updatecustdash");
//     })
//     .catch(err => {
//         res.status(500).send({
//             message : err.message || "Some errors occured while adding the user."
//         })
//     })

// }

//  // retrieve and return all users or a single user

//  exports.find = (req, res) => {
//      UserDB.find()
//      .then(user => 
//         {
//             res.send(user)
//         })
//     .catch(err =>{
//         res.status(500).send({
//             message : err.message || "Error occured while retrieving user info."
//         })
//     })

//     //update an identified user by user id

//     exports.update = (req, res) => {
//         if(!req.body) {
//             return res.status(400).send({
//                 message: "Data to be updated cannot be empty."
//             })
//         }
//         const id=req.params.id;
//         UserDB.findByIdAndUpdate(id.req.body, {useFineAndModify: false})
//         .then(data=> {
//             if(!data) {
//                 res.status(400).send({message: `Cannot update user with $(id). User may not be found`})
//             } else {
//                 res.send(data)
//             }
//         })
//         .catch(err => {
//             res.status(500).send({message: "Error updating user information."})
//         })
//     }


//     //delete a user with specified i
//     exports.delete = (req, res) => {
//         const id = req.params.id;

//         UserDB.findByIdAndDelete(id)
//         .then(data =>{
//             if(!data) {
//                 res.status(400).send({message: `Cannot update user with $(id). Check ID`})
//             } else {
//                 res.send({ message: "User delete successfully."
//             })
//             }
//         })
//         .catch (err=> {
//             res.status(500).send({
//                 message: "Coudn't delete user with give ID=" + id
//             });
//         });
//     }
// }