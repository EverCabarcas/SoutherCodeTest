/* eslint-disable no-unused-vars */
import logger from '../logger/logger.js'

export const errorHandler = (err, req, res, next) => {
  //   console.error(err.stack)
  logger.error(`Error: ${err.message}`)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  })
}
