import Joi from 'joi';

const userSchema = Joi.object().keys({
  email: Joi.string().email().required().error(new Error('Make sure to insert a valid email address.')),
  password: Joi.string().min(6).required().error(new Error('Password length must be at least 6 characters long.'))
});

export function validateUser(user) {
  const result = Joi.validate(user, userSchema);
  if  (result.error) {
    return result.error.message;
  } else {
    return null;
  }
}