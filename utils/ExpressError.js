class ExpressError extends Error {
    constructor(statusCode, message) {
        super(message); // include message in super!
        this.statusCode = statusCode; // not just "status"
    }
}

module.exports = ExpressError;