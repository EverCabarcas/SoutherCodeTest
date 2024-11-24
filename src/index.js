import 'dotenv/config'
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerSpecs from '../swaggerConfig.js'
import smartCarRoutes from './routes/smartCarRoutes.js'
import { errorHandler } from './middlewares/smartCarErrorHandling.js'
import helmet from 'helmet'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3000

// Middleware to secure the app by setting various HTTP headers
app.use(helmet())

// Middleware to enable CORS with specific options
app.use(
  cors({
    origin: '*', // Allow only this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow only these methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow only these headers
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  }),
)

// Middleware to parse JSON request bodies
app.use(express.json())

// Middleware to serve the Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

// Routes
app.use('/api', smartCarRoutes)

// Middleware to handle errors
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
