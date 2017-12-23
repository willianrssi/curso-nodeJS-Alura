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
        var connection;

        return connection = mysql.createConnection({
            host     : process.env.OPENSHIFT_MYSQL_DB_HOST,
            user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME,
            password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
            port     : process.env.OPENSHIFT_MYSQL_DB_PORT,
            database : process.env.OPENSHIFT_APP_NAME
           });
    }



}
//wrapper
module.exports = function () {
    return createDBConnection;
}
