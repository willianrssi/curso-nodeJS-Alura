//carrega a função exportada através do módulo  
var app = require("./config/server.js");
var http =  require('http').Server(app);
var io = require('socket.io').listen(http);

app.set('io',io);

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

http.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);






