// src/controllers/smartCarControllers.spec.js
import {
  getVehicle,
  getVehicleDoors,
  getVehicleFuel,
  getVehicleBattery,
  actionVehicleEngine,
} from './smartCarControllers'
import {
  getVehicleInfo,
  getSecurityStatus,
  getEnergyStatus,
  getActionEngine,
} from '../services/smartCarServices'
import { iDValidations, actionValidations } from '../utils/smartCarUtils'

jest.mock('../services/smartCarServices')
jest.mock('../utils/smartCarUtils')

describe('smartCarControllers', () => {
  const mockReq = (params = {}, body = {}) => ({ params, body })
  const mockRes = () => {
    const res = {}
    res.send = jest.fn().mockReturnValue(res)
    res.status = jest.fn().mockReturnValue(res)
    return res
  }
  const mockNext = jest.fn()

  describe('getVehicle', () => {
    it('should return vehicle information', async () => {
      const req = mockReq({ id: '123' })
      const res = mockRes()
      const vehicleData = {
        data: {
          vin: { value: '1HGCM82633A123456' },
          color: { value: 'red' },
          driveTrain: { value: 'AWD' },
        },
      }
      const securityData = {
        data: {
          doors: {
            values: [
              { location: { value: 'front-left' }, locked: { value: true } },
            ],
          },
        },
      }

      iDValidations.mockImplementation(() => {})
      getVehicleInfo.mockResolvedValue(vehicleData)
      getSecurityStatus.mockResolvedValue(securityData)

      await getVehicle(req, res, mockNext)

      expect(iDValidations).toHaveBeenCalledWith('123')
      expect(getVehicleInfo).toHaveBeenCalledWith('123')
      expect(getSecurityStatus).toHaveBeenCalledWith('123')
      expect(res.send).toHaveBeenCalledWith({
        vin: '1HGCM82633A123456',
        color: 'red',
        doorCount: 1,
        driveTrain: 'AWD',
      })
    })

    it('should handle errors', async () => {
      const req = mockReq({ id: '123' })
      const res = mockRes()
      const error = new Error('Test error')

      iDValidations.mockImplementation(() => {})
      getVehicleInfo.mockRejectedValue(error)

      await getVehicle(req, res, mockNext)

      expect(mockNext).toHaveBeenCalledWith(error)
    })
  })

  describe('getVehicleDoors', () => {
    it('should return vehicle door status', async () => {
      const req = mockReq({ id: '123' })
      const res = mockRes()
      const securityData = {
        data: {
          doors: {
            values: [
              { location: { value: 'front-left' }, locked: { value: true } },
            ],
          },
        },
      }

      iDValidations.mockImplementation(() => {})
      getSecurityStatus.mockResolvedValue(securityData)

      await getVehicleDoors(req, res, mockNext)

      expect(iDValidations).toHaveBeenCalledWith('123')
      expect(getSecurityStatus).toHaveBeenCalledWith('123')
      expect(res.send).toHaveBeenCalledWith([
        { location: 'front-left', locked: true },
      ])
    })

    it('should handle errors', async () => {
      const req = mockReq({ id: '123' })
      const res = mockRes()
      const error = new Error('Test error')

      iDValidations.mockImplementation(() => {})
      getSecurityStatus.mockRejectedValue(error)

      await getVehicleDoors(req, res, mockNext)

      expect(mockNext).toHaveBeenCalledWith(error)
    })
  })

  describe('getVehicleFuel', () => {
    it('should return vehicle fuel status', async () => {
      const req = mockReq({ id: '123' })
      const res = mockRes()
      const energyStatusData = { data: { tankLevel: { value: 50 } } }

      iDValidations.mockImplementation(() => {})
      getEnergyStatus.mockResolvedValue(energyStatusData)

      await getVehicleFuel(req, res, mockNext)

      expect(iDValidations).toHaveBeenCalledWith('123')
      expect(getEnergyStatus).toHaveBeenCalledWith('123')
      expect(res.send).toHaveBeenCalledWith({ percent: 50 })
    })

    it('should handle errors', async () => {
      const req = mockReq({ id: '123' })
      const res = mockRes()
      const error = new Error('Test error')

      iDValidations.mockImplementation(() => {})
      getEnergyStatus.mockRejectedValue(error)

      await getVehicleFuel(req, res, mockNext)

      expect(mockNext).toHaveBeenCalledWith(error)
    })
  })

  describe('getVehicleBattery', () => {
    it('should return vehicle battery status', async () => {
      const req = mockReq({ id: '123' })
      const res = mockRes()
      const energyStatusData = { data: { batteryLevel: { value: 80 } } }

      iDValidations.mockImplementation(() => {})
      getEnergyStatus.mockResolvedValue(energyStatusData)

      await getVehicleBattery(req, res, mockNext)

      expect(iDValidations).toHaveBeenCalledWith('123')
      expect(getEnergyStatus).toHaveBeenCalledWith('123')
      expect(res.send).toHaveBeenCalledWith({ percent: 80 })
    })

    it('should handle errors', async () => {
      const req = mockReq({ id: '123' })
      const res = mockRes()
      const error = new Error('Test error')

      iDValidations.mockImplementation(() => {})
      getEnergyStatus.mockRejectedValue(error)

      await getVehicleBattery(req, res, mockNext)

      expect(mockNext).toHaveBeenCalledWith(error)
    })
  })

  describe('actionVehicleEngine', () => {
    it('should perform an action on the vehicle engine', async () => {
      const req = mockReq({ id: '123' }, { action: 'START' })
      const res = mockRes()
      const actionResult = { actionResult: { status: 'SUCCESS' } }

      iDValidations.mockImplementation(() => {})
      actionValidations.mockImplementation(() => {})
      getActionEngine.mockResolvedValue(actionResult)

      await actionVehicleEngine(req, res, mockNext)

      expect(iDValidations).toHaveBeenCalledWith('123')
      expect(actionValidations).toHaveBeenCalledWith('START')
      expect(getActionEngine).toHaveBeenCalledWith('123', 'START')
      expect(res.send).toHaveBeenCalledWith({ status: 'SUCCESS' })
    })

    it('should handle errors', async () => {
      const req = mockReq({ id: '123' }, { action: 'START' })
      const res = mockRes()
      const error = new Error('Test error')

      iDValidations.mockImplementation(() => {})
      actionValidations.mockImplementation(() => {})
      getActionEngine.mockRejectedValue(error)

      await actionVehicleEngine(req, res, mockNext)

      expect(mockNext).toHaveBeenCalledWith(error)
    })
  })
})
