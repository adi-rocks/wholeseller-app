import express, { type RequestHandler } from 'express'
import { DataSource } from 'typeorm'
import path from 'path'
import fs from 'fs'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { setAuthRoutes } from './src/routes/auth'
import { Role } from '../models/src/entities/Role'
import { User } from '../models/src/entities/User'
import { UserLogin } from '../models/src/entities/UserLogin'
import { createRoles } from '../models/src/utils/dbUtils'
import { dbUrl } from '../config'

const app = express()

// connect to database

const AppDataSource = new DataSource({
  type: 'mongodb',
  url: dbUrl,
  synchronize: true,
  logging: false,
  entities: [
    Role, User, UserLogin
  ],
  useNewUrlParser: true,
  useUnifiedTopology: true
})

AppDataSource.initialize()
  .then(async () => {
    console.log('Database connection established')
    await createRoles()

    return null
  })
  .catch((error) => {
    console.log(error)
    return null
  })

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth Service API',
      version: '1.0.0',
      description: 'API documentation for the Auth Service'
    },
    servers: [
      {
        url: 'http://localhost:8000'
      }
    ]
  },
  apis: ['./src/routes/*.ts']
}

interface SwaggerDocument {
  components?: {
    schemas?: Record<string, any>
  }
  [key: string]: any
}

const swaggerDocument: SwaggerDocument = swaggerJsDoc(swaggerOptions)

// Ensure that components.schemas exists
swaggerDocument.components = swaggerDocument.components ?? {}
swaggerDocument.components.schemas = swaggerDocument.components.schemas ?? {}

// Load schemas from ./schemas directory
const loadSchemas = async (): Promise<any> => {
  const schemasPath = path.join(__dirname, '..', 'schemas')
  const files = fs.readdirSync(schemasPath)
  for (const file of files) {
    const schemaPath = path.join(schemasPath, file)
    const schema = await import(schemaPath)
    const schemaName = path.basename(file, '.json')
    if ((swaggerDocument.components?.schemas) != null) {
      swaggerDocument.components.schemas[schemaName] = schema.default
      console.log(`Loaded schema: ${schemaName}`)
    }
  }
}

loadSchemas().then(() => {
  const swaggerDocs: RequestHandler = swaggerUi.setup(swaggerDocument)
  const swaggerUiHandler: RequestHandler[] = swaggerUi.serve
  app.use('/api-docs', swaggerUiHandler, swaggerDocs)

  // Register middleware
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // Register routes
  setAuthRoutes(app)

  // Start the server
  const port = process.env.PORT ?? 8000
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}).catch((error) => {
  console.error(error)
}
)

export { app, AppDataSource }
