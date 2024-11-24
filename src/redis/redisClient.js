import { createClient } from 'redis'

const redisClient = createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
})

redisClient.on('error', err => {
  console.error('Redis error:', err)
})

redisClient.on('connect', () => {
  console.log('Connected to Redis')
})

await redisClient.connect()

export default redisClient
