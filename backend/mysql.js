const mysql = require('mysql');

var conncetion = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'postsDatabase'
});

conncetion.connect(function(error) {
    if(error) {
        console.log(error)
    }
    console.log('connected to mysql');
})

module.exports = conncetion;