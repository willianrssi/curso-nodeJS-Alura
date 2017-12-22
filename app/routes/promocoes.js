module.exports = function(application){
    application.get('/promocoes',function(req,res){
        var connection = application.app.infra.dbConnection();
        var ProdutosDAO = new application.app.infra.ProdutosDAO(connection);
        ProdutosDAO.lista(function(erros,resultados){
            if(!erros){
                res.render('promocoes/promocoes.ejs',{lista:resultados});
            }
        });
    });

    application.post("/promocoes",function(req,res){
        var promocao = req.body;
        console.log(promocao);
        application.get('io').emit('novaPromocao',promocao);
        res.redirect('promocoes');
    });
}