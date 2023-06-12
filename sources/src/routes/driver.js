const express = require('express');
const route = require('.');
const router = express.Router();

const driverController = require('../app/controllers/DriverController');
const loginController = require('../app/controllers/LoginController');


router.get('/login', loginController.login);
router.post('/login', loginController.postLogin);
router.get('/logout', loginController.logout);

router.get('/signup', driverController.signUp);

router.get('/income',driverController.getIncome);
router.get('/order',driverController.getOrder);

router.use('/', driverController.index);






module.exports = router;