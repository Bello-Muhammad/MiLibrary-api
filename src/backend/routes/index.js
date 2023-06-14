const AdminRouter = require('../admin/adminRoute');
const BooksRouter = require('../books/booksRoute');

class AppRoutes {

    static init(app) {
        new BooksRouter(app);
        new AdminRouter(app);
    }
}

module.exports = AppRoutes;