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
    getBranchesByIdOwner: async (idOwner) => {
        try {
            await pool.connect();
            const result = await pool.request().query(`
            SELECT * FROM Branches WHERE ID_Owner = '${idOwner}'
            `)
            return result.recordset;
        } catch (error) {
            console.log(error)
        } 
    },
    getAllMenu: async (idOwner) => {
        try {
            await pool.connect();
            const result = await pool.request().query(`
            SELECT * 
            FROM Menu m
            JOIN Branches b ON b.ID_Branches = m.ID_Branches
            WHERE b.ID_Owner = '${idOwner}'
            `)
            return result.recordset;
        } catch (error) {
            console.log(error)
        } 
    },
    updateMenu: async (ID_Menu, Food_Name, Description, Price, status) => {
        try {
            await pool.connect();
            const result = await pool.request().query(`
            UPDATE Menu
            SET Description = N'${Description}', Price = ${Price}, status = N'${status}'
            WHERE ID_Menu = '${ID_Menu}' and Food_Name = N'${Food_Name}';
            `)
        } catch (error) {
            console.log(error)
        } 
    },
    deleteMenu: async (ID_Menu, Food_Name) => {
        try {
            await pool.connect();
            const result = await pool.request().query(`
            DELETE FROM Menu 
            WHERE ID_Menu = '${ID_Menu}' and Food_Name = N'${Food_Name}';
            `)
        } catch (error) {
            console.log(error)
        } 
    },

    sp_Status_Branches: async (ID_Person, ID_Branches, Status) => {
        try {
            await pool.connect();
            const result = await pool.request().query(`
            sp_Status_Branches '${ID_Person}', '${ID_Branches}', N'${Status}'
            `)
        } catch (error) {
            console.log(error)
        } 
    },
    sp_Branches_Time_Working: async (ID_Person, ID_Branches, Time) => {
        try {
            await pool.connect();
            const result = await pool.request().query(`
            sp_Branches_Time_Working '${ID_Person}', '${ID_Branches}', '${Time}'
            `)
        } catch (error) {
            console.log(error)
        } 
    },
    sp_change_Name: async (ID_Person, ID_Branches, Name) => {
        try {
            await pool.connect();
            const result = await pool.request().query(`
            sp_change_Name '${ID_Person}', '${ID_Branches}', N'${Name}'
            `)
        } catch (error) {
            console.log(error)
        } 
    },
    sp_Regis_Partner: async (Name_Branches, Deputy, City, District, Total_Branches, 
        Total_OrderPerDays, Cuisine, Address, Phone, Email) => {
        try {
            await pool.connect();
            const result = await pool.request().query(`
            sp_Regis_Partner N'${Name_Branches}', N'${Deputy}', N'${City}', N'${District}', ${Total_Branches}, ${Total_OrderPerDays}, N'${Cuisine}', N'${Address}', '${Phone}', '${Email}'
            `)
        } catch (error) {
            console.log(error)
        } 
    },
    getAllOrders: async (idOwner) => {
        try {
            await pool.connect();
            const result = await pool.request().query(`
            select od.ID_Order, od.Method_Payment, od.Status, od.Date_Order, od.Delivery_Address, br.Name, od.Product_fees 
            from Orders od
            join Branches br on br.ID_Branches = od.ID_Branches
            where br.ID_Owner = '${idOwner}'
            `)
            return result.recordset;
        } catch (error) {
            console.log(error)
        } 
    },

}