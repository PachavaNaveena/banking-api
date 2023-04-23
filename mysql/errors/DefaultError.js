const {error} = require("winston");

//error def :  built-in Error class that takes in message as the 1st parameter. To throw an Error with a customise error message.
//We can also create a customised Error class that would produce a default Error message to the user by inheriting from the built-in Error class.
//DefaultError returns the message and status then stops execution here itself
class DefaultError extends Error {
    constructor(message = "DefaultError", status = 400) {
        super();
        this.message = message
        this.status = status
    }
}

module.exports = DefaultError
