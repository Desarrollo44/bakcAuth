const jwt = require('jsonwebtoken');
const users = require('../config/usuario.json');

function login(req, res) {
    try {
        const { username, password } = req.body;

        const user = users.find(user => user.username === username && user.password === password);

        if (!user) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

     
        const token = jwt.sign({ id: user.id, username: user.username, rol: user.rol }, 'super_secret', { expiresIn: '2h' });
     
        res.cookie('token', token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

function protegida(req, res) {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No se proporcionó un token' });
        }

        const decoded = jwt.verify(token, 'super_secret');

        const ruta = req.originalUrl; 


        const accessRestrictions = ['1', '2']; 


        console.log(accessRestrictions)
        const allowedRoles = accessRestrictions;
        if (allowedRoles && allowedRoles.includes(decoded.rol)) {
         
            res.status(200).json({ message: 'Acceso permitido' });
        } else {
     
            res.status(403).json({ message: 'Acceso prohibido para este usuario' });
        }
    } catch (error) {
      
        res.status(401).json({ message: 'Token inválido' });
    }
}
module.exports = {
    login,
    protegida
};
