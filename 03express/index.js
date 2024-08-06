const express = require('express')
const users = require('./MOCK_DATA.json')
const fs = require('fs')
const app = express()

app.use(express.urlencoded({extended:false}))

app.get('/', (req, res) => {
    res.send('Home Page')
})

app.get('/about', (req, res) => {
    res.send('About Page')
})

app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const userInfo = users.find(user => user.id === id)
    res.send(userInfo)
})

app.get('/api/users', (req, res) => {
    res.send(users)
})

app.post('/api/users', (req, res) => {
    const body = req.body
    users.push({...body, id:users.length + 1})

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({status: 'success', id: users.length})
    })


})

app.get('/users', (req, res) => {

    const userList = `
    <ul>
        ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    res.send(userList)
})

app.listen(8000, () => console.log('Server Started'))
