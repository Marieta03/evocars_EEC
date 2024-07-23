const connection = require('../config/db.config');

const User = {};

User.findByEmail = (email, result) => {
  connection.query('SELECT * FROM usuarios WHERE email = ?', [email], (error, results) => {
    if (error) {
      console.error('Error in findByEmail:', error);
      result(error, null);
      return;
    }
    result(null, results[0]);
  });
};

module.exports = User;


