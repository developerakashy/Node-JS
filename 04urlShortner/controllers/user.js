const User = require('../models/user')

async function handleUserSignUp(req, res){
    const { name, email, password } = req.body

    const user = await User.create({ name, email, password })

    return res.redirect('/')
}

async function handleUserLogin(req, res){
    const { email, password } = req.body
    const user = await User.findOne({ email: email, password: password })
    if(!user) return res.redirect('/login')
    return res.redirect('/')
}

module.exports = {
    handleUserLogin,
    handleUserSignUp
}
