const { Joi, celebrate } = require('celebrate');
const validator = require('validator');


const validateURL = (value, helpers) => {
    if (validator.isURL(value, {
        protocols: ['http', 'https'],
        require_protocol: true
    })) {
        return value;
    }
    return helpers.error('string.uri');
};

const validateSignup = celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }),

})
const validateSignin = celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }),

})
const validateCreateCard = celebrate({
    body: Joi.object().keys({
        name: Joi.string().required().min(2).max(30),
        link: Joi.string().required().custom(validateURL)
    })
});

const validateCardId = celebrate({
    params: Joi.object().keys({
        cardId: Joi.string().length(24).hex().required()
    })
});

const validateUpdateProfile = celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30).required(),
        about: Joi.string().min(2).max(30).required()
    })
});

const validateUpdateAvatar = celebrate({
    body: Joi.object().keys({
        avatar: Joi.string().required().custom(validateURL)
    })
});

const validateUserId = celebrate({
    params: Joi.object().keys({
        id: Joi.string().length(24).hex().required()
    })
});

module.exports = {
    validateSignup,
    validateSignin,
    validateCreateCard,
    validateCardId,
    validateUpdateProfile,
    validateUpdateAvatar,
    validateUserId
};