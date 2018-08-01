const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        console.log('in auhentication');
        console.log(req.headers.authorization)
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secret_this_should_be_longer");
    console.log('varifying jwt');
    next();
    }
    catch(error) {
        console.log(error);
        res.status(401).json({
            message: 'Authentication Failed'
        })
    }

}