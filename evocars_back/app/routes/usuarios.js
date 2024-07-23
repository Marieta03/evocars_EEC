const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');
//const authController = require('../controllers/auth.controller'); // Controlador para autenticación

// Rutas CRUD para usuarios
router.post('/', usuariosController.create); // Crear un nuevo usuario
router.get('/', usuariosController.findAll); // Obtener todos los usuarios
router.get('/:id', usuariosController.findOne); // Obtener un usuario por su id
router.put('/:id', usuariosController.update); // Actualizar un usuario por su id
router.delete('/:id', usuariosController.delete); // Borrar un usuario por su id
router.delete('/', usuariosController.deleteAll); // Borrar todos los usuarios


module.exports = router;
