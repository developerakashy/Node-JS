const express = require('express')
const router = express.Router()
const URL = require('../models/url')

router.get('/', async (req, res) => {
    const user = req.user

    // if(!user) return res.redirect('/login')
    const allUrls = await URL.find({ createdBy: user })
    return res.render("home", {
        urls: allUrls
    })
})

router.get('/signup', (req, res) => {
    return res.render('signup')
})

router.get('/login', (req, res) => {
    return res.render('login')
})
module.exports = router
