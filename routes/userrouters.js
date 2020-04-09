const express = require('express');
const bcrypt = require('bcrypt');
const {authenticate}=require('../middleware/authenticate');
const router = express.Router();
var userController = require("../controllers/usercontroller");

router.post('/',  authenticate, userController.createUser)
router.delete('/:id',authenticate,  userController.deleteUser)
router.put('/:id', authenticate, userController.updateUser)

router.get('/', authenticate, userController.getAllUser)
router.get('/:id', authenticate, userController.getUser)

module.exports = router;