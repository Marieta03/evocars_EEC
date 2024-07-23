const sql = require("./db.js");

// Constructor
const Permiso = function(permiso) {
  this.nombre_permiso = permiso.nombre_permiso;
  this.clave = permiso.clave;
};

// Métodos CRUD
Permiso.create = (newPermiso, result) => {
  sql.query("INSERT INTO permiso SET ?", newPermiso, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created permiso: ", { id: res.insertId, ...newPermiso });
    result(null, { id: res.insertId, ...newPermiso });
  });
};

Permiso.findById = (id, result) => {
  sql.query(`SELECT * FROM permiso WHERE id_permiso = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found permiso: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Permiso.getAll = (result) => {
  let query = "SELECT * FROM permiso";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("permiso: ", res);
    result(null, res);
  });
};

Permiso.updateById = (id, permiso, result) => {
  sql.query(
    "UPDATE permiso SET nombre_permiso = ?, clave = ? WHERE id_permiso = ?",
    [permiso.nombre_permiso, permiso.clave, id],
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

      console.log("updated permiso: ", { id: id, ...permiso });
      result(null, { id: id, ...permiso });
    }
  );
};

Permiso.remove = (id, result) => {
  sql.query("DELETE FROM permiso WHERE id_permiso = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted permiso with id: ", id);
    result(null, res);
  });
};

Permiso.removeAll = result => {
  sql.query("DELETE FROM permiso", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} permiso`);
    result(null, res);
  });
};

module.exports = Permiso;
