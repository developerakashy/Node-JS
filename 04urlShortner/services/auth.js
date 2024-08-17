const jwt = require('jsonwebtoken')
const secret = 'akash9892@8888#'

function setUser(user){
    let payload = {
        id: user._id,
        email: user.email,
        role: user.role
    }
    return jwt.sign(payload, secret)
}

function getUser(token){
    if(!token) return null

    return jwt.verify(token, secret)
}

module.exports = {
    setUser,
    getUser
}
