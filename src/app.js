const path = require('path')
const express = require('express')
const hbs = require('hbs')
require('./db/mongoose')
const bodyparser = require('body-parser')
const session = require('express-session')
const libraryRouter = require('./routers/library')
const adminRouter = require('./routers/admin')


const app = express()

// defining path for views
const viewsPath = path.join(__dirname, './templates/view')
const distPath = path.join(__dirname,'./templates/dist')
const partialPath = path.join(__dirname, './templates/partial')


//setup handler engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)


//setup static directory to serve
app.use(express.json())
app.use(bodyparser.urlencoded({extended: false}))
app.use(express.static(distPath))


//setting up node to use session to authenticate user
app.use(session({
    secret: 'thisissecret',
    cookie: { maxAge: 3600000 },
    resave: true,
    saveUninitialized: true,
}))


app.use(adminRouter)
app.use(libraryRouter)

module.exports = app