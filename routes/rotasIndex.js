var express = require('express');
var router = express.Router();

var usuarioRoutes = require('./usuarioRoutes');
var petRoutes = require('./petRoutes');
var atendimentoRoutes = require('./rotasAtendimentos');

router.use('/usuarios', usuarioRoutes);
router.use('/pets', petRoutes);
router.use('/atendimentos', atendimentoRoutes);


/**
 * #swagger.tags = ['Index']
 * #swagger.summary = 'Informações básicas do serviço'
 * #swagger.description = 'API VetCare para gerenciamento de pets e atendimentos veterinários com autenticação JWT'
 */


router.get('/', function (req, res) {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache'); //INDEX SEM CACHE
  res.set('Expires', '0');

  res.json({
    nome: 'VetCare API',
    descricao: "API REST veterinária",
    versao: '1.0.0',
    status: 'online',
    tecnologias: ["Node.js", "Express", "Sequelize", "JWT", "Swagger"],
    timestamp: new Date(),
    documentacao: "http://localhost:3000/api-docs"
  });
});


module.exports = router;