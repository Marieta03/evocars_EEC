const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000" // Cambia esto según la URL de tu frontend
};

app.use(cors(corsOptions));

// Aumentar el límite de tamaño de la solicitud para JSON y URL encoded
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Hola desde el servidor backend." });
});

// Importar y usar las rutas
const usuariosRouter = require("./app/routes/usuarios");
const marcasRouter = require("./app/routes/marcas");
const permisoRouter = require("./app/routes/permiso");
const rolRouter = require("./app/routes/rol");
const compraRouter = require("./app/routes/compra");
const carrosRouter = require("./app/routes/carros");
const authRoutes = require('./app/routes/auth.routes');

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/marcas', marcasRouter);
app.use('/api/permiso', permisoRouter);
app.use('/api/rol', rolRouter);
app.use('/api/compra', compraRouter);
app.use('/api/carros', carrosRouter);

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor backend está corriendo en http://localhost:${PORT}`);
});
