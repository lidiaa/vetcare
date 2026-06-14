function autorizar(perfisPermitidos) {
  return function (req, res, next) {
    try {
      var usuario = req.user;

      if (!usuario) {
        return res.status(401).json({ mensagem: 'Usuário não autenticado' });
      }

      if (!perfisPermitidos.includes(usuario.perfil)) {
        return res.status(403).json({ mensagem: 'Acesso negado' });
      }

      next();

    } catch (error) {
      return res.status(500).json({ mensagem: 'Erro na autorização' });
    }
  };
}

module.exports = autorizar;