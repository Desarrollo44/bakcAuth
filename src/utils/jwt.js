const jwt = require('jsonwebtoken');

function generarToken(user, jwtSecret, jwtExpiration) {
    try {
        // Verificar si se proporcionan jwtSecret y jwtExpiration
        if (!jwtSecret || !jwtExpiration) {
            throw new Error('jwtSecret y jwtExpiration son necesarios para generar el token');
        }

        // Firmar el token con los datos del usuario y las opciones proporcionadas
        return jwt.sign({ id: user.id, username: user.username, rol: user.rol }, jwtSecret, {
            expiresIn: jwtExpiration
        });
    } catch (error) {
        console.error('Error al generar el token:', error.message);
        return null; // Devolver null en caso de error
    }
}


module.exports = generarToken;
