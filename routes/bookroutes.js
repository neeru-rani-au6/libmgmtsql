const express = require('express');
const bcrypt = require('bcrypt');
const {authenticate}=require('../middleware/authenticate');
const router = express.Router();
var bookController = require('../controllers/bookController');

router.post('/',  authenticate,bookController.createBook)
router.delete('/:id', authenticate, bookController.deleteBook)
router.put('/:id', authenticate, bookController.updateBook)

router.get('/', authenticate, bookController.getAllBook)
router.get('/:id',  authenticate,bookController.getBook)

module.exports = router;