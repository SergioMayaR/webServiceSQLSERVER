//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
let usersRoute = require('./routes/users');

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CORS Middleware
app.use(function(req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Respuesta de la ruta padre
app.get('/', function(req, res) {
    //Genera la respuesta que se dara
    respuesta = {
        error: true,
        codigo: 200,
        mensaje: 'Punto de inicio'
    };
    res.send(respuesta); //Envia una respuesta
});
app.use('/api/empleoyes', usersRoute);

//Setting up server
var server = app.listen(process.env.PORT || 3000, function() {
    var port = server.address().port;
    console.log("Aplicación corriendo en puerto: ", port);
});