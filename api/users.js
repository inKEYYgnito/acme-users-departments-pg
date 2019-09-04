const db = require('../db/db')
const express = require('express')
const users = express.Router()

users.get('/', async (req, res) => {
    try {
        res.send(await db.getUsers())
    } catch (e) {
        res.status(404).send(e)
    }
})

module.exports = users
