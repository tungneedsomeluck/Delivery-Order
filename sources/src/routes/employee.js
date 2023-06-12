const express = require('express');
const route = require('.');
const router = express.Router();

const employeeController = require('../app/controllers/EmployeeController');
const loginController = require('../app/controllers/LoginController');


router.get('/login', loginController.login);
router.post('/login', loginController.postLogin);
router.get('/logout', loginController.logout);

router.get('/unapproved', employeeController.getUnapproved);

router.use('/', employeeController.index);






module.exports = router;