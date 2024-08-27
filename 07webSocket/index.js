import http from 'http'
import express from 'express'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const PORT = 8001

const io = new Server(server)

io.on('connection', (socket) => {
    console.log("User connected on " + socket.id)

    socket.on('user-message', (message) => {
        io.emit('message', message)
    })
})

app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile('./public/index.html')
})

server.listen(PORT, () => console.log(`Server Started ${PORT}`))
