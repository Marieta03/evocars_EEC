const Compra = require('../models/compra.js');

// Crear y guardar una nueva compra
exports.create = (req, res) => {
  console.log(req);
  // Validar la solicitud
  if (!req.body.id_usuarios || !req.body.id_carro || !req.body.pago || !req.body.fecha_compra || !req.body.estado) {
    res.status(400).send({ message: "¡El contenido no puede estar vacío!" });
    return;
  }

  // Crear una compra
  const compra = new Compra({
    id_usuarios: req.body.id_usuarios,
    id_carro: req.body.id_carro,
    pago: req.body.pago,
    fecha_compra: req.body.fecha_compra,
    estado: req.body.estado
  });

  // Guardar la compra en la base de datos
  Compra.create(compra, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "¡Se produjo un error al crear la compra!"
      });
    else res.send(data);
  });
};

// Obtener todas las compras de la base de datos
exports.findAll = (req, res) => {
  Compra.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "¡Se produjo un error al recuperar las compras!"
      });
    else res.send(data);
  });
};

// Obtener una compra por su id
exports.findOne = (req, res) => {
  Compra.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `¡Compra no encontrada con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "¡Error al recuperar la compra con id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Actualizar una compra por su id
exports.update = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
    return;
  }

  Compra.updateById(
    req.params.id,
    new Compra(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `¡Compra no encontrada con id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "¡Error al actualizar la compra con id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Borrar una compra por su id
exports.delete = (req, res) => {
  Compra.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `¡Compra no encontrada con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "¡No se pudo eliminar la compra con id " + req.params.id
        });
      }
    } else res.send({ message: `¡Compra eliminada correctamente!` });
  });
};

// Borrar todas las compras de la base de datos
exports.deleteAll = (req, res) => {
  Compra.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "¡Se produjo un error al eliminar todas las compras!"
      });
    else res.send({ message: `¡Todas las compras fueron eliminadas correctamente!` });
  });
};
