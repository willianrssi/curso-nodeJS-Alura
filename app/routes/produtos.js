
module.exports = function (application) {
    application.get("/produtos", function (req, res,next) {

        var connection = application.app.infra.dbConnection();
        var produtosDAO = new application.app.infra.ProdutosDAO(connection);
        produtosDAO.lista(function (erros, resultados) {
            if(erros){
                return next(erros);
            }
             res.format({
                 html : function(){
                    res.render("produtos/lista", { lista: resultados });
                 },
                 json: function(){
                    res.json(resultados);
                 }
             })

           

        });

        connection.end();

    });

    application.get("/produtos/form",function(req, res) {
        res.render('produtos/form',{erros:{},produto:{}});
    });

    application.post("/produtos",function (req,res) {
        var produto = req.body;

        //valida do dados do produto

        req.assert('titulo','O título é obrigatório').notEmpty();
        req.assert('preco','O preço deve estar em um formato válido').isFloat();

        var erros = req.validationErrors();

        if(erros){
            res.format({
                html : function(){
                    res.status(400).render('produtos/form',{erros:erros,produto:produto});
                },
                json: function(){
                   res.status(400).json(erros);
                }
            })
            
            return;
        }

        var connection = application.app.infra.dbConnection();
        var produtosDAO = new application.app.infra.ProdutosDAO(connection);

        produtosDAO.salva(produto,function(erros,resultados){
            res.redirect('/produtos');
        })
        
        
    })

}