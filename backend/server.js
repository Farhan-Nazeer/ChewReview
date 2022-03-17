const express = require('express');
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const port = 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const goalRoute = require('./routes/goalRoutes')

app.use('/api/goals', goalRoute)

app.use(errorHandler)

app.listen(port, () => console.log(`Server successfully started on port ${port}`))