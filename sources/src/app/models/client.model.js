const mssql = require('mssql');
// const SQL_DRIVER = 'SQL Server';
// const SQL_SERVER = 'KHOI';
// const SQL_DATABASE = 'ABCDElivery';
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
    test: async () => {
        try {
            await pool.connect();
            var ouput = 'Login';
            const result = await pool.request().query(`select * from ${ouput}`)
            const test = result.recordset;
            console.log('Connect database successfully!');
        } catch (error) {
            console.log(error)
        }
    },
    getAllAccount: async () => {
        try {
            await pool.connect();
            const result = await pool.request().query(`SELECT * FROM Login`)
            const test = result.recordset;
            return test;
        } catch (error) {
            console.log(error)
        }
    },
    addAccount: async (acc, info) => {
        try {
            console.log(info)
            await pool.connect();
            const result = await pool.request().query(`
            insert into Login (ID_Log, UserID, Username, Password, Role) 
            values ('${acc.id}', '${acc.userId}', '${acc.username}', '${acc.password}', N'Customer')
            `)
            const result2 = await pool.request().query(`
            sp_Add_Customer '${acc.userId}', N'${info.fullName}', '${info.username}', '${info.phone}', '${info.address}'
            `)
            const test = result.recordset;
            console.log(result.recordset);
        } catch (error) {
            console.log(error)
        }
    },
    getAccountByUsername: async username => {
        try {
            await pool.connect();
            const result = await pool.request().query(`
            SELECT * FROM Login WHERE Username = '${username}'
            `)
            return result.recordset;
        } catch (error) {
            console.log(error)
        } 
    },
    
    getAllBranches: async () => {
        try {
            await pool.connect();
            const result = await pool.request().query(`
            SELECT * FROM Branches
            `)
            return result.recordset;
        } catch (error) {
            console.log(error)
        } 
    },
    getBranchesById: async (idBranches) => {
        try {
            await pool.connect();
            const result = await pool.request().query(`
            SELECT * FROM Branches WHERE ID_Branches = '${idBranches}'
            `)
            return result.recordset;
        } catch (error) {
            console.log(error)
        } 
    },
    getMenuByIdBranches: async (idBranches) => {
        try {
            await pool.connect();
            const result = await pool.request().query(`
            SELECT * FROM Menu WHERE ID_Branches = '${idBranches}'
            `)
            return result.recordset;
        } catch (error) {
            console.log(error)
        } 
    },
    addFoodsOrder: async (idOrder,idMenu, foodName, quantity, opt) => {
        try {
            await pool.connect();
            const result = await pool.request().query(`
            insert into Food_Order 
            values('${idOrder}','${idMenu}',N'${foodName}', ${quantity}, N'${opt}')
            `)
            const test = result.recordset;
        } catch (error) {
            console.log(error)
        }
    },
    addNewOrder: async (idOrder) => {
        try {
            await pool.connect();
            const result = await pool.request().query(`
            insert into Orders(ID_Order) 
            values('${idOrder}')
            `)
        } catch (error) {
            console.log(error)
        }
    },
    update_Order: async (Method_Payment, Delivery_Address, Product_fees,
        ID_Customer, ID_Branches, ID_Order) => {
        try {
            await pool.connect();
            const result = await pool.request().query(`
            UPDATE Orders
            SET Method_Payment = N'${Method_Payment}',  Delivery_Address = N'${Delivery_Address}', Product_fees = ${Product_fees},  
            Status = N'Chờ nhận', Date_Order = GETDATE(), ID_Customer = '${ID_Customer}', ID_Branches = '${ID_Branches}' 
            WHERE ID_Order = '${ID_Order}'
            `)
        } catch (error) {
            console.log(error)
        }
    },
    getFood_Of_Order: async (idOrder) => {
        try {
            await pool.connect();
            const result = await pool.request().query(`
            select m.Food_Name, Quantity, Price,  Optional from Food_Order f 
            join Menu m on m.Food_Name = f.Food_Name
            where ID_Order = '${idOrder}' 
            `)
            return result.recordset;
        } catch (error) {
            console.log(error)
        }
    },
    getOrderByIdCustomer: async (ID_Customer) => {
        try {
            await pool.connect();
            const result = await pool.request().query(`
            select od.Status, od.Product_fees, br.Name, od.ID_Order
            from Orders od
            join Branches br on br.ID_Branches = od.ID_Branches
            where ID_Customer = '${ID_Customer}'
            `)
            return result.recordset;
        } catch (error) {
            console.log(error)
        }
    },
    sp_Cancel_Order: async (ID_Order) => {
        try {
            await pool.connect();
            const result = await pool.request().query(`
            sp_Cancel_Order '${ID_Order}'
            `)
            return result.recordset;
        } catch (error) {
            console.log(error)
        }
    },




}