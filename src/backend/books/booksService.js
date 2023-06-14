const Books = require('./booksModel');
const BookRequest = require('./requestModel')

class BookService {

    static async getBooks() {

        const books = await Books.find();

        return books
    }

    static async getBook(body) {

        return await Books.findById({_id: body.id});
    }

    static async addBook(body) {

        const bookExist = await Books.findByProduct(body.title);

        if(bookExist) {
            throw new Error("This book is added already");
        }

        const addBook = new Books({
            ...body
        })

        return await addBook.save();
    }

    static async requestBook(body) {

        const existRequest = await BookRequest.findOne({title: body.title});

        if(existRequest) {
            throw new Error('you already requested for it')
        }

        return await BookRequest.create({...body})
    }

    static async removeBook(body) {
        const removedBook = await Books.findByIdAndDelete({_id: body.id});

        if(!removedBook) {
            throw new Error('book do not exist')
        }

        return removedBook;
    }
}

module.exports = BookService;