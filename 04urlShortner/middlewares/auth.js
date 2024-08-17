const { getUser } = require('../services/auth')

function checkForAutentication(req, res, next){
    const cookieToken = req.cookies?.token
    // req.user = null
    if(!cookieToken) return next()

    const user = getUser(cookieToken)

    if(!user) return res.redirect('/login')
    
    req.user = user

    next()

}

function restrictTo(roles){
    return (req, res, next) => {
        if(!req.user) return res.redirect('/login')

        if(!roles.includes(req.user.role)) return res.end("UnAuthorized")

        return next()
    }
}



module.exports = {
    restrictTo,
    checkForAutentication
}
