const Carro = require("../models/carro.js");

// Crear y guardar un nuevo carro
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío."
    });
    return;
  }
  const carro = new Carro({
    modelo: req.body.modelo,
    cilindros: req.body.cilindros,
    potencia: req.body.potencia,
    color: req.body.color,
    precio: req.body.precio,
    motor: req.body.motor,
    foto: req.body.foto
  });

  Carro.create(carro, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocurrió un error al crear el carro."
      });
    else res.send(data);
  });
};

// Recuperar todos los carros de la base de datos
exports.findAll = (req, res) => {
  Carro.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocurrió un error al recuperar los carros."
      });
    else res.send(data);
  });
};

// Buscar un solo carro con un id
exports.findOne = (req, res) => {
  Carro.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Carro no encontrado con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: `Error recuperando el carro con id ${req.params.id}.`
        });
      }
    } else res.send(data);
  });
};

// Actualizar un carro identificado por el id en la solicitud
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío."
    });
    return;
  }

  Carro.updateById(req.params.id, new Carro(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Carro no encontrado con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: `Error actualizando el carro con id ${req.params.id}.`
        });
      }
    } else res.send(data);
  });
};

// Eliminar un carro con el id especificado en la solicitud
exports.delete = (req, res) => {
  Carro.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Carro no encontrado con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: `No se pudo eliminar el carro con id ${req.params.id}.`
        });
      }
    } else res.send({ message: `Carro eliminado exitosamente.` });
  });
};

// Eliminar todos los carros de la base de datos
exports.deleteAll = (req, res) => {
  Carro.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocurrió un error al eliminar todos los carros."
      });
    else res.send({ message: `Todos los carros fueron eliminados exitosamente.` });
  });
};
