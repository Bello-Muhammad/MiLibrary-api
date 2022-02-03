const express = require('express')
const multer = require('multer')
const Book = require('../model/books')
const Admin = require('../model/admin')
const BookRequest = require('../model/request')
const router = new express.Router()



router.get('/adminsignup', (req, res) => {
    res.render('adminsignup&login', {
        title: 'Admin'
    })
})

router.post('/adminsignup', async(req, res) => {

    try {
        const admin = new Admin(req.body)
        await admin.save(function(err, admin) {
            if (err) res.render('adminsignup')
        })
        res.redirect('/adminsignup')
    } catch (e) {
        res.redirect('/adminsignup')
    }
    // console.log(req.body)
})

router.post('/adminlogin', async (req, res) => {
    try {
        const admin = await Admin.findByCredentials(req.body.username, req.body.password)
        
        if (!admin){
            res.redirect('/adminsignup',{
                e: e
            })
        }
        req.session.user = admin;
        console.log(req.session.user)
        res.redirect('/adminsite')
    } catch (e) {
        res.redirect('/adminsignup',{
            e: e
        })
        

    }
    
})

router.get('/adminsite', async (req, res) => {

    if (req.session.user === undefined) {
        req.session.reset
        res.redirect('/adminsignup')
    }else{
        const admin = await Admin.findOne({username: req.session.user.username})
        if(!admin){
            res.redirect('/adminsignup')
        }else{
            const book = await Book.find({})
            const bookreq = await BookRequest.find({})
            // book.find({}, function(e, item) {
            //     res.render('admin_site', {
            //         title: 'admin',
            //         book: {item}})
            // })

            res.render('admin_site',{
                        title: 'admin',
                        book1: book,
                        users: bookreq
                    })
        }
    }
    

})

router.get('/adding', (req, res) => {
    if (req.session.user === undefined) {
        req.session.reset
        res.redirect('/adminsignup')
    }
    res.render('addbook', {
        title: 'Bookitem'
    })
})

const upload = multer({
    // limits: {
    //     fileSize: 10000000
    // },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a document'))
        }

        cb(undefined, true)
    }
})

router.post('/addbook', upload.single('buk'), async (req, res) => {
               
    
    try {
        const book = await Book.findByProduct(req.body.title)
        
        if (book) {
            res.render('addbook', {
                e: book
            })
        }else{
            const book = new Book({
                buk: req.file.originalname,
                title: req.body.title,
                author: req.body.author,
                categories: req.body.categories
            })
            await book.save()
        }

        res.redirect('/adding')
        
        console.log(req.body)
        console.log(req.file)
        
    } catch (e) {
        res.render('addbook', {
            e
        })
        
    }
    
   
})

router.post('/removebook', async (req, res) => {
    const admin = await Admin.findById({_id: req.session.user._id})

    if(admin.username !== req.session.user.username) {
        
        res.redirect('/adminsignup')
    }
    const book = await Book.findById({_id: req.body._Id})
    book.remove()
    res.redirect('/adminsite')
})



module.exports = router