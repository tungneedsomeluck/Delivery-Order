const express = require('express');
const route = require('.');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');
const loginController = require('../app/controllers/LoginController');


router.get('/login', loginController.login);
router.post('/login', loginController.postLogin);
router.get('/logout', loginController.logout);

router.get('/customer',adminController.getCustomer);
router.get('/driver',adminController.getDriver);
router.get('/employee',adminController.getEmployee);

router.use('/', adminController.index);






module.exports = router;