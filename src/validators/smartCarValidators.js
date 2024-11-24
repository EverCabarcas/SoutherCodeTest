import Joi from 'joi'

// We made validation and sanaization for the request body
export const actionVehicleEngineSchema = Joi.object({
  action: Joi.string().trim().required().messages({
    'string.empty': 'Action is required',
  }),
})

export const actionLoginSchema = Joi.object({
  email: Joi.string().trim().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email is invalid',
  }),
  password: Joi.string().trim().required().messages({
    'string.empty': 'Password is required',
  }),
})
