import { AVAILABLE_VEHICLES_IDS, VEHICLE_ACTIONS } from './smartCarConstants.js'

export const iDValidations = id => {
  if (!id) {
    const error = new Error('Vehicle ID is required')
    error.status = 400
    throw error
  }
  if (!AVAILABLE_VEHICLES_IDS.includes(id)) {
    const error = new Error('Vehicle ID is not found')
    error.status = 404
    throw error
  }
}

export const actionValidations = action => {
  if (!action) {
    const error = new Error('Action is required')
    error.status = 400
    throw error
  }
  if (!VEHICLE_ACTIONS.includes(action)) {
    const error = new Error('Action is not found')
    error.status = 404
    throw error
  }
}
