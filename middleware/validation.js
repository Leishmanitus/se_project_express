const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

const validateURL = (value, helpers) => {
  console.log(value, helpers);
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
}

const removeTokenPrefix = (value, helpers) => {
  if(value.startsWith("Bearer ")) {
    const token = value.slice(7);
    if(validator.isJWT(token)) {
      return token;
    }
    return helpers.error('string.pattern.base', { message: 'Not a valid token. Must be a JSON Web Token' });
  }
  return helpers.error('string.pattern.base', { message: 'Authorization header must include the prefix' });
}

module.exports.validateItemData = celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30).messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field must be filled in',
      }),
      imageUrl: Joi.string().required().custom(validateURL).messages({
        'string.empty': 'The "imageUrl" field must be filled in',
        'string.uri': 'the "imageUrl" field must be a valid url',
      }),
      weather: Joi.string().required().messages({
        "string.empty": 'Must provide a weather option',
      }),
    }),
  });

module.exports.validateRegistrationData = celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30).messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field must be filled in',
      }),
      avatar: Joi.string().required().custom(validateURL).messages({
        'string.empty': 'The "avatar" field must be filled in',
        'string.uri': 'the "avatar" field must be a valid url',
      }),
      email: Joi.string().required().email().messages({
        'string.empty': 'The "email" field must be filled in',
        'string.email': 'the "email" field must be a valid email address',
      }),
      password: Joi.string().required().min(8).messages({
        "string.min": 'The minimum length of the "password" field is 8',
        "string.empty": 'The "password" field must be filled in',
      }),
    }),
  });

module.exports.validateLoginData = celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email().messages({
        'string.empty': 'The "email" field must be filled in',
        'string.email': 'the "email" field must be a valid email address',
      }),
      password: Joi.string().required().min(8).messages({
        "string.min": 'The minimum length of the "password" field is 8',
        "string.empty": 'The "password" field must be filled in',
      }),
    }),
  });

module.exports.validateId = celebrate({
    params: Joi.object().keys({
      _id: Joi.string().required().alphanum().length(24).messages({
        "string.alphanum": 'Not a valid Object ID',
        "string.length": 'The minimum length of an Object ID is 24',
      }),
    }),
  });
