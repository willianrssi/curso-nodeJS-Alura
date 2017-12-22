var http = require('http');

var produto = {
    titulo:'',
    descricao:'Usando json para cadastrar um produto',
    preco: 100
};

var config = {
    hostname: 'localhost',
    port: '80',
    path: '/produtos',
    method:'post',
    headers: {
        'Accept':'application/json',
        'Content-type' : 'application/json'
    }   
};

var client = http.request(config,function(res){
    console.log(res.statusCode);
    res.on('data',function(body){
        console.log('Corpo:'+body);
    });
});



client.end(JSON.stringify(produto));