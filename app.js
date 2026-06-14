var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var swaggerUi = require('swagger-ui-express');
var swaggerFile = require('./config/swagger_output.json');

// importacao de pacotes
var rotasIndex = require('./routes/rotasIndex');
var petRoutes = require('./routes/petRoutes');
var usuarioRoutes = require('./routes/usuarioRoutes');
var rotasAtendimentos = require('./routes/rotasAtendimentos');

var passport = require('./config/passport');
var helmetMiddleware = require('./config/helmet')


var app = express();

//middlewares - a ordem importa
app.use(logger('dev'));
var emProd = process.env.ENV === "prod";

// Helmet – Cabeçalhos de Segurança HTTP
// Deve ser registrado antes de qualquer rota ou middleware que envie respostas
app.use(helmetMiddleware(emProd));

app.disable('x-powered-by');

require('./model/modelos');

//middlewares do express
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Inicializa o Passport – deve ser feito antes das rotas protegidas.
app.use(passport.initialize());

// rota para a documentação Swagger, antes das demais rotas da API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));


//redirecionamento das rotas
app.use('/', rotasIndex);
app.use('/pets', petRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/atendimentos', rotasAtendimentos);






//exportação
module.exports = app;
