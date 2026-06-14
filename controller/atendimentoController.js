var { Atendimento, Pet, Usuario } = require('../model/modelos');

async function criarAtendimento(req, res) {
  try {
    var { data_hora, motivo, pet_id } = req.body;
    var usuario_id = req.user.id;

    if (!data_hora || !motivo || !pet_id || !usuario_id) {
      return res.status(400).json({ mensagem: 'Campos obrigatórios não informados' });
    }

    var pet = await Pet.findByPk(pet_id);
    if (!pet) {
      return res.status(404).json({ mensagem: 'Pet não encontrado' });
    }

    var usuario = await Usuario.findByPk(usuario_id);
    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    var atendimento = await Atendimento.create({
      data_hora,
      motivo,
      pet_id,
      usuario_id
    });

    return res.status(201).json(atendimento);

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao criar atendimento', error: error.message });
  }
}

async function buscarPorId(req, res) {
  try {
    var { id } = req.params;

    var atendimento = await Atendimento.findByPk(id, {
        attributes: [
            'id',
            'data_hora',
            'motivo',
            'status',
            'pet_id',
            'usuario_id',
            'criada_em',
            'atualizada_em'
        ],
        include: [
            {
            model: Pet,
            attributes: ['id', 'nome', 'especie']
            }
        ],
        raw: true,
        nest: true
        });

    if (!atendimento) {
      return res.status(404).json({ mensagem: 'Atendimento não encontrado' });
    }

    res.set('Cache-Control', 'private, max-age=86400, must-revalidate');

    return res.status(200).json(atendimento);

  } catch (error) {
    return res.status(500).json({
      mensagem: 'Erro ao buscar atendimento',
      error: error.message
    });
  }
}

async function iniciarAtendimento(req, res) {
  try {
    var { id } = req.params;

    var atendimento = await Atendimento.findByPk(id);

    if (!atendimento) {
      return res.status(404).json({ mensagem: 'Atendimento não encontrado' });
    }

    atendimento.status = 'em_atendimento';
    await atendimento.save();

    return res.status(200).json(atendimento);

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao iniciar atendimento', error: error.message });
  }
}

async function finalizarAtendimento(req, res) {
  try {
    var { id } = req.params;

    var atendimento = await Atendimento.findByPk(id);

    if (!atendimento) {
      return res.status(404).json({ mensagem: 'Atendimento não encontrado' });
    }

    atendimento.status = 'finalizado';
    await atendimento.save();

    return res.status(200).json(atendimento);

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao finalizar atendimento', error: error.message });
  }
}

module.exports = {
  criarAtendimento,
  buscarPorId,
  iniciarAtendimento,
  finalizarAtendimento
};