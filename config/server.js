// carrega módulo do express
var express = require("express");


/* importar o módulo do consign */
var consign = require('consign');

// importa o módulo do express validator

var expressValidator = require('express-validator');

/* importar o módulo do body-parser */
var bodyParser = require('body-parser');


//carrega o objeto do express   
var app = express();

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));

/* configurar o middleware body-parser  a receber JSON */

app.use(bodyParser.json());

//configura o middleware do express validator

app.use(expressValidator());

app.use(express.static('./app/public'));

//seta a view engine como sendo ejs
app.set('view engine','ejs');

//seta a pasta das Views
app.set('views','./app/views')


//usa consign para carregar as rotas, modulos e db
consign()
    .include('app/routes')
    .then('app/infra')
    .into(app);

app.use(function(req,res,next){
    res.status(404).render('erros/404');
})


app.use(function(error,req,res,next){
    if(process.env.NODE_ENV == 'production') {
        res.status(500).render('erros/500');
        return;
    }
    next(error);

});

//exporta a função do express 
module.exports = app;