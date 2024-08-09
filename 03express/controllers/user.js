const express = require('express')
const User = require('../models/user')

async function handleGetAllUsers(req, res){
    const userDatabase = await User.find({})
    return res.status(200).send(userDatabase)
}

async function handleGetUserById(req, res){
    const userInfo = await User.findById(req.params.id)
    return res.status(200).send(userInfo)
}

async function handleCreateNewUser(req, res){
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
}

async function handleUpdateUserById(req, res){
    const result = await User.findByIdAndUpdate(req.params.id, { lastName: "Yadav"})
    return res.status(200).send({status: "Updated", id: result.id})
}

async function handleDeleteUserById(req, res){
    const result = await User.findByIdAndDelete(req.params.id)

    if(!result) return res.status(404).send({status: "User does not exist"})
    return res.status(200).send({status: "Deleted", id: result.id})
}

module.exports = {
    handleGetAllUsers,
    handleCreateNewUser,
    handleGetUserById,
    handleDeleteUserById,
    handleUpdateUserById
}
