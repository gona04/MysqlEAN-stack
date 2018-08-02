const express = require('express');
const mysql = require('../mysql');
const bodyPasrser = require('body-parser');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();
router.use(bodyPasrser.json());

//Create table posts 
router.get('/createPosts', (req, res, next) => {
    mysql.query('CREATE TABLE posts (postId int PRIMARY KEY, title varchar(100), content varchar(225))');
    res.send(' blond table created ');
});

// //TO CREATE DATABASE 
// router.get('/createDatabase', (req,res,next) => {
//     mysql.query('CREATE DATEBASE HELLO');
//     res.send('DATABSE CREATED');
//   })

//ADDING POSTS
router.post('/', checkAuth, (req, res, next) => {
    const post = req.body;
    console.log(post);
    mysql.query('INSERt INTO Posts SET ? ', post, (err, result) => {
        //FOR ERROR
        if(err){
            res.json({
                error: err
            })
            throw err;
        }
        //IF ADDED SUCCESSFULLY 
        res.status(201).json({
            message: "post added successfully!"
        })

    })
   
});


//DELETING POSTS 
router.delete("/delete/:postId", checkAuth ,(req, res, next) => {
    console.log('in delete');
    console.log(req.params.postId);
    const id = req.params.postId;
    console.log(id);

    const sql = "delete from posts where postId = ? ";

    mysql.query(sql, id, (err,result) => {
        console.log(result);
        if(err) {
            res.status(500).json({
                error: err
            });
        }

        console.log(result);
        res.status(201).json({
            message: "Post deleted successfully"
        })
    })
});

//GETTING POSTS
router.use("/", (req, res, next) => {
 mysql.query("select * from posts", (err, result) => {
     if(err) {
         res.status(500).json({
             error: err
         });
         console.log(err)
     }

     console.log(result);
     res.status(200).json({
        message: "Posts fetched succesfully!",
        posts: result
      });
 })
  
});



module.exports = router;
