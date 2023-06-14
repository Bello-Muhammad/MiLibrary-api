const AdminService = require('./adminService');
const ResponseHandler = require('../dto/responseHandler');
const Admin = require('./adminModels');

class AdminController {

    static async getAdminSignUp(req, res) {
        let templates='adminsignup&login';
        ResponseHandler.success(res, templates)
    }

    static async adminSignUp(req, res) {
        // console.log(req.body.username)
        try {
            
            const data = await AdminService.adminSignUp(req.body);
            let reRoute = '/api/v1/admin/auth/adminlogin';
            ResponseHandler.redirecting(res, reRoute);
        } catch (err) {
            let templates = 'adminsignup&login';
            ResponseHandler.error(res, templates, err.message);
        }
    }

    static async getAdminLogin(req, res) {
        let templates = 'adminsignup&login';
        ResponseHandler.success(res, templates);
    }

    static async adminLogin(req, res) {
        try {
            const data = await AdminService.adminLogin(req.body);
            req.session.admin = data;
            let reRoute= '/api/v1/admin/home';
            ResponseHandler.redirecting(res, reRoute);
        } catch (err) {
            let templates = 'adminsignup&login';
            ResponseHandler.error(res, templates, err.message);
        }   
    }
}

module.exports = AdminController;