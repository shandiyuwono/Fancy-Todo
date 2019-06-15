const {verifyToken} = require('../helpers/jwt')

module.exports = {
    authentication(req,res,next) {
        if(req.headers.hasOwnProperty('token')) {
            try {
                const decode = verifyToken(req.headers.token)
                req.decode = decode
                next()
            }
            catch(err) {
                next({status: 401, message: "unauthorized"})
            }
        }
        else{
            next({status: 401, message: "unauthorized"})
        }
    }
}