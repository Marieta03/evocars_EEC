const express = require('express');
const router = express.Router();
const permiso = require('../controllers/permiso.controller');

// Crear un nuevo permiso
router.post('/', permiso.create);

// Obtener todos los permisos
router.get('/', permiso.findAll);

// Obtener un permiso por su id
router.get('/:id', permiso.findOne);

// Actualizar un permiso por su id
router.put('/:id', permiso.update);

// Borrar un permiso por su id
router.delete('/:id', permiso.delete);

// Borrar todos los permisos
router.delete('/', permiso.deleteAll);

module.exports = router;