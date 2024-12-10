import {
  actionVehicleEngineSchema,
  actionLoginSchema,
} from '../validators/smartCarValidators.js'
import logger from '../logger/logger.js'

export const validateActionVehicleEngine = (req, res, next) => {
  const { error } = actionVehicleEngineSchema.validate(req.body, {
    abortEarly: false,
  })
  if (error) {
    logger.error(`Error: ${error.details.map(detail => detail.message)}`)
    return res
      .status(400)
      .json({ errors: error.details.map(detail => detail.message) })
  }
  next()
}

export const validateActionLogin = (req, res, next) => {
  const { error } = actionLoginSchema.validate(req.body, { abortEarly: false })
  if (error) {
    logger.error(`Error: ${error.details.map(detail => detail.message)}`)
    return res
      .status(400)
      .json({ errors: error.details.map(detail => detail.message) })
  }
  next()
}
