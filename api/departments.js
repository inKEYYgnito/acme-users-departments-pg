const db = require('../db/db')
const express = require('express')
const departments = express.Router()

departments.get('/', async (req, res) => {
    try {
        res.send(await db.getDepartments())
    } catch (e) {
        res.status(404).send(e)
    }
})

module.exports = departments
