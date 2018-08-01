const express = require("express");
const bodyParser = require('body-parser');

const postRouters = require('./router/posts');
const userRouters = require('./router/user');


const app = express();



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Authorization ,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();

  
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/api/posts", postRouters);
app.use("/api/user", userRouters);


module.exports = app;
