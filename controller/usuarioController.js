var Usuario = require('../model/usuarios');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

async function cadastrar(req, res) {
  try {
    var { nome, usuario, senha, perfil } = req.body;

    if (!nome || !usuario || !senha) {
      var erros = [];

      if (!nome) erros.push('Nome é obrigatório');
      if (!usuario) erros.push('Usuário é obrigatório');
      if (!senha) erros.push('Senha é obrigatória');

      return res.status(400).json({
        mensagem: 'Campos obrigatórios não informados',
        erros: erros
      });
    }

    if (senha.length < 6) {
      return res.status(400).json({ mensagem: 'Senha deve ter no mínimo 6 caracteres' });
    }

    var existe = await Usuario.findOne({ where: { usuario: usuario } });

    if (existe) {
      return res.status(400).json({ mensagem: 'Usuário já existe' });
    }

    var senha_hash = await bcrypt.hash(senha, 10);

    var novo = await Usuario.create({
      nome: nome,
      usuario: usuario,
      senha_hash: senha_hash,
      perfil: perfil || 'recepcao'
    });

    return res.status(201).json(novo);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao cadastrar usuário' });
  }
}


async function login(req, res) {
  try {
    var { usuario, senha } = req.body;

    if (!usuario || !senha) {
      return res.status(400).json({ mensagem: 'Usuário e senha obrigatórios' });
    }

    var user = await Usuario.findOne({ where: { usuario: usuario } });

    if (!user) {
      return res.status(401).json({ mensagem: 'Usuário ou senha inválidos' });
    }

    var senhaOk = await bcrypt.compare(senha, user.senha_hash);

    if (!senhaOk) {
      return res.status(401).json({ mensagem: 'Usuário ou senha inválidos' });
    }

    var token = jwt.sign(
      {
        id: user.id,
        usuario: user.usuario,
        perfil: user.perfil
      },
      process.env.SESSION_SECRET,
      { expiresIn: '8h' }
    );

    return res.status(200).json({
      token: token,
      usuario: {
        id: user.id,
        nome: user.nome,
        usuario: user.usuario,
        perfil: user.perfil
      }
    });
  } catch (error) {
     return res.status(500).json({ mensagem: 'Erro no login', error: error.message });
  }
}



module.exports = { cadastrar: cadastrar, login: login };