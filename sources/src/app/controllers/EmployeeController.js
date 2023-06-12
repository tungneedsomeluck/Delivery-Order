const fs = require('fs');

class EmployeeController {
    
    // [GET] /employee/
    async index(req, res, next) {
        if(!req.session.user) {
            return res.redirect('/employee/login')
        }
        res.render('employeeApproved')
    }

    // [GET] /employee/unapproved
    getUnapproved(req, res) {
        res.render('employeeUnapproved')
    }

}

module.exports = new EmployeeController;
