const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
// const generateToken = require('../utils/generateToken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


router.post("/register" , async (req,res) => {
    let user = await userModel.findOne({email : req.body.email});
    if(user){
        res.status(403).json({error : "user already exists"});
    }else{
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password , salt, async function(err, hash) {
                let newUser = await userModel.create({
                    firstName : req.body.firstName,
                    lastName : req.body.lastName,
                    username : req.body.username,
                    email : req.body.email,
                    password : hash,
                })

                let token = jwt.sign({email : newUser.email} , process.env.JWT_SECRET);

                const userToReturn = { ...newUser.toJSON(), token };
                delete userToReturn.password;
                res.status(200).json(userToReturn);
            });
        });
    }

})


router.post("/login", async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(403).json({ error: "Invalid email" });
        }

        bcrypt.compare(req.body.password, user.password, function(err, result) {
            if (err) {
                return res.status(500).json({ error: "Error comparing passwords" });
            }

            if (result) {
                let token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);

                const userToReturn = { ...user.toJSON(), token };
                delete userToReturn.password;
                
                return res.status(200).json(userToReturn);
            } else {
                return res.status(403).json({ error: "Invalid password" });
            }
        });
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;