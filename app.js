//carrega a função exportada através do módulo  
var app = require("./config/server.js");
var http =  require('http').Server(app);
var io = require('socket.io').listen(http);

app.set('io',io);

http.listen(3000, function(){
    console.log("Servidor Rodando");
});







