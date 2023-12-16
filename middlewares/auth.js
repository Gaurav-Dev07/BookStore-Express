const { CustomErrorHandler } = require("../services/customErrorHandler");
const { JwtService } = require("../services/jwtService");

const authorizeUserToken = async (req,res,next) => {
    let token = req.headers['authorization'];
    if(!token) {
        return next(CustomErrorHandler.unAuthorizedRequest("user not authorized"))
    }
    token = token.split(' ')[1]

    if(token === null || token === '') {
        return next
    }
    try {
        const verifeidUser = JwtService.verifyToken(token)
        console.log("middleware/auth.js line:11 verify => ",verifeidUser)
        if(!verifeidUser) {
            return next(CustomErrorHandler.unAuthorizedRequest("user not verifeid"))
        }
        req.user = verifeidUser;
        next()
    } catch (error) {
        next(error)
    }  
}

module.exports = {
    authorizeUserToken
}