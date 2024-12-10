import axios from 'axios'
import {
  VEHICLE_ACTIONS_OBJECT,
  VEHICLE_COMMANDS_OBJECT,
} from '../utils/smartCarConstants.js'
import logger from '../logger/logger.js'
import { validateErrorInBody } from '../utils/smartCarUtils.js'

const OLD_API_BASE_URL = process.env.OLD_API_BASE_URL

export const getVehicleInfo = async id => {
  const body = {
    id: id,
    responseType: 'JSON',
  }
  const response = await axios.post(
    `${OLD_API_BASE_URL}/getVehicleInfoService`,
    body,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  logger.info(`Vehicle Data: ${JSON.stringify(response.data)}`)
  validateErrorInBody(response.data)
  return response.data
}

export const getSecurityStatus = async id => {
  const body = {
    id: id,
    responseType: 'JSON',
  }
  const response = await axios.post(
    `${OLD_API_BASE_URL}/getSecurityStatusService`,
    body,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  logger.info(`Security Status: ${JSON.stringify(response.data)}`)
  validateErrorInBody(response.data)
  return response.data
}

export const getEnergyStatus = async id => {
  const body = {
    id: id,
    responseType: 'JSON',
  }
  const response = await axios.post(
    `${OLD_API_BASE_URL}/getEnergyService`,
    body,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  logger.info(`Energy Status: ${JSON.stringify(response.data)}`)
  validateErrorInBody(response.data)
  return response.data
}

export const getActionEngine = async (id, action) => {
  const body = {
    id,
    command:
      action === VEHICLE_ACTIONS_OBJECT.START
        ? VEHICLE_COMMANDS_OBJECT.START_VEHICLE
        : VEHICLE_COMMANDS_OBJECT.STOP_VEHICLE,
    responseType: 'JSON',
  }

  const response = await axios.post(
    `${OLD_API_BASE_URL}/actionEngineService`,
    body,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  logger.info(`Action Engine: ${JSON.stringify(response.data)}`)
  validateErrorInBody(response.data)
  return response.data
}
