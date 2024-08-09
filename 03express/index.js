const express = require('express')
const app = express()
const { connectMongoDB } = require('./connection')
const { logReqRes } = require('./middlewares')

const PORT = 8000
const userRoute = require('./routes/user')

//Connections
connectMongoDB('mongodb://127.0.0.1:27017/database1')
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB error: ",err))

//Middlewares
app.use(express.urlencoded({extended:false}))
app.use(logReqRes('log.txt'))
app.use('/api/users', userRoute)

app.listen(PORT, () => console.log('Server Started'))
