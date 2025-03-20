const mongoose = require('mongoose')
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Explorador',
  },
  avatar: {
    type: String,
    default: 'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
    validate: {
      validator: function (v) {
        const regex = /^https?:\/\/(www.)?[a-zA-Z0-9.-]+.[a-zA-Z](\/)?[._~:/?%#\[\]@!\$&'\(\)\*\+,;=a-zA-Z0-9]*/
        return regex.test(v);
      },

      message: props => `${props.value} no es una URL válida!`
    },

  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Email inválido",
    },
  },
  password: {
    type: String,
    required: true,
  },
})


module.exports = mongoose.model('user', userSchema);
