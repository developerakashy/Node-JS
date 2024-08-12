const urlRoute = require('./routes/url')
const staticRoute = require('./routes/static')
const cookieParser = require('cookie-parser')
const userRoute = require('./routes/user')
const express = require('express')
const connectMongoDB = require('./connection')
const path = require('path')
const { restrictToLoggedInUserOnly, checkAuth } = require('./middlewares/auth')

const PORT = 8000
const app = express()


app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

//connection
connectMongoDB('mongodb://localhost:27017/short-url')
.then(() => console.log("Mongodb connected"))
.catch((err) => console.log("MongoDb error: ", err))

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/url',restrictToLoggedInUserOnly, urlRoute)
app.use('/user', userRoute)
app.use('/',checkAuth , staticRoute)

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`))
