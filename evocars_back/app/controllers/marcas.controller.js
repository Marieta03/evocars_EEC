const Marca = require('../models/marca');

// Crear y guardar una nueva marca
exports.create = (req, res) => {
  // Validar la solicitud
  if (!req.body.marca) {
    res.status(400).send({ message: "El nombre de la marca no puede estar vacío." });
    return;
  }

  // Crear una marca
  const marca = new Marca({
    marca: req.body.marca,
  });

  // Guardar la marca en la base de datos
  Marca.create(marca, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocurrió un error al crear la marca."
      });
    else res.send(data);
  });
};

// Obtener todas las marcas de la base de datos
exports.findAll = (req, res) => {
  Marca.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocurrió un error al recuperar las marcas."
      });
    else res.send(data);
  });
};

// Obtener una marca por su ID desde la base de datos
exports.findOne = (req, res) => {
  Marca.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Marca no encontrada con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: `Error al recuperar la marca con id ${req.params.id}.`
        });
      }
    } else res.send(data);
  });
};

// Actualizar una marca por su ID en la base de datos
exports.update = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({ message: "Los datos a actualizar no pueden estar vacíos." });
    return;
  }

  Marca.updateById(req.params.id, new Marca(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Marca no encontrada con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: `Error actualizando la marca con id ${req.params.id}.`
        });
      }
    } else res.send(data);
  });
};

// Eliminar una marca por su ID de la base de datos
exports.delete = (req, res) => {
  Marca.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Marca no encontrada con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: `No se pudo eliminar la marca con id ${req.params.id}.`
        });
      }
    } else res.send({ message: `Marca eliminada exitosamente.` });
  });
};

// Eliminar todas las marcas de la base de datos
exports.deleteAll = (req, res) => {
  Marca.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocurrió un error al eliminar todas las marcas."
      });
    else res.send({ message: `Todas las marcas fueron eliminadas exitosamente.` });
  });
};
