const mssql = require('mssql');
// const SQL_DRIVER = 'SQL Server';
// const SQL_SERVER = 'KHOI';
// const SQL_DATABASE = 'DeliverySystem';
// const SQL_UID = 'sa';
// const SQL_PWD = '123';
const conn = require('../../configs/connectStr')

const config = {
    driver: conn.SQL_DRIVER,
    server: conn.SQL_SERVER,
    database: conn.SQL_DATABASE,
    user: conn.SQL_UID,
    password: conn.SQL_PWD,
    options: {
        encrypt: false,
        enableArithAbort: false,
    },
    connectionTimeout: 300000,
    requestTimeout: 300000,
    pool: {
        idleTimeoutMillis: 300000,
        max: 100
    }
};
const pool = new mssql.ConnectionPool(config);


module.exports = {
    
}