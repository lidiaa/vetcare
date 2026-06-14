var jwt = require('jsonwebtoken');

function autenticar(req, res, next) {
  try {
    var authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ mensagem: 'Token não fornecido' });
    }

    var token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ mensagem: 'Token inválido' });
    }

    var decoded = jwt.verify(token, process.env.SESSION_SECRET);

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({ mensagem: 'Token inválido ou expirado' });
  }
}

module.exports = autenticar;