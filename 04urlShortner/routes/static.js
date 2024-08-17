const express = require('express')
const router = express.Router()
const URL = require('../models/url')
const { restrictTo } = require('../middlewares/auth')

router.get('/admin/urls',restrictTo(["ADMIN"]), async (req, res) => {
    const user = req.user
    if(!user) return res.redirect('/login')
    const allUrls = await URL.find({})
    return res.render("home", {
        urls: allUrls,
        user: req.user
    })
})

router.get('/', restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
    const user = req.user
    console.log(user)
    if(!user) return res.redirect('/login')
    const allUrls = await URL.find({ createdBy: user.id })
    return res.render("home", {
        urls: allUrls,
        user: req.user
    })
})

router.get('/signup', (req, res) => {
    return res.render('signup')
})

router.get('/login', (req, res) => {
    return res.render('login')
})
module.exports = router
