const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

exports.login = (req, res) => {
  const { email, contrasena } = req.body;
  User.findByEmail(email, (error, user) => {
    if (error) {
      res.status(500).send({ message: 'Error retrieving user' });
      return;
    }

    if (!user) {
      res.status(404).send({ message: 'User not found' });
      return;
    }

    const passwordIsValid = bcrypt.compareSync(contrasena, user.contrasena);
    if (!passwordIsValid) {
      res.status(401).send({ message: 'Invalid password' });
      return;
    }

    const token = jwt.sign({ id: user.id }, 'your-secret-key', {
      expiresIn: 86400, // 24 hours
    });

    const userInfo = {
      id_usuarios: user.id_usuarios,
      nombre: user.nombre,
      email: user.email,
      contrasena: user.contrasena,
      fecha_nac: user.fecha_nac,
      genero: user.genero,
      id_rol: user.id_rol,
      foto: user.foto
    };

    res.status(200).send({
      id: user.id_usuarios,
      email: user.email,
      token: token,
      userInfo: userInfo
    });
  });
};
