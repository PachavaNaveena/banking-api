class DefaultError extends Error{
    constructor(message = "Default Error", status = 400) {
        super();
        this.message = message
        this.status = status
    }
}

module.exports = DefaultError
