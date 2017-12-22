var mysql = require('mysql');


function createDBConnection(){
    
   /* if(!process.env.NODE_ENV){ 
        return mysql.createConnection({
            host:"localhost",
            user: "root",
            password:'root',
            database: 'casadocodigo_nodejs'
        });
    }
    */

   /* if(process.env.NODE_ENV == 'test'){ 
        return mysql.createConnection({
            host:"localhost",
            user: "root",
            password:'root',
            database: 'casadocodigo_nodejs_test'
        });
    } */

    if(process.env.NODE_ENV == 'production'){ 
        return mysql.createConnection({
            host:"us-cdbr-iron-east-05.cleardb.net",
            user: "b97a3fe9331a62",
            password:'c34820bd',
            database: 'heroku_8345c5c7c53e424'
        });
    }
        

    
}
//wrapper
module.exports = function(){
    return createDBConnection;
}
