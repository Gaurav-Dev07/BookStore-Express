class CustomErrorHandler extends Error {
    // constructor(status, msg) {
    //     this.status = status;
    //     this.message = msg;
    // }
    constructor(status, msg) {
        // Call the super constructor with the error message
        super(msg);
        
        // Set custom properties
        this.status = status;
        this.message = msg;
    }


    static alreadyExists(message) {
        return new CustomErrorHandler(409, message)
    }

    static userNotFound(message) {
        return new CustomErrorHandler(404,message)
    }

    static unAuthorizedRequest(message) {
        return new CustomErrorHandler(401,message)
    }
}

module.exports = {
    CustomErrorHandler
}