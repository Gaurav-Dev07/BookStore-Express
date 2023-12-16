const express=require('express')

const router=express.Router()
const {bookController} = require('../controllers');

router.post('/', bookController.saveBook)


module.exports = router