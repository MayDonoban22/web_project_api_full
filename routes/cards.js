const router = require('express').Router();
const { createCard, getCards, deleteCardById, likeCard, dislikeCard } = require('../controllers/cards.js')
const { validateCreateCard, validateCardId } = require('../middlewares/validations.js')
const authMiddleware = require("../middlewares/auth.js");

router.use(authMiddleware)

router.post('/', validateCreateCard, createCard);
router.get('/', getCards);
router.delete('/:cardId', validateCardId, deleteCardById);
router.put('/:cardId/likes', validateCardId, likeCard);
router.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = router;
