var express = require('express');
var router = express.Router();

var usuarioController = require('../controller/usuarioController');

router.post('/cadastro',
  /* #swagger.tags = ['Usuarios']
     #swagger.summary = 'Cadastra um novo usuário'
     #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { $ref: '#/definitions/NovoUsuario' }
     }
     #swagger.responses[201] = {
        schema: { $ref: '#/definitions/UsuarioCriado' }
     }
  */
  usuarioController.cadastrar
);

router.post('/login',
  /* #swagger.tags = ['Usuarios']
     #swagger.summary = 'Login do usuário'
     #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { $ref: '#/definitions/LoginUsuario' }
     }
     #swagger.responses[200] = {
        schema: { $ref: '#/definitions/LoginResposta' }
     }
  */
  usuarioController.login
);

module.exports = router;