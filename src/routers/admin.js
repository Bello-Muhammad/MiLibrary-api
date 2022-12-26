const express = require('express')
const multer = require('multer')
const router = new express.Router()
const adminController = require('../controller/adminController')


router.get('/adminsignup', adminController.adminSignup_get);
router.post('/adminsignup', adminController.adminSignup_post);
router.get('/adminlogin', adminController.adminLogin_get);
router.post('/adminlogin', adminController.adminLogin_post);
router.get('/adminsite', adminController.admin_home);
router.get('/adding', adminController.addingItem_get);

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

router.post('/addbook', upload.single('buk'), adminController.addingItem_post);
router.post('/removebook', adminController.itemRemoval_post);

module.exports = router
