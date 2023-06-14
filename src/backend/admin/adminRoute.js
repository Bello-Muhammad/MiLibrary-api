const AdminController = require('./adminController');
const AdminBookController = require('./adminBookController');
const isAuth = require('../utils/auth');

class AdminRouter {

    constructor(app) {
        const API_ROUTE = `${process.env.API_BASE}admin/`;

        //admin auth route
        app.route(`${API_ROUTE}register`).get(AdminController.getAdminSignUp).post(AdminController.adminSignUp);
        app.route(`${API_ROUTE}auth/adminlogin`).get(AdminController.getAdminLogin).post(AdminController.adminLogin);

        //admin books route
        
        app.route(`${API_ROUTE}home`).get(isAuth, AdminBookController.allBooks);
        app.route(`${API_ROUTE}home/addbook`).get(isAuth, AdminBookController.getAddBooks_page).post(isAuth, AdminBookController.addBook);
        app.route(`${API_ROUTE}home/removebook`).post(isAuth, AdminBookController.removeBook);

    }
}

module.exports = AdminRouter;