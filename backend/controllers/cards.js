const { NotFoundError, ValidationError } = require('../errors/error.js');
const Card = require('../models/card.js')

async function createCard(req, res) {
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
    res.status(201).json(newCard);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error al crear la tarjeta' });
  }

}

async function getCards(req, res) {
  try {
    const cards = await Card.find()
    res.json(cards);
  } catch (err) {
    console.error('Error al obtener usuarios:', err);
    res.status(err.statusCode || 500).send({ message: err.message });
  }
}

async function deleteCardById(req, res) {
  const { cardId } = req.params;
  try {
    if (cardId == undefined) {
      throw new ValidationError('El id de la carta no existe');
    }
    const card = await Card.findById(cardId).orFail(() => {
      throw new NotFoundError('Tarjeta no encontrada');
    });
    if (card.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'No tienes permiso para eliminar esta tarjeta' });
    }
    await Card.findByIdAndDelete(cardId);
    res.status(200).send({ message: 'Carta eliminada' });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).send({ message: err.message });
  }
}

async function likeCard(req, res) {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user.userId } },

      { new: true }
    );

    if (!card) {
      throw new ValidationError('Tarjeta no encontrada');
    }

    res.status(200).json({ message: 'Like registrado correctamente', card });
  } catch (err) {
    console.error('Error al dar like:', err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function dislikeCard(req, res) {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user.userId } },
      { new: true }
    );

    if (!card) {
      throw new ValidationError('Tarjeta no encontrada');
    }

    res.status(200).json({ message: 'Like removido correctamente', card });
  } catch (err) {
    console.error('Error al dar dislike:', err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
}

module.exports = { createCard, getCards, deleteCardById, likeCard, dislikeCard }