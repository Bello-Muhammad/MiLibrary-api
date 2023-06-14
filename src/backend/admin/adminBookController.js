const BookServices = require('../books/booksService');
const ResponseHandler = require('../dto/responseHandler');

class AdminBookController {

    static async allBooks(req, res) {
        try {
            const data = await BookServices.getBooks();
            let templates = 'admin_site';
            ResponseHandler.success(res, templates, data)
        } catch (err) {
            ResponseHandler.error(res, err.message);
        } 
    }

    static async getAddBooks_page(req, res) {
        let templates = 'addbook';
        ResponseHandler.success(res, templates)
    }

    static async addBook(req, res) {   
        try {
            
            const data = await BookServices.addBook(req.body);
            let reRoute = '/api/v1/admin/home/addbook'
            ResponseHandler.redirecting(res, reRoute)
        } catch (err) {
            let templates = 'addbook'
            ResponseHandler.error(res, templates, err.message)
        }
    }

    static async removeBook(req, res) {
        try {
            const data = await BookServices.removeBook(req.body);
            let reRoute = '/api/v1/admin/home'
            ResponseHandler.redirecting(res, reRoute);
        } catch (err) {
            ResponseHandler.error(res, err.message);
        }
    }
}

module.exports = AdminBookController;