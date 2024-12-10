import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import redisClient from '../redis/redisClient.js'
import logger from '../logger/logger.js'

const app = express()
app.use(express.json())
//TODO: error handling in this file can be improved to give error handling to the middleware in a more proper way

// TODO: We can create a redis client file to store this method
// Helper function to get user by email from redis
export const getUserByEmail = async email => {
  try {
    const user = await redisClient.hGetAll(email)
    return user
  } catch (error) {
    logger.error(`Error getting user: ${error}`)
    throw error
  }
}

// TODO: We can create a redis client file to store this method
// Helper function to save user from redis
export const saveUser = async user => {
  try {
    const savedUser = await redisClient.hSet(user.email, user)
    logger.info(`User saved: ${savedUser}`)
    return savedUser
  } catch (error) {
    logger.error(`Error saving user: ${error}`)
    throw error
  }
}

// JWT strategy for Passport
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
}

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      logger.info(`JWT Payload: ${JSON.stringify(jwtPayload)}`)
      const user = await getUserByEmail(jwtPayload.email)
      logger.info(`User: ${JSON.stringify(user)}`)
      if (user?.email) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    } catch (err) {
      logger.error(`Error getting user: ${err}`)
      return done(err, false)
    }
  }),
)

app.use(passport.initialize())

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await getUserByEmail(email)
    if (user?.email && (await bcrypt.compare(password, user?.password))) {
      const token = jwt.sign({ email: user.email }, jwtOptions.secretOrKey)
      res.json({ token })
    } else {
      logger.error('Invalid credentials')
      res.status(401).json({ message: 'Invalid credentials' })
    }
  } catch (err) {
    logger.error(`Error logging in: ${err}`)
    res.status(500).json({ message: 'Error logging in', error: err })
  }
}
