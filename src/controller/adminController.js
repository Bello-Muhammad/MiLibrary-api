const Book = require('../model/books')
const Admin = require('../model/admin')
const BookRequest = require('../model/request')

const adminSignup_get = (req, res) => {
    res.render('adminsignup&login', {
        title: 'Admin'
    })
}

const adminSignup_post = async(req, res) => {

    try {
        const admin = new Admin(req.body)
        await admin.save(function(err, admin) {
            if (err) res.render('adminsignup')
        })
        res.redirect('/adminsignup')
    } catch (e) {
        res.redirect('/adminsignup')
    }
}

const adminLogin_post = async (req, res) => {
    try {
        const admin = await Admin.findByCredentials(req.body.username, req.body.password)
        
        if (!admin){
            res.redirect('/adminsignup',{
                e: e
            })
        }

        req.session.user = admin;
        res.redirect('/adminsite')

    } catch (e) {
        res.redirect('/adminsignup',{
            e: e
        })
    } 
}

const admin_home = async (req, res) => {

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
    

}

const addingItem_get = (req, res) => {
    if (req.session.user === undefined) {
        req.session.reset
        res.redirect('/adminsignup')
    }
    res.render('addbook', {
        title: 'Bookitem'
    })
}

const addingItem_post = async (req, res) => {
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
        
    } catch (e) {
        res.render('addbook', {
            e
        })
    }
}

const itemRemoval_post = async (req, res) => {
    const admin = await Admin.findById({_id: req.session.user._id})

    if(admin.username !== req.session.user.username) {
        
        res.redirect('/adminsignup')
    }
    const book = await Book.findById({_id: req.body._Id})
    book.remove()
    res.redirect('/adminsite')
}

module.exports = {
    adminSignup_get,
    adminSignup_post,
    adminLogin_post,
    admin_home,
    addingItem_get,
    addingItem_post,
    itemRemoval_post,
}