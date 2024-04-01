const jwt = require('jsonwebtoken');
const users = require('../config/usuario.json'); // Importa la lista de usuarios desde un archivo JSON

// Función para manejar el inicio de sesión
function login(req, res) {
  try {
    const { username, password } = req.body;

    // Busca el usuario en la lista de usuarios basándose en el nombre de usuario y contraseña proporcionados
    const user = users.find(user => user.username === username && user.password === password);

    // Si el usuario no se encuentra, devuelve un error de credenciales incorrectas
    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Genera un token JWT con la información del usuario
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      'super_secret',
      { expiresIn: '2h' }
    );

    // Almacena el token en una cookie con una duración de 2 horas
    res.cookie('token', token, {
      maxAge: 2 * 60 * 60 * 1000,
      httpOnly: true
    });

    // Responde con el token al cliente
    res.status(200).json({ token });
  } catch (error) {
    // Si ocurre algún error interno, devuelve un error de servidor
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

module.exports = {
  login
};