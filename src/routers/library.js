const express = require('express')
const Book = require('../model/books')
const BookRequest = require('../model/request')
const router = new express.Router()




router.get('/', async (req, res) => {
    const book = await Book
    book.find({}, function(e, item) {
        res.render('index', {
            title: 'Home',
            book: {item}
        })
    })
})

router.get('/request', (req, res) => {
    res.render('request')
})

router.post('/request', async (req, res) => {
    console.log
    const bookReq = new BookRequest(req.body)
    await bookReq.save()
    res.redirect('/request')
})

router.post('/categories', async (req, res) => {

    const book = await Book.findById({_id: req.body._id})
    res.render('book', {
        title: 'Read',
        name: book.title
    })
    // console.log(req.body)
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'about'
    })
})

router.get ('*', (req, res) => {
    res.render('404',{
        title: '404'
    })
})


module.exports = router