const fs = require('fs');
const partnerM = require('../models/partner.model');
class PartnerController {
    // Mặc định loại route về Dashboard (Home)
    // [GET] /partner/
    async index(req, res, next) {
        if(!req.session.user) {
            return res.redirect('/partner/login')
        }
        res.render('partnerHome')
    }

    // [GET] /partner/product
    async getProduct(req, res) {
        console.log(req.session.user)
        if(!req.session.user) {
            return res.redirect('/partner/login')
        }

        if((Object.keys(req.query).length !== 0)){
            if(req.query.Type === 'add') {
                console.log(req.query)
            }
            else if(req.query.Type === 'update') {
                const u = req.query
                await partnerM.updateMenu(u.ID_Menu, u.Food_Name, u.Description, u.Price, u.Status)
            }
            else if(req.query.Type === 'delete') {
                const u = req.query
                await partnerM.deleteMenu(u.ID_Menu, u.Food_Name)
            }
        }

        const menu = await partnerM.getAllMenu(req.session.user.userId)

        //------------------------------------
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        const length = 5;
        for(var j=0;j<menu.length;j++) {
            for (var i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            menu[j].idFood = text;
            menu[j].Price = `${(menu[j].Price)}`.split('').reverse().reduce((prev, next, index) => {
                return ((index % 3) ? next : (next + '.')) + prev
            })
            text = "";
        }
        //------------------------------------------
        
        //console.log(menu)
        res.render('partnerProduct', {
            Menu: menu,
        })
    }

    // [GET] /partner/order
    async getOrder(req, res) {
        if(!req.session.user) {
            return res.redirect('/partner/login')
        }
        if((Object.keys(req.query).length !== 0)){
          
        }
        const orders = await partnerM.getAllOrders(req.session.user.userId)
        for(var i = 0; i< orders.length; i++) {
            orders[i].Date_Order =  (orders[i].Date_Order.getDate()) + "/" + (orders[i].Date_Order.getMonth()+1) + "/" + (orders[i].Date_Order.getFullYear());
        }
        console.log(orders)
        res.render('partnerOrder', {
            orders: orders,
        })
    }

    // [GET] /partner/branch
    async getBranch(req, res) {
        if(!req.session.user) {
            return res.redirect('/partner/login')
        }
        if((Object.keys(req.query).length !== 0)){
            await partnerM.sp_Status_Branches(req.session.user.userId, req.query.ID_Branches, req.query.Status);
            await partnerM.sp_Branches_Time_Working(req.session.user.userId, req.query.ID_Branches, req.query.Time_Working);
            await partnerM.sp_change_Name(req.session.user.userId, req.query.ID_Branches, req.query.Name);
        }
        const branches = await partnerM.getBranchesByIdOwner(req.session.user.userId)
        for(var i = 0; i< branches.length; i++) {
            branches[i].Time_Working =  (branches[i].Time_Working.getHours()-8) + ":" + branches[i].Time_Working.getMinutes();
        }
        res.render('partnerBranch', {
            Branches: branches,
        })
    }

    // [GET] /partner/bill
    getBill(req, res) {
        res.render('partnerBill')
    }

    // [GET] /partner/signup
    async signUp(req, res) {
        if((Object.keys(req.query).length !== 0)){
            const u = req.query
            await partnerM.sp_Regis_Partner(u.Name_Branches, u.Deputy, u.City, u.District, u.Total_Branches, 
                u.Total_OrderPerDays, u.Cuisine, u.Address, u.Phone, u.Email)
            res.redirect('/registersuccessfully')
        }
        res.render('partnerSignUp');
    }

}

module.exports = new PartnerController;
