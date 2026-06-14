var express = require('express');
var router = express.Router();

var atendimentoController = require('../controller/atendimentoController');
var autenticar = require('../middlewares/controleUsuario');
var autorizar = require('../middlewares/controlePerfil');

router.post('/',
  /* #swagger.tags = ['Atendimentos']
     #swagger.summary = 'Cria um novo atendimento'
     #swagger.security = [{ bearerAuth: [] }]
     #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { $ref: '#/definitions/NovoAtendimento' }
     }
     #swagger.responses[201] = {
        schema: { $ref: '#/definitions/Atendimento' }
     }
  */
  autenticar,
  autorizar(['recepcao']),
  atendimentoController.criarAtendimento
);

router.get('/:id',
  /* #swagger.tags = ['Atendimentos']
     #swagger.summary = 'Busca atendimento por ID'
     #swagger.security = [{ bearerAuth: [] }]
     #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        type: 'integer',
        description: 'ID do atendimento'
     }
     #swagger.responses[200] = {
        schema: { $ref: '#/definitions/Atendimento' }
     }
  */
  autenticar,
  autorizar(['recepcao']),
  atendimentoController.buscarPorId
);

router.patch('/:id/iniciar',
  /* #swagger.tags = ['Atendimentos']
     #swagger.summary = 'Inicia atendimento'
     #swagger.security = [{ bearerAuth: [] }]
     #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        type: 'integer',
        description: 'ID do atendimento'
     }
     #swagger.responses[200] = {
        schema: { $ref: '#/definitions/Atendimento' }
     }
  */
  autenticar,
  autorizar(['veterinario']),
  atendimentoController.iniciarAtendimento
);

router.patch('/:id/finalizar',
  /* #swagger.tags = ['Atendimentos']
     #swagger.summary = 'Finaliza atendimento'
     #swagger.security = [{ bearerAuth: [] }]
     #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        type: 'integer',
        description: 'ID do atendimento'
     }
     #swagger.responses[200] = {
        schema: { $ref: '#/definitions/Atendimento' }
     }
  */
  autenticar,
  autorizar(['veterinario']),
  atendimentoController.finalizarAtendimento
);

module.exports = router;