const fs = require('fs');

class HomeController {
    
    async index(req, res, next) {
        res.render('home');
    }

    successfully(req, res) {
        res.render('successfully')
    }

}

module.exports = new HomeController;
