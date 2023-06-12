const clientRouter = require('./client');
const partnerRouter = require('./partner');
const driverRouter = require('./driver');
const employeeRouter = require('./employee');
const adminRouter = require('./admin')
const homeRouter = require('./home');

function route(app) {

    app.use('/client', clientRouter);
    app.use('/partner', partnerRouter);
    app.use('/driver', driverRouter);
    app.use('/employee', employeeRouter);
    app.use('/admin', adminRouter);
    app.use('/', homeRouter);

};

module.exports = route;
