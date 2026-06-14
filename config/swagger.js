var swaggerAutogen = require('swagger-autogen')();

var doc = {
  info: {
    title: 'VetCare API',
    description: 'API REST para gerenciamento de pets e atendimentos veterinários com autenticação JWT',
    version: '1.0.0'
  },

  host: 'localhost:3000',
  schemes: ['http'],

  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'JWT no formato: Bearer <token>'
    }
  },

  tags: [
    { name: 'Index' },
    { name: 'Usuarios' },
    { name: 'Pets' },
    { name: 'Atendimentos' }
  ],

  definitions: {
    NovoUsuario: {
      nome: "string",
      usuario: "string",
      senha: "string",
      perfil: "string"
    },

    UsuarioCriado: {
      id: "number",
      nome: "string",
      usuario: "string",
      perfil: "string"
    },

    LoginUsuario: {
      usuario: "string",
      senha: "string"
    },

    LoginResposta: {
      token: "string"
    },

    NovoPet: {
      nome: "string",
      especie: "string"
    },

    Pet: {
      id: "number",
      nome: "string",
      especie: "string"
    },

    NovoAtendimento: {
      data_hora: "string",
      motivo: "string",
      pet_id: "number",
      usuario_id: "number"
    },

    Atendimento: {
      id: "number",
      data_hora: "string",
      motivo: "string",
      status: "string",
      pet_id: "number",
      usuario_id: "number"
    }
  }
};

var outputFile = './config/swagger_output.json';
var routes = ['./app.js'];

swaggerAutogen(outputFile, routes, doc);