class InternalError extends Error{
    constructor(message = "Internal server Error", status = 500) {
        super();
        this.message = message
        this.status = status
    }
}

module.exports = InternalError
