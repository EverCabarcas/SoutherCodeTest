import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import redisClient from '../redis/redisClient.js'

const app = express()
app.use(express.json())

// TODO: We can create a redis client file to store this method
// Helper function to get user by email from redis
export const getUserByEmail = async email => {
  try {
    const user = await redisClient.hGetAll(email)
    return user
  } catch (error) {
    console.log(error)
    throw error
  }
}

// TODO: We can create a redis client file to store this method
// Helper function to save user from redis
export const saveUser = async user => {
  try {
    console.log(user)
    const savedUser = await redisClient.hSet(user.email, user)
    return savedUser
  } catch (error) {
    console.log(error)
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
      const user = await getUserByEmail(jwtPayload.email)
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    } catch (err) {
      return done(err, false)
    }
  }),
)

app.use(passport.initialize())

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await getUserByEmail(email)
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ email: user.email }, jwtOptions.secretOrKey)
      res.json({ token })
    } else {
      res.status(401).json({ message: 'Invalid credentials' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err })
  }
}
