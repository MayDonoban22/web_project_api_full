
const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/error');

const { JWT_SECRET = "clave-secreta" } = process.env

function authMiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return next(new UnauthorizedError('Token no proporcionado'));
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload;
        next()
    } catch (error) {
        next(new UnauthorizedError('Token inválido o expirado'));
    }
}

module.exports = authMiddleware;