const express = require('express')
const app = express()
const moongose = require('mongoose')

const PORT = 8000

moongose.connect('mongodb://127.0.0.1:27017/database1')
.then(() => console.log("Mongodb Connected"))
.catch((err) => console.log("Mongodb Error ", err))

const userSchema = new moongose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true,
    },
    jobTitle: {
        type: String,
        required: true
    }

}, {timestamps: true})

const User = moongose.model('user', userSchema)

app.use(express.urlencoded({extended:false}))

app
.route('/api/users/:id')
    .get(async (req, res) => {
        const userInfo = await User.findById(req.params.id)
        return res.status(200).send(userInfo)
    })
    .patch(async (req, res) => {
        const result = await User.findByIdAndUpdate(req.params.id, { lastName: "Yadav"})
        return res.status(200).send({status: "Updated", id: result.id})
    })
    .delete(async (req, res) => {
        const result = await User.findByIdAndDelete(req.params.id)
        return res.status(200).send({status: "Deleted", id: result.id})
    })

app
.route('/api/users').
    get(async (req, res) => {
        const userDatabase = await User.find({})
        return res.status(200).send(userDatabase)
    })
    .post(async (req, res) => {
        const body = req.body
        if(
            !body.firstName ||
            !body.lastName ||
            !body.gender ||
            !body.email ||
            !body.jobTitle
        ) return res.status(404).send({Status: "Failed!"})

        const result = await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            gender: body.gender,
            jobTitle: body.jobTitle
        })

        return res.status(201).send({status: "successfull", id: result.id})

    })

app.get('/users', async (req, res) => {
    const userDatabase = await User.find({})
    console.log(userDatabase)
    const userList = `
    <ul>
        ${userDatabase.map(user => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `
    return res.status(200).send(userList)
})

app.listen(PORT, () => console.log('Server Started'))
