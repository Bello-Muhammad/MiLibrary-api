const ResponseHandler = require('../dto/responseHandler')

const isAuth = (req, res, next) => {
    if(!req.session.admin) {
        let reRoute = '/api/v1/admin/auth/adminlogin';
        ResponseHandler.redirecting(res, reRoute)
    }

    next();
}

module.exports = isAuth;