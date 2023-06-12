const fs = require('fs');
const CryptoJS = require('crypto-js');
const hashLength = 64;
const clientM = require('../models/client.model');
const session = require('express-session');
class ClientController {
    
    // [GET] /client
    async index(req, res, next) {
        if(!req.session.user) {
            return res.redirect('/client/login')
        }
       //Xóa order
        if((Object.keys(req.query).length !== 0)) {
            if(req.query.type === 'delete') {
                await clientM.sp_Cancel_Order(req.query.ID_Order)
            }
        }
        const allBranches = await clientM.getAllBranches();
        const allOrder = await clientM.getOrderByIdCustomer(req.session.user.userId);
        res.render('clientHome', {
            Logout:'',
            Branches: allBranches,
            allOrder: allOrder,
        });
    }


    // [GET] /client/restaurant/:slug
    async getRestaurant(req, res) {
        if(!req.session.user) {
            return res.redirect('/client/login')
        }
        const menu = await clientM.getMenuByIdBranches(req.params.idBranches);
         ////////////////////////////////
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        const length = 5;
        // ///////////////////////////////
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
        const branches = await clientM.getBranchesById(req.params.idBranches);
        //Khi chọn nhà hàng, render ra menu ứng với nhà hàng đó
        //Query rỗng - tức chưa chọn món
        if((Object.keys(req.query).length === 0))
        {
            //Đồng thời tạo một cái Orders mới trước khi render ra menu
            var createID = "";
            for (var i = 0; i < 4; i++) {
                createID += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            //Tạo mới 1 orders 
            await clientM.addNewOrder(createID);
            //Lưu id_Orders vào session
            req.session.idOrders = createID;
            req.session.idBranches = req.params.idBranches
            console.log(req.session.idOrders);
            //Chỉ có id order, cart rỗng
            res.render('clientRestaurant',{
                Logout: '',
                Menu: menu,
                Branches: branches[0],
            })
        }
        else {
            //Có query - thêm món vào order_food tương ứng với orderID vừa tạo
            //Lấy danh sách những món trong orders_Food --> card
            await clientM.addFoodsOrder(req.session.idOrders, menu[0].ID_Menu, req.query.Food_name, req.query.FoodsQuantity, req.query.FoodsOptions)
            const foodOrder = await clientM.getFood_Of_Order(req.session.idOrders);
            setTimeout(()=>{
                res.render('clientRestaurant',{
                    Logout: '',
                    Menu: menu,
                    Branches: branches[0],
                    Card: foodOrder,
                })
            },500)
           
        }
       
    }

    // [GET] /client/restaurant/payment
    async getPayment(req, res) {
        if(!req.session.user) {
            return res.redirect('/client/login')
        }
        const foodOrder = await clientM.getFood_Of_Order(req.session.idOrders);
        let sumMoney = 0;
        for(var i = 0 ; i< foodOrder.length; i++) {
            sumMoney = sumMoney + foodOrder[i].Price
        }
        //Khi nhận req thanh toán
        if((Object.keys(req.query).length !== 0))
        {
            const r = req.query
            const s = req.session
            await clientM.update_Order(r.Method_Payment, r.Delivery_Address, sumMoney,
                s.user.userId, s.idBranches, s.idOrders)
            return res.redirect('/client')
        }
        res.render('clientPayment', {
            Logout: '',
            foodOrder: foodOrder,
            sumMoney: sumMoney
        })
    } 




}

module.exports = new ClientController;
