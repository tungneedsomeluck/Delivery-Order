const express = require('express');
const route = require('.');
const router = express.Router();

const clientController = require('../app/controllers/ClientController');
const loginController = require('../app/controllers/LoginController')

router.get('/login', loginController.login);
router.post('/login', loginController.postLogin);

router.get('/restaurant/payment', clientController.getPayment);
router.get('/restaurant/:idBranches', clientController.getRestaurant);

router.use('/', clientController.index);






module.exports = router;