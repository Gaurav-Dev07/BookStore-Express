const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const{ PORT }= require('./config/serverConfig')
const database = require('./db')
const bookRoutes = require('./routes/book')
const userRoutes = require('./routes/user')
const authRoutes = require('./routes/authentication')
const {errorHandler} = require('./middlewares/errorHandler')

app.use(express.json())
app.use('/books',bookRoutes)
app.use('/users',userRoutes)
app.use('/auth',authRoutes)
app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`server listening on port: ${PORT}`)
})