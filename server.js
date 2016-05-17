// AriAgroCentral
console.log("AriAgroCentral --------");
// Cargar los módulos básicos
var express = require('express');
var bodyParser = require("body-parser"); // proceso de los cuerpos de mensaje
var pjson = require('./package.json'); // read vrs and more information
var cors = require('cors'); // cross origin resopurce sharing management

var parametros_router = require('./lib/parametros/parametros_controller');
// express
var app = express();

// CORS management
app.options('*', cors()); // include before other routes
app.use(cors());


// leyendo la configuracion 
var config = require('./config/config.json');

// activar el procesador de los cuerpos de mensajes
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());


// servidor html estático
app.use(express.static(__dirname+"/public"));

//-------------------------------------------------------------
// RUTAS
//-------------------------------------------------------------

var router = express.Router();

// paso común de cualquier ruta
router.use(function(req, res, next){
	// aquí va el código común
	// ----------------------------
	// continúa la ejecución
	next();
});

// ruta raiz
router.get('/', function (req, res){
    var str = "AriAgroCentral VRS: " + pjson.version; //
    res.end(str);
});


//---------- Rutas relacionadas con parametros
app.use('/api/parametros', parametros_router);


// Registrar rutas base
app.use('/api', router);

// START SERVER
//==========================
app.listen(config.apiPort);
console.log("AriAgroCentral en puerto: ", config.apiPort);