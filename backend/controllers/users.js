const { NotFoundError, ValidationError } = require('../errors/error.js');
const User = require('../models/user.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET = "secret-key" } = process.env

async function login(req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new ValidationError("El email y la contraseña son obligatorios");
    }
    const user = await User.findOne({ email }).orFail(() => {
      throw new NotFoundError("Usuario no encontrado");
    });
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new ValidationError("Contraseña incorrecta");
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ token });

  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
}
async function createUser(req, res) {
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
    console.error(err);
    res.status(500).send({ message: "Error al crear el usuario" });
  }
}

async function getUsers(req, res) {
  try {
    const users = await User.find().orFail((err) => {
      throw new NotFoundError('Usuario no encontrado');
    });
    res.json(users);
  } catch (err) {
    console.error('Error al obtener usuarios:', err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function getUsersId(req, res) {

  try {

    if (req.params.id == undefined) {
      throw new ValidationError('El id del usuario no existe');
    }

    const findUser = await User.findById(req.params._id).orFail((err) => {
      throw new NotFoundError('Usuario no encontrado');
    });

    res.json(findUser);
  } catch (err) {
    console.error('Error al obtener usuario por ID:', err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function updateProfile(req, res) {
  const { name, about } = req.body;
  const userId = req.user._id;


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
    console.error('Error al actualizar el perfil:', err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function updateAvatar(req, res) {
  const { avatar } = req.body;
  const userId = req.user._id;
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
    console.error('Error al actualizar el avatar:', err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
}

module.exports = { getUsersId, getUsers, createUser, updateProfile, updateAvatar, login }