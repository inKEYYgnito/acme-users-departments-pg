const db = require('./db/db')
const path = require('path')
const express = require('express')
const app = express()

const logger = (req, res, next) => {
    console.log(`Received ${req.method} request on ${req.url}`)
    next()
}

app.use(express.json())
app.use(logger)
app.use('/api/users', require('./api/users'))
app.use('/api/departments', require('./api/departments'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

db.sync()
    .then(() => {
        const port = process.env.PORT || 3000
        app.listen(port, () => console.log(`Serving app in port ${ port }`))
    })
    .catch(ex => console.log(ex));
