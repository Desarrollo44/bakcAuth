const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./src/routes/auth.routes');

const app = express();

// Middleware para manejar datos en formato JSON
app.use(express.json());

// Middleware para analizar cookies en las solicitudes entrantes
app.use(cookieParser());

// Middleware para manejar datos de formulario URL-encoded
app.use(express.urlencoded({ extended: true }));

// Rutas de autenticación
app.use('/auth', authRoutes);

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('Bienvenido al servidor de autenticación');
});

// Puerto en el que escucha el servidor
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
