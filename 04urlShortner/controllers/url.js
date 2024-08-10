const URL = require('../models/url')
const shortid = require('shortid')

async function handleGetAllUrls(req, res){
    const result = await URL.find({})

    return res.status(200).send(result)
}

async function handleCreateNewShortUrl(req, res){
    const body = req.body
    if(!body.url) return res.status(400).send({error: 'url required'})
    const shortID = shortid.generate()
    const entry = await URL.create({
        shortId: shortID,
        redirectURL: body.url
    })

    return res.status(201).render('home', {
        id: shortID
    })
}


async function handleGetUrlByShortId(req, res){
    const shortID = req.params.shortId
    const entry = await URL.findOneAndUpdate(
        {
            shortId: shortID
        },
        {
            $push: {
                visitHistory: {
                    timeStamp: Date.now()
                }
            }

        }
    )

    return res.redirect(entry.redirectURL)
}

async function handleAnalytics(req, res){
    const id = req.params.shortId
    const entry = await URL.findOne({ shortId: id })

    return res.status(200).send({visitCount: entry.visitHistory.length, visitTimeStamp: entry.visitHistory})
}


async function handleDeleteUrlByShortId(req, res){
    const entry = await URL.findOneAndDelete({shortId: req.params.shortId})

    return res.status(200).send({status: 'url deleted', shortId: entry.shortId})
}

module.exports = {
    handleCreateNewShortUrl,
    handleGetAllUrls,
    handleGetUrlByShortId,
    handleAnalytics,
    handleDeleteUrlByShortId
}
