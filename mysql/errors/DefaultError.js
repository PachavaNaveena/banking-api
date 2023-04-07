const {error} = require("winston");

class DefaultError extends Error {
    constructor(message = "DefaultError", status = 400) {
        super();
        this.message = message
        this.status = status
    }
}

module.exports = DefaultError
