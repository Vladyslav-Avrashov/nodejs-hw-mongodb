import Joi from 'joi';
import { typeList } from '../constants/contacts-constants.js';

export const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'any.required': 'Name is required',
    'string.base': 'Name must be a string',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'any.required': 'Phone number is required',
    'string.base': 'Name must be a string',
  }),
  email: Joi.string().min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...typeList),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name must be a string',
  }),
  phoneNumber: Joi.string().min(3).max(20).messages({
    'string.base': 'Name must be a string',
  }),
  email: Joi.string().min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...typeList),
});
