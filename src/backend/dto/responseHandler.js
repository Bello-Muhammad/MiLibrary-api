class ResponseHandler {

    static success (res, templates, data, statusCode = 200) {
        // res.status(statusCode).json({success: true, data, message: 'ok'})
        res.status(statusCode).render(templates, {book1: data})
    }

    static redirecting(res, reRoute, statusCode = 200) {
        res.status(statusCode).redirect(reRoute);
    } 

    static error (res, templates, err, statusCode = 400) {
        // res.status(statusCode).json({success: false, data: null, message: err})
        res.status(statusCode).render(templates, {e: err})
    }
}

module.exports = ResponseHandler;