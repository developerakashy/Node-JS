const urlRoute = require('./routes/url')
const express = require('express')
const connectMongoDB = require('./connection')

const PORT = 8000
const app = express()

//connection
connectMongoDB('mongodb://localhost:27017/short-url')
.then(() => console.log("Mongodb connected"))
.catch((err) => console.log("MongoDb error: ", err))

//middlewares
app.use(express.json())
app.use('/', urlRoute)

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`))
