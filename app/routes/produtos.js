
module.exports = function (app) {
    app.get("/produtos", function (req, res) {

        var connection = app.app.infra.dbConnection();
        var produtosDAO = new app.app.infra.ProdutosDAO(connection);
        produtosDAO.lista(function (erros, resultados) {
            if(erros){
                console.log(erros);
                return;
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

    app.get("/produtos/form",function(req, res) {
        res.render('produtos/form',{erros:{},produto:{}});
    });

    app.post("/produtos",function (req,res) {
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

        var connection = app.app.infra.dbConnection();
        var produtosDAO = new app.app.infra.ProdutosDAO(connection);

        produtosDAO.salva(produto,function(erros,resultados){
            res.redirect('/produtos');
        })
        
        
    })

}