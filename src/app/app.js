const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const authRoutes = require("../routes/auth.routes");

const app = express();

// Middleware para permitir solicitudes CORS desde el frontend
app.use(cors());

// Middleware para registrar solicitudes en la consola
app.use(morgan("dev"));

// Middleware para manejar datos JSON y datos de formulario
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Middleware para configurar los encabezados CORS
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

// Rutas de autenticación
app.use("/auth", authRoutes);

// Ruta de inicio
app.get("/", (req, res) => {
    res.send("Servidor Express funcionando correctamente");
});

module.exports = app;