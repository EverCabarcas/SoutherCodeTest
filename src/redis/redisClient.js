import { createClient } from 'redis'
import logger from '../logger/logger.js'

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
})

redisClient.on('error', err => {
  logger.error('Redis error:', err)
  console.error('Redis error:', err)
})

redisClient.on('connect', () => {
  logger.info('Connected to Redis')
  console.log('Connected to Redis')
})

redisClient.connect()

export default redisClient
