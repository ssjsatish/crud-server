require('dotenv').config()
const express = require('express')
const routes = require('express').Router
const dbConfig = require('./config/database.config')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const app = express()
const port = process.env.PORT || 9001
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( ()=> {
    console.log('Connected to database successfully...')
}).catch(err => {
    console.log('Error occured while connecting to database... Exiting now', err)
    process.exit()
})
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.get('/', (req, res) => {
    res.json({ message: 'This is from express server.' })
})

// Require Notes routes
require('./routes/note.routes.js')(app);

app.listen(port, () => {
    console.log('server has started at ', port)
})