const jwt = require('jsonwebtoken')

module.exports = {
    async authCheck(req,res, next) {
        if (req.cookies && req.cookies.userToken) {
            jwt.verify(req.cookies.userToken, "raju123456789652ssdff", (err, data) => {
                req.user = data
                console.log('gsgsg',req.user);
                
                next()
            })
        } else {
            next()
        }
    }
}