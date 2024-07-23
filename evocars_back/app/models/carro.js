const sql = require("./db.js");

// Constructor
const Carro = function(carro) {
  this.modelo = carro.modelo;
  this.cilindros = carro.cilindros;
  this.potencia = carro.potencia;
  this.color = carro.color;
  this.precio = carro.precio;
  this.motor = carro.motor;
  this.foto = carro.foto;
};

Carro.create = (newCarro, result) => {
  sql.query("INSERT INTO carros SET ?", newCarro, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created carro: ", { id: res.insertId, ...newCarro });
    result(null, { id: res.insertId, ...newCarro });
  });
};

Carro.findById = (id, result) => {
  sql.query(`SELECT * FROM carros WHERE id_carro = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found carro: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Carro.getAll = (result) => {
  let query = "SELECT * FROM carros";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("carros: ", res);
    result(null, res);
  });
};

Carro.updateById = (id, carro, result) => {
  sql.query(
    "UPDATE carros SET modelo = ?, cilindros = ?, potencia = ?, color = ?, precio = ?, motor = ?, foto = ? WHERE id_carro = ?",
    [carro.modelo, carro.cilindros, carro.potencia, carro.color, carro.precio, carro.motor, carro.foto, id],
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

      console.log("updated carro: ", { id: id, ...carro });
      result(null, { id: id, ...carro });
    }
  );
};

Carro.remove = (id, result) => {
  sql.query("DELETE FROM carros WHERE id_carro = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted carro with id: ", id);
    result(null, res);
  });
};

Carro.removeAll = (result) => {
  sql.query("DELETE FROM carros", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} carros`);
    result(null, res);
  });
};

module.exports = Carro;
