import 'dotenv/config'
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerSpecs from '../swaggerConfig.js'
import smartCarRoutes from './routes/smartCarRoutes.js'
import { errorHandler } from './middlewares/smartCarErrorHandling.js'
import helmet from 'helmet'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import { saveUser } from './services/authService.js'
import { validateActionLogin } from './middlewares/smartCarValidatorHandling.js'
import redisClient from './redis/redisClient.js'

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

// Register user
app.post('/register-user', validateActionLogin,  async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: Date.now().toString(), email, password: hashedPassword };
  try {
    await saveUser(user);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err });
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
