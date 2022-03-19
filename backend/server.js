const express = require('express');
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const goalRoute = require('./routes/goalRoutes')
const userRoute = require('./routes/userRoutes')

app.use('/api/goals', goalRoute)
app.use('/api/users', userRoute)

app.use(errorHandler)

app.listen(port, () => console.log(`Server successfully started on port ${port}`))