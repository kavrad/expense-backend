const express=require('express');
const router=express.Router();

router.get('/show-report',require('../utils/auth').authenticate,require('../controllers/reportController').showReport);
router.get('/daily-expenses',require('../utils/auth').authenticate,require('../controllers/reportController').dailyExpenses);
module.exports=router;