var mysql = require('mysql');


function createDBConnection() {

    if (!process.env.NODE_ENV) {
        return mysql.createConnection({
            host: "localhost",
            user: "root",
            password: 'root',
            database: 'casadocodigo_nodejs'
        });
    }

    if (process.env.NODE_ENV == 'test') {
        return mysql.createConnection({
            host: "localhost",
            user: "root",
            password: 'root',
            database: 'casadocodigo_nodejs_test'
        });
    }

    if (process.env.NODE_ENV == 'production') {
        return mysql.createConnection({
            host: "mysql://mysql:3306/",
            user: "userAI4",
            password: 'r7IMR86EwjNtjMeN',
            database: 'casadocodigo_nodejs'
        });
    }



}
//wrapper
module.exports = function () {
    return createDBConnection;
}
