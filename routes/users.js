const router = require('express').Router();
const { getUsers, getUsersId, updateProfile, updateAvatar } = require('../controllers/users.js')
const authMiddleware = require("../middlewares/auth.js");
const { validateUpdateProfile, validateUpdateAvatar, validateUserId } = require('../middlewares/validations.js');


router.get('/', getUsers);
router.use(authMiddleware)

router.get('/me', getUsersId)

router.patch('/me', validateUpdateProfile, updateProfile);

router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

router.get('/:id', validateUserId, getUsersId);

module.exports = router;