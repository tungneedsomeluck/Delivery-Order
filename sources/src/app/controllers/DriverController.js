const fs = require('fs');

class DriverController {
    
    // [GET] /driver/home
    async index(req, res, next) {
        if(!req.session.user) {
            return res.redirect('/driver/login')
        }
        res.render('driverHome')
    }

    // [GET] /driver/Income
    getIncome(req, res) {
        res.render('driverIncome')
    }

    // [GET] /driver/Order
    getOrder(req, res) {
        res.render('driverOrder')
    }

    // [GET] /driver/signup
    signUp(req, res) {
        res.render('driverSignUp');
    }

}

module.exports = new DriverController;
