import http from 'http'
import express from 'express'
import dotenv from 'dotenv'
import { Server } from 'socket.io'

dotenv.config()

const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT

const io = new Server(server)

io.on('connection', (socket) => {

    socket.on('user-message', (message) => {
        io.emit('message', message)
    })
})

app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile('./public/index.html')
})

server.listen(PORT, () => console.log(`Server Started ${PORT}`))
