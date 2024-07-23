const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compra.controller'); // Asegúrate de que el nombre del controlador sea correcto

// Crear una nueva compra
router.post('/', compraController.create);

// Obtener todas las compras
router.get('/', compraController.findAll);

// Obtener una compra por su id
router.get('/:id', compraController.findOne);

// Actualizar una compra por su id
router.put('/:id', compraController.update);

// Borrar una compra por su id
router.delete('/:id', compraController.delete);

// Borrar todas las compras
router.delete('/', compraController.deleteAll);

module.exports = router;
