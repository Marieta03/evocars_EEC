const bcrypt = require('bcryptjs');
const sql = require("./db.js");

// Constructor
const Usuario = function(usuario) {
  this.nombre = usuario.nombre;
  this.email = usuario.email;
  this.contrasena = usuario.contrasena ? usuario.contrasena : bcrypt.hashSync(usuario.contrasena, bcrypt.genSaltSync(10)); // Encriptar la contraseña si no está encriptada
  this.fecha_nac = usuario.fecha_nac;
  this.genero = usuario.genero;
  this.id_rol = usuario.id_rol;
  this.foto = usuario.foto;
};

Usuario.create = (newUsuario, result) => {
  sql.query("INSERT INTO usuarios SET ?", newUsuario, (err, res) => {
    if (err) {
      console.log("Error al crear el usuario: ", err);
      result(err, null);
      return;
    }

    console.log("Usuario creado: ", { id_usuarios: res.insertId, ...newUsuario });
    result(null, { id_usuarios: res.insertId, ...newUsuario });
  });
};

Usuario.findById = (id, result) => {
  sql.query(`SELECT * FROM usuarios WHERE id_usuarios = ${id}`, (err, res) => {
    if (err) {
      console.log("Error al buscar el usuario: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Usuario encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Usuario.getAll = (result) => {
  let query = "SELECT * FROM usuarios";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error al obtener usuarios: ", err);
      result(null, err);
      return;
    }

    console.log("Usuarios: ", res);
    result(null, res);
  });
};

Usuario.updateById = (id, usuario, result) => {
  sql.query(
    "UPDATE usuarios SET nombre = ?, email = ?, contrasena = ?, fecha_nac = ?, genero = ?, id_rol = ?, foto = ? WHERE id_usuarios = ?",
    [usuario.nombre, usuario.email, usuario.contrasena, usuario.fecha_nac, usuario.genero, usuario.id_rol, usuario.foto, id],
    (err, res) => {
      if (err) {
        console.log("Error al actualizar el usuario: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Usuario actualizado: ", { id_usuarios: id, ...usuario });
      result(null, { id_usuarios: id, ...usuario });
    }
  );
};

Usuario.remove = (id, result) => {
  sql.query("DELETE FROM usuarios WHERE id_usuarios = ?", id, (err, res) => {
    if (err) {
      console.log("Error al eliminar el usuario: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Usuario eliminado con id: ", id);
    result(null, res);
  });
};

Usuario.removeAll = result => {
  sql.query("DELETE FROM usuarios", (err, res) => {
    if (err) {
      console.log("Error al eliminar todos los usuarios: ", err);
      result(null, err);
      return;
    }

    console.log(`Eliminados ${res.affectedRows} usuarios`);
    result(null, res);
  });
};

module.exports = Usuario;
