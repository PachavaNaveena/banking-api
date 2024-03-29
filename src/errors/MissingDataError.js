
//MissingDataError returns the message and status and stops execution here itself
class MissingDataError extends Error{
    constructor(field = "MissingDataError", status = 400) {
        super();
        this.message = `missing data for ${field}`
        this.status = status
    }
}

module.exports = MissingDataError