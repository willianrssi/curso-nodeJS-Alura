
var express = require('../config/server.js');
var supertest = require('supertest')(express);

// usa o modulo database - cleaner
var DatabaseCleaner = require('database-cleaner');
var databaseCleaner = new DatabaseCleaner("mysql"); 



describe('#ProdutosController', function () {

    beforeEach(function(done){

        var connection = express.app.infra.dbConnection();
        connection.query('delete from produtos',function(err,result){
            if(!err){
                done();
            }
        })
    });
    
    afterEach(function(done){
        var connection = express.app.infra.dbConnection();
        
        // usa o modulo database - cleaner
        databaseCleaner.clean(connection,function(){
            done();
        });
    })

    it('listagem json', function (done) {
        supertest.get('/produtos')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);

    });

    it('#Cadastrar um produto inválido', function (done) {
        supertest.post('/produtos')
            .send({titulo:"", descricao:"teste"})
            .expect(400, done);
    });

    it('#Cadastrar um produto', function (done) {
        supertest.post('/produtos')
            .send({titulo:"Teste Mocha", descricao:"teste no mocha", preco:20})
            .expect(302, done);
    });

});
