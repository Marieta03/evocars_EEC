const Permiso = require('../models/permiso.js');

// Crear y guardar un nuevo permiso
exports.create = (req, res) => {
  // Validar la solicitud
  if (!req.body.nombre_permiso || !req.body.clave) {
    res.status(400).send({ message: "¡El contenido no puede estar vacío!" });
    return;
  }

  // Crear un permiso
  const permiso = new Permiso({
    nombre_permiso: req.body.nombre_permiso,
    clave: req.body.clave
  });

  // Guardar el permiso en la base de datos
  Permiso.create(permiso, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "¡Se produjo un error al crear el permiso!"
      });
    else res.send(data);
  });
};

// Obtener todos los permisos de la base de datos
exports.findAll = (req, res) => {
  Permiso.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "¡Se produjo un error al recuperar los permisos!"
      });
    else res.send(data);
  });
};

// Obtener un permiso por su id
exports.findOne = (req, res) => {
  Permiso.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `¡Permiso no encontrado con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "¡Error al recuperar el permiso con id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Actualizar un permiso por su id
exports.update = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
    return;
  }

  Permiso.updateById(
    req.params.id,
    new Permiso(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `¡Permiso no encontrado con id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "¡Error al actualizar el permiso con id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Borrar un permiso por su id
exports.delete = (req, res) => {
  Permiso.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `¡Permiso no encontrado con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "¡No se pudo eliminar el permiso con id " + req.params.id
        });
      }
    } else res.send({ message: `¡Permiso eliminado correctamente!` });
  });
};

// Borrar todos los permisos de la base de datos
exports.deleteAll = (req, res) => {
  Permiso.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "¡Se produjo un error al eliminar todos los permisos!"
      });
    else res.send({ message: `¡Todos los permisos fueron eliminados correctamente!` });
  });
};
