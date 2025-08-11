import Joi from 'joi';

export const signUpSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'Имя обязательно',
    'string.min': 'Имя должно быть минимум 2 символа',
    'string.max': 'Имя должно быть не длиннее 50 символов'
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email обязателен',
    'string.email': 'Некорректный email'
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Пароль обязателен',
    'string.min': 'Пароль должен быть минимум 6 символов'
  })
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email обязателен',
    'string.email': 'Некорректный email'
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Пароль обязателен',
    'string.min': 'Пароль должен быть минимум 6 символов'
  })
});
