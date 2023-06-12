const express = require('express');
const route = require('.');
const router = express.Router();

const parterController = require('../app/controllers/PartnerController');
const loginController = require('../app/controllers/LoginController');


router.get('/login', loginController.login);
router.post('/login', loginController.postLogin);
router.get('/logout', loginController.logout);

router.get('/signup', parterController.signUp);

router.get('/product',parterController.getProduct);
router.get('/order',parterController.getOrder);
router.get('/branch',parterController.getBranch);
router.get('/bill',parterController.getBill);

router.use('/', parterController.index);






module.exports = router;