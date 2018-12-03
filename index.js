const Utils = require('util')
const express = require('express')
const bodyParser = require('body-parser')
const authMiddleware = require('./auth')
const initlizeDatabase = require('./database')

const app = express()
app.use(bodyParser.json())
app.use(authMiddleware)

const startServer = async () => {
  await initlizeDatabase(app)
  const port = process.env.SERVER_PORT || 3000
  await Utils.promisify(app.listen).bind(app)(port)
  console.log(`Listening on port ${port}`)
}

startServer()
