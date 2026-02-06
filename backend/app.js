const express = require('express')
const cors = require('cors')
const { db } = require('./db/db')
const { readdirSync } = require('fs')
require('dotenv').config()

const app = express()

const PORT = Number(process.env.PORT) || 5000   // ✅ FIX

// middlewares
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000',   // ✅ FIX
  credentials: true
}))

// routes
readdirSync('./routes').map((route) =>
  app.use('/api/v1', require('./routes/' + route))
)

const server = () => {
  db()
  app.listen(PORT, () => {
    console.log('🚀 Server running on port:', PORT)
  })
}

server()
