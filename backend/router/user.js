const express = require("express");
const mysql = require('../mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post("/signup" , (req,res, next) => {
  
    
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = {
            fullName: req.body.fullName,
            emailId: req.body.emailId,
            registeredOn: new Date(),
            password: hash
        }
    
        // const sql =
        mysql.query('INSERT INTO USER SET ? ', user, (err, result) => {
            if(err) {
                console.log(err)
                return res.status(500).json({
                    err: err
                })
            }
            return res.status(200).json({
                message: "user registered!",
                user: result
            })
           console.log('added successfully')
        })
    }); 
    //hash method ends
}); 
//signup finished


//LOGIN FORM MASTER
router.post("/login", (req, res, next) => {
    let fetchedUser;
    console.log(res.body);
    mysql.query("Select * from user where emailId=?", req.body.emailId, (error, user) =>{
        console.log(user);
        if (!user[0]) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
        //   fetchedUser = user[0];
          bcrypt.compare(req.body.password, user[0].password).then(result => {
            console.log('in compare'); 
            console.log(result);
            if(result === false) {
                    return res.status(401).json({
                      message: "Auth failed"
                    });
            }
            const token = jwt.sign(
                { email: user.email, userId: user.userId },
                "secret_this_should_be_longer",
                { expiresIn: "1h" }
              );
              res.status(200).json({
                token: token,
                expiresIn: 3600
              });
          })
    });

  });
  
module.exports = router