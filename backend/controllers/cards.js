const { NotFoundError, ValidationError } = require('../errors/error.js');
const Card = require('../models/card.js');
const { logger } = require('../middlewares/errorHandler');

async function createCard(req, res, next) {
  const { name, link } = req.body;
  const userId = req.user.userId;

  if (!name || !link) {
    return res.status(400).send({ message: 'Nombre y link son obligatorios' });
  }

  try {
    const newCard = await Card.create({
      name,
      link,
      owner: userId,
    });
    logger.info(`Nueva tarjeta creada por usuario ${userId}`);
    res.status(201).json(newCard);
  } catch (err) {
    logger.error(`Error al crear tarjeta: ${err.message}`);
    next(err);
  }

}

async function getCards(req, res, next) {
  try {
    const cards = await Card.find()
    logger.info(`Se consultaron todas las tarjetas`);
    res.json(cards);
  } catch (err) {
    logger.error(`Error al obtener tarjetas: ${err.message}`);
    next(err);
  }
}

async function deleteCardById(req, res, next) {
  const { cardId } = req.params;
  try {
    if (cardId == undefined) {
      throw new ValidationError('El id de la carta no existe');
    }
    const card = await Card.findById(cardId).orFail(() => {
      throw new NotFoundError('Tarjeta no encontrada');
    });
    if (card.owner.toString() !== req.user.userId) {
      logger.warn(`Usuario ${req.user.userId} intentó eliminar una tarjeta que no le pertenece`);
      return res.status(403).json({ message: 'No tienes permiso para eliminar esta tarjeta' });
    }
    await Card.findByIdAndDelete(cardId);
    logger.info(`Tarjeta ${cardId} eliminada por usuario ${req.user.userId}`);
    res.status(200).send({ message: 'Carta eliminada' });
  } catch (err) {
    logger.error(`Error al eliminar tarjeta: ${err.message}`);
    next(err);
  }
}

async function likeCard(req, res, next) {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user.userId } },

      { new: true }
    );

    if (!card) {
      throw new ValidationError('Tarjeta no encontrada');
    }
    logger.info(`Usuario ${req.user.userId} dio like a la tarjeta ${req.params.cardId}`);
    res.status(200).json({ message: 'Like registrado correctamente', card });
  } catch (err) {
    logger.error(`Error al dar like a tarjeta: ${err.message}`);
    next(err);
  }
}

async function dislikeCard(req, res, next) {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user.userId } },
      { new: true }
    );

    if (!card) {
      throw new ValidationError('Tarjeta no encontrada');
    }

    logger.info(`Usuario ${req.user.userId} quitó like a la tarjeta ${req.params.cardId}`);
    res.status(200).json({ message: 'Like removido correctamente', card });
  } catch (err) {
    logger.error(`Error al quitar like a tarjeta: ${err.message}`);
    next(err);
  }
}

module.exports = { createCard, getCards, deleteCardById, likeCard, dislikeCard }