//carrega a função exportada através do módulo  
var app = require("./config/server.js");
var http =  require('http').Server(app);
var io = require('socket.io').listen(http);

app.set('io',io);

var porta = process.env.PORT || 3000;

http.listen(porta, function(){
    console.log("Servidor Rodando");
});







