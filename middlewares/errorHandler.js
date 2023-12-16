const Joi = require("joi");
const {DEBUG_MODE} = require('../config/serverConfig');
const { CustomErrorHandler } = require("../services/customErrorHandler");
console.log('DEBUG_MODE',DEBUG_MODE)
console.log('DEBUG_MODE type',typeof(DEBUG_MODE))
const errorHandler = (error,req,res,next) => {
    let statusCode = 500
    let data = {
        message: 'Internal Server Error',
        ...(true && {originalError: error.message}),
    }

    console.log('data => ',data)
    if(error instanceof Joi.ValidationError ) {
        statusCode = 422,
        data = {
            message: error.message
        }
    }

    if(error instanceof CustomErrorHandler) {
        statusCode = error.status
        data = {
            message: error.message
        }
    }

    return res.status(statusCode).json(data)
}

module.exports = {errorHandler}