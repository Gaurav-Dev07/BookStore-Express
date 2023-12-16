const express=require('express')
const router=express.Router()

const {userController} = require('../controllers');
const { authorizeUserToken } = require('../middlewares/auth');

router.post('/', userController.saveUser)
router.post('/save',userController.saveBookToLibrary)
router.get('/:userId/library',authorizeUserToken, userController.getAllBooksByUser)

module.exports = router