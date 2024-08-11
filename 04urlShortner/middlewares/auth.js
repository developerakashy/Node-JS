const { getUser } = require('../services/auth')

async function restrictToLoggedInUserOnly(req, res, next){
    console.log("middleware")
    const cookieId = req.cookies.uid
    console.log(cookieId)
    if(!cookieId) return res.redirect('/login')

    const user = getUser(cookieId)
    if(!user) return res.redirect('/login')

    req.user = user

    next()
}

module.exports = {
    restrictToLoggedInUserOnly
}
