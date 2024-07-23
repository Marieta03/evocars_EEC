const sql = require("./db.js");

// Constructor
const Rol = function(rol) {
  this.nombre_rol = rol.nombre_rol;
};

// Métodos CRUD
Rol.create = (newRol, result) => {
  sql.query("INSERT INTO rol SET ?", newRol, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created rol: ", { id: res.insertId, ...newRol });
    result(null, { id: res.insertId, ...newRol });
  });
};

Rol.findById = (id, result) => {
  sql.query(`SELECT * FROM rol WHERE id_rol = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found rol: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Rol.getAll = (result) => {
  let query = "SELECT * FROM rol";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("rol: ", res);
    result(null, res);
  });
};

Rol.updateById = (id, rol, result) => {
  sql.query(
    "UPDATE rol SET nombre_rol = ? WHERE id_rol = ?",
    [rol.nombre_rol, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated rol: ", { id: id, ...rol });
      result(null, { id: id, ...rol });
    }
  );
};

Rol.remove = (id, result) => {
  sql.query("DELETE FROM rol WHERE id_rol = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted rol with id: ", id);
    result(null, res);
  });
};

Rol.removeAll = result => {
  sql.query("DELETE FROM rol", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} rol`);
    result(null, res);
  });
};

module.exports = Rol;
