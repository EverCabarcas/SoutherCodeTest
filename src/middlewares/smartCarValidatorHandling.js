import { actionVehicleEngineSchema, actionLoginSchema } from "../validators/smartCarValidators.js"

export const validateActionVehicleEngine = (req, res, next) => {
  const { error } = actionVehicleEngineSchema.validate(req.body, { abortEarly: false })
  if (error) {
    return res.status(400).json({ errors: error.details.map(detail => detail.message) })
  }
  next()
}

export const validateActionLogin = (req, res, next) => {
  const { error } = actionLoginSchema.validate(req.body, { abortEarly: false })
  if (error) {
    return res.status(400).json({ errors: error.details.map(detail => detail.message) })
  }
  next()
}