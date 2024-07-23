const express = require('express');
const router = express.Router();
const carros = require('../controllers/carros.controller');

// Crear un nuevo carro
router.post('/', carros.create);

// Obtener todos los carros
router.get('/', carros.findAll);

// Obtener un carro por su id
router.get('/:id', carros.findOne);

// Actualizar un carro por su id
router.put('/:id', carros.update);

// Borrar un carro por su id
router.delete('/:id', carros.delete);

// Borrar todos los carros
router.delete('/', carros.deleteAll);

module.exports = router;
