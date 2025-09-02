const winston = require('winston');
const path = require('path');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.File({ filename: path.join(__dirname, 'error.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join(__dirname, 'request.log') }),
    ],
});

const logRequest = (req, res, next) => {
    logger.info(`Solicitud: ${req.method} ${req.url} desde ${req.ip}`);
    next();
};

const errorHandler = (err, req, res, next) => {
    logger.error(err.stack || err.message);

    if (err.isJoi) {
        return res.status(400).json({ message: 'Datos inválidos', details: err.details });
    }

    const { statusCode = 500, message } = err;
    res.status(statusCode).json({
        message: statusCode === 500 ? 'Error interno del servidor' : message,
    });
};

module.exports = { logRequest, errorHandler, logger };
