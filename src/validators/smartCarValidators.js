import Joi from 'joi'

// We made validation and sanaization for the request body
export const actionVehicleEngineSchema = Joi.object({
  action: Joi.string().trim().required().messages({
    'string.empty': 'Action is required',
  }),
})