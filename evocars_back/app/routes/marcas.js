const express = require('express');
const router = express.Router();
const marcasController = require('../controllers/marcas.controller');

// Crear una nueva marca
router.post('/', marcasController.create);

// Obtener todas las marcas
router.get('/', marcasController.findAll);

// Obtener una marca por su ID
router.get('/:id', marcasController.findOne);

// Actualizar una marca por su ID
router.put('/:id', marcasController.update);

// Eliminar una marca por su ID
router.delete('/:id', marcasController.delete);

// Eliminar todas las marcas
router.delete('/', marcasController.deleteAll);

module.exports = router;