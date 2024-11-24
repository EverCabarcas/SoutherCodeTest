import express from 'express'
import {
  actionVehicleEngine,
  getVehicle,
  getVehicleBattery,
  getVehicleDoors,
  getVehicleFuel,
} from '../controllers/smartCarControllers.js'
import { validateActionLogin, validateActionVehicleEngine } from '../middlewares/smartCarValidatorHandling.js'
import apicache from 'apicache'
import { login } from '../services/authService.js'
import passport from 'passport'

const router = express.Router()
const cache = apicache.middleware

const cacheDuration = process.env.CACHE_EXPIRATION_TIME;


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
router.get(
  '/vehicles/:id',
  passport.authenticate('jwt', { session: false }),
  cache(cacheDuration),
  getVehicle,
)

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
router.get(
  '/vehicles/:id/doors',
  cache(cacheDuration),
  getVehicleDoors,
)

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
router.get(
  '/vehicles/:id/fuel',
  cache(cacheDuration),
  getVehicleFuel,
)

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
 *               type: object
 *               properties:
 *                 percent:
 *                   type: number
 *       400:
 *         description: Vehicle ID is required
 *       404:
 *         description: Vehicle ID is not found
 */
router.get(
  '/vehicles/:id/battery',
  cache(cacheDuration),
  getVehicleBattery,
)

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
router.post(
  '/vehicles/:id/engine',
  validateActionVehicleEngine,
  actionVehicleEngine,
)

router.post('/login', validateActionLogin, login)

export default router
