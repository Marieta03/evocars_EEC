const Rol = require('../models/rol.js');

// Crear y guardar un nuevo rol
exports.create = (req, res) => {
  // Validar la solicitud
  if (!req.body.nombre_rol) {
    res.status(400).send({ message: "¡El contenido no puede estar vacío!" });
    return;
  }

  // Crear un rol
  const rol = new Rol({
    nombre_rol: req.body.nombre_rol
  });

  // Guardar el rol en la base de datos
  Rol.create(rol, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "¡Se produjo un error al crear el rol!"
      });
    else res.send(data);
  });
};

// Obtener todos los roles de la base de datos
exports.findAll = (req, res) => {
  Rol.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "¡Se produjo un error al recuperar los roles!"
      });
    else res.send(data);
  });
};

// Obtener un rol por su id
exports.findOne = (req, res) => {
  Rol.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `¡Rol no encontrado con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "¡Error al recuperar el rol con id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Actualizar un rol por su id
exports.update = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
    return;
  }

  Rol.updateById(
    req.params.id,
    new Rol(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `¡Rol no encontrado con id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "¡Error al actualizar el rol con id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Borrar un rol por su id
exports.delete = (req, res) => {
  Rol.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `¡Rol no encontrado con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "¡No se pudo eliminar el rol con id " + req.params.id
        });
      }
    } else res.send({ message: `¡Rol eliminado correctamente!` });
  });
};

// Borrar todos los roles de la base de datos
exports.deleteAll = (req, res) => {
  Rol.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "¡Se produjo un error al eliminar todos los roles!"
      });
    else res.send({ message: `¡Todos los roles fueron eliminados correctamente!` });
  });
};
