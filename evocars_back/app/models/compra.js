const sql = require("./db.js");

// Constructor
const Compra = function(compra) {
  this.id_usuarios = compra.id_usuarios;
  this.id_carro = compra.id_carro;
  this.pago = compra.pago;
  this.fecha_compra = compra.fecha_compra;
  this.estado = compra.estado;
};

Compra.create = (newCompra, result) => {
  console.log("Attempting to create newCompra:", newCompra);  // Log the newCompra object
  sql.query("INSERT INTO compra SET ?", newCompra, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created compra: ", { id_compra: res.insertId, ...newCompra });
    result(null, { id_compra: res.insertId, ...newCompra });
  });
};

Compra.findById = (id, result) => {
  const query = `SELECT c.*, u.nombre as usuario, car.modelo, car.precio
                 FROM compra c 
                 JOIN usuarios u ON c.id_usuarios = u.id_usuarios
                 JOIN carros car ON c.id_carro = car.id_carro
                 WHERE c.id_compra = ?`;
  console.log("Executing query:", query, [id]);  // Log the query
  sql.query(query, [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found compra: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Compra.getAll = (result) => {
  const query = `SELECT c.*, u.nombre as usuario, car.modelo, car.precio
                 FROM compra c 
                 JOIN usuarios u ON c.id_usuarios = u.id_usuarios
                 JOIN carros car ON c.id_carro = car.id_carro`;
  console.log("Executing query:", query);  // Log the query
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("compra: ", res);
    result(null, res);
  });
};

Compra.updateById = (id, compra, result) => {
  console.log("Updating compra with id:", id, "and data:", compra);  // Log the id and compra data
  sql.query(
    "UPDATE compra SET id_usuarios = ?, id_carro = ?, pago = ?, fecha_compra = ?, estado = ? WHERE id_compra = ?",
    [compra.id_usuarios, compra.id_carro, compra.pago, compra.fecha_compra, compra.estado, id],
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

      console.log("updated compra: ", { id: id, ...compra });
      result(null, { id: id, ...compra });
    }
  );
};

Compra.remove = (id, result) => {
  console.log("Deleting compra with id:", id);  // Log the id
  sql.query("DELETE FROM compra WHERE id_compra = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted compra with id: ", id);
    result(null, res);
  });
};

Compra.removeAll = result => {
  console.log("Deleting all compras");  // Log the action
  sql.query("DELETE FROM compra", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} compra`);
    result(null, res);
  });
};

module.exports = Compra;
