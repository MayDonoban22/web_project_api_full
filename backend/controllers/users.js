const { NotFoundError, ValidationError, UnauthorizedError } = require('../errors/error.js');
const User = require('../models/user.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET = "clave-secreta" } = process.env

async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new ValidationError("El email y la contraseña son obligatorios");
    }
    const user = await User.findOne({ email }).select('+password').orFail(() => {
      throw new UnauthorizedError("Credenciales inválidas");
    });
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedError("Contraseña incorrecta");
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ token });

  } catch (err) {
    next(err);
  }
}
async function createUser(req, res, next) {
  const { name, about, avatar, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, about, avatar, email, password: hashedPassword });
    res.status(201).send({
      name: newUser.name,
      about: newUser.about,
      avatar: newUser.avatar,
      email: newUser.email,
      _id: newUser._id,
    });
  } catch (err) {
    next(err);
  }
}

async function getUsers(req, res, next) {
  try {
    const users = await User.find().orFail((err) => {
      throw new NotFoundError('Usuario no encontrado');
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
}

async function getUsersId(req, res, next) {
  console.log(req.params)
  try {
    const findUser = await User.findById(req.user.userId).orFail((err) => {
      throw new NotFoundError('Usuario no encontrado');
    });

    res.json(findUser);
  } catch (err) {
    next(err);
  }
}

async function updateProfile(req, res, next) {
  const { name, about } = req.body;
  const userId = req.user.userId;


  try {

    if (!name && !about) {
      throw new ValidationError('Debes proporcionar al menos un campo para actualizar (name o about)');
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true }
    ).orFail(() => {
      throw new NotFoundError('Usuario no encontrado');
    });

    res.status(200).send(updatedUser);
  } catch (err) {
    next(err);
  }
}

async function updateAvatar(req, res, next) {
  const { avatar } = req.body;
  const userId = req.user.userId;
  try {
    if (!avatar) {
      throw new ValidationError('Debes proporcionar al menos un campo para actualizar (name o about)');
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true }
    ).orFail(() => {
      throw new NotFoundError('Usuario no encontrado');
    });

    res.status(200).send(updatedUser);
  } catch (err) {
    next(err);
  }
}

module.exports = { getUsersId, getUsers, createUser, updateProfile, updateAvatar, login }