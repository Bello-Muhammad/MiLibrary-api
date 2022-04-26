const Book = require('../model/books')
const BookRequest = require('../model/request')

const library_home = async (req, res) => {
    const book = await Book
    book.find({}, function(e, item) {
        res.render('index', {
            title: 'Home',
            book: {item}
        })
    })
}

const userRequest_get = (req, res) => {
    res.render('request')
}

const userRequest_post = async (req, res) => {
    console.log
    const bookReq = new BookRequest(req.body)
    await bookReq.save()
    res.redirect('/request')
}

const bookSelection_get = async (req, res) => {

    const book = await Book.findById({_id: req.body._id})
    res.render('book', {
        title: 'Read',
        name: book.title
    })
}

const about_library = (req, res) => {
    res.render('about', {
        title: 'about'
    })
}

module.exports = {
    library_home,
    userRequest_get,
    userRequest_post,
    bookSelection_get,
    about_library
}