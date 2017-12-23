module.exports = function (app) {
    app.get('/', function (req, res) {

        var connection = app.app.infra.dbConnection();
        var produtosDAO = new app.app.infra.ProdutosDAO(connection);
        produtosDAO.lista(function (erros, resultados) {
            if (erros) {
                console.log(erros);
                return;
            }
            res.format({
                html: function () {
                    res.render("home/index", { livros: resultados });
                },
                json: function () {
                    res.json(resultados);
                }
            })



        });

        connection.end();

    });
}