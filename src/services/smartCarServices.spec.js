// src/services/smartCarServices.spec.js
import axios from 'axios'
import {
  getVehicleInfo,
  getSecurityStatus,
  getEnergyStatus,
  getActionEngine,
} from './smartCarServices'

jest.mock('axios')

describe('smartCarServices', () => {
  const OLD_API_BASE_URL = process.env.OLD_API_BASE_URL

  describe('getVehicleInfo', () => {
    it('should fetch vehicle info successfully', async () => {
      const id = '123'
      const responseData = { data: { vin: '1HGCM82633A123456' } }
      axios.post.mockResolvedValue({ data: responseData })

      const result = await getVehicleInfo(id)

      expect(axios.post).toHaveBeenCalledWith(
        `${OLD_API_BASE_URL}/getVehicleInfoService`,
        { id, responseType: 'JSON' },
        { headers: { 'Content-Type': 'application/json' } },
      )
      expect(result).toEqual(responseData)
    })

    it('should handle errors', async () => {
      const id = '123'
      const errorMessage = 'Network Error'
      axios.post.mockRejectedValue(new Error(errorMessage))

      await expect(getVehicleInfo(id)).rejects.toThrow(errorMessage)
    })
  })

  describe('getSecurityStatus', () => {
    it('should fetch security status successfully', async () => {
      const id = '123'
      const responseData = {
        data: { doors: { values: [{ location: 'front-left', locked: true }] } },
      }
      axios.post.mockResolvedValue({ data: responseData })

      const result = await getSecurityStatus(id)

      expect(axios.post).toHaveBeenCalledWith(
        `${OLD_API_BASE_URL}/getSecurityStatusService`,
        { id, responseType: 'JSON' },
        { headers: { 'Content-Type': 'application/json' } },
      )
      expect(result).toEqual(responseData)
    })

    it('should handle errors', async () => {
      const id = '123'
      const errorMessage = 'Network Error'
      axios.post.mockRejectedValue(new Error(errorMessage))

      await expect(getSecurityStatus(id)).rejects.toThrow(errorMessage)
    })
  })

  describe('getEnergyStatus', () => {
    it('should fetch energy status successfully', async () => {
      const id = '123'
      const responseData = {
        data: { tankLevel: { value: 50 }, batteryLevel: { value: 80 } },
      }
      axios.post.mockResolvedValue({ data: responseData })

      const result = await getEnergyStatus(id)

      expect(axios.post).toHaveBeenCalledWith(
        `${OLD_API_BASE_URL}/getEnergyService`,
        { id, responseType: 'JSON' },
        { headers: { 'Content-Type': 'application/json' } },
      )
      expect(result).toEqual(responseData)
    })

    it('should handle errors', async () => {
      const id = '123'
      const errorMessage = 'Network Error'
      axios.post.mockRejectedValue(new Error(errorMessage))

      await expect(getEnergyStatus(id)).rejects.toThrow(errorMessage)
    })
  })

  describe('getActionEngine', () => {
    it('should perform action on engine successfully', async () => {
      const id = '1234'
      const action = 'START'
      const responseData = { actionResult: { status: 'SUCCESS' } }
      axios.post.mockResolvedValue({ data: responseData })

      const result = await getActionEngine(id, action)

      expect(axios.post).toHaveBeenCalledWith(
        `${OLD_API_BASE_URL}/actionEngineService`,
        {
          id,
          command: 'START_VEHICLE',
          responseType: 'JSON',
        },
        { headers: { 'Content-Type': 'application/json' } },
      )
      expect(result).toEqual(responseData)
    })
  })
})
