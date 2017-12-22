module.exports = function (application) {
    application.get('/', function (req, res) {

        var connection = application.app.infra.dbConnection();
        var produtosDAO = new application.app.infra.ProdutosDAO(connection);
        produtosDAO.lista(function (erros, resultados) {
            if (erros) {
                return next(erros);
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