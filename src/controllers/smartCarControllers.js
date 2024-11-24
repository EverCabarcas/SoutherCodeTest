/**
 * TODO: NOTE - the error handling for all the functions in the controller is implementend
 * in the middleware error handler, so we dont need to handle the errors in the controlller
 * and we have a consistent way to handle errors in the application and a cleaner code.
 */
import {
  getActionEngine,
  getEnergyStatus,
  getSecurityStatus,
  getVehicleInfo,
} from '../services/smartCarServices.js'
import { actionValidations, iDValidations } from '../utils/smartCarUtils.js'

/**
 * @swagger
 * components:
 *   schemas:
 *     VehicleInfo:
 *       type: object
 *       properties:
 *         vin:
 *           type: string
 *         color:
 *           type: string
 *         doorCount:
 *           type: integer
 *         driveTrain:
 *           type: string
 *     DoorStatus:
 *       type: object
 *       properties:
 *         location:
 *           type: string
 *         locked:
 *           type: boolean
 *     FuelStatus:
 *       type: object
 *       properties:
 *         percent:
 *           type: number
 *     BatteryStatus:
 *       type: object
 *       properties:
 *         percent:
 *           type: number
 *     EngineStatus:
 *       type: object
 *       properties:
 *        status:
 *         type: string
 */

/**
 * @swagger
 * /api/vehicles/{id}:
 *   get:
 *     summary: Get vehicle information
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The vehicle ID
 *     responses:
 *       200:
 *         description: Vehicle information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VehicleInfo'
 *       400:
 *         description: Vehicle ID is required
 *       404:
 *         description: Vehicle ID is not found
 */
export const getVehicle = async (req, res, next) => {
  try {
    const { id } = req.params
    // check if id is provided and in the list of available vehicles ids
    iDValidations(id)

    const vehicleData = await getVehicleInfo(id)
    /** TODO:
     * Doing this call needs to be change in the furture to be more efficient
     * because we are doing two calls to the same API because in the getVehicleInfo
     * we dont have the doorCount
     */
    const securityData = await getSecurityStatus(id)

    const vehicleInfo = {
      vin: vehicleData?.data?.vin.value,
      color: vehicleData?.data?.color.value,
      doorCount: securityData?.data?.doors?.values.length,
      driveTrain: vehicleData?.data?.driveTrain.value,
    }
    res.send(vehicleInfo)
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/vehicles/{id}/doors:
 *   get:
 *     summary: Get vehicle door status
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The vehicle ID
 *     responses:
 *       200:
 *         description: Vehicle door status
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DoorStatus'
 *       400:
 *         description: Vehicle ID is required
 *       404:
 *         description: Vehicle ID is not found
 */
export const getVehicleDoors = async (req, res, next) => {
  try {
    const { id } = req.params
    // check if id is provided and in the list of available vehicles ids
    iDValidations(id)

    const securityData = await getSecurityStatus(id)
    const doors = securityData?.data?.doors?.values.map(door => ({
      location: door.location.value,
      locked: door.locked.value,
    }))

    res.send(doors)
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/vehicles/{id}/fuel:
 *   get:
 *     summary: Get vehicle fuel status
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The vehicle ID
 *     responses:
 *       200:
 *         description: Vehicle fuel status
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FuelStatus'
 *       400:
 *         description: Vehicle ID is required
 *       404:
 *         description: Vehicle ID is not found
 */
export const getVehicleFuel = async (req, res, next) => {
  try {
    const { id } = req.params
    // check if id is provided and in the list of available vehicles ids
    iDValidations(id)

    /**
     * TODO: in this case we are getting from the getEnergyStatus the tankLevel and
     * the batteryLevel, but we are only using the tankLevel, so we need to change
     */
    const energyStatusData = await getEnergyStatus(id)
    const tankLevelPercent = energyStatusData?.data?.tankLevel?.value

    res.send({ percent: tankLevelPercent })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/vehicles/{id}/battery:
 *   get:
 *     summary: Get vehicle battery status
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The vehicle ID
 *     responses:
 *       200:
 *         description: Vehicle battery status
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BatteryStatus'
 *       400:
 *         description: Vehicle ID is required
 *       404:
 *         description: Vehicle ID is not found
 */
export const getVehicleBattery = async (req, res, next) => {
  try {
    const { id } = req.params
    // check if id is provided and in the list of available vehicles ids
    iDValidations(id)

    /** TODO: in this case we are getting from the getEnergyStatus the tankLevel and the batteryLevel
     * but we are only using the batteryLevel, so we need to change this.
     * I think using the same api to get values for differents endpoints is not a good practice
     */
    const energyStatusData = await getEnergyStatus(id)
    const batteryLevelPercent = energyStatusData?.data?.batteryLevel?.value

    res.send({ percent: batteryLevelPercent })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/vehicles/{id}/engine:
 *   post:
 *     summary: Perform an action on the vehicle engine
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The vehicle ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               action:
 *                 type: string
 *     responses:
 *       200:
 *         description: Action performed successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Vehicle ID not found
 */
export const actionVehicleEngine = async (req, res, next) => {
  try {
    const { id } = req.params
    const { action } = req.body
    // check if id is provided and in the list of available vehicles ids
    iDValidations(id)
    // check if action is provided and in the list of available commands
    actionValidations(action)

    const getActionEngineData = await getActionEngine(id, action)

    res.send({ status: getActionEngineData?.actionResult?.status })
  } catch (error) {
    next(error)
  }
}
