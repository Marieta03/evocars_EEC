const express = require('express');
const router = express.Router();
const rol = require('../controllers/rol.controller');

// Crear un nuevo rol
router.post('/', rol.create);

// Obtener todos los roles
router.get('/', rol.findAll);

// Obtener un rol por su id
router.get('/:id', rol.findOne);

// Actualizar un rol por su id
router.put('/:id', rol.update);

// Borrar un rol por su id
router.delete('/:id', rol.delete);

// Borrar todos los roles
router.delete('/', rol.deleteAll);

module.exports = router;
