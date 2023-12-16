const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/serverConfig')

class JwtService {
    
    static sign(payload , expiry='600000s', secret = JWT_SECRET) {
        console.log('JWT_SECRET',JWT_SECRET)
        return jwt.sign(payload, secret, {expiresIn: expiry})
    }

    static verifyToken(accessToken, secret = JWT_SECRET) {
        return jwt.verify(accessToken, secret)
    }
}

module.exports = {
    JwtService
}