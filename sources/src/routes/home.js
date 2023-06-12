const express = require('express');
const route = require('.');
const router = express.Router();

const homeController = require('../app/controllers/HomeController');


router.get('/registersuccessfully',homeController.successfully)
router.use('/', homeController.index);


module.exports = router;