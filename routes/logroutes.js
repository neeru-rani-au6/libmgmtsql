const express  = require('express');
const router = express.Router();
const {addToLog,updateLog,alllogs,deleteLog,specificLog} = require('../controllers/logCotrollers');
const {authenticate}=require('../middleware/authenticate');

//ALL CRUD ROUTES RELATED TO lOG
router.post('/addToLog',authenticate, addToLog);
router.get('/:logId',authenticate,specificLog);
router.get('/',authenticate,alllogs);
router.patch('/:logId',authenticate,updateLog);
router.delete('/:logId',authenticate,deleteLog);


module.exports = router;
