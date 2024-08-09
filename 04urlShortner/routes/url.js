const express = require('express')
const {
    handleCreateNewShortUrl,
    handleGetAllUrls,
    handleGetUrlByShortId,
    handleAnalytics,
    handleDeleteUrlByShortId
} = require('../controllers/url')
const router = express.Router()

router
.route('/')
.get(handleGetAllUrls)
.post(handleCreateNewShortUrl)

router
.route('/:shortId')
.get(handleGetUrlByShortId)
.delete(handleDeleteUrlByShortId)

router
.route('/analytics/:shortId')
.get(handleAnalytics)

module.exports = router
