import express from 'express'
import { DataSource } from 'typeorm'

const app = express()

// connect to database

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'admin',
  database: 'test',
  synchronize: true,
  logging: false,
  entities: [
    'models/src/*.ts'
  ]
})

AppDataSource.initialize()
  .then(() => {
    console.log('Database connection established')
    return null
  })
  .catch((error) => {
    console.log(error)
    return null
  })

// Register middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Register routes

// Start the server
const port = process.env.PORT ?? 8000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

export { app, AppDataSource }
