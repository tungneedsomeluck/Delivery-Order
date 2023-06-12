const fs = require('fs');

class AdminController {
    
    // [GET] /admin/partner
    async index(req, res, next) {
        if(!req.session.user) {
            return res.redirect('/admin/login')
        }
        res.render('adminPartner')
    }

    // [GET] /admin/customer
    getCustomer(req, res) {
        res.render('adminCustomer')
    }

    // [GET] /admin/driver
    getDriver(req, res) {
        res.render('adminDriver')
    }

    // [GET] /admin/employee
    getEmployee(req, res) {
        res.render('adminEmployee')
    }

}

module.exports = new AdminController;
