const fs = require('fs');
const CryptoJS = require('crypto-js');
const hashLength = 64;
const clientM = require('../models/client.model');
const session = require('express-session');
class LoginController {
    
    

    // [GET] /login
    login(req, res, next) {
        res.render('login');
        //next();
    }

    // [GET] /logout
    logout(req, res, next) {
        delete req.session.user;
        res.redirect('login');
    }

    

    // [POST] //login

    async postLogin(req, res) {
        switch(req.body.submitButton) {
            case 'signUp' : 
                {
                    const un = req.body.username;
                    const pw = req.body.password;
                    const salt = Date.now().toString(16);
                    const pwSalt = pw + salt;
                    const pwHashed = CryptoJS.SHA3(pwSalt, { outputLength: hashLength*4 })
                        .toString(CryptoJS.enc.Hex);
                    const all = await clientM.getAllAccount();
                    const acc = {
                        id: all.length + 1,
                        userId: 'P' + (all.length + 1),
                        username: un,
                        password: pwHashed + salt,
                    };
                    
                    const accNew = await clientM.addAccount(acc, req.body);
                    res.redirect('login')
                }
                break;
            case 'login' :
                {
                    const un = req.body.username;
                    const pw = req.body.password;
                    const accountDb = await clientM.getAccountByUsername(un);
                    if(accountDb.length == 0) {
                        console.log('Tài khoản không tồn tại');
                        res.redirect('login');
                        break;
                    }
                    const pwDb = accountDb[0].Password;
                    //Lấy salt từ pw đã lưu trong db
                    const salt = pwDb.slice(hashLength);
                    const pwSalt = pw + salt;
                    const pwHashed = CryptoJS.SHA3(pwSalt, { outputLength: hashLength*4 })
                        .toString(CryptoJS.enc.Hex);
                    if(pwDb === (pwHashed + salt)) {
                        req.session.user = { 
                            username: accountDb[0].Username,
                            userId: accountDb[0].UserID,
                            role: accountDb[0].Role
                        }
                        if(req.session.user.role == 'Admin') {
                            res.redirect('/admin');
                        }
                        if(req.session.user.role == 'Partner') {
                            res.redirect('/partner');
                        }
                        if(req.session.user.role == 'Driver') {
                            res.redirect('/driver');
                        }
                        if(req.session.user.role == 'Employee') {
                            res.redirect('/employee');
                        }
                        if(req.session.user.role == 'Customer') {
                            res.redirect('/client');
                        }
                        
                        break;
                    }
                    res.redirect('login');
                }
                break;
            case 'temp' :
                {
                    delete req.session.user;
                    res.redirect('login');
                }
                break;
                
        }
    }


}

module.exports = new LoginController;
