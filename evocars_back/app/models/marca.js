const sql = require("./db.js");

// constructor
const Marca = function(marca) {
  this.marca = marca.marca;
};

Marca.create = (newMarca, result) => {
  sql.query("INSERT INTO marcas SET ?", newMarca, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created marca: ", { id: res.insertId, ...newMarca });
    result(null, { id: res.insertId, ...newMarca });
  });
};

Marca.findById = (marcaId, result) => {
  sql.query(`SELECT * FROM marcas WHERE id = ${marcaId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found marca: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Marca with the id
    result({ kind: "not_found" }, null);
  });
};

Marca.getAll = result => {
  sql.query("SELECT * FROM marcas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("marcas: ", res);
    result(null, res);
  });
};

Marca.updateById = (id, marca, result) => {
  sql.query(
    "UPDATE marcas SET marca = ?",
    [marca.marca,id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Marca with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated marca: ", { id: id, ...marca });
      result(null, { id: id, ...marca });
    }
  );
};

Marca.remove = (id, result) => {
  sql.query("DELETE FROM marcas WHERE id_marca = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Marca with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted marca with id_marca: ", id);
    result(null, res);
  });
};

Marca.removeAll = result => {
  sql.query("DELETE FROM marcas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} marcas`);
    result(null, res);
  });
};

module.exports = Marca;

