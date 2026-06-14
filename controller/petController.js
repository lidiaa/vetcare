const { Pet } = require('../model/modelos');

async function criarPet(req, res) {
  try {
    const { nome, especie } = req.body;

    if (!nome || !especie) {
      return res.status(400).json({ mensagem: 'Nome e espécie são obrigatórios' });
    }

    const pet = await Pet.create({ nome, especie });

    return res.status(201).json(pet);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao cadastrar pet', error });
  }
}


async function listarPets(req, res) {
  try {
    const { especie } = req.query;

    let where = {};

    if (especie) {
      where.especie = especie;
    }

    const pets = await Pet.findAll({ where });

    res.set('Cache-Control', 'public, max-age=15552000, must-revalidate'); //Tempo de validade do cache de 6 meses

    return res.status(200).json(pets);

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao listar pets', error });
  }
}

module.exports = {criarPet, listarPets};