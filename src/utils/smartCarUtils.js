import logger from '../logger/logger.js'
import { AVAILABLE_VEHICLES_IDS, VEHICLE_ACTIONS } from './smartCarConstants.js'

//TODO: implement test for this functions
export const iDValidations = id => {
  if (!id) {
    logger.error('Vehicle ID is required')
    const error = new Error('Vehicle ID is required')
    error.status = 400
    throw error
  }
  if (!AVAILABLE_VEHICLES_IDS.includes(id)) {
    logger.error('Vehicle ID is not found')
    const error = new Error('Vehicle ID is not found')
    error.status = 404
    throw error
  }
}

export const actionValidations = action => {
  if (!action) {
    logger.error('Action is required')
    const error = new Error('Action is required')
    error.status = 400
    throw error
  }
  if (!VEHICLE_ACTIONS.includes(action)) {
    logger.error('Action is not found')
    const error = new Error('Action is not found')
    error.status = 404
    throw error
  }
}

export const validateErrorInBody = responseBody => {
  if (
    responseBody?.status === '404' ||
    responseBody?.status === '400' ||
    responseBody?.status === '500'
  ) {
    logger.error(responseBody?.reason)
    const error = new Error(responseBody?.reason)
    error.status = responseBody?.status
    throw error
  }
}
