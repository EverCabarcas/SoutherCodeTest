import passport from 'passport'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { Strategy as JwtStrategy } from 'passport-jwt'
import redisClient from '../redis/redisClient'
import { getUserByEmail, saveUser, login } from './authService'

jest.mock('../redis/redisClient', () => ({
  hGetAll: jest
    .fn()
    .mockImplementation(() => ({
      email: 'test@example.com',
      password: 'password',
    })),
  hSet: jest.fn(),
}))

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
}))

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}))

jest.mock('passport', () => ({
  use: jest.fn(),
  initialize: jest.fn(() => (req, res, next) => next()),
}))

jest.mock('passport-jwt', () => ({
  Strategy: jest.fn().mockImplementation((options, verify) => {
    return {
      _verify: verify,
    }
  }),
  ExtractJwt: {
    fromAuthHeaderAsBearerToken: jest.fn().mockReturnValue('mockToken'),
  },
  JwtStrategy: {
    _verify: jest.fn(),
  },
}))

describe('authService', () => {
  beforeAll(() => {
    passport.use.mockImplementation(strategy => {
      if (strategy instanceof JwtStrategy) {
        strategy._verify = jest.fn((jwtPayload, done) => {
          done(null, { email: jwtPayload.email })
        })
      }
    })
  })

  describe('getUserByEmail', () => {
    it('should return user data when user exists', async () => {
      const mockUser = { email: 'test@example.com', name: 'Test User' }
      redisClient.hGetAll.mockResolvedValue(mockUser)

      const email = 'test@example.com'
      const user = await getUserByEmail(email)

      expect(redisClient.hGetAll).toHaveBeenCalledWith(email)
      expect(user).toEqual(mockUser)
    })

    it('should throw an error when Redis client fails', async () => {
      const mockError = new Error('Redis error')
      redisClient.hGetAll.mockRejectedValue(mockError)

      const email = 'test@example.com'

      await expect(getUserByEmail(email)).rejects.toThrow('Redis error')
      expect(redisClient.hGetAll).toHaveBeenCalledWith(email)
    })
  })

  describe('saveUser', () => {
    it('should save user data successfully', async () => {
      const mockUser = { email: 'test@example.com', name: 'Test User' }
      redisClient.hSet.mockResolvedValue('OK')

      const result = await saveUser(mockUser)

      expect(redisClient.hSet).toHaveBeenCalledWith(mockUser.email, mockUser)
      expect(result).toBe('OK')
    })

    it('should throw an error when Redis client fails', async () => {
      const mockError = new Error('Redis error')
      redisClient.hSet.mockRejectedValue(mockError)

      const mockUser = { email: 'test@example.com', name: 'Test User' }

      await expect(saveUser(mockUser)).rejects.toThrow('Redis error')
      expect(redisClient.hSet).toHaveBeenCalledWith(mockUser.email, mockUser)
    })
  })

  describe('login', () => {
    it('should return a token for valid credentials', async () => {
      const mockUser = { email: 'test@example.com', password: 'hashedPassword' }
      const mockToken = 'mockToken'
      redisClient.hGetAll.mockResolvedValue(mockUser)
      bcrypt.compare.mockResolvedValue(true)
      jwt.sign.mockReturnValue(mockToken)

      const req = { body: { email: 'test@example.com', password: 'password' } }
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }

      await login(req, res)

      expect(redisClient.hGetAll).toHaveBeenCalledWith('test@example.com')
      expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashedPassword')
      expect(res.json).toHaveBeenCalledWith({ token: mockToken })
    })

    it('should return 401 for invalid credentials', async () => {
      const mockUser = { email: 'test@example.com', password: 'hashedPassword' }
      redisClient.hGetAll.mockResolvedValue(mockUser)
      bcrypt.compare.mockResolvedValue(false)

      const req = {
        body: { email: 'test@example.com', password: 'wrongPassword' },
      }
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }

      await login(req, res)

      expect(redisClient.hGetAll).toHaveBeenCalledWith('test@example.com')
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'wrongPassword',
        'hashedPassword',
      )
      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' })
    })
  })
})
