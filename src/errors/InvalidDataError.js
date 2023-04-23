
//InvalidDataError returns the message and status and stops execution here itself
class InvalidDataError extends Error{
    constructor(field = "", status = 400) {
        super();
        this.message = `Invalid data for ${field}`
        this.status = status
    }
}

module.exports = InvalidDataError
