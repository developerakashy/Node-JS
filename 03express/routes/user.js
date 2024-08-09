const express = require('express')

const router  = express.Router()

const {
    handleGetAllUsers,
    handleCreateNewUser,
    handleDeleteUserById,
    handleGetUserById,
    handleUpdateUserById
} = require('../controllers/user')

router
.route('/:id')
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById)


router
.route('/')
    .get(handleGetAllUsers)
    .post(handleCreateNewUser)

module.exports = router
