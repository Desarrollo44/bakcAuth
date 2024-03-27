// server.js
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./src/routes/auth.routes');

const app = express();

// Middleware for handling JSON data
app.use(express.json());

// Middleware for parsing cookies in incoming requests
app.use(cookieParser());

// Middleware for handling URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Configure CORS settings
const corsConfig = {
  origin: ['http://localhost:3000/'],
  credentials: true,
};
app.use(cors(corsConfig));

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