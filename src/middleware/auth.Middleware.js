const jwt = require("jsonwebtoken");

const claveSecreta = "super_secret";

const protegerRuta = (options) => {
  return (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        status: 401,
        error: "Acceso no autorizado. Debes proporcionar un token.",
      });
    }

    try {
      const datosToken = jwt.verify(token, claveSecreta);
      req.userid = datosToken.userId;

      const rolesUsuario = Array.isArray(datosToken.rol)
        ? datosToken.rol
        : [datosToken.rol];

      const tienePermisos = rolesUsuario.some((rol) => {
        if (typeof options.allowedRoles === "number") {
          return rol === String(options.allowedRoles);
        } else {
          return options.allowedRoles.includes(rol);
        }
      });

      if (!tienePermisos) {
        return res
          .status(403)
          .json({ message: "No tienes permisos para acceder a esta ruta." });
      }

      next();
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .json({ message: "Token inválido o expirado. Acceso no autorizado." });
    }
  };
};

module.exports = protegerRuta;