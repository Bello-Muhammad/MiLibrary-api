const BookServices = require('./booksService')
const ResponseHandler = require('../dto/responseHandler')

class BooksController {

    static async getBooks(req, res) {
        try {
            const data = await BookServices.getBooks();
            let templates = 'index';
            ResponseHandler.success(res, templates, data)
        } catch (err) {
            ResponseHandler.error(res, err.message);
        } 
    }

    static async getBook(req, res) {
    
        try {
            const data = await BookServices.getBook(req.query);
            let templates = 'book';
            console.log(data)
            ResponseHandler.success(res, templates, data)
        } catch (err) {
            ResponseHandler.error(res, err.message);
        }
    }

    static async getRequest_page(req, res) {
        let templates = 'request';
        ResponseHandler.success(res, templates)
    }

    static async requestBook(req, res) {
        try {
            const data = await BookServices.requestBook(req.body);
            let reRoute = '/api/v1/books/requestbook'
            ResponseHandler.redirecting(res, reRoute)
        } catch (err) {
            let templates = 'request'
            ResponseHandler.error(res, templates, err.message)
        }
    }
}

module.exports = BooksController;