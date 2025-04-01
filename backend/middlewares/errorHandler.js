const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err.isJoi) {
        return res.status(400).json({ message: 'Datos inválidos', details: err.details });
    }

    const { statusCode = 500, message } = err;

    res.status(statusCode).json({
        message: statusCode === 500 ? 'Error interno del servidor' : message,
    });
};

module.exports = errorHandler;