const BooksController = require('./booksController');

class BooksRouter {

    constructor(app) {

        const API_ROUTE = `${process.env.API_BASE}books`;
        app.route('/').get(BooksController.getHome);
        app.route(API_ROUTE).get(BooksController.getBooks);
        app.route(`${API_ROUTE}/book`).get(BooksController.getBook);
        app.route(`${API_ROUTE}/requestbook`).get(BooksController.getRequest_page).post(BooksController.requestBook);
    }
}

module.exports = BooksRouter;
