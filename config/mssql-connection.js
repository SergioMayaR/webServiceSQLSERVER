let sql = require('mssql');

const sqlconnection = new sql.ConnectionPool({
    user: 'Ptreesys',
    password: 'Ptree2021',
    server: 'DESKTOP-L35P213',
    database: 'test'
})

sqlconnection.connect(err => {
    if (err) {
        throw err
        console.log(err, "ee-eee")
    };
    console.log('Connection successfull');
});

module.exports = sqlconnection;