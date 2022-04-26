const express = require('express')
const router = new express.Router()
const libraryController = require('../controller/libraryController')


router.get('/', libraryController.library_home);
router.get('/request', libraryController.userRequest_get);
router.post('/request', libraryController.userRequest_post);
router.post('/categories', libraryController.bookSelection_get);
router.get('/about', libraryController.about_library);


module.exports = router