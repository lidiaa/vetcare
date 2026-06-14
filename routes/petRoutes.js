var express = require('express');
var router = express.Router();

var petController = require('../controller/petController');
var autenticar = require('../middlewares/controleUsuario');
var autorizar = require('../middlewares/controlePerfil');

router.post('/',
  /* #swagger.tags = ['Pets']
     #swagger.summary = 'Cadastra um novo pet'
     #swagger.security = [{ bearerAuth: [] }]
     #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { $ref: '#/definitions/NovoPet' }
     }
     #swagger.responses[201] = {
        schema: { $ref: '#/definitions/Pet' }
     }
  */
  autenticar,
  autorizar(['admin']),
  petController.criarPet
);

router.get('/',
  /* #swagger.tags = ['Pets']
     #swagger.summary = 'Lista todos os pets (com filtro por espécie)'
     #swagger.security = [{ bearerAuth: [] }]
     #swagger.parameters['especie'] = {
        in: 'query',
        type: 'string',
        required: false,
        description: 'Filtrar pets por espécie'
     }
     #swagger.responses[200] = {
        schema: { type: 'array', items: { $ref: '#/definitions/Pet' } }
     }
  */
  autenticar,
  autorizar(['recepcao']),
  petController.listarPets
);

module.exports = router;